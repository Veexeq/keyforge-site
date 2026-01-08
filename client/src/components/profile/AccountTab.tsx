import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save, KeyRound, User as UserIcon } from "lucide-react";
import type { UserProfile } from "@/types";

interface AccountTabProps {
  profile: UserProfile;
}

export default function AccountTab({ profile }: AccountTabProps) {
  const { token } = useAuth();
  
  // Stan dla Danych Osobowych
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Stan dla Hasła
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);

  // --- AKTUALIZACJA DANYCH ---
  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingDetails(true);

    try {
      const res = await fetch("http://localhost:3000/api/profile/details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, lastName })
      });

      if (res.ok) {
        alert("Profile details updated successfully!");
        // Opcjonalnie: można tu odświeżyć całą stronę lub context, 
        // ale inputy mają już nowe wartości, więc wizualnie jest ok.
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  // --- ZMIANA HASŁA ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setLoadingPassword(true);

    try {
      const res = await fetch("http://localhost:3000/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password changed successfully!");
        // Czyścimy formularz
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.error || "Failed to change password.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* FORMULARZ DANYCH OSOBOWYCH */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary" />
            <CardTitle>Personal Information</CardTitle>
          </div>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateDetails} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={profile.email} disabled className="bg-muted" />
              <p className="text-[0.8rem] text-muted-foreground">
                Email address cannot be changed directly. Contact support if needed.
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loadingDetails}>
                {loadingDetails ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Details
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* FORMULARZ ZMIANY HASŁA */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Ensure your account is secure by using a strong password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input 
                id="currentPassword" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="outline" disabled={loadingPassword}>
                {loadingPassword ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Change Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
