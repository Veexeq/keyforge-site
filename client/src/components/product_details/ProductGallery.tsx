import { Badge } from "@/components/ui/badge";
import AmbientGlow from "@/components/shared/AmbientGlow";
import type { Product } from "@/types"; 

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="relative group z-0 w-full">
      {/* Glow Effect */}
      <AmbientGlow className="-inset-4 sm:-inset-8 opacity-30 dark:opacity-50 blur-2xl scale-90" />

      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/50 bg-secondary/10 shadow-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {product.isNew && (
          <Badge className="absolute top-4 left-4 text-sm px-3 py-1 shadow-lg">
            New Arrival
          </Badge>
        )}
      </div>
    </div>
  );
}
