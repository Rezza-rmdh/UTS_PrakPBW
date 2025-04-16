
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'academic' | 'personal' | 'organization';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  priority: TaskPriority;
  category: TaskCategory;
  status: TaskStatus;
  subTasks: SubTask[];
  attachments: Attachment[];
  tags: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  category: TaskCategory;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  theme: 'light' | 'dark';
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string; // ISO date string
  allDay: boolean;
  taskId?: string;
}
