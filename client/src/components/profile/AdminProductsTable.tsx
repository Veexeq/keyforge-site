import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Archive, ArrowUpDown } from "lucide-react";
import type { AdminProduct, SortConfig } from "@/types";

interface AdminProductsTableProps {
    products: AdminProduct[];
    sortConfig: SortConfig | null;
    onSort: (key: keyof AdminProduct | 'category') => void;
}

export default function AdminProductsTable({ 
    products, 
    sortConfig, 
    onSort 
}: AdminProductsTableProps) {
    
    // Helper do renderowania nagłówka z sortowaniem
    const renderSortableHead = (label: string, sortKey: keyof AdminProduct | 'category') => (
        <TableHead 
            className="cursor-pointer hover:bg-muted/50 transition-colors" 
            onClick={() => onSort(sortKey)}
        >
            <div className="flex items-center gap-1">
                {label} 
                <ArrowUpDown className={`h-3 w-3 ${sortConfig?.key === sortKey ? "text-primary" : "text-muted-foreground"}`} />
            </div>
        </TableHead>
    );

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {renderSortableHead("ID", "id")}
                        {renderSortableHead("Name", "name")}
                        {renderSortableHead("Category", "category")}
                        {renderSortableHead("Price", "basePrice")}
                        {renderSortableHead("Stock", "totalStock")}
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <TableRow key={product.id} className={product.status === 'ARCHIVED' ? 'opacity-60 bg-muted/30' : ''}>
                                <TableCell className="font-medium">#{product.id}</TableCell>
                                
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        {product.image ? (
                                            <img src={product.image} alt="" className="h-8 w-8 rounded object-cover border" />
                                        ) : (
                                            <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground w-8">IMG</div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-medium">{product.name}</span>
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
                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                No products found matching your filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
