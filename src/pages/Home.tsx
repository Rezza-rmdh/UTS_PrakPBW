
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, BookOpen } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <PageLayout>
      <div className="py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tugasin</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Atur hidup kuliahmu jadi lebih rapi pakai sistem manajemen tugas yang emang dibuat khusus buat mahasiswa kayak kamu.
          </p>
          
          {isAuthenticated ? (
            <div className="mt-8">
              <h2 className="text-2xl font-medium mb-4">Haloo, {user?.name}!</h2>
              <Link to="/todo-list">
                <Button size="lg" className="mt-2">
                  Go to my tasks
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button size="lg" className="mt-8">
                Get started!
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Create, edit, and organize tasks with intuitive controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Keep track of assignments, readings, projects, and exams all in one place with our intuitive task management system.</p>
            </CardContent>
            <CardFooter>
              <Link to={isAuthenticated ? "/todo-list" : "/login"} className="w-full">
                <Button variant="outline" className="w-full">
                  Manage Tasks
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Stay Organized</CardTitle>
              <CardDescription>
                Never miss a deadline with priority tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Set priorities, deadlines, and organize tasks by category to ensure you stay on top of your academic responsibilities.</p>
            </CardContent>
            <CardFooter>
              <Link to={isAuthenticated ? "/todo-list" : "/login"} className="w-full">
                <Button variant="outline" className="w-full">
                  Get Organized
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Academic Focus</CardTitle>
              <CardDescription>
                Designed specifically for student needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Categorize tasks by course, track assignment progress, and make your academic journey more manageable.</p>
            </CardContent>
            <CardFooter>
              <Link to="/about" className="w-full">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
