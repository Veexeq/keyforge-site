import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Package, User as UserIcon, LogOut } from "lucide-react";
import type { UserProfile } from "@/types";

export default function ProfilePage() {
  const { token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Zabezpieczenie: Jeśli nie ma tokena, wyrzuć do logowania
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 2. Pobieranie danych
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          headers: {
            "Authorization": `Bearer ${token}` // <--- KLUCZOWE: Wysyłamy token!
          }
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          // Jeśli token wygasł lub jest błędny -> wyloguj
          logout();
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, logout]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and view orders.</p>
          </div>
          <Button variant="outline" onClick={logout} className="gap-2 text-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account" className="gap-2"><UserIcon className="h-4 w-4"/> Account</TabsTrigger>
            <TabsTrigger value="orders" className="gap-2"><Package className="h-4 w-4"/> Orders</TabsTrigger>
            <TabsTrigger value="addresses" className="gap-2"><MapPin className="h-4 w-4"/> Addresses</TabsTrigger>
          </TabsList>

          {/* --- TAB: ACCOUNT --- */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">First Name</span>
                    <p className="text-lg font-medium">{profile.firstName}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Last Name</span>
                    <p className="text-lg font-medium">{profile.lastName}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Email</span>
                    <p className="text-lg font-medium">{profile.email}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Member Since</span>
                    <p className="text-lg font-medium">
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- TAB: ORDERS --- */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Check the status of your recent purchases.</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.orders.length > 0 ? (
                  <div className="space-y-6">
                    {profile.orders.map((order) => (
                      <div key={order.id} className="flex flex-col sm:flex-row justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <span className="font-semibold">Order #{order.id}</span>
                             <Badge variant={order.status === "DELIVERED" ? "default" : "secondary"}>
                               {order.status}
                             </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                          <div className="text-sm mt-2">
                             {order.items.map((item, idx) => (
                               <div key={idx} className="text-muted-foreground">
                                 {item.quantity}x {item.variant.name}
                               </div>
                             ))}
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 font-bold text-lg">
                          {parseFloat(order.totalAmount).toFixed(2)} PLN
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No orders found. Go buy some keycaps!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- TAB: ADDRESSES --- */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your shipping addresses.</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.addresses.map((addr) => (
                      <div key={addr.id} className="rounded-lg border p-4 relative">
                        {addr.isDefault && (
                          <Badge className="absolute top-2 right-2" variant="secondary">Default</Badge>
                        )}
                        <p className="font-semibold">{addr.street} {addr.houseNumber}</p>
                        <p>{addr.postalCode} {addr.city}</p>
                        <p className="text-muted-foreground text-sm">{addr.country}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No addresses saved yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
