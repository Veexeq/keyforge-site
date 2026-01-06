export interface GalleryItem {
  id: number;
  src: string;
  category: "Keycaps" | "Setups" | "Switches" | "Work in Progress";
  title: string;
  author?: string; // Np. "Photo by @user123"
}

export const galleryImages: GalleryItem[] = [
  {
    id: 1,
    src: "https://placehold.co/600x800/1a1a1a/FFF?text=Void+Vertical",
    category: "Keycaps",
    title: "Obsidian Void - Close up",
    author: "KeyForge Team",
  },
  {
    id: 2,
    src: "https://placehold.co/800x600/222/FFF?text=Desk+Setup",
    category: "Setups",
    title: "Minimalist Workstation",
    author: "@tech_guru",
  },
  {
    id: 3,
    src: "https://placehold.co/600x600/331a33/FFF?text=Nebula",
    category: "Keycaps",
    title: "Nebula Shard on 60%",
    author: "KeyForge Team",
  },
  {
    id: 4,
    src: "https://placehold.co/600x900/111/FFF?text=Switch+Macro",
    category: "Switches",
    title: "Lubing Process",
    author: "KeyForge Team",
  },
  {
    id: 5,
    src: "https://placehold.co/800x500/0f2e15/FFF?text=Forest+Rest",
    category: "Work in Progress",
    title: "Casting the Deep Forest",
    author: "Workshop",
  },
  {
    id: 6,
    src: "https://placehold.co/700x700/440000/FFF?text=Crimson+Setup",
    category: "Setups",
    title: "Red & Black Theme",
    author: "@gamer_pl",
  },
  {
    id: 7,
    src: "https://placehold.co/600x800/2a1a2a/FFF?text=Details",
    category: "Keycaps",
    title: "Resin Polishing",
  },
  {
    id: 8,
    src: "https://placehold.co/800x600/eee/333?text=Clean+White",
    category: "Setups",
    title: "Stormtrooper Esthetic",
    author: "@white_builds",
  },
];
