import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import type { Product, ApiProduct } from "@/types";

import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import MobileFilters from "@/components/products/MobileFilters";
import ProductSort, { type SortOption } from "@/components/products/ProductSort";

export default function ProductsPage() {
  // --- STATE ---
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products');
        const rawData: ApiProduct[] = await res.json();

        const mappedProducts: Product[] = rawData.map((p) => {
          const createdDate = new Date(p.createdAt);
          const isNew = (Date.now() - createdDate.getTime()) < (30 * 24 * 60 * 60 * 1000);

          return {
            id: p.id,
            name: p.name,
            description: p.description,
            price: parseFloat(p.basePrice),
            discountPrice: p.discountPrice ? parseFloat(p.discountPrice) : undefined,
            image: p.images[0]?.url || 'https://placehold.co/600x400?text=No+Image',
            category: p.category.name,
            isNew: isNew,
            variants: p.variants.map((v: ApiProduct['variants'][number]) => ({
              id: v.id,
              name: v.name,
              stockQuantity: v.stockQuantity,
              priceModifier: Number(v.priceModifier),
              productId: v.productId
            })),
          };
        });

        setAllProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- LOGIC (Filtering & Sorting) ---
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // 3. Sort
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
            const priceA = a.discountPrice ?? a.price;
            const priceB = b.discountPrice ?? b.price;
            return priceB - priceA;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id); 
        break;
    }

    return result;
  }, [allProducts, searchQuery, selectedCategories, sortOption]);

  // --- HANDLERS ---
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSortOption("newest");
  };

  const filterProps = {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    clearFilters,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto flex-1 px-4 py-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="mt-2 text-muted-foreground">
              {filteredProducts.length} items found
            </p>
          </div>

          <div className="md:hidden">
            <MobileFilters {...filterProps} />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* SIDEBAR */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <ProductFilters {...filterProps} />
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            <div className="mb-6 flex justify-end">
              <ProductSort value={sortOption} onValueChange={setSortOption} />
            </div>

            {loading ? (
                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-secondary/10 animate-pulse" />
                    ))}
                 </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-secondary/10 text-center">
                <div className="mb-4 rounded-full bg-secondary/30 p-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="mb-4 text-muted-foreground">
                  Try changing your filters or search query.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
