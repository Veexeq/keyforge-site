import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react";

// Prosty typ dla wariantu w formularzu
interface VariantForm {
  name: string;
  stockQuantity: number;
  priceModifier: number;
}

interface Category {
  id: number;
  name: string;
}

export default function AdminProductCreatePage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Dane formularza
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  // Lista kategorii do selecta
  const [categories, setCategories] = useState<Category[]>([]);

  // Dynamiczna lista wariantów
  const [variants, setVariants] = useState<VariantForm[]>([
    { name: "Default", stockQuantity: 10, priceModifier: 0 }
  ]);

  // 1. Pobierz kategorie przy starcie
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  // Helpery do wariantów
  const addVariant = () => {
    setVariants([...variants, { name: "", stockQuantity: 0, priceModifier: 0 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const updateVariant = (index: number, field: keyof VariantForm, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/admin/products", {
        method: "POST",
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
        // Sukces -> wróć do listy produktów
        navigate("/profile");
      } else {
        alert("Failed to create product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/profile")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <h1 className="text-3xl font-bold">New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Sekcja 1: Podstawowe info */}
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Cherry MX Red" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                {/* Używamy Textarea jeśli masz taki komponent, lub natywnego textarea */}
                <Textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the product..."
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

              {/* Image URL przenieś niżej lub zostaw w osobnym divie */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          {/* Sekcja 2: Warianty */}
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
                      placeholder="e.g. Size XL or Red Switch"
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
                    disabled={variants.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Create Product
            </Button>
          </div>

        </form>
      </main>
      <Footer />
    </div>
  );
}
