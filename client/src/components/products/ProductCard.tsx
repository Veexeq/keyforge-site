import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom"; 
import type { Product } from "@/types"; // <--- JEDYNA ZMIANA: Import z types, nie mock_data

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:shadow-lg hover:border-primary/20">
      
      {/* Image Area - link the whole picture */}
      <Link to={`/products/${product.id}`} className="aspect-square relative overflow-hidden bg-secondary/20 block">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {product.isNew && (
          <Badge className="absolute top-3 left-3 shadow-lg">New</Badge>
        )}
      </Link>

      {/* Quick Add Button - stays on top */}
      <div className="absolute top-[calc(100%-12px)] right-3 -translate-y-full pointer-events-none">
        <div className="translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-auto">
             <Button 
                size="icon" 
                className="h-9 w-9 rounded-full shadow-lg"
                onClick={(e) => {
                    e.preventDefault();
                    console.log("Add to cart", product.id)
                }}
             >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          {/* LINK TITLE */}
          <Link to={`/products/${product.id}`}>
            <h3 className="font-medium text-foreground leading-tight group-hover:text-primary transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
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
