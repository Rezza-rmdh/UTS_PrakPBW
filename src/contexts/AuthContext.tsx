import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.email === email && password === 'password') {
          setUser(parsedUser);
          toast({
            title: "Login successful",
            description: `Welcome back, ${parsedUser.name}!`,
          });
          return true;
        }
      }

      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      return false;

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      if (email && password.length >= 6) {
        const userData: User = {
          id: Date.now().toString(),
          name,
          email,
          role: 'student',
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        toast({
          title: 'Registration successful',
          description: `Welcome, ${name}!`,
        });

        return true;
      } else {
        toast({
          title: 'Registration failed',
          description: 'Invalid registration details.',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      toast({
        title: 'Register error',
        description: 'An error occurred during registration.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
