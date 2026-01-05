import { useParams, Link } from "react-router-dom";
import { products } from "@/mock_data/products";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Nowe komponenty
import ProductGallery from "@/components/product_details/ProductGallery";
import ProductInfo from "@/components/product_details/ProductInfo";
import RelatedProducts from "@/components/product_details/RelatedProducts";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Number(id);

  const product = products.find((p) => p.id === productId);

  // Error State (404)
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

  // Logic for related items
  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link to="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Products
            </Link>
          </Button>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Bottom Section */}
        <RelatedProducts products={relatedProducts} />
      </main>

      <Footer />
    </div>
  );
}
