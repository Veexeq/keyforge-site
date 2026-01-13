import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { ArrowLeft, Package, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  variant: {
    name: string;
    product: { name: string };
  };
}

interface Order {
  id: number;
  email: string;
  status: string;
  totalAmount: string;
  orderDate: string;
  city: string;
  country: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  items: OrderItem[];
  user?: { firstName: string; lastName: string };
}

const ORDER_STATUSES = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

export default function AdminOrdersPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "PENDING": return "secondary";   
      case "PAID": return "default";        
      case "PROCESSING": return "default";
      case "SHIPPED": return "outline";     
      case "DELIVERED": return "default";   
      case "CANCELLED": return "destructive"; 
      case "REFUNDED": return "destructive";
      default: return "secondary";
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/orders", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err); 
        setLoading(false);
      });
  }, [token]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    try {
      await fetch(`http://localhost:3000/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">

        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/profile")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <h1 className="text-m md:text-3xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8" /> Manage Orders
          </h1>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.email}</span>
                      <span className="text-xs text-muted-foreground">
                        {order.user ? `${order.user.firstName} ${order.user.lastName}` : "Guest"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{Number(order.totalAmount).toFixed(2)} PLN</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(order.status)} className="w-3 h-3 p-0 rounded-full" />

                      <Select
                        defaultValue={order.status}
                        onValueChange={(val) => handleStatusChange(order.id, val)}
                      >
                        <SelectTrigger className="w-[140px] h-8 border-none bg-transparent focus:ring-0 px-0 font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ORDER_STATUSES.map(st => (
                            <SelectItem key={st} value={st}>
                              {st}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" /> Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order #{order.id} Details</DialogTitle>
                          <DialogDescription>
                            Placed on {new Date(order.orderDate).toLocaleString()}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-8 py-4">
                          <div>
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>{order.country}</p>
                              <p>{order.city}, {order.postalCode}</p>
                              <p>{order.street} {order.houseNumber}</p>
                              <p className="mt-2 text-foreground font-medium">{order.email}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">Items</h3>
                            <div className="space-y-3 max-h-[300px] overflow-auto pr-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm border-b pb-2 last:border-0">
                                  <div>
                                    <p className="font-medium">{item.variant.product.name}</p>
                                    <p className="text-muted-foreground text-xs">{item.variant.name}</p>
                                  </div>
                                  <div className="text-right">
                                    <p>x{item.quantity}</p>
                                    <p className="font-medium">{Number(item.unitPrice).toFixed(2)} zł</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between border-t pt-4 mt-4 font-bold">
                              <span>Total:</span>
                              <span>{Number(order.totalAmount).toFixed(2)} PLN</span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
