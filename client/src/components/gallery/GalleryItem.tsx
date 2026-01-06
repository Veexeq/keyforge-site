import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Expand } from "lucide-react";
import type { GalleryItem as GalleryItemType } from "@/mock_data/gallery";

interface GalleryItemProps {
  image: GalleryItemType;
}

export default function GalleryItem({ image }: GalleryItemProps) {
  return (
    // Key util-class component: break-inside-avoid
    <div className="break-inside-avoid mb-6">
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-border/50 bg-secondary/20">
            <img
              src={image.src}
              alt={image.title}
              loading="lazy"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* OVERLAY ON HOVER */}
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
              <Badge className="w-fit mb-2 bg-primary/80 hover:bg-primary/80 text-white border-none">
                {image.category}
              </Badge>
              <h3 className="text-white font-bold text-lg">{image.title}</h3>
              {image.author && (
                <p className="text-gray-300 text-sm">{image.author}</p>
              )}
              
              <div className="absolute top-4 right-4 text-white opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <Expand className="h-5 w-5" />
              </div>
            </div>
          </div>
        </DialogTrigger>

        {/* MODAL CONTENT */}
        <DialogContent className="max-w-4xl border-border/50 bg-background/95 backdrop-blur-xl p-0 overflow-hidden rounded-2xl">
           <DialogTitle className="sr-only">{image.title}</DialogTitle>
           
           <div className="relative">
             <img
              src={image.src}
              alt={image.title}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                <div className="flex items-end justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {image.category}
                    </Badge>
                    <h2 className="text-2xl font-bold text-white">{image.title}</h2>
                    {image.author && (
                      <p className="text-gray-300">Shot by {image.author}</p>
                    )}
                  </div>
                </div>
             </div>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
