import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CreditCard, Truck, User as UserIcon } from "lucide-react";
import type { Address } from "@/types";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { token, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [country, setCountry] = useState("Poland");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (isAuthenticated && token) {
      if (user) {
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
      }

      fetch("http://localhost:3000/api/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.addresses) {
            setSavedAddresses(data.addresses);
          }
        })
        .catch(err => console.error("Failed to load addresses", err));
    }
  }, [isAuthenticated, token, user]);

  const handleSelectAddress = (addressId: string) => {
    const selected = savedAddresses.find(addr => addr.id.toString() === addressId);
    if (selected) {
      setCity(selected.city);
      setStreet(selected.street);
      setPostalCode(selected.postalCode);
      setHouseNumber(selected.houseNumber);
      setCountry(selected.country);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate("/")}>Go Shopping</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const itemsPayload = items
      .filter(item => item.variantId !== undefined)
      .map(item => ({
        variantId: item.variantId!,
        quantity: item.quantity
      }));

    const addressPayload = { city, street, postalCode, houseNumber, country };

    try {
      const headers: Record<string, string> = {"Content-Type": "application/json"};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          items: itemsPayload,
          address: addressPayload,
          email: email
        })
      });

      if (res.ok) {
        clearCart();
        if (isAuthenticated) {
          navigate("/profile");
        } else {
          alert("Order placed successfully! Check your email.");
          navigate("/");
        }
      } else {
        const err = await res.json();
        alert(`Order failed: ${err.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout {isAuthenticated ? "" : "(Guest)"}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">

            {/* SAVED ADDRESSES (only for the logged in) */}
            {isAuthenticated && savedAddresses.length > 0 && (
              <Card className="bg-muted/30 border-dashed">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <UserIcon className="h-4 w-4" /> Load Saved Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={handleSelectAddress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select from your address book..." />
                    </SelectTrigger>
                    <SelectContent>
                      {savedAddresses.map(addr => (
                        <SelectItem key={addr.id} value={addr.id.toString()}>
                          {addr.city}, {addr.street} {addr.houseNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" /> Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid gap-4">

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="We will send order confirmation here"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street">Street</Label>
                    <Input id="street" value={street} onChange={e => setStreet(e.target.value)} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="house">House Number</Label>
                      <Input id="house" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Postal Code</Label>
                      <Input id="zip" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={city} onChange={e => setCity(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" value={country} onChange={e => setCountry(e.target.value)} />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For this demo, we assume "Cash on Delivery" or "Mock Payment".
                  No real money will be charged.
                </p>
              </CardContent>
            </Card>

          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-auto">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                      <span>
                        {item.name} {item.variantName ? `(${item.variantName})` : ''} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {(item.price * item.quantity).toFixed(2)} PLN
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{cartTotal.toFixed(2)} PLN</span>
                </div>

                <Button
                  type="submit"
                  form="checkout-form"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
