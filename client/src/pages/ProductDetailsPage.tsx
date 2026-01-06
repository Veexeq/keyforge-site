import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

import ProductGallery from "@/components/product_details/ProductGallery";
import ProductInfo from "@/components/product_details/ProductInfo";
import RelatedProducts from "@/components/product_details/RelatedProducts";

import type { Product, ApiProduct } from "@/types";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const resProduct = await fetch(`http://localhost:3000/api/products/${productId}`);
        
        if (!resProduct.ok) {
            setError(true);
            setLoading(false);
            return;
        }

        const rawProduct: ApiProduct = await resProduct.json();

        // Mapowanie pojedynczego produktu
        const createdDate = new Date(rawProduct.createdAt);
        const mappedProduct: Product = {
            id: rawProduct.id,
            name: rawProduct.name,
            description: rawProduct.description,
            price: parseFloat(rawProduct.basePrice),
            discountPrice: rawProduct.discountPrice ? parseFloat(rawProduct.discountPrice) : undefined,
            image: rawProduct.images[0]?.url || 'https://placehold.co/600x400',
            category: rawProduct.category.name,
            isNew: (Date.now() - createdDate.getTime()) < (30 * 24 * 60 * 60 * 1000),
            variants: rawProduct.variants?.map((v) => ({
                id: v.id,
                name: v.name,
                priceModifier: Number(v.priceModifier),
                stockQuantity: v.stockQuantity
            })) || []
        };
        
        setProduct(mappedProduct);

        // 2. Pobieramy WSZYSTKIE produkty dla sekcji "Related"
        // (W dużej aplikacji zrobilibyśmy osobny endpoint /api/products?category=..., ale tu pobierzemy all i przefiltrujemy)
        const resAll = await fetch('http://localhost:3000/api/products');
        const rawAll: ApiProduct[] = await resAll.json();
        
        const related = rawAll
            .filter(p => p.id !== productId) // Usuń obecny produkt
            .slice(0, 4) // Weź tylko 4
            .map(p => ({
                // Uproszczone mapowanie dla miniaturek
                id: p.id,
                name: p.name,
                description: p.description,
                price: parseFloat(p.basePrice),
                discountPrice: p.discountPrice ? parseFloat(p.discountPrice) : undefined,
                image: p.images[0]?.url || 'https://placehold.co/600x400',
                category: p.category.name,
                isNew: false,
                variants: []
            }));

        setRelatedProducts(related);

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
        fetchData();
    }
  }, [productId]);


  // --- RENDER STANU ŁADOWANIA ---
  if (loading) {
      return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </main>
            <Footer />
        </div>
      );
  }

  // --- RENDER STANU BŁĘDU (404) ---
  if (error || !product) {
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

  // --- RENDER WŁAŚCIWY ---
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
