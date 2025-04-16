
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const { user, tasks, updateUser, toggleTheme } = useStore();
  const { toast } = useToast();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Count tasks by category
  const academicTasks = tasks.filter(task => task.category === 'academic').length;
  const personalTasks = tasks.filter(task => task.category === 'personal').length;
  const organizationTasks = tasks.filter(task => task.category === 'organization').length;
  
  const handleSaveProfile = () => {
    updateUser({
      name,
      email
    });
    
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been updated.',
    });
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account details and personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" disabled>
                Change Avatar
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize your app experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium">Theme Preference</p>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span className="text-xs text-muted-foreground">
                    {user.theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  <Moon className="h-4 w-4" />
                </div>
              </div>
              <Switch
                checked={user.theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Task Statistics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Task Statistics</CardTitle>
            <CardDescription>
              Overview of your task management performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Completion Rate</h3>
                  <Progress value={completionRate} className="h-2" />
                  <div className="mt-1 text-sm text-muted-foreground">
                    {completedTasks} out of {totalTasks} tasks completed ({completionRate}%)
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Task Distribution</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Academic</span>
                        <span>{academicTasks} tasks</span>
                      </div>
                      <Progress 
                        value={totalTasks > 0 ? (academicTasks / totalTasks) * 100 : 0} 
                        className="h-2 bg-blue-100" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Personal</span>
                        <span>{personalTasks} tasks</span>
                      </div>
                      <Progress 
                        value={totalTasks > 0 ? (personalTasks / totalTasks) * 100 : 0} 
                        className="h-2 bg-violet-100" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Organization</span>
                        <span>{organizationTasks} tasks</span>
                      </div>
                      <Progress 
                        value={totalTasks > 0 ? (organizationTasks / totalTasks) * 100 : 0} 
                        className="h-2 bg-amber-100" 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Type</span>
                    <span className="font-medium">Student</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tasks</span>
                    <span className="font-medium">{totalTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed Tasks</span>
                    <span className="font-medium">{completedTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending Tasks</span>
                    <span className="font-medium">{totalTasks - completedTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-medium">{completionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
