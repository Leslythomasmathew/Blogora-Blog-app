"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("blogora_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Extract a mock name from the email (e.g. john@example.com -> John)
    const namePart = email.split("@")[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const mockUser: User = {
      name,
      email,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80` // Standard avatar
    };
    
    setUser(mockUser);
    localStorage.setItem("blogora_user", JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const mockUser: User = {
      name,
      email,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80` // Premium avatar
    };
    
    setUser(mockUser);
    localStorage.setItem("blogora_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("blogora_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
