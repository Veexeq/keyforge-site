export interface Product {
  id: number;
  name: string;
  category: "Artisan Keycap" | "Wrist Rest" | "Switch";
  price: number;
  image: string;
  isNew?: boolean;
  description: string; // NOWE POLE
}

export const products: Product[] = [
  {
    id: 1,
    name: "Obsidian Void",
    category: "Artisan Keycap",
    price: 149.00,
    image: "https://placehold.co/600x600/1a1a1a/FFF?text=Obsidian",
    isNew: true,
    description: "Hand-cast in resin, the Obsidian Void keycap features a deep, swirling black interior with hints of crushed amethyst. Perfect for the escape key on your dark-themed setup. Compatible with Cherry MX switches.",
  },
  {
    id: 2,
    name: "Lunar Dust",
    category: "Wrist Rest",
    price: 229.00,
    image: "https://placehold.co/600x600/eee/333?text=Lunar+Rest",
    isNew: true,
    description: "Ergonomic support crafted from solid resin and moon-grey pigments. The surface is polished to a glass-like finish, providing a cool, smooth resting place for your wrists during long typing sessions.",
  },
  {
    id: 3,
    name: "Gateron Oil Kings (10pcs)",
    category: "Switch",
    price: 34.00,
    image: "https://placehold.co/600x600/222/FFF?text=Oil+Kings",
    description: "The Gateron Oil King is a linear switch featuring a nylon top housing, ink bottom housing, and a POM stem. Known for its incredibly smooth feel and deep sound signature right out of the box. 55g actuation.",
  },
  {
    id: 4,
    name: "Nebula Shard",
    category: "Artisan Keycap",
    price: 169.00,
    image: "https://placehold.co/600x600/331a33/FFF?text=Nebula",
    isNew: true,
    description: "A cosmic journey in a single keycap. The Nebula Shard combines translucent purples and deep blues with glitter flakes to simulate a distant galaxy. High profile, SA row 1.",
  },
  {
    id: 5,
    name: "Cherry MX Black (10pcs)",
    category: "Switch",
    price: 25.00,
    image: "https://placehold.co/600x600/111/FFF?text=MX+Black",
    description: "The classic heavy linear switch. Cherry MX Blacks are favored by vintage enthusiasts for their scratchy-yet-satisfying feedback and heavy springs. Perfect for those with heavy hands.",
  },
  {
    id: 6,
    name: "Deep Forest",
    category: "Wrist Rest",
    price: 249.00,
    image: "https://placehold.co/600x600/0f2e15/FFF?text=Forest+Rest",
    description: "Inspired by ancient woodlands, this wrist rest features suspended moss-like structures within clear green resin. Brings a touch of nature to your mechanical keyboard.",
  },
  {
    id: 8,
    name: "Crimson Skull",
    category: "Artisan Keycap",
    price: 189.00,
    image: "https://placehold.co/600x600/440000/FFF?text=Crimson",
    description: "Aggressive, detailed, and striking. The Crimson Skull is hand-painted and encapsulated in clear resin for durability. A statement piece for your gaming setup.",
  },
];
