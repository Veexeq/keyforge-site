import { Link } from "react-router-dom";
import { User, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export default function UserNav() {
  const { user, logout, isAuthenticated } = useAuth();

  // 1. Jeśli użytkownik NIE jest zalogowany -> pokaż przycisk Login
  if (!isAuthenticated) {
    return (
      <Button variant="ghost" asChild>
        <Link to="/login">
          <UserIcon className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  }

  // 2. Jeśli JEST zalogowany -> pokaż Avatar i Dropdown
  const initials = user 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() 
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            {/* Opcjonalnie: jeśli masz avatar w bazie to tutaj source */}
            <AvatarImage src="" alt={user?.firstName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
                {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
             <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
             </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
