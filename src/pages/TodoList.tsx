import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import PageLayout from '@/components/PageLayout';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Filter, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const TodoList = () => {
  const { tasks, deleteTask } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleDeleteTask = (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus tugas "${title}"?`)) {
      deleteTask(id);
      toast({
        title: "Tugas berhasil dihapus",
        description: `Tugas "${title}" telah dihapus dari daftarmu.`,
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'pending' && task.status === 'completed') return false;
    if (activeTab === 'completed' && task.status !== 'completed') return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <PageLayout requiresAuth={true}>
      <div className="relative p-4 md:p-8 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-200 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-5xl font-black text-purple-700 mb-2 drop-shadow-sm">Tugas Saya</h1>
            <p className="text-muted-foreground text-base italic">Catat dan selesaikan tugasmu sebagai mahasiswa produktif!</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg px-6 py-2 rounded-xl">
                <Plus className="mr-2 h-4 w-4" /> Tambah Tugas
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Buat Tugas Baru</DialogTitle>
              </DialogHeader>
              <TaskForm onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari tugas..."
              className="pl-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full border-purple-300" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Filter kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="academic">Akademik</SelectItem>
                  <SelectItem value="personal">Pribadi</SelectItem>
                  <SelectItem value="organization">Organisasi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Filter prioritas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Semua Prioritas</SelectItem>
                  <SelectItem value="low">Rendah</SelectItem>
                  <SelectItem value="medium">Sedang</SelectItem>
                  <SelectItem value="high">Tinggi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
          <TabsList className="mb-6 bg-purple-100 p-1 rounded-full shadow-inner">
            <TabsTrigger value="all" className="rounded-full px-6 py-1">Semua</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-full px-6 py-1">Belum Selesai</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-full px-6 py-1">Selesai</TabsTrigger>
          </TabsList>

          {["all", "pending", "completed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="grid md:grid-cols-2 gap-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <div
                    key={task.id}
                    className={`bg-white hover:shadow-lg hover:scale-[1.01] transition-all duration-200 ease-in-out p-4 rounded-xl border-l-4 shadow-sm ${
                      tab === 'completed' ? 'border-green-500' : tab === 'pending' ? 'border-yellow-500' : 'border-purple-500'
                    }`}
                  >
                    <TaskCard task={task} onDelete={() => handleDeleteTask(task.id, task.title)} />
                  </div>
                ))
              ) : (
                <div className="py-10 text-center col-span-2">
                  <h3 className="text-lg font-medium mb-2">{tab === 'all' ? 'Tidak ada tugas' : tab === 'completed' ? 'Tidak ada tugas yang selesai' : 'Tidak ada tugas yang belum selesai'}</h3>
                  <p className="text-muted-foreground mb-4">Coba ubah pencarian atau filtermu</p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Tugas
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TodoList;
