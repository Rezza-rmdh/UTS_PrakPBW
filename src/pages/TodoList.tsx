import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/pageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoAPI
} from '@/services/API';

type Todo = {
  _id: string;
  text: string;
  onCheckList: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token;


  const fetchTodos = async () => {
    try {
      const result = await getTodos(token);
      setTodos(result.data ?? []);
    } catch (error) {
      toast({ title: 'Gagal memuat tugas' });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleAddOrEdit = async () => {
    if (!input.trim()) return;

    if (editingId) {
      try {
        const todo = todos.find(t => t._id === editingId);
        if (!todo) return;

        await updateTodo(token, editingId, input); // update text
        const updated = await getTodos(token);
        setTodos(updated.data);
        toast({ title: 'Tugas diperbarui' });
        setEditingId(null);
        setInput('');
      } catch (err) {
        toast({ title: 'Gagal memperbarui tugas' });
      }
    } else {
      try {
        await createTodo(token, input);
        const updated = await getTodos(token);
        setTodos(updated.data);
        toast({ title: 'Tugas ditambahkan' });
        setInput('');
      } catch (err) {
        toast({ title: 'Gagal menambahkan tugas' });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodoAPI(token, id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      toast({ title: 'Tugas dihapus' });
    } catch {
      toast({ title: 'Gagal menghapus tugas' });
    }
  };

  const handleEdit = (todo: Todo) => {
    setInput(todo.text);
    setEditingId(todo._id);
  };

  const toggleCheck = async (id: string) => {
    const todo = todos.find(t => t._id === id);
    if (!todo) return;
    try {
      await updateTodo(token, id, todo.text); // API update hanya menerima text
      // Status checklist disimpan lokal
      setTodos(prev =>
        prev.map(t =>
          t._id === id ? { ...t, onCheckList: !t.onCheckList } : t
        )
      );
    } catch {
      toast({ title: 'Gagal mengubah status tugas' });
    }
  };

  return (
    <PageLayout requiresAuth={true}>
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-200 shadow-xl">
        <div className="mb-6">
          <h1 className="text-5xl font-black text-purple-700 mb-2 drop-shadow-sm">Tugas Saya</h1>
          <p className="text-muted-foreground text-base italic">
            Tambah, edit, dan kelola tugasmu dengan mudah!
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddOrEdit();
              }
            }}
            placeholder="Tulis tugas..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 shadow-sm"
          />
          <Button
            onClick={handleAddOrEdit}
            className="rounded-full bg-purple-600 text-white hover:bg-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            {editingId ? 'Update' : 'Tambah'}
          </Button>
        </div>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${todo.onCheckList ? 'bg-green-100 border-green-300' : 'bg-white'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg ${todo.onCheckList}`}>
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(todo._id)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default TodoList;
