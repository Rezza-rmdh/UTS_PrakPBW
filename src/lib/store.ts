
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Task, Note, CalendarEvent, TaskPriority, TaskCategory, TaskStatus } from './types';
import { v4 as uuidv4 } from 'uuid';

interface State {
  user: User;
  tasks: Task[];
  notes: Note[];
  events: CalendarEvent[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  addSubTask: (taskId: string, title: string) => void;
  toggleSubTask: (taskId: string, subTaskId: string) => void;
  deleteSubTask: (taskId: string, subTaskId: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  updateUser: (user: Partial<User>) => void;
  toggleTheme: () => void;
}

// Generate sample data
const currentDate = new Date().toISOString();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

const sampleTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Complete Programming Assignment',
    description: 'Finish the Java programming assignment for CS101',
    dueDate: tomorrow.toISOString(),
    priority: 'high',
    category: 'academic',
    status: 'pending',
    subTasks: [
      { id: uuidv4(), title: 'Task 1: Write functions', completed: true },
      { id: uuidv4(), title: 'Task 2: Test code', completed: false },
      { id: uuidv4(), title: 'Task 3: Submit to portal', completed: false }
    ],
    attachments: [],
    tags: ['CS101', 'java', 'programming']
  },
  {
    id: uuidv4(),
    title: 'Weekly Meeting with Study Group',
    description: 'Meet with the study group to discuss project progress',
    dueDate: currentDate,
    priority: 'medium',
    category: 'organization',
    status: 'in-progress',
    subTasks: [],
    attachments: [],
    tags: ['meeting', 'project']
  },
  {
    id: uuidv4(),
    title: 'Read Chapter 5 of Textbook',
    description: 'Read and take notes on Chapter 5 for Psychology class',
    dueDate: nextWeek.toISOString(),
    priority: 'low',
    category: 'academic',
    status: 'pending',
    subTasks: [],
    attachments: [],
    tags: ['psychology', 'reading']
  }
];

const sampleNotes: Note[] = [
  {
    id: uuidv4(),
    title: 'Psychology Lecture Notes',
    content: 'Today we covered cognitive development theories...',
    createdAt: currentDate,
    updatedAt: currentDate,
    category: 'academic',
    tags: ['psychology', 'lecture']
  },
  {
    id: uuidv4(),
    title: 'Project Ideas',
    content: 'Potential topics for the final project: 1. Data visualization for campus services...',
    createdAt: currentDate,
    updatedAt: currentDate,
    category: 'academic',
    tags: ['project', 'ideas']
  }
];

export const useStore = create<State>()(
  persist(
    (set) => ({
      user: {
        id: '1',
        name: 'Student User',
        email: 'student@example.com',
        theme: 'light'
      },
      tasks: sampleTasks,
      notes: sampleNotes,
      events: [],
      
      addTask: (task) => 
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: uuidv4() }]
        })),
        
      updateTask: (id, task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => 
            t.id === id ? { ...t, ...task } : t
          ),
        })),
        
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
        
      completeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => 
            t.id === id ? { ...t, status: 'completed' as TaskStatus } : t
          ),
        })),
        
      addSubTask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((t) => 
            t.id === taskId 
              ? { 
                  ...t, 
                  subTasks: [...t.subTasks, { id: uuidv4(), title, completed: false }] 
                } 
              : t
          ),
        })),
        
      toggleSubTask: (taskId, subTaskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) => 
            t.id === taskId
              ? { 
                  ...t, 
                  subTasks: t.subTasks.map((st) =>
                    st.id === subTaskId
                      ? { ...st, completed: !st.completed }
                      : st
                  ) 
                } 
              : t
          ),
        })),
        
      deleteSubTask: (taskId, subTaskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) => 
            t.id === taskId
              ? { 
                  ...t, 
                  subTasks: t.subTasks.filter((st) => st.id !== subTaskId) 
                } 
              : t
          ),
        })),
        
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes, 
            { 
              ...note, 
              id: uuidv4(), 
              createdAt: new Date().toISOString(), 
              updatedAt: new Date().toISOString() 
            }
          ]
        })),
        
      updateNote: (id, note) =>
        set((state) => ({
          notes: state.notes.map((n) => 
            n.id === id 
              ? { 
                  ...n, 
                  ...note, 
                  updatedAt: new Date().toISOString() 
                } 
              : n
          ),
        })),
        
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
        
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: uuidv4() }]
        })),
        
      updateEvent: (id, event) =>
        set((state) => ({
          events: state.events.map((e) => 
            e.id === id ? { ...e, ...event } : e
          ),
        })),
        
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),
        
      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData }
        })),
        
      toggleTheme: () =>
        set((state) => ({
          user: { 
            ...state.user, 
            theme: state.user.theme === 'light' ? 'dark' : 'light' 
          }
        })),
    }),
    {
      name: 'kampus-task-master',
    }
  )
);
