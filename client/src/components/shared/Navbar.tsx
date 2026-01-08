import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

import UserNav from "@/components/shared/navbar-actions/UserNav";
import CartSheet from "@/components/shared/navbar-actions/CartSheet";
import MobileMenu from "@/components/shared/navbar-actions/MobileMenu";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={handleScrollToTop}
        >
          <span className="text-xl font-bold tracking-tighter text-foreground">
            KeyForge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </Link>
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
            Our Products
          </Link>
          <Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </Link>
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-2">
          
          {/* Theme Toggle */}
          <div className="hidden md:block">
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
          </div>

          <UserNav />
          
          <CartSheet />
          
          <MobileMenu />
          
        </div>
      </div>
    </header>
  );
}
