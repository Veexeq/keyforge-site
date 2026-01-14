import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Public
export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isDeleted: false },
      include: { category: true, images: true, variants: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id), isDeleted: false },
      include: { category: true, images: true, variants: true },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const getCategories = async (_: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Admin
export const getAdminProducts = async (_: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, variants: true, images: true },
      orderBy: { createdAt: 'desc' }
    });

    const adminProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      basePrice: p.basePrice,
      category: p.category,
      totalStock: p.variants.reduce((acc, v) => acc + v.stockQuantity, 0),
      status: p.isDeleted ? 'ARCHIVED' : 'ACTIVE',
      boughtCount: p.boughtCount,
      image: p.images && p.images.length > 0 ? p.images[0].url : null
    }));

    res.json(adminProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, categoryId, basePrice, discountPrice, imageUrl, variants } = req.body;
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
        discountPrice: discountPrice ? Number(discountPrice) : null,
        images: imageUrl ? { create: { url: imageUrl, altText: name, displayOrder: 0 } } : undefined,
        variants: {
          create: variants.map((v: any) => ({
            name: v.name,
            stockQuantity: Number(v.stockQuantity),
            priceModifier: Number(v.priceModifier || 0)
          }))
        }
      },
      include: { variants: true, images: true }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, categoryId, basePrice, discountPrice, imageUrl, variants } = req.body;
  const productId = Number(id);

  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId },
        data: {
          name, description, categoryId: Number(categoryId),
          basePrice: Number(basePrice), discountPrice: discountPrice ? Number(discountPrice) : null,
        }
      });

      if (imageUrl) {
        const existingImage = await tx.image.findFirst({ where: { productId } });
        if (existingImage) {
          await tx.image.update({ where: { id: existingImage.id }, data: { url: imageUrl } });
        } else {
          await tx.image.create({ data: { productId, url: imageUrl, altText: name, displayOrder: 0 } });
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
  } catch (error: any) {
    if (error.code === 'P2003') return res.status(400).json({ error: "Cannot remove variant that has been ordered." });
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  try {
    const variants = await prisma.productVariant.findMany({ where: { productId }, select: { id: true } });
    const orderCount = await prisma.orderItem.count({ where: { variantId: { in: variants.map(v => v.id) } } });

    if (orderCount > 0) return res.status(400).json({ error: "Cannot delete product that has been bought. Archive it instead." });

    await prisma.$transaction([
      prisma.image.deleteMany({ where: { productId } }),
      prisma.productVariant.deleteMany({ where: { productId } }),
      prisma.review.deleteMany({ where: { productId } }),
      prisma.product.delete({ where: { id: productId } })
    ]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const updateProductStatus = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: { isDeleted: req.body.isDeleted },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product status" });
  }
};

export const getProductDetailsAdmin = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true, images: true, variants: { include: { orderItems: true } } }
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    let totalRevenue = 0, totalSold = 0, totalStock = 0;
    product.variants.forEach((variant) => {
      totalStock += variant.stockQuantity;
      variant.orderItems.forEach((item) => {
        totalSold += item.quantity;
        totalRevenue += Number(item.unitPrice) * item.quantity;
      });
    });

    res.json({
      ...product, totalRevenue, totalSold, totalStock,
      variants: product.variants.map((v) => ({ id: v.id, name: v.name, priceModifier: v.priceModifier, stockQuantity: v.stockQuantity }))
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product details" });
  }
};

export const updateVariantStock = async (req: Request, res: Response) => {
  try {
    const updatedVariant = await prisma.productVariant.update({
      where: { id: Number(req.params.variantId) },
      data: { stockQuantity: Number(req.body.stockQuantity) }
    });
    res.json(updatedVariant);
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
};
