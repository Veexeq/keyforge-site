import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-me";

// Middleware
app.use(cors());
app.use(express.json());

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "super-secret-key-change-me");
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

const authorizeAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// --- ENDPOINTS ---
app.get('/api/products', async (_, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id), isDeleted: false },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role: 'CLIENT',
      },
    });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// --- LOGIN ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get('/api/profile', authenticateToken, async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        addresses: true,
        orders: {
          orderBy: { orderDate: 'desc' },
          include: {
            items: {
              include: {
                variant: true
              }
            }
          }
        }
      }
    });

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.get('/api/admin/products', authenticateToken, authorizeAdmin, async (_, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const adminProducts = products.map((p) => {
      const totalStock = p.variants.reduce((acc, v) => acc + v.stockQuantity, 0);

      return {
        id: p.id,
        name: p.name,
        basePrice: p.basePrice,
        category: p.category,
        totalStock,
        status: p.isDeleted ? 'ARCHIVED' : 'ACTIVE',
        boughtCount: p.boughtCount,
        image: p.images && p.images.length > 0 ? p.images[0].url : null
      };
    });

    res.json(adminProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch admin products' });
  }
});

app.patch('/api/admin/products/:id/status', authenticateToken, authorizeAdmin, async (req: any, res: any) => {
  const { id } = req.params;
  const { isDeleted } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { isDeleted: isDeleted },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ error: "Failed to update product status" });
  }
});

// --- SZCZEGÓŁY PRODUKTU I STATYSTYKI ---
app.get('/api/admin/products/:id/details', authenticateToken, authorizeAdmin, async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        images: true,
        variants: {
          include: {
            // Pobieramy historię zamówień dla każdego wariantu, żeby policzyć statystyki
            orderItems: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // --- OBLICZANIE STATYSTYK ---
    let totalRevenue = 0;
    let totalSold = 0;
    let totalStock = 0;

    product.variants.forEach((variant: any) => {
      // Magazyn
      totalStock += variant.stockQuantity;

      // Sprzedaż i Przychód z orderItems
      variant.orderItems.forEach((item: any) => {
        totalSold += item.quantity;
        // unitPrice jest typu Decimal, więc traktujemy jak liczbę lub string
        totalRevenue += Number(item.unitPrice) * item.quantity;
      });
    });

    // Przygotowujemy czysty obiekt odpowiedzi
    const responseData = {
      ...product,
      totalRevenue, // Np. 1500.50
      totalSold,    // Np. 45
      totalStock,   // Np. 120
      // Czyścimy warianty z orderItems, bo frontend tego nie potrzebuje wprost
      variants: product.variants.map((v: any) => ({
        id: v.id,
        name: v.name,
        priceModifier: v.priceModifier,
        stockQuantity: v.stockQuantity
      }))
    };

    res.json(responseData);

  } catch (error) {
    console.error("Product details error:", error);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

// --- SZYBKA AKTUALIZACJA STANU MAGAZYNOWEGO ---
app.patch('/api/admin/variants/:variantId/stock', authenticateToken, authorizeAdmin, async (req: any, res: any) => {
  const { variantId } = req.params;
  const { stockQuantity } = req.body;

  try {
    const updatedVariant = await prisma.productVariant.update({
      where: { id: Number(variantId) },
      data: { stockQuantity: Number(stockQuantity) }
    });
    res.json(updatedVariant);
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
});

app.post('/api/admin/products', authenticateToken, authorizeAdmin, async (req: any, res: any) => {
  const { name, description, categoryId, basePrice, imageUrl, variants } = req.body;

  if (!name || !categoryId || !basePrice || !variants || variants.length === 0) {
    return res.status(400).json({ error: "Missing required fields or variants" });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || "",
        categoryId: Number(categoryId),
        basePrice: Number(basePrice),
        images: imageUrl ? {
          create: {
            url: imageUrl,
            altText: name,
            displayOrder: 0
          }
        } : undefined,
        variants: {
          create: variants.map((v: any) => ({
            name: v.name,
            stockQuantity: Number(v.stockQuantity),
            priceModifier: Number(v.priceModifier || 0)
          }))
        }
      },
      include: {
        variants: true,
        images: true
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get('/api/categories', async (_, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.delete('/api/admin/products/:id', authenticateToken, authorizeAdmin, async (req: any, res: any) => {
  const { id } = req.params;
  const productId = Number(id);

  try {
    const variants = await prisma.productVariant.findMany({
      where: { productId: productId },
      select: { id: true }
    });
    const variantIds = variants.map((v: any) => v.id);

    const orderCount = await prisma.orderItem.count({
      where: { variantId: { in: variantIds } }
    });

    if (orderCount > 0) {
      return res.status(400).json({
        error: "Cannot delete product that has been bought. Archive it instead."
      });
    }

    await prisma.$transaction([
      prisma.image.deleteMany({ where: { productId } }),
      prisma.productVariant.deleteMany({ where: { productId } }),
      prisma.review.deleteMany({ where: { productId } }),
      prisma.product.delete({ where: { id: productId } })
    ]);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.put('/api/admin/products/:id', authenticateToken, authorizeAdmin, async (req: any, res: any) => {
  const { id } = req.params;
  const { name, description, categoryId, basePrice, imageUrl, variants } = req.body;
  const productId = Number(id);

  try {
    await prisma.$transaction(async (tx: any) => {
      await tx.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          categoryId: Number(categoryId),
          basePrice: Number(basePrice),
        }
      });

      if (imageUrl) {
        const existingImage = await tx.image.findFirst({ where: { productId } });
        if (existingImage) {
          await tx.image.update({
            where: { id: existingImage.id },
            data: { url: imageUrl }
          });
        } else {
          await tx.image.create({
            data: {
              productId,
              url: imageUrl,
              altText: name,
              displayOrder: 0
            }
          });
        }
      }

      // A. Pobierz obecne warianty z bazy, żeby wiedzieć co usunąć
      const currentVariants = await tx.productVariant.findMany({ where: { productId } });
      const currentVariantIds = currentVariants.map((v: any) => v.id);

      // B. Warianty z formularza, które mają ID (czyli istnieją)
      const incomingVariantIds = variants
        .filter((v: any) => v.id)
        .map((v: any) => v.id);

      // C. Wyznaczamy warianty do usunięcia (są w bazie, ale nie ma ich w formularzu)
      const toDelete = currentVariantIds.filter((id: number) => !incomingVariantIds.includes(id));

      // D. Usuwamy (tylko jeśli nie są kupione - prisma rzuci błąd foreign key, więc warto to obsłużyć, 
      // ale tutaj dla uproszczenia zakładamy try-catch globalny lub pozwalamy na błąd jeśli są zamówienia)
      if (toDelete.length > 0) {
        // Sprawdźmy czy można usunąć (czy nie ma zamówień) - opcjonalne bezpieczne podejście
        // Tutaj próbujemy usunąć. Jeśli są zamówienia, poleci błąd, co jest bezpiecznym zachowaniem.
        await tx.productVariant.deleteMany({
          where: { id: { in: toDelete } }
        });
      }

      // E. Upsert (Aktualizuj istniejące, Twórz nowe)
      for (const v of variants) {
        if (v.id) {
          // Aktualizacja
          await tx.productVariant.update({
            where: { id: v.id },
            data: {
              name: v.name,
              stockQuantity: Number(v.stockQuantity),
              priceModifier: Number(v.priceModifier)
            }
          });
        } else {
          // Tworzenie nowego (bo nie ma ID)
          await tx.productVariant.create({
            data: {
              productId,
              name: v.name,
              stockQuantity: Number(v.stockQuantity),
              priceModifier: Number(v.priceModifier)
            }
          });
        }
      }
    });

    res.json({ message: "Product updated successfully" });

  } catch (error) {
    console.error("Update error:", error);
    // Jeśli błąd dotyczy usuwania wariantu, który był kupiony:
    if ((error as any).code === 'P2003') { // Prisma error code for Foreign Key constraint
      return res.status(400).json({ error: "Cannot remove variant that has been ordered." });
    }
    res.status(500).json({ error: "Failed to update product" });
  }
});

// -- DEBUG ENDPOINTS --
app.get('/api/rawdata/accounts', async (_, res) => {
  const accounts = await prisma.user.findMany();
  if (accounts.length === 0) {
    return res.status(404).json({ message: 'No accounts registered' });
  }

  return res.status(200).json(accounts);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
