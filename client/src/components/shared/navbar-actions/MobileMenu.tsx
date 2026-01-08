import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

export default function MobileMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="flex flex-col p-0 gap-0 w-[300px]">
        <SheetHeader className="text-left px-6 pt-6 pb-4">
          <SheetTitle>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              KeyForge
            </Link>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-6 py-4">
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Our Products
          </Link>
          <Link 
            to="/gallery" 
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Gallery
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="border-t border-border/40 p-6">
           <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
