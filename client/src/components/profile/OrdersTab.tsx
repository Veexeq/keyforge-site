import type { Order } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrdersTabProps {
  orders: Order[];
}

export default function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>Check the status of your recent purchases.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <span className="font-semibold">Order #{order.id}</span>
                     <Badge variant={order.status === "DELIVERED" ? "default" : "secondary"}>
                       {order.status}
                     </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  
                  <div className="text-sm mt-2 space-y-1">
                     {order.items.map((item, idx) => (
                       <div key={idx} className="text-muted-foreground flex items-center gap-2">
                         <span className="font-medium text-foreground">{item.quantity}x</span> 
                         {item.variant.name}
                       </div>
                     ))}
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end justify-center">
                  <span className="text-muted-foreground text-sm">Total</span>
                  <span className="font-bold text-lg">
                    {parseFloat(order.totalAmount).toFixed(2)} PLN
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
            <p className="text-muted-foreground">No orders found.</p>
            <p className="text-sm text-muted-foreground">Time to buy some mechanical keyboard parts!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
