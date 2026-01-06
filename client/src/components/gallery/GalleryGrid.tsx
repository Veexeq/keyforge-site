import type { GalleryItem as GalleryItemType } from "@/mock_data/gallery";
import GalleryItem from "./GalleryItem";
import { Filter } from "lucide-react";

interface GalleryGridProps {
  images: GalleryItemType[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">No images found</h3>
        <p className="text-muted-foreground">
          Try selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {images.map((image) => (
        <GalleryItem key={image.id} image={image} />
      ))}
    </div>
  );
}
