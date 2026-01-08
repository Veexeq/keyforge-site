import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  PackageSearch, 
  Settings, 
  ShoppingBag
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" /> Admin Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
            Manage your store, products, and customer orders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* --- SEKCJA PRODUKTÓW --- */}
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Inventory</h3>
            
            {/* Guzik: Dodaj nowy produkt (skrót) */}
            <Button 
                onClick={() => navigate("/admin/products/new")} 
                variant="outline" 
                className="w-full justify-start h-auto py-4 px-6 hover:bg-accent"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-full">
                        <PlusCircle className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold">Add New Product</h3>
                        <p className="text-sm text-muted-foreground">Create a new listing in the store</p>
                    </div>
                </div>
            </Button>

            {/* Guzik: Lista produktów (TO JEST TEN NOWY) */}
            <Button 
                onClick={() => navigate("/admin/products")} 
                variant="outline" 
                className="w-full justify-start h-auto py-4 px-6 hover:bg-accent"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-full">
                        <PackageSearch className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold">Manage Products</h3>
                        <p className="text-sm text-muted-foreground">Edit prices, stock, and variants</p>
                    </div>
                </div>
            </Button>
        </div>

        {/* --- SEKCJA ZAMÓWIEŃ --- */}
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sales</h3>

            <Button 
                onClick={() => navigate("/admin/orders")} 
                variant="outline" 
                className="w-full justify-start h-auto py-4 px-6 hover:bg-accent"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                        <ShoppingBag className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold">Manage Orders</h3>
                        <p className="text-sm text-muted-foreground">Process customer orders and shipments</p>
                    </div>
                </div>
            </Button>

            {/* Placeholder na przyszłość */}
            <div className="h-full border border-dashed rounded-lg flex items-center justify-center p-4 text-muted-foreground text-sm bg-muted/20 min-h-[80px]">
                More admin tools coming soon...
            </div>
        </div>

      </div>
    </div>
  );
}
