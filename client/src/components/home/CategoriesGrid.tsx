import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CategoriesGrid() {
  return (
    <section className="container mx-auto px-4 py-24">
      
      {/* Header section */}
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Choose your upgrade.
        </h2>
        <p className="mt-4 max-w-[600px] text-muted-foreground">
          Whether you need a visual overhaul or a tactile improvement, 
          we have the parts to make your keyboard truly yours.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="grid h-full w-full gap-6 md:h-[600px] md:grid-cols-2">
        
        {/* --- LEFT COLUMN: ARTISAN KEYCAPS (Flagship) --- */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://placehold.co/800x1200/1a1a1a/FFF?text=Artisan+Keycaps" 
              alt="Artisan Keycaps" 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8">
            <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-md">
              Flagship Collection
            </span>
            <h3 className="mb-2 text-3xl font-bold text-white">Artisan Keycaps</h3>
            <p className="mb-6 max-w-sm text-sm text-gray-300">
              Hand-sculpted, resin-cast gems for your keyboard. 
              Each keycap is a unique piece of art.
            </p>
            <Button className="rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition-colors">
              Explore Gallery
            </Button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SWITCHES & WRIST RESTS --- */}
        <div className="flex flex-col gap-6">
          
          {/* TOP: SWITCHES (Resell/Local Stock) */}
          <div className="group relative flex-1 overflow-hidden rounded-3xl border border-border/50 bg-card">
            <div className="absolute inset-0">
               <img 
                src="https://placehold.co/800x600/222/FFF?text=Mechanical+Switches" 
                alt="Switches" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-center p-8">
              <h3 className="text-2xl font-bold text-white">Switches</h3>
              <p className="mb-4 text-sm text-gray-200">
                Linear, Tactile, or Clicky? Local stock, 24h shipping.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:underline">
                Shop Switches <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* BOTTOM: WRIST RESTS (Handmade) */}
          <div className="group relative flex-1 overflow-hidden rounded-3xl border border-border/50 bg-card">
             <div className="absolute inset-0">
               <img 
                src="https://placehold.co/800x600/2a1a2a/FFF?text=Wrist+Rests" 
                alt="Wrist Rests" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center p-8">
              <h3 className="text-2xl font-bold text-white">Wrist Rests</h3>
              <p className="mb-4 text-sm text-gray-200">
                Ergonomic support meeting resin art.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:underline">
                View Collection <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
