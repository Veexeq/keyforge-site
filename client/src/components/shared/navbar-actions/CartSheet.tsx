import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartSheet() {
  const { items, removeItem, cartTotal, cartCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="px-6 pt-6 text-left">
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
          <SheetDescription>
            {cartTotal > 300 
              ? "You have qualified for free shipping!" 
              : `Add ${(300 - cartTotal).toFixed(2)} PLN more for free shipping.`}
          </SheetDescription>
        </SheetHeader>

        {/* CART ITEMS AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length > 0 ? (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                  {/* Photo */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border/50 bg-secondary/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-foreground line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.variantName ? item.variantName : "Standard"} 
                        {item.quantity > 1 && ` x ${item.quantity}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)} PLN
                      </span>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.productId, item.variantId)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // EMPTY STATE
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-secondary/30 p-4 text-muted-foreground">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="text-lg font-medium">Your cart is empty</p>
              
              <SheetClose asChild>
                <Link to="/products">
                    <Button variant="link" className="text-primary">
                        Start shopping
                    </Button>
                </Link>
              </SheetClose>
            </div>
          )}
        </div>

        {/* FOOTER / CHECKOUT */}
        {items.length > 0 && (
          <div className="px-6 pb-6 pt-2">
            <Separator className="mb-4" />
            <div className="flex items-center justify-between text-base font-medium mb-4">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)} PLN</span>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button asChild className="w-full h-12 text-lg rounded-full shadow-lg shadow-primary/20">
                  <Link to="/cart">
                    Checkout
                  </Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
