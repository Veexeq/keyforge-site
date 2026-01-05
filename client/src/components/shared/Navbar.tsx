import { Button } from "@/components/ui/button";
import { Menu, Moon, ShoppingBag, Sun, User } from "lucide-react";
import { useTheme } from "../theme-provider";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* TODO: insert keycap logo here in the future */}
          <span className="text-xl font-bold tracking-tighter">
            KeyForge
          </span>
        </div>

        {/* Navigation: tablet and desktop only */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Our Products
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </a>
        </nav>

        {/* Rest of the navbar */}
        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Account */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <ShoppingBag className="h-5 w-5" />
            
            {/* A red notification, if not empty */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            <span className="sr-only">Cart</span>
          </Button>

          {/* Mobile menu (hamburger) */}
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
