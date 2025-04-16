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
import { GraduationCap, Briefcase, UserRound } from 'lucide-react';

const Categories = () => {
  const { tasks } = useStore();
  const [newTagName, setNewTagName] = useState('');
  
  // Count tasks by category
  const academicTasks = tasks.filter(task => task.category === 'academic').length;
  const personalTasks = tasks.filter(task => task.category === 'personal').length;
  const organizationTasks = tasks.filter(task => task.category === 'organization').length;
  
  // Get all unique tags
  const allTags = new Set<string>();
  tasks.forEach(task => {
    task.tags.forEach(tag => allTags.add(tag));
  });

  const uniqueTags = Array.from(allTags);
  
  // Count tasks by tag
  const taskCountByTag: Record<string, number> = {};
  uniqueTags.forEach(tag => {
    taskCountByTag[tag] = tasks.filter(task => task.tags.includes(tag)).length;
  });
  
  const handleAddTag = () => {
    if (newTagName.trim()) {
      // In a real app, we would add the tag to a database
      setNewTagName('');
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Categories & Tags</h1>
        <p className="text-muted-foreground">
          Manage your categories and tags to organize tasks
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-50 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-blue-700" />
                </div>
                <CardTitle>Academic</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <CardDescription>
                Course-related tasks, assignments, exams, and study materials.
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <p className="text-sm">
                <span className="font-medium">{academicTasks}</span> tasks
              </p>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="bg-violet-50 p-2 rounded-full">
                  <UserRound className="h-5 w-5 text-violet-700" />
                </div>
                <CardTitle>Personal</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <CardDescription>
                Personal goals, health-related tasks, hobbies, and self-care activities.
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <p className="text-sm">
                <span className="font-medium">{personalTasks}</span> tasks
              </p>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="bg-amber-50 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-amber-700" />
                </div>
                <CardTitle>Organization</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <CardDescription>
                Club activities, meetings, events, and organizational responsibilities.
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <p className="text-sm">
                <span className="font-medium">{organizationTasks}</span> tasks
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Tags</h2>
          <div className="flex space-x-2">
            <Input
              placeholder="New tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="w-[200px]"
            />
            <Button onClick={handleAddTag}>Add Tag</Button>
          </div>
        </div>
        
        {uniqueTags.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uniqueTags.map(tag => (
              <Card key={tag}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{tag}</CardTitle>
                </CardHeader>
                <CardFooter className="pt-2">
                  <p className="text-sm">
                    <span className="font-medium">{taskCountByTag[tag]}</span> tasks
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No tags found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add tags to your tasks to see them here
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
