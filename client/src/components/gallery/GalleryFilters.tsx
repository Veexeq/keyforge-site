import { Button } from "@/components/ui/button";

interface GalleryFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function GalleryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={activeCategory === cat ? "default" : "outline"}
          onClick={() => onCategoryChange(cat)}
          className="rounded-full"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
