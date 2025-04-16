
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CalendarView from '@/components/CalendarView';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ListFilter } from 'lucide-react';

const Calendar = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Visualize your tasks and deadlines
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <ListFilter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="organization">Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-end space-x-2 mb-2">
          <Button variant="outline" size="sm">Month</Button>
          <Button variant="outline" size="sm">Week</Button>
          <Button variant="outline" size="sm">Day</Button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow">
        <CalendarView />
      </div>
    </Layout>
  );
};

export default Calendar;
