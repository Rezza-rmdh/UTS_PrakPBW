
import React from 'react';
import { format, isToday, parseISO } from 'date-fns';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import ProgressChart from '@/components/ProgressChart';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { tasks } = useStore();
  
  // Get tasks for today
  const todayTasks = tasks.filter(task => {
    const taskDate = parseISO(task.dueDate);
    return isToday(taskDate);
  });
  
  // Get upcoming tasks (not completed and due date in the future)
  const upcomingTasks = tasks.filter(task => {
    const taskDate = parseISO(task.dueDate);
    return !isToday(taskDate) && taskDate > new Date() && task.status !== 'completed';
  }).sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  }).slice(0, 5); // Take only 5 tasks
  
  // Calculate task stats
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Completed Tasks
              </p>
              <h3 className="text-2xl font-bold">
                {completedTasks}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-secondary/10 p-2 rounded-full">
              <Clock className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending Tasks
              </p>
              <h3 className="text-2xl font-bold">
                {pendingTasks}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-accent/10 p-2 rounded-full">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Today's Tasks
              </p>
              <h3 className="text-2xl font-bold">
                {todayTasks.length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">
              Today's Tasks
            </CardTitle>
            <Link to="/todo-list">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {todayTasks.length > 0 ? (
              <div className="space-y-3">
                {todayTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No tasks for today!</h3>
                <p className="text-muted-foreground">
                  Enjoy your day or add some tasks to stay productive.
                </p>
                <Link to="/todo-list" className="mt-4">
                  <Button>Add Task</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Weekly Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
        
        {/* Upcoming Tasks */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">
              Upcoming Tasks
            </CardTitle>
            <Link to="/todo-list">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No upcoming tasks!</h3>
                <p className="text-muted-foreground">
                  You're all caught up. Add some tasks to plan ahead.
                </p>
                <Link to="/todo-list" className="mt-4">
                  <Button>Add Task</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
