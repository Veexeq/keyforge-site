import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import type { AdminProduct, ProductStatus, SortConfig } from "@/types";

// Importujemy nasze nowe komponenty
import AdminProductsToolbar from "./AdminProductsToolbar";
import AdminProductsTable from "./AdminProductsTable";
import { useNavigate } from "react-router-dom";

type SortKey = keyof AdminProduct | 'category';

export default function AdminProductsTab() {
  const navigate = useNavigate();

  const { token } = useAuth();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // 1. Fetch Data
  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/products", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Admin fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProducts();
  }, [token]);

  // 2. Derive Categories
  const uniqueCategories = useMemo(() => {
    const categories = products.map(p => p.category.name);
    return Array.from(new Set(categories));
  }, [products]);

  // 3. Handle Sort
  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 4. Logic: Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerTerm) ||
        p.id.toString().includes(lowerTerm)
      );
    }

    // Filters
    if (statusFilter !== 'ALL') {
      result = result.filter(p => p.status === statusFilter);
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(p => p.category.name === categoryFilter);
    }

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        let aValue: string | number = 0;
        let bValue: string | number = 0;

        if (sortConfig.key === 'category') {
          aValue = a.category.name;
          bValue = b.category.name;
        } else if (sortConfig.key === 'basePrice') {
          aValue = parseFloat(a.basePrice);
          bValue = parseFloat(b.basePrice);
        } else {
          const key = sortConfig.key as keyof AdminProduct;
          const valA = a[key];
          const valB = b[key];

          if ((typeof valA === 'string' || typeof valA === 'number') &&
            (typeof valB === 'string' || typeof valB === 'number')) {
            aValue = valA;
            bValue = valB;
          }
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [products, searchTerm, statusFilter, categoryFilter, sortConfig]);

  const handleToggleStatus = async (productId: number, currentStatus: 'ACTIVE' | 'ARCHIVED') => {
    const newIsDeleted = currentStatus === 'ACTIVE';

    try {
      const res = await fetch(`http://localhost:3000/api/admin/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ isDeleted: newIsDeleted })
      });

      if (res.ok) {
        setProducts(prevProducts => prevProducts.map(p => {
          if (p.id === productId) {
            return {
              ...p,
              status: newIsDeleted ? 'ARCHIVED' : 'ACTIVE'
            };
          }
          return p;
        }));

      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return (
    <div className="py-12 flex justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product Management</h2>
          <p className="text-muted-foreground">Manage inventory, prices, and availability.</p>
        </div>
        <Button onClick={() => navigate("/admin/products/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Toolbar Component */}
      <AdminProductsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={uniqueCategories}
      />

      {/* Table Component */}
      <AdminProductsTable
        products={filteredProducts}
        sortConfig={sortConfig}
        onSort={handleSort}
        onToggleStatus={handleToggleStatus}
      />

      <div className="text-xs text-muted-foreground text-right">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
}
