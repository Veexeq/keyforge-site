import { useParams, Link } from "react-router-dom";
import { products } from "@/mock_data/products"; // Upewnij się, że ścieżka jest poprawna
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import AmbientGlow from "@/components/shared/AmbientGlow";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Number(id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Back to Shop</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        
        {/* Breadcrumbs / Back button */}
        <div className="mb-8">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link to="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Products
            </Link>
          </Button>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start">
          
          {/* LEFT COLUMN: PHOTO */}
          <div className="relative group z-0 w-full">

            <AmbientGlow className="-inset-4 sm:-inset-8 opacity-30 dark:opacity-40 blur-2xl" />
            
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

          {/* RIGHT COLUMN: DETAILS */}
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

            {/* Features / Trust signals */}
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
        </div>

        {/* --- RELATED PRODUCTS --- */}
        <div className="border-t border-border/40 pt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}