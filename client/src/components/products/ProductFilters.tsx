import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";

const CATEGORIES = ["Artisan Keycap", "Wrist Rest", "Switch"];

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  clearFilters: () => void;
}

export default function ProductFilters({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  toggleCategory,
  clearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters = searchQuery.length > 0 || selectedCategories.length > 0;

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium leading-none">Search</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Keycaps, switches..."
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium leading-none">Categories</h3>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={category}
                className="text-sm font-normal text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Button */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="w-full justify-start px-0 text-muted-foreground hover:text-destructive"
          >
            <X className="mr-2 h-4 w-4" /> Clear all filters
          </Button>
        </>
      )}
    </div>
  );
}
