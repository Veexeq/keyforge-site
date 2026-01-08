import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { MapPin, Plus, Trash2, Home, Loader2 } from "lucide-react";
import type { Address } from "@/types";

interface AddressesTabProps {
  addresses: Address[];
}

export default function AddressesTab({ addresses: initialAddresses }: AddressesTabProps) {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [country, setCountry] = useState("Poland");

  // --- DODAWANIE ADRESU ---
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/profile/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ country, city, street, postalCode, houseNumber })
      });

      if (res.ok) {
        const newAddress = await res.json();
        // Aktualizujemy listę lokalnie
        setAddresses([...addresses, newAddress]);
        // Resetujemy formularz i zamykamy modal
        setCity(""); setStreet(""); setPostalCode(""); setHouseNumber("");
        setIsDialogOpen(false);
      } else {
        alert("Failed to add address.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- USUWANIE ADRESU ---
  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Are you sure you want to remove this address?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/profile/addresses/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        setAddresses(addresses.filter(addr => addr.id !== id));
      } else {
        alert("Failed to delete address.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" /> Saved Addresses
          </h2>
          <p className="text-sm text-muted-foreground">Manage your shipping destinations.</p>
        </div>

        {/* --- MODAL DODAWANIA --- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                Enter the details for your new shipping address here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAddress} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">Country</Label>
                <Input id="country" value={country} onChange={e => setCountry(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">City</Label>
                <Input id="city" value={city} onChange={e => setCity(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="street" className="text-right">Street</Label>
                <Input id="street" value={street} onChange={e => setStreet(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="house" className="text-right">House No.</Label>
                <Input id="house" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zip" className="text-right">Postal Code</Label>
                <Input id="zip" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="col-span-3" required />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Address"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- LISTA ADRESÓW --- */}
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <Card key={addr.id} className="relative group">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                   <Home className="h-4 w-4 text-muted-foreground" /> 
                   {addr.city}, {addr.country}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>{addr.street} {addr.houseNumber}</p>
                <p>{addr.postalCode}</p>
                
                {/* Przycisk Usuwania (pojawia się po najechaniu lub zawsze na mobile) */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-destructive opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteAddress(addr.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
            No addresses saved yet. Add one to speed up checkout!
          </div>
        )}
      </div>

    </div>
  );
}
