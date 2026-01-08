import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, DollarSign, Package, ShoppingCart, Edit } from "lucide-react";
import type { AdminProductDetails } from "@/types";
import Navbar from "@/components/shared/Navbar"; // Zakładam, że chcesz mieć Navbar
import Footer from "@/components/shared/Footer";

export default function AdminProductDetailsPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState<AdminProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingVariant, setUpdatingVariant] = useState<number | null>(null);

  // 1. Pobieranie danych
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin/products/${id}/details`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, token]);

  // 2. Funkcja aktualizacji stanu magazynowego
  const handleUpdateStock = async (variantId: number, newStock: string) => {
    setUpdatingVariant(variantId);
    try {
      const res = await fetch(`http://localhost:3000/api/admin/variants/${variantId}/stock`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ stockQuantity: parseInt(newStock) })
      });

      if (res.ok) {
        // Aktualizujemy stan lokalnie
        setProduct(prev => prev ? ({
          ...prev,
          variants: prev.variants.map(v =>
            v.id === variantId ? { ...v, stockQuantity: parseInt(newStock) } : v
          )
        }) : null);
      }
    } catch (error) {
      console.error("Update stock error:", error);
    } finally {
      setUpdatingVariant(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/profile")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              {product.name}
              <Badge variant={product.status === 'ACTIVE' ? "default" : "secondary"}>
                {product.status}
              </Badge>
            </h1>
            <p className="text-muted-foreground">Category: {product.category.name}</p>
          </div>
          <Button onClick={() => navigate(`/admin/products/${id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Product
          </Button>
        </div>

        {/* KPI CARDS (Statystyki) */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{product.totalRevenue.toFixed(2)} PLN</div>
              <p className="text-xs text-muted-foreground">Lifetime earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{product.totalSold}</div>
              <p className="text-xs text-muted-foreground">Across all orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{product.totalStock}</div>
              <p className="text-xs text-muted-foreground">Sum of all variants</p>
            </CardContent>
          </Card>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* LEWA KOLUMNA: Info i Obrazki */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-md overflow-hidden relative flex items-center justify-center">
                  {product.images.length > 0 ? (
                    <img src={product.images[0].url} alt={product.name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-muted-foreground">No image</span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PRAWA KOLUMNA: Zarządzanie Wariantami (Inventory) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex items-end justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">{variant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Price Modifier: {parseFloat(variant.priceModifier) > 0 ? '+' : ''}
                          {parseFloat(variant.priceModifier).toFixed(2)} PLN
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="grid w-[100px] items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">Stock</span>
                          <Input
                            type="number"
                            defaultValue={variant.stockQuantity}
                            // Tutaj prosty trik: update on blur (po wyjściu z pola) lub Enter
                            onBlur={(e) => handleUpdateStock(variant.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateStock(variant.id, e.currentTarget.value);
                                e.currentTarget.blur();
                              }
                            }}
                          />
                        </div>
                        {updatingVariant === variant.id && (
                          <Loader2 className="h-4 w-4 animate-spin text-primary mt-6" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
