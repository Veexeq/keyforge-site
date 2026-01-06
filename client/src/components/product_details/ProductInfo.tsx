import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  // Handlers
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.name} to cart.`);
  };

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
        
        {/* 1. QUANTITY SELECTOR */}
        <div className="flex items-center justify-between rounded-full border border-border/50 bg-secondary/10 p-1 sm:w-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full hover:bg-background"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>

          <div className="w-12 text-center text-lg font-semibold tabular-nums">
            {quantity}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full hover:bg-background"
            onClick={increaseQuantity}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>

        {/* 2. ADD TO CART BUTTON */}
        {/* FIXME: This button is too short in height on mobile */}
        <Button
          size="lg"
          onClick={handleAddToCart}
          className="
            flex-1 rounded-full shadow-lg shadow-primary/20
            h-14 text-lg font-semibold
            md:h-14 md:text-lg
          "
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add {quantity > 1 ? `${quantity} items to Cart` : "item to Cart"}
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
