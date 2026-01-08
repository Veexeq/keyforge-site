import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";

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
  
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  // --- HANDLERS ---
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (product.variants.length > 0 && !selectedVariant) {
        alert("Please select an option first.");
        return;
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      variantName: selectedVariant?.name,
      price: currentDiscountPrice || currentPrice,
      image: product.image,
      quantity: quantity,
    });
    
    setQuantity(1);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-2 text-sm font-medium text-primary uppercase tracking-wider">
        {product.category}
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-balance">
        {product.name}
      </h1>

      <div className="flex items-baseline gap-3 mb-6">
        {currentDiscountPrice ? (
          <>
            <span className="text-3xl font-bold text-destructive">
              {currentDiscountPrice.toFixed(2)} PLN
            </span>
            <span className="text-xl text-muted-foreground line-through">
              {currentPrice.toFixed(2)} PLN
            </span>
            <Badge variant="destructive">Sale</Badge>
          </>
        ) : (
          <span className="text-3xl font-semibold text-foreground">
            {currentPrice.toFixed(2)} PLN
          </span>
        )}
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        {product.description}
      </p>

      {product.variants.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">Select Option</span>
            {selectedVariant && (
                <span className="text-sm text-muted-foreground">
                    Selected: <span className="font-semibold text-primary">{selectedVariant.name}</span>
                </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <Button
                key={variant.id}
                variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                onClick={() => onVariantChange(variant)}
                className={`min-w-[80px] ${selectedVariant?.id === variant.id ? "ring-2 ring-primary ring-offset-2" : ""}`}
              >
                {variant.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Separator className="mb-8" />

      {/* ACTIONS ROW */}
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
          </Button>
        </div>

        {/* 2. ADD TO CART BUTTON */}
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
          Add {quantity > 1 ? `${quantity} items` : "to Cart"}
          <span className="ml-2 text-sm font-normal opacity-80">
            • {( (currentDiscountPrice || currentPrice) * quantity ).toFixed(2)} PLN
          </span>
        </Button>
      </div>

      {/* Trust Signals (Bez zmian) */}
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
