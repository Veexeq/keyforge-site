import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-secondary/5 px-6 py-16 text-center sm:px-16">
        
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Join the <span className="text-primary">Inner Circle</span>.
          </h2>
          <p className="mb-8 text-lg text-muted-foreground text-balance">
            Get early access to limited artisan drops, exclusive discounts,
            and community updates. No spam, just mechanical goodness.
          </p>

          <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-background/50 border-border/50 focus-visible:ring-primary/20 transition-all"
              />
            </div>
            <Button type="submit" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 font-semibold">
              Subscribe
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            We respect your inbox. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
