import { Button } from "@/components/ui/button";

// Przykładowe dane (w przyszłości pobierzesz je z backendu/CMS)
const products = [
  {
    id: 1,
    name: "Obsidian Void",
    category: "Artisan Keycap",
    price: "149.00 PLN",
    image: "https://placehold.co/600x600/1a1a1a/FFF?text=Obsidian",
    isNew: true,
  },
  {
    id: 2,
    name: "Lunar Dust",
    category: "Wrist Rest",
    price: "229.00 PLN",
    image: "https://placehold.co/600x600/eee/333?text=Lunar+Rest",
    isNew: true,
  },
  {
    id: 3,
    name: "Gateron Oil Kings",
    category: "Switches (10 pcs)",
    price: "34.00 PLN",
    image: "https://placehold.co/600x600/222/FFF?text=Oil+Kings",
    isNew: true,
  },
  {
    id: 4,
    name: "Nebula Shard",
    category: "Artisan Keycap",
    price: "169.00 PLN",
    image: "https://placehold.co/600x600/331a33/FFF?text=Nebula",
    isNew: true,
  },
];

export default function FeaturedCollection() {
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
        <Button variant="ghost" className="hidden text-primary hover:text-primary/80 sm:flex">
          View all products &rarr;
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            
            {/* Photo with a hover:scaling effect */}
            <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border/50 bg-secondary/20">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Badge "New" */}
              {product.isNew && (
                <div className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-lg">
                  New
                </div>
              )}

            </div>

            {/* Product Info */}
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button for mobile */}
      <div className="mt-10 text-center sm:hidden">
        <Button variant="outline" className="w-full">
          View all products
        </Button>
      </div>
    </section>
  );
}
