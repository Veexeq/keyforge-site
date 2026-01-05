import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { Product } from "@/mock_data/products";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-2 text-sm font-medium text-primary uppercase tracking-wider">
        {product.category}
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-balance">
        {product.name}
      </h1>

      <div className="text-3xl font-semibold mb-6 text-foreground">
        {product.price.toFixed(2)} PLN
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        {product.description}
      </p>

      <Separator className="mb-8" />

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row mb-8">
        <Button
          size="lg"
          className="
            rounded-full shadow-lg shadow-primary/20
            w-full h-14 text-lg font-semibold
            md:flex-1 md:h-12 md:text-base md:w-auto
          "
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 text-primary" />
          <span>Ships within 24 hours</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span>2-year warranty</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="h-5 w-5 text-primary" />
          <span>100% Authentic</span>
        </div>
      </div>
    </div>
  );
}
