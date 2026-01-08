import type { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductInfoProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
  currentPrice: number;
  currentDiscountPrice?: number;
}

export default function ProductInfo({ 
  product, 
  selectedVariant, 
  onVariantChange, 
  currentPrice, 
  currentDiscountPrice 
}: ProductInfoProps) {

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Tytuł i Kategoria */}
      <div>
        <Badge variant="secondary" className="mb-3">
          {product.category}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {product.name}
        </h1>
      </div>

      {/* 2. CENA (Dynamiczna) */}
      <div className="flex items-baseline gap-3">
        {currentDiscountPrice ? (
          <>
            <span className="text-3xl font-bold text-primary">
              ${currentDiscountPrice.toFixed(2)}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              ${currentPrice.toFixed(2)}
            </span>
            <Badge variant="destructive">Sale</Badge>
          </>
        ) : (
          <span className="text-3xl font-bold">
            ${currentPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* 3. Opis */}
      <p className="text-muted-foreground text-lg leading-relaxed">
        {product.description}
      </p>

      {/* 4. WARIANTY (Przyciski) */}
      {product.variants.length > 0 && (
        <div className="space-y-3">
          <span className="text-sm font-medium">Select Option:</span>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <Button
                key={variant.id}
                variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                onClick={() => onVariantChange(variant)}
                className="min-w-[80px]"
              >
                {variant.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 5. Przycisk Dodaj do koszyka */}
      <div className="pt-4 flex gap-4">
        <Button size="lg" className="w-full md:w-auto gap-2">
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}