import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react";
import type { AdminProductDetails } from "@/types";

interface VariantForm {
  id?: number;
  name: string;
  stockQuantity: number;
  priceModifier: number;
}

interface Category {
  id: number;
  name: string;
}

export default function AdminProductEditPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [variants, setVariants] = useState<VariantForm[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch("http://localhost:3000/api/categories");
        const catData = await catRes.json();
        setCategories(catData);

        const prodRes = await fetch(`http://localhost:3000/api/admin/products/${id}/details`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!prodRes.ok) throw new Error("Product not found");

        const product = await prodRes.json();

        setName(product.name);
        setDescription(product.description || "");
        setBasePrice(product.basePrice);
        setCategoryId(product.categoryId.toString());
        setDiscountPrice(product.discountPrice ? product.discountPrice.toString() : "");

        if (product.images && product.images.length > 0) {
          setImageUrl(product.images[0].url);
        }

        setVariants(product.variants.map((v: AdminProductDetails['variants'][number]) => ({
          id: v.id,
          name: v.name,
          stockQuantity: v.stockQuantity,
          priceModifier: Number(v.priceModifier)
        })));

      } catch (error) {
        console.error(error);
        alert("Error loading product");
        navigate("/profile");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id, token, navigate]);

  // --- HELPERS ---
  const addVariant = () => {
    setVariants([...variants, { name: "", stockQuantity: 0, priceModifier: 0 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    } else {
      alert("Product must have at least one variant.");
    }
  };

  const updateVariant = (index: number, field: keyof VariantForm, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  // --- SUBMIT (PUT) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          categoryId,
          basePrice,
          discountPrice,
          imageUrl,
          variants
        })
      });

      if (res.ok) {
        navigate("/profile");
      } else {
        const err = await res.json();
        alert(`Failed to update: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">

        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                  >
                    <option value="">Select category...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Price (PLN)</label>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={basePrice}
                    onChange={e => setBasePrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600">Sale Price (Optional)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={discountPrice}
                    onChange={e => setDiscountPrice(e.target.value)}
                    placeholder="Leave empty for no sale"
                    className="border-orange-200 focus-visible:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Variants & Stock</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                <Plus className="h-4 w-4 mr-2" /> Add Variant
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="flex gap-4 items-end border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-muted-foreground">Variant Name</label>
                    <Input
                      value={variant.name}
                      onChange={e => updateVariant(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-24 space-y-1">
                    <label className="text-xs text-muted-foreground">Stock</label>
                    <Input
                      type="number"
                      value={variant.stockQuantity}
                      onChange={e => updateVariant(index, 'stockQuantity', Number(e.target.value))}
                    />
                  </div>
                  <div className="w-24 space-y-1">
                    <label className="text-xs text-muted-foreground">Extra Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={variant.priceModifier}
                      onChange={e => updateVariant(index, 'priceModifier', Number(e.target.value))}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeVariant(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>

        </form>
      </main>
      <Footer />
    </div>
  );
}
