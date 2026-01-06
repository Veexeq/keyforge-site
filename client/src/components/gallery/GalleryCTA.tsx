import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function GalleryCTA() {
  return (
    <div className="mt-24 rounded-3xl border border-border/50 bg-secondary/5 p-12 text-center">
      <Camera className="mx-auto h-10 w-10 text-primary mb-4" />
      <h2 className="text-2xl font-bold mb-2">Got a sick setup?</h2>
      <p className="text-muted-foreground mb-6">
        We love seeing our keycaps in the wild. Tag us on social media to be featured here.
      </p>
      <Button variant="outline" className="rounded-full">
        @KeyForge_Official
      </Button>
    </div>
  );
}
