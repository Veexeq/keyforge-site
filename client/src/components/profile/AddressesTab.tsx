import type { Address } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface AddressesTabProps {
  addresses: Address[];
}

export default function AddressesTab({ addresses }: AddressesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Addresses</CardTitle>
        <CardDescription>Manage your shipping addresses.</CardDescription>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="rounded-lg border p-4 relative flex items-start gap-3 bg-card text-card-foreground shadow-sm">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                    {addr.isDefault && (
                      <Badge className="absolute top-3 right-3" variant="secondary">Default</Badge>
                    )}
                    <p className="font-semibold text-lg">{addr.street} {addr.houseNumber}</p>
                    <p className="text-muted-foreground">{addr.postalCode} {addr.city}</p>
                    <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground mt-2">{addr.country}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No addresses saved yet. They will appear here after your first order.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
