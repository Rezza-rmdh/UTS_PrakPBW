
import React from 'react';
import Sidebar from './Sidebar';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, toggleTheme } = useStore();
  
  // Set theme when it changes
  useEffect(() => {
    if (user.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.theme]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden bg-background">
        {children}
      </main>
    </div>
  );
};

export default Layout;
