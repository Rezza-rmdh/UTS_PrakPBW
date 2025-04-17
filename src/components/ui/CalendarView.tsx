
import React from 'react';
import { 
  format,
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import TaskCard from './TaskCard';

const CalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const { tasks } = useStore();
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Get days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Get calendar headers
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Format tasks by date for easy lookup
  const tasksByDate: {[key: string]: typeof tasks} = {};
  tasks.forEach(task => {
    const date = format(new Date(task.dueDate), 'yyyy-MM-dd');
    if (!tasksByDate[date]) {
      tasksByDate[date] = [];
    }
    tasksByDate[date].push(task);
  });
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="font-semibold text-lg">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-0 text-center">
        {/* Render week day headers */}
        {weekDays.map((day) => (
          <div key={day} className="py-2 font-medium text-sm">
            {day}
          </div>
        ))}
        
        {/* Render calendar days */}
        {days.map((day) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const dayTasks = tasksByDate[formattedDate] || [];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={day.toString()}
              className={cn(
                "min-h-[100px] h-full border-t overflow-hidden p-1",
                !isCurrentMonth && "bg-muted/50 text-muted-foreground"
              )}
            >
              <div className="flex flex-col h-full">
                <div className={cn(
                  "text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center",
                  isToday && "bg-primary text-primary-foreground"
                )}>
                  {format(day, dateFormat)}
                </div>
                
                <div className="flex-1 overflow-y-auto max-h-20 mt-1 space-y-1">
                  {dayTasks.slice(0, 3).map(task => (
                    <TaskCard key={task.id} task={task} compact />
                  ))}
                  
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-center text-muted-foreground">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
