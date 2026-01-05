import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="container mx-auto flex flex-col items-center pt-20 pb-32 text-center px-4">

      {/* Badge */}
      <span className="mb-4 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
        New Collection  
      </span>      

      <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-balance">
        Make your keyboard <br className="hidden sm:block" />
        unique.
      </h1>

      <p className="max-w-[600px] text-lg text-muted-foreground mb-8 text-balance">
        Discover artisan keycaps and accessories, made by keyboard enthusiasts, <br className="hidden sm:block" />
        buy switches at reasonable price.
      </p>

      {/* CTA buttons */}
      <div className="flex gap-4 mb-16">
        <Button size="lg" className="rounded-full px-8">
          Buy now
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8">
          See photos
        </Button>
      </div>

      {/* Photo wrapper */}
      <div className="relative w-full max-w-4xl mt-10">

        {/* Background Blob */}

        {/* Main photo */}
        <img 
          src="https://placehold.co/1200x800/png?text=KeyForge+Keyboard+Setup"
          alt="KeyForge Keyboard Setup"
          className="relative z-10 w-full rounded-2xl shadow-2xl border border-border/5 dark:border-white/10"
        />
      </div>
    </section>
  );
}
