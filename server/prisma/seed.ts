import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed (English Data + Promotions)...');

  // 1. Cleaning DB
  await prisma.review.deleteMany();
  await prisma.image.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.savedAddress.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Database cleared.');

  // Hash generators
  const saltRounds = 10;
  
  const adminPlainPassword = process.env.ADMIN_PASS || "admin123" ;
  const clientPlainPassword = process.env.GUESS_PASS || "guest123";

  const adminPasswordHash = await bcrypt.hash(adminPlainPassword, saltRounds);
  const clientPasswordHash = await bcrypt.hash(clientPlainPassword, saltRounds);

  await prisma.user.create({
    data: {
      email: 'admin@keyforge.com',
      passwordHash: adminPasswordHash,
      firstName: 'Admin',
      lastName: 'Master',
      role: Role.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      email: 'client@example.com',
      passwordHash: clientPasswordHash,
      firstName: 'John',
      lastName: 'Doe',
      role: Role.CLIENT,
      addresses: {
        create: {
          city: 'New York',
          street: 'Broadway',
          postalCode: '10001',
          houseNumber: '123/A',
          country: 'USA',
          isDefault: true
        }
      }
    },
  });

  // 3. Categories
  const catKeycaps = await prisma.category.create({ data: { name: 'Artisan Keycaps' } });
  const catWristRests = await prisma.category.create({ data: { name: 'Wrist Rests' } });
  const catSwitches = await prisma.category.create({ data: { name: 'Switches' } });

  // --- PRODUCTS ---

  // A. KEYCAPS
  const keycapsData = [
    { name: 'GMK Red Samurai', price: 150.00, discount: 129.00, desc: 'Legendary set featuring a deep red, black, and gold colorway inspired by samurai armor. Cherry profile, ABS Double-shot.' },
    { name: 'ePBT Sushi', price: 90.00, discount: null, desc: 'Clean Japanese aesthetic with Hiragana sublegends. Cherry profile, PBT Dye-sub for durability.' },
    { name: 'SA Vilebloom', price: 120.00, discount: 105.00, desc: 'A vibrant gradient inspired by nature and Pokémon. High-profile SA sculpted keys for a retro feel.' },
    { name: 'DSA Magic Girl', price: 110.00, discount: null, desc: 'Pastel colors, mint green, and pink with magical girl iconography. Flat uniform DSA profile.' },
    { name: 'MT3 Susuwatari', price: 130.00, discount: null, desc: 'Retro terminal style with dark grey and warm legends. Sculpted MT3 high-profile keys.' },
    { name: 'XDA Canvas', price: 85.00, discount: 75.00, desc: 'Minimalist design inspired by Bauhaus art. Flat XDA profile with a wide surface area.' },
    { name: 'Tai-Hao Rubber Gaming', price: 25.00, discount: null, desc: 'Rubberized texture keycaps for WASD and arrows. Provides maximum grip during intense gaming sessions.' },
    { name: 'Glorious Aura Pudding', price: 35.00, discount: null, desc: 'Translucent sides designed to showcase your RGB lighting. Durable PBT material.' },
    { name: 'GMK Olivia++', price: 180.00, discount: null, desc: 'The modern classic. Elegant black and white keys with rose gold accents. Extremely sought after.' },
    { name: 'Obsidian Void Artisan', price: 55.00, discount: 45.00, desc: 'Hand-cast artisan keycap featuring a swirling black smoke effect in clear resin. Fits Esc key.' },
  ];

  for (const k of keycapsData) {
    await prisma.product.create({
      data: {
        categoryId: catKeycaps.id,
        name: k.name,
        description: k.desc,
        basePrice: k.price,
        discountPrice: k.discount,
        images: {
          create: { url: `https://placehold.co/600x600?text=${encodeURIComponent(k.name)}`, altText: k.name }
        },
        variants: {
          create: [
            { name: 'Base Kit', priceModifier: 0, stockQuantity: 50 },
            { name: 'Novelties Kit', priceModifier: 30, stockQuantity: 20 }
          ]
        }
      }
    });
  }

  // B. WRIST RESTS
  const wristRestData = [
    { name: 'Walnut Wood Rest', price: 40.00, discount: null, desc: 'Elegant wrist rest crafted from solid walnut wood. Finished with natural oils for a smooth touch.' },
    { name: 'Resin Galaxy', price: 60.00, discount: 55.00, desc: 'Hand-poured epoxy resin featuring a deep space swirl design. Polished to a glass-like finish.' },
    { name: 'Memory Foam Black', price: 25.00, discount: null, desc: 'Soft memory foam cushion with a non-slip rubber base. Ergonomic support for long typing sessions.' },
    { name: 'Acrylic Frost', price: 35.00, discount: null, desc: 'Matte frosted acrylic. Diffuses underglow lighting beautifully if placed near RGB keyboards.' },
    { name: 'Marble Stone White', price: 80.00, discount: null, desc: 'Heavy, luxurious solid white marble. Stays cool to the touch and provides rock-solid stability.' },
  ];

  for (const w of wristRestData) {
    await prisma.product.create({
      data: {
        categoryId: catWristRests.id,
        name: w.name,
        description: w.desc,
        basePrice: w.price,
        discountPrice: w.discount,
        images: {
          create: { url: `https://placehold.co/600x600?text=${encodeURIComponent(w.name)}`, altText: w.name }
        },
        variants: {
          create: [
            { name: '60% Size', priceModifier: 0, stockQuantity: 15 },
            { name: 'TKL Size', priceModifier: 5, stockQuantity: 15 },
            { name: 'Full Size', priceModifier: 10, stockQuantity: 10 }
          ]
        }
      }
    });
  }

  // C. SWITCHES
  const switchesData = [
    { name: 'Cherry MX Red', pack10Price: 5.00, discount: null, desc: 'Classic linear switch. Light actuation force, smooth travel.' },
    { name: 'Gateron Yellow Milky', pack10Price: 3.00, discount: 2.50, desc: 'Budget king linear switch. Incredible value.' },
    { name: 'Glorious Panda', pack10Price: 7.00, discount: null, desc: 'High-end tactile switch. Strong bump.' },
    { name: 'Zealio V2 67g', pack10Price: 11.00, discount: null, desc: 'Premium tactile switch. Sharp bump.' },
    { name: 'Kailh Box White', pack10Price: 4.00, discount: null, desc: 'Clicky switch with click bar.' },
    { name: 'Cherry MX Blue', pack10Price: 5.00, discount: 4.50, desc: 'Classic loud clicky switch.' },
    { name: 'Alpaca V2', pack10Price: 6.50, discount: null, desc: 'Top-tier linear, factory lubed.' },
    { name: 'Gazzew Boba U4T', pack10Price: 6.80, discount: null, desc: 'Thocky tactile switch.' },
    { name: 'C³ Tangerine', pack10Price: 7.50, discount: null, desc: 'Ultra smooth linear, orange housing.' },
    { name: 'Gateron Ink Black V2', pack10Price: 8.00, discount: 7.00, desc: 'Heavy linear, deep sound.' },
  ];

  for (const s of switchesData) {
    await prisma.product.create({
      data: {
        categoryId: catSwitches.id,
        name: s.name,
        description: s.desc,
        basePrice: s.pack10Price,
        discountPrice: s.discount,
        images: {
          create: { url: `https://placehold.co/600x600?text=${encodeURIComponent(s.name)}`, altText: s.name }
        },
        variants: {
          create: [
            { name: '10 Pack (Sample)', priceModifier: 0, stockQuantity: 100 },
            { name: '70 Pack (60%/TKL)', priceModifier: (s.pack10Price * 6), stockQuantity: 50 },
            { name: '90 Pack (Full Size)', priceModifier: (s.pack10Price * 8), stockQuantity: 40 },
            { name: '110 Pack (Spare)', priceModifier: (s.pack10Price * 10), stockQuantity: 20 },
          ]
        }
      }
    });
  }

  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
