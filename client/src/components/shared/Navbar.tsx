import { Button } from "@/components/ui/button";
import { Menu, Moon, ShoppingBag, Sun, User } from "lucide-react";
import { useTheme } from "@/components/theme-provider"; 

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-foreground">
            KeyForge
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {["About Us", "Our Products", "Gallery"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 scale-100 transition-all rotate-0 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 scale-0 transition-all rotate-90 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Account */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <ShoppingBag className="h-5 w-5" />
            {/* Notification dot */}
            <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
            <span className="sr-only">Cart</span>
          </Button>

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
