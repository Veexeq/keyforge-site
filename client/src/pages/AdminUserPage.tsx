import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { ArrowLeft, Users, Trash2, Loader2, ShieldCheck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "CLIENT";
  createdAt: string;
  _count: {
    orders: number;
  };
}

export default function AdminUsersPage() {
  const { token, user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/users", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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
            <Users className="h-8 w-8" /> Manage Users
          </h1>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium text-muted-foreground">#{u.id}</TableCell>

                  <TableCell>
                    <div className="font-medium">{u.firstName} {u.lastName}</div>
                    {currentUser?.id === u.id && (
                      <span className="text-[10px] text-primary font-bold">(YOU)</span>
                    )}
                  </TableCell>

                  <TableCell>{u.email}</TableCell>

                  <TableCell>
                    {u.role === 'ADMIN' ? (
                      <Badge variant="default" className="gap-1">
                        <ShieldCheck className="h-3 w-3" /> Admin
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <User className="h-3 w-3" /> Client
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {u._count.orders > 0 ? (
                      <span className="font-bold">{u._count.orders}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>

                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteUser(u.id)}
                      disabled={u.id === currentUser?.id} // Zablokuj usuwanie siebie
                      title={u.id === currentUser?.id ? "You cannot delete yourself" : "Delete user"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
