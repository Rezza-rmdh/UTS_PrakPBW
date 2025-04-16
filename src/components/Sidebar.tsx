
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  StickyNote, 
  Tag, 
  Settings, 
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, toggleTheme } = useStore();
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/todo-list', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { path: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { path: '/notes', icon: <StickyNote size={20} />, label: 'Notes' },
    { path: '/categories', icon: <Tag size={20} />, label: 'Categories' },
    { path: '/profile', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="h-screen flex flex-col bg-sidebar text-sidebar-foreground w-64 border-r border-sidebar-border p-4">
      {/* App Logo */}
      <div className="flex items-center justify-center py-6">
        <h1 className="text-2xl font-bold text-primary">Tugasin</h1>
      </div>
      
      {/* User Profile */}
      <div className="flex items-center space-x-3 mb-6 px-3 py-2">
        <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 mt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.path 
                ? "bg-sidebar-accent text-sidebar-primary" 
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      
      {/* Bottom actions */}
      <div className="mt-auto pt-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={toggleTheme}
        >
          {user.theme === 'light' ? (
            <>
              <Moon size={16} className="mr-2" /> Dark Mode
            </>
          ) : (
            <>
              <Sun size={16} className="mr-2" /> Light Mode
            </>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          <LogOut size={16} className="mr-2" /> Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
