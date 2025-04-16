import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

type Todo = {
  id: string;
  text: string;
  onCheckList: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddOrEdit = () => {
    if (!input.trim()) return;

    if (editingId) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === editingId ? { ...todo, text: input } : todo
        )
      );
      toast({ title: 'Tugas diperbarui' });
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input,
        onCheckList: false,
      };
      setTodos(prev => [...prev, newTodo]);
      toast({ title: 'Tugas ditambahkan' });
    }

    setInput('');
  };

  const handleDelete = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast({ title: 'Tugas dihapus' });
  };

  const handleEdit = (todo: Todo) => {
    setInput(todo.text);
    setEditingId(todo.id);
  };

  const toggleCheck = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, onCheckList: !todo.onCheckList } : todo
      )
    );
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
            placeholder="Tulis tugas..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 shadow-sm"
          />
          <Button onClick={handleAddOrEdit} className="rounded-full bg-purple-600 text-white hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            {editingId ? 'Update' : 'Tambah'}
          </Button>
        </div>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${
                todo.onCheckList ? 'bg-green-100 border-green-300' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.onCheckList}
                  onChange={() => toggleCheck(todo.id)}
                  className="w-5 h-5 accent-purple-600"
                />
                <span className={`text-lg ${todo.onCheckList ? 'line-through text-gray-500' : ''}`}>
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
                  onClick={() => handleDelete(todo.id)}
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
