import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";
import type { Order } from "@/types";

interface OrdersTabProps {
  orders: Order[];
}

export default function OrdersTab({ orders }: OrdersTabProps) {
  
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
        <PackageOpen className="mx-auto h-12 w-12 opacity-50 mb-2" />
        <h3 className="text-lg font-medium">No orders yet</h3>
        <p>Your order history will appear here once you make a purchase.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-2">
        <PackageOpen className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Order History</h2>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">Order #{order.id}</CardTitle>
                  <CardDescription>
                    {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                  </CardDescription>
                </div>
                <Badge variant={order.status === 'PENDING' ? 'outline' : 'default'}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Lista przedmiotów w zamówieniu */}
                    <div className="text-sm space-y-2">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
                                <span>
                                    <span className="font-medium">{item.quantity}x</span> {item.variant.name}
                                </span>
                                <span className="text-muted-foreground">
                                    {/* Cena w momencie zakupu */}
                                    {Number(item.unitPrice).toFixed(2)} PLN
                                </span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Podsumowanie */}
                    <div className="flex justify-between items-center font-bold border-t pt-4">
                        <span>Total Amount</span>
                        <span>{Number(order.totalAmount).toFixed(2)} PLN</span>
                    </div>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
