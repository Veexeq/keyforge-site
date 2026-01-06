import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { galleryImages } from "@/mock_data/gallery";

import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryCTA from "@/components/gallery/GalleryCTA";

const CATEGORIES = ["All", "Keycaps", "Setups", "Switches", "Work in Progress"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtering
  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">    
        <GalleryHeader />
        <GalleryFilters 
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <GalleryGrid images={filteredImages} />
        <GalleryCTA />
      </main>
      <Footer />
    </div>
  );
}
