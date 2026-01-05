import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import ProductFilters from "./ProductFilters";

interface MobileFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  clearFilters: () => void;
}

export default function MobileFilters(props: MobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full md:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="flex flex-col h-full w-[300px] sm:w-[400px] gap-0">
        
        <SheetHeader className="text-left p-6 pb-2">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Narrow down your search results.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
          <ProductFilters {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
