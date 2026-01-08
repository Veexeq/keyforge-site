import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // 1. Leniwa inicjalizacja TOKENA
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // 2. Leniwa inicjalizacja USERA (Naprawa błędu ESLint)
  // Zamiast useEffect, pobieramy dane startowe tutaj.
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // Przywracamy usera tylko jeśli mamy też token
    if (storedUser && storedToken) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
        return null;
      }
    }
    return null;
  });

  // UWAGA: Usunąłem useEffect, który powodował błąd.
  // Nie jest on potrzebny, bo stan inicjalizujemy powyżej,
  // a funkcja login() aktualizuje stan i localStorage jednocześnie.

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      // 1. Scalamy stare dane z nowymi
      const updatedUser = { ...user, ...userData };
      
      // 2. Aktualizujemy stan Reacta
      setUser(updatedUser);

      // 3. Aktualizujemy localStorage (żeby po odświeżeniu F5 dane nie zniknęły)
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
