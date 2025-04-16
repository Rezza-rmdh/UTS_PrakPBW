
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckCircle, Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
  compact?: boolean;
  onDelete?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, compact = false, onDelete }) => {
  const { completeTask } = useStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-amber-50 border-amber-200';
      default: return 'bg-green-50 border-green-200';
    }
  };
  
  const getCategoryClass = () => {
    switch (task.category) {
      case 'academic': return 'bg-blue-50 text-blue-700';
      case 'personal': return 'bg-violet-50 text-violet-700';
      case 'organization': return 'bg-amber-50 text-amber-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };
  
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  
  // Calculate completion percentage for subtasks
  const completedSubtasksCount = task.subTasks.filter(st => st.completed).length;
  const subtasksPercentage = task.subTasks.length > 0 
    ? Math.round((completedSubtasksCount / task.subTasks.length) * 100)
    : 0;

  return (
    <div className={cn(
      "border rounded-lg p-4 shadow-sm transition-all hover:shadow",
      getPriorityClass(),
      task.status === 'completed' ? 'opacity-70' : '',
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 
              className={cn(
                "font-medium",
                task.status === 'completed' ? 'line-through text-muted-foreground' : '',
                compact ? 'text-sm' : 'text-base'
              )}
            >
              {task.title}
            </h3>
          </div>
          
          {!compact && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          {task.status !== 'completed' && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => completeTask(task.id)}
            >
              <CheckCircle size={18} />
            </Button>
          )}
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 rounded-full text-blue-600"
            onClick={() => setEditDialogOpen(true)}
          >
            <Edit size={18} />
          </Button>
          
          {onDelete && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full text-red-600"
              onClick={onDelete}
            >
              <Trash2 size={18} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={getCategoryClass()}>
          {task.category}
        </Badge>
        
        <div className={cn(
          "flex items-center text-xs",
          isOverdue ? 'text-destructive' : 'text-muted-foreground'
        )}>
          <Calendar size={14} className="mr-1" />
          {format(new Date(task.dueDate), 'MMM d')}
        </div>
        
        {task.subTasks.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {completedSubtasksCount}/{task.subTasks.length} subtasks
          </div>
        )}
      </div>
      
      {!compact && task.subTasks.length > 0 && (
        <div className="mt-2 w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="bg-primary h-full"
            style={{ width: `${subtasksPercentage}%` }}
          />
        </div>
      )}
      
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm existingTask={task} onSuccess={() => setEditDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCard;
