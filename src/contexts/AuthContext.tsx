import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'supplier' | 'contractor' | 'admin' | 'moderator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  verified?: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'supplier@demo.com',
    name: 'ABC Building Supplies',
    role: 'supplier',
    verified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'contractor@demo.com',
    name: 'Elite Construction Co.',
    role: 'contractor',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    email: 'admin@demo.com',
    name: 'System Admin',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '4',
    email: 'moderator@demo.com',
    name: 'Content Moderator',
    role: 'moderator',
    createdAt: new Date('2024-03-10'),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Only allow supplier and contractor registration
    if (role !== 'supplier' && role !== 'contractor') {
      throw new Error('Invalid role for public registration');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      verified: false,
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
