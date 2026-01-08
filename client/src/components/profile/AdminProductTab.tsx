import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, Trash2, Archive } from "lucide-react";
import type { AdminProduct } from "@/types";

export default function AdminProductsTab() {
    const { token } = useAuth();
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Product Management</h2>
                    <p className="text-muted-foreground">Manage inventory, prices, and availability.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} className={product.status === 'ARCHIVED' ? 'opacity-60 bg-muted/50' : ''}>
                                <TableCell className="font-medium">#{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{parseFloat(product.basePrice).toFixed(2)} PLN</TableCell>
                                <TableCell>
                                    <Badge variant={product.totalStock > 0 ? "outline" : "destructive"}>
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
                                        <Button variant="ghost" size="icon" title="Withdraw/Archive">
                                            <Archive className="h-4 w-4 text-orange-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="Delete Permanently">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
