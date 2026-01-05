export interface Product {
  id: number;
  name: string;
  category: "Artisan Keycap" | "Wrist Rest" | "Switch" | "Deskmat";
  price: number;
  image: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Obsidian Void",
    category: "Artisan Keycap",
    price: 149.00,
    image: "https://placehold.co/600x600/1a1a1a/FFF?text=Obsidian",
    isNew: true,
  },
  {
    id: 2,
    name: "Lunar Dust",
    category: "Wrist Rest",
    price: 229.00,
    image: "https://placehold.co/600x600/eee/333?text=Lunar+Rest",
    isNew: true,
  },
  {
    id: 3,
    name: "Gateron Oil Kings (10pcs)",
    category: "Switch",
    price: 34.00,
    image: "https://placehold.co/600x600/222/FFF?text=Oil+Kings",
  },
  {
    id: 4,
    name: "Nebula Shard",
    category: "Artisan Keycap",
    price: 169.00,
    image: "https://placehold.co/600x600/331a33/FFF?text=Nebula",
    isNew: true,
  },
  {
    id: 5,
    name: "Cherry MX Black (10pcs)",
    category: "Switch",
    price: 25.00,
    image: "https://placehold.co/600x600/111/FFF?text=MX+Black",
  },
  {
    id: 6,
    name: "Deep Forest",
    category: "Wrist Rest",
    price: 249.00,
    image: "https://placehold.co/600x600/0f2e15/FFF?text=Forest+Rest",
  },
  {
    id: 7,
    name: "Cyber Grid",
    category: "Deskmat",
    price: 119.00,
    image: "https://placehold.co/600x600/000044/FFF?text=Cyber+Mat",
  },
  {
    id: 8,
    name: "Crimson Skull",
    category: "Artisan Keycap",
    price: 189.00,
    image: "https://placehold.co/600x600/440000/FFF?text=Crimson",
  },
];
