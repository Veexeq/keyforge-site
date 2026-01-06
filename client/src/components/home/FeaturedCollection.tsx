import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { products } from "@/mock_data/products";

export default function FeaturedCollection() {
  const featuredProducts = products.slice(0, 4);

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
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
