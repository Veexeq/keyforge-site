import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2 } from "lucide-react";

export default function CartSheet() {
  // TODO: add cart context and actually handle this logic
  const itemCount = 1;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
          <SheetDescription>
            Free shipping on orders over 300 PLN.
          </SheetDescription>
        </SheetHeader>

        {/* CART ITEMS AREA */}
        <div className="flex-1 overflow-y-auto py-6">
          {itemCount > 0 ? (
            <div className="flex flex-col gap-4">
              {/* MOCK ITEM */}
              <div className="flex gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-md border border-border/50 bg-secondary/20">
                  <img
                    src="https://placehold.co/200x200/1a1a1a/FFF?text=Void"
                    alt="Product"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Obsidian Void</h4>
                    <p className="text-sm text-muted-foreground">Artisan Keycap</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">149.00 PLN</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // EMPTY STATE
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-secondary/30 p-4 text-muted-foreground">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="text-lg font-medium">Your cart is empty</p>
              <Button variant="link" className="text-primary">
                Start shopping
              </Button>
            </div>
          )}
        </div>

        {/* FOOTER / CHECKOUT */}
        {itemCount > 0 && (
          <div className="space-y-4 pt-6">
            <Separator />
            <div className="flex items-center justify-between text-base font-medium">
              <span>Total</span>
              <span>149.00 PLN</span>
            </div>
            <SheetFooter>
              <Button className="w-full h-12 text-lg rounded-full shadow-lg shadow-primary/20">
                Checkout
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
