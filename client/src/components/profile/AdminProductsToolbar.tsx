import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ProductStatus } from "@/types";

interface AdminProductsToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: ProductStatus;
    onStatusChange: (value: ProductStatus) => void;
    categoryFilter: string;
    onCategoryChange: (value: string) => void;
    categories: string[];
}

export default function AdminProductsToolbar({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange,
    categoryFilter,
    onCategoryChange,
    categories
}: AdminProductsToolbarProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 bg-muted/20 p-4 rounded-lg border">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or ID..."
                    className="pl-8 bg-background"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Filters Group */}
            <div className="flex gap-2">
                <select 
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value as ProductStatus)}
                >
                    <option value="ALL">All Statuses</option>
                    <option value="ACTIVE">Active</option>
                    <option value="ARCHIVED">Archived</option>
                </select>

                <select 
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={categoryFilter}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="ALL">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
