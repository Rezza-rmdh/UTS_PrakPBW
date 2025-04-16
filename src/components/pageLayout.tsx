
import React from 'react';
import Navigation from './Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, requiresAuth = false }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If the page requires authentication and the user is not authenticated, redirect to login
  if (requiresAuth && !isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-muted mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tugasin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
