import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MapPin, Package, User as UserIcon, LogOut, ShieldAlert } from "lucide-react";
import type { UserProfile } from "@/types";

import AdminProductsTab from "@/components/profile/AdminProductsTab";
import AccountTab from "@/components/profile/AccountTab";
import OrdersTab from "@/components/profile/OrdersTab";
import AddressesTab from "@/components/profile/AddressesTab";

export default function ProfilePage() {
  const { token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Data request
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
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

  // --- RENDERS ---

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile.firstName}! Manage your account settings here.
            </p>
          </div>
          <Button variant="outline" onClick={logout} className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive w-full sm:w-auto">
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex"> 
            
            <TabsTrigger value="account" className="gap-2">
                <UserIcon className="h-4 w-4 hidden sm:block"/> Account
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4 hidden sm:block"/> Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="h-4 w-4 hidden sm:block"/> Addresses
            </TabsTrigger>

            {/* --- ADMIN TAB TRIGGER --- */}
            {profile.role === 'ADMIN' && (
                <TabsTrigger value="admin" className="gap-2 text-destructive data-[state=active]:text-destructive">
                    <ShieldAlert className="h-4 w-4 hidden sm:block"/> Admin Panel
                </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="account">
            <AccountTab profile={profile} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab orders={profile.orders} />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressesTab addresses={profile.addresses} />
          </TabsContent>

          {profile.role === 'ADMIN' && (
            <TabsContent value="admin">
              <AdminProductsTab />
            </TabsContent>
          )}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
