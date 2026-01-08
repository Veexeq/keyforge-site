import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, Trash2, Archive, Search, ArrowUpDown } from "lucide-react";
import type { AdminProduct } from "@/types";

// Definiujemy typ dla filtra statusu, żeby nie używać stringa
type StatusFilterType = 'ALL' | 'ACTIVE' | 'ARCHIVED';

// Definiujemy możliwe klucze sortowania
type SortKey = keyof AdminProduct | 'category';

export default function AdminProductsTab() {
    const { token } = useAuth();
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);

    // --- STANY FILTROWANIA I SORTOWANIA ---
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilterType>("ALL");
    const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);

    // 1. Pobieranie danych
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

    // 2. Unikalne kategorie
    const uniqueCategories = useMemo(() => {
        const categories = products.map(p => p.category.name);
        return Array.from(new Set(categories));
    }, [products]);

    // 3. Logika Sortowania
    const handleSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // 4. Logika Filtrowania i Sortowania
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // A. Wyszukiwanie
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(lowerTerm) || 
                p.id.toString().includes(lowerTerm)
            );
        }

        // B. Filtr Statusu
        if (statusFilter !== 'ALL') {
            result = result.filter(p => p.status === statusFilter);
        }

        // C. Filtr Kategorii
        if (categoryFilter !== 'ALL') {
            result = result.filter(p => p.category.name === categoryFilter);
        }

        // D. Sortowanie
        if (sortConfig) {
            result.sort((a, b) => {
                // Inicjalizujemy wartości domyślne jako number lub string
                let aValue: string | number = 0; 
                let bValue: string | number = 0;

                // Obsługa specyficznych pól
                if (sortConfig.key === 'category') {
                    aValue = a.category.name;
                    bValue = b.category.name;
                } else if (sortConfig.key === 'basePrice') {
                    // basePrice przychodzi jako string, musimy zamienić na liczbę do sortowania
                    aValue = parseFloat(a.basePrice);
                    bValue = parseFloat(b.basePrice);
                } else {
                    // Dla prostych pól (id, name, totalStock)
                    // Rzutujemy klucz na keyof AdminProduct, aby TS pozwolił na dostęp
                    const key = sortConfig.key as keyof AdminProduct;
                    
                    const valA = a[key];
                    const valB = b[key];

                    // Upewniamy się, że porównujemy tylko prymitywy (string/number)
                    // Pomijamy obiekty/tablice (jak 'images' czy 'variants'), bo one nie są sortowalne w ten sposób
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

    if (loading) return <div className="py-8 text-center text-muted-foreground">Loading dashboard...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Product Management</h2>
                    <p className="text-muted-foreground">Manage inventory, prices, and availability.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            {/* --- PASEK NARZĘDZI --- */}
            <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-4 rounded-lg border">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or ID..."
                        className="pl-8 bg-background"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filters Group */}
                <div className="flex gap-2">
                    <select 
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={statusFilter}
                        // Rzutowanie na konkretny typ Unii, a nie any
                        onChange={(e) => setStatusFilter(e.target.value as StatusFilterType)}
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="ARCHIVED">Archived</option>
                    </select>

                    <select 
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="ALL">All Categories</option>
                        {uniqueCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- TABELA --- */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] cursor-pointer hover:bg-muted/50" onClick={() => handleSort('id')}>
                                <div className="flex items-center gap-1">ID <ArrowUpDown className="h-3 w-3" /></div>
                            </TableHead>
                            
                            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('name')}>
                                <div className="flex items-center gap-1">Name <ArrowUpDown className="h-3 w-3" /></div>
                            </TableHead>
                            
                            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('category')}>
                                <div className="flex items-center gap-1">Category <ArrowUpDown className="h-3 w-3" /></div>
                            </TableHead>
                            
                            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('basePrice')}>
                                <div className="flex items-center gap-1">Price <ArrowUpDown className="h-3 w-3" /></div>
                            </TableHead>
                            
                            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('totalStock')}>
                                <div className="flex items-center gap-1">Stock <ArrowUpDown className="h-3 w-3" /></div>
                            </TableHead>
                            
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id} className={product.status === 'ARCHIVED' ? 'opacity-60 bg-muted/30' : ''}>
                                    <TableCell className="font-medium">#{product.id}</TableCell>
                                    
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {product.image ? (
                                                <img src={product.image} alt="" className="h-8 w-8 rounded object-cover border" />
                                            ) : (
                                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs">IMG</div>
                                            )}
                                            <div className="flex flex-col">
                                                <span>{product.name}</span>
                                                <span className="text-xs text-muted-foreground">Sales: {product.boughtCount}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    
                                    <TableCell>{product.category.name}</TableCell>
                                    
                                    <TableCell>{parseFloat(product.basePrice).toFixed(2)} PLN</TableCell>
                                    
                                    <TableCell>
                                        <Badge variant={product.totalStock > 10 ? "outline" : "destructive"}>
                                            {product.totalStock} units
                                        </Badge>
                                    </TableCell>
                                    
                                    <TableCell>
                                        <Badge variant={product.status === 'ACTIVE' ? "default" : "secondary"}>
                                            {product.status}
                                        </Badge>
                                    </TableCell>
                                    
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="View Details">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title={product.status === 'ACTIVE' ? "Archive" : "Activate"}>
                                                <Archive className={`h-4 w-4 ${product.status === 'ACTIVE' ? 'text-orange-500' : 'text-green-600'}`} />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete Permanently">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No products found matching your filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="text-xs text-muted-foreground text-right">
                Showing {filteredProducts.length} of {products.length} products
            </div>
        </div>
    );
}
