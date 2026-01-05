import { Button } from "@/components/ui/button";
import AmbientGlow from "@/components/shared/AmbientGlow";

export default function Hero() {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-24 text-center">
      
      {/* Badge */}
      <span className="mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
        New Collection
      </span>

      <h1 className="text-balance mb-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
        Make your keyboard <br className="hidden sm:block" />
        <span className="text-primary">unique.</span>
      </h1>

      <p className="text-balance text-muted-foreground mb-10 max-w-[600px] text-lg leading-relaxed">
        Discover artisan keycaps and accessories, made by keyboard enthusiasts,{" "}
        <br className="hidden sm:block" />
        buy switches at reasonable price.
      </p>

      {/* CTA buttons */}
      <div className="mb-20 flex gap-4">

        {/* Glow button: Shadow matching primary color */}
        <Button 
          size="lg" 
          className="rounded-full px-8 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/50"
        >
          Buy now
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8">
          See photos
        </Button>
      </div>

      {/* Photo wrapper */}
      <div className="group relative mt-4 w-full max-w-5xl">
        
        <AmbientGlow className="-inset-4 sm:-inset-8" />
        
        {/* Main photo */}
        <img
          src="https://placehold.co/1200x800/png?text=KeyForge+Setup"
          alt="KeyForge Keyboard Setup"
          className="relative rounded-xl border border-border/50 bg-card shadow-2xl shadow-black/50"
        />
        
        {/* Caption */}
        <div className="absolute -bottom-8 left-0 w-full text-center text-xs italic text-muted-foreground opacity-0 transition-opacity duration-500 sm:opacity-60 group-hover:opacity-100">
          Setup by @KeyForge
        </div>
      </div>
    </section>
  );
}
