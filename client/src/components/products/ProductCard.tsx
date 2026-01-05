import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/mock_data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:shadow-lg hover:border-primary/20">
      {/* Image Area */}
      <div className="aspect-square relative overflow-hidden bg-secondary/20">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {product.isNew && (
          <Badge className="absolute top-3 left-3 shadow-lg">New</Badge>
        )}

        {/* Quick Add Button */}
        <div className="absolute bottom-3 right-3 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button size="icon" className="h-9 w-9 rounded-full shadow-lg">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-medium text-foreground leading-tight group-hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-foreground">
            {product.price.toFixed(2)} PLN
          </span>
        </div>
      </div>
    </div>
  );
}
