import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import type { Product, ApiProduct } from "@/types";

export default function FeaturedCollection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products');
        const data: ApiProduct[] = await res.json();

        const mapped: Product[] = data.map((p) => {
           const createdDate = new Date(p.createdAt);
           const isNew = (Date.now() - createdDate.getTime()) < (30 * 24 * 60 * 60 * 1000);
           
           return {
            id: p.id,
            name: p.name,
            description: p.description,
            price: parseFloat(p.basePrice),
            discountPrice: p.discountPrice ? parseFloat(p.discountPrice) : undefined,
            image: p.images[0]?.url || 'https://placehold.co/600x400',
            category: p.category.name,
            isNew: isNew,
            variants: [], 
          };
        });

        const sorted = mapped.sort((a, b) => b.id - a.id).slice(0, 4);

        setFeaturedProducts(sorted);
      } catch (error) {
        console.error("Failed to load featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="container mx-auto px-4 py-24">
      {/* Section Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Latest Drops
          </h2>
          <p className="mt-2 text-muted-foreground">
            Fresh from the workshop. Limited quantities.
          </p>
        </div>
        
        <Button variant="ghost" className="hidden text-primary hover:text-primary/80 sm:flex" asChild>
          <Link to="/products">
            View all products &rarr;
          </Link>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
            // Skeleton Loading
            [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-secondary/10 animate-pulse" />
            ))
        ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>

      {/* Button for mobile */}
      <div className="mt-10 text-center sm:hidden">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/products">
            View all products
          </Link>
        </Button>
      </div>
    </section>
  );
}
