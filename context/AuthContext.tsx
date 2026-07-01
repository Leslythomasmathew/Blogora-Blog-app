"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  registeredUsers: User[];
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  checkEmailExists: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USERS: User[] = [
  {
    name: "Lesly Mathew",
    email: "lesly@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(DEFAULT_USERS);
  const [loading, setLoading] = useState(true);

  // Load user session and registered users list from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = typeof window !== "undefined" ? localStorage.getItem("blogora_user") : null;
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedRegistered = typeof window !== "undefined" ? localStorage.getItem("blogora_registered_users") : null;
      if (savedRegistered) {
        setRegisteredUsers(JSON.parse(savedRegistered));
      } else {
        localStorage.setItem("blogora_registered_users", JSON.stringify(DEFAULT_USERS));
      }
    } catch (e) {
      console.warn("Storage access denied: session cannot be restored from localStorage.", e);
    }
    setLoading(false);
  }, []);

  const checkEmailExists = (email: string): boolean => {
    const normalizedEmail = email.toLowerCase().trim();
    return registeredUsers.some((u) => u.email.toLowerCase().trim() === normalizedEmail);
  };

  const login = async (email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = registeredUsers.find((u) => u.email.toLowerCase().trim() === normalizedEmail);
    
    if (!existingUser) {
      throw new Error("No account found with this email. Please register first.");
    }
    
    setUser(existingUser);
    
    try {
      localStorage.setItem("blogora_user", JSON.stringify(existingUser));
    } catch (e) {
      console.warn("Storage access denied: session will not persist across reloads.", e);
    }
  };

  const register = async (name: string, email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const normalizedEmail = email.toLowerCase().trim();
    const exists = checkEmailExists(normalizedEmail);
    
    if (exists) {
      throw new Error("This email is already registered. Please sign in instead.");
    }
    
    const newUser: User = {
      name: name.trim(),
      email: normalizedEmail,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`
    };
    
    const updatedList = [...registeredUsers, newUser];
    setRegisteredUsers(updatedList);
    setUser(newUser);
    
    try {
      localStorage.setItem("blogora_registered_users", JSON.stringify(updatedList));
      localStorage.setItem("blogora_user", JSON.stringify(newUser));
    } catch (e) {
      console.warn("Storage access denied: session will not persist across reloads.", e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("blogora_user");
    } catch (e) {
      console.warn("Storage access denied: failed to clear localStorage.", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registeredUsers, login, register, logout, checkEmailExists }}>
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
