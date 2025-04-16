
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Calendar,
  Tag,
  Trash2,
  Edit,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Plus,
  Paperclip,
  Clock
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useStore } from '@/lib/store';
import TaskForm from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { SubTask } from '@/lib/types';

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    tasks, 
    deleteTask,
    addSubTask,
    toggleSubTask,
    deleteSubTask
  } = useStore();
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newSubTask, setNewSubTask] = useState('');
  
  // Find the current task by ID
  const task = tasks.find(t => t.id === id);
  
  // If task not found, redirect to the task list
  if (!task) {
    navigate('/todo-list');
    return null;
  }
  
  const handleDeleteTask = () => {
    deleteTask(task.id);
    setDeleteDialogOpen(false);
    navigate('/todo-list');
    toast({
      title: 'Task deleted',
      description: 'The task has been successfully deleted.',
    });
  };
  
  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      addSubTask(task.id, newSubTask);
      setNewSubTask('');
      toast({
        title: 'Subtask added',
        description: 'New subtask has been added to the task.',
      });
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };
  
  const getCategoryColor = () => {
    switch (task.category) {
      case 'academic': return 'category-academic';
      case 'personal': return 'category-personal';
      case 'organization': return 'category-organization';
      default: return '';
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <Link 
          to="/todo-list"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Tasks
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getCategoryColor()}>
                  {task.category}
                </Badge>
                <Badge className={getPriorityColor()}>
                  {task.priority} priority
                </Badge>
                {task.status === 'completed' && (
                  <Badge variant="outline" className="bg-success/10 text-success">
                    Completed
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold">{task.title}</h1>
            </div>
            
            <div className="flex space-x-2">
              <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm
                    existingTask={task}
                    onSuccess={() => setEditDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this task? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Due: {format(new Date(task.dueDate), 'PPP')}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <div className="text-muted-foreground whitespace-pre-wrap">
              {task.description || "No description provided."}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Subtasks</h2>
            
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Add a subtask..."
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubTask()}
              />
              <Button onClick={handleAddSubTask}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {task.subTasks.length > 0 ? (
              <div className="space-y-2">
                {task.subTasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full mr-2"
                        onClick={() => toggleSubTask(task.id, subtask.id)}
                      >
                        {subtask.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2" />
                        )}
                      </Button>
                      
                      <span className={subtask.completed ? "line-through text-muted-foreground" : ""}>
                        {subtask.title}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => deleteSubTask(task.id, subtask.id)}
                    >
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No subtasks yet</p>
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h2 className="text-lg font-medium mb-3">Attachments</h2>
            {task.attachments.length > 0 ? (
              <div className="space-y-2">
                {task.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <Paperclip className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{attachment.name}</span>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No attachments</p>
                <Button variant="outline" className="mt-2" disabled>
                  <Plus className="mr-2 h-4 w-4" /> Add Attachment
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full lg:w-64 space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="font-medium mb-3">Status</h2>
            <div className="flex flex-col space-y-2">
              <Button
                variant={task.status === 'pending' ? 'default' : 'outline'}
                size="sm"
                className="justify-start"
                disabled={task.status === 'pending'}
              >
                <Clock className="mr-2 h-4 w-4" /> Pending
              </Button>
              <Button
                variant={task.status === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                className="justify-start"
                disabled={task.status === 'in-progress'}
              >
                <Clock className="mr-2 h-4 w-4" /> In Progress
              </Button>
              <Button
                variant={task.status === 'completed' ? 'default' : 'outline'}
                size="sm"
                className="justify-start"
                disabled={task.status === 'completed'}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> Completed
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h2 className="font-medium mb-3">Tags</h2>
            {task.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No tags</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetail;
