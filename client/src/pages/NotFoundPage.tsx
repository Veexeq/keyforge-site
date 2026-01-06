import { Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import AmbientGlow from "@/components/shared/AmbientGlow";
import { ArrowLeft, Home, Unplug } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 container mx-auto px-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <AmbientGlow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl scale-150" />

        <div className="relative z-10 max-w-lg">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/30 text-primary border border-primary/20 shadow-2xl shadow-primary/10">
            <Unplug className="h-10 w-10" />
          </div>

          <h1 className="mb-2 text-7xl font-extrabold tracking-tighter text-foreground">
            404
          </h1>
          
          <h2 className="mb-6 text-2xl font-semibold text-foreground">
            Not Found
          </h2>

          <p className="mb-8 text-muted-foreground text-lg text-balance">
            It seems this keycap is missing from the board. <br />
            The page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="rounded-full shadow-lg shadow-primary/20">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Go Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
