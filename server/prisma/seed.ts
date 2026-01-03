import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Rozpoczynam sianie danych...');

  // 1. Czyścimy bazę (żeby nie dublować danych przy wielokrotnym uruchomieniu)
  // Kolejność jest ważna ze względu na klucze obce!
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.image.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Tworzymy Kategorie
  const catSwitches = await prisma.category.create({
    data: { name: 'Switches' },
  });
  
  const catKeycaps = await prisma.category.create({
    data: { name: 'Keycaps' },
  });

  const catKeyboards = await prisma.category.create({
    data: { name: 'Keyboards' },
  });

  // 3. Tworzymy Produkty

  // PRODUKT 1: Gateron Oil King (Switches)
  const productSwitch = await prisma.product.create({
    data: {
      name: 'Gateron Oil King Linear Switch',
      description: 'The Gateron Oil King is a fully nylon housing linear switch that is factory lubed.',
      basePrice: 3.50, // Cena za 10 sztuk
      categoryId: catSwitches.id,
      variants: {
        create: [
          { name: '10 Pack', stockQuantity: 100, priceModifier: 0 },
          { name: '70 Pack', stockQuantity: 50, priceModifier: 20.00 }, // Taniej w zestawie
          { name: '90 Pack', stockQuantity: 20, priceModifier: 25.00 },
        ],
      },
      images: {
        create: [
          { url: 'https://placehold.co/600x400/1a1a1a/white?text=Oil+King', altText: 'Gateron Oil King Switch' },
        ],
      },
    },
  });

  // PRODUKT 2: GMK Red Samurai (Keycaps)
  const productKeycaps = await prisma.product.create({
    data: {
      name: 'GMK Red Samurai',
      description: 'Legendary keycap set designed by RedSuns. ABS Doubleshot.',
      basePrice: 120.00,
      categoryId: catKeycaps.id,
      variants: {
        create: [
          { name: 'Base Kit', stockQuantity: 15, priceModifier: 0 },
          { name: 'Novelties', stockQuantity: 5, priceModifier: -80.00 }, // Tańsze same dodatki
        ],
      },
      images: {
        create: [
          { url: 'https://placehold.co/600x400/800000/gold?text=Red+Samurai', altText: 'GMK Red Samurai Kit' },
        ],
      },
    },
  });

  // PRODUKT 3: Keychron Q1 Pro (Keyboard)
  const productKeyboard = await prisma.product.create({
    data: {
      name: 'Keychron Q1 Pro',
      description: 'Wireless QMK/VIA custom mechanical keyboard. Aluminum body.',
      basePrice: 199.00,
      categoryId: catKeyboards.id,
      variants: {
        create: [
          { name: 'Carbon Black (Barebone)', stockQuantity: 10, priceModifier: 0 },
          { name: 'Silver Grey (Fully Assembled)', stockQuantity: 5, priceModifier: 30.00 },
        ],
      },
      images: {
        create: [
          { url: 'https://placehold.co/600x400/333333/white?text=Q1+Pro', altText: 'Keychron Q1 Pro Black' },
        ],
      },
    },
  });

  console.log('✅ Zasianie zakończone sukcesem!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  