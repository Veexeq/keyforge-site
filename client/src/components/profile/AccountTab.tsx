import type { UserProfile } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountTabProps {
  profile: UserProfile;
}

export default function AccountTab({ profile }: AccountTabProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your basic account details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">First Name</span>
            <p className="text-lg font-medium">{profile.firstName}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Last Name</span>
            <p className="text-lg font-medium">{profile.lastName}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Email</span>
            <p className="text-lg font-medium">{profile.email}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Role</span>
            <p className="text-lg font-medium capitalize">{profile.role.toLowerCase()}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Member Since</span>
            <p className="text-lg font-medium">
              {formatDate(profile.createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
