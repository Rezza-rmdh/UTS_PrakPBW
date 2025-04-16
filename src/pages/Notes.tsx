
import React, { useState } from 'react';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Tag, Calendar, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // New note state
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('academic');
  const [newNoteTags, setNewNoteTags] = useState('');
  
  // Edit note state
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [editNoteCategory, setEditNoteCategory] = useState('');
  const [editNoteTags, setEditNoteTags] = useState('');
  
  // Delete note state
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);
  
  // Filter notes based on search and category
  const filteredNotes = notes.filter(note => {
    // Filter by search query
    if (
      searchQuery && 
      !note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !note.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== 'all' && note.category !== categoryFilter) {
      return false;
    }
    
    return true;
  });
  
  const handleAddNote = () => {
    if (newNoteTitle.trim() === '') {
      toast({
        title: 'Title is required',
        description: 'Please add a title for your note.',
        variant: 'destructive'
      });
      return;
    }
    
    const tags = newNoteTags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    addNote({
      title: newNoteTitle,
      content: newNoteContent,
      category: newNoteCategory as any,
      tags
    });
    
    // Reset form
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteCategory('academic');
    setNewNoteTags('');
    setIsAddingNote(false);
    
    toast({
      title: 'Note created',
      description: 'Your note has been created successfully.',
    });
  };
  
  const openEditDialog = (noteId: string) => {
    const note = notes.find(note => note.id === noteId);
    if (note) {
      setEditNoteTitle(note.title);
      setEditNoteContent(note.content);
      setEditNoteCategory(note.category);
      setEditNoteTags(note.tags.join(', '));
      setEditingNote(noteId);
    }
  };
  
  const handleEditNote = () => {
    if (editingNote) {
      if (editNoteTitle.trim() === '') {
        toast({
          title: 'Title is required',
          description: 'Please add a title for your note.',
          variant: 'destructive'
        });
        return;
      }
      
      const tags = editNoteTags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      updateNote(editingNote, {
        title: editNoteTitle,
        content: editNoteContent,
        category: editNoteCategory as any,
        tags
      });
      
      setEditingNote(null);
      
      toast({
        title: 'Note updated',
        description: 'Your note has been updated successfully.',
      });
    }
  };
  
  const handleDeleteNote = () => {
    if (deleteNoteId) {
      deleteNote(deleteNoteId);
      setDeleteNoteId(null);
      
      toast({
        title: 'Note deleted',
        description: 'Your note has been deleted successfully.',
      });
    }
  };
  
  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'academic': return 'category-academic';
      case 'personal': return 'category-personal';
      case 'organization': return 'category-organization';
      default: return '';
    }
  };
  
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-muted-foreground">
            Capture your ideas and important information
          </p>
        </div>
        
        <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" /> Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Textarea
                  placeholder="Content"
                  className="min-h-[200px]"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Select value={newNoteCategory} onValueChange={setNewNoteCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Input
                  placeholder="Tags (comma separated)"
                  value={newNoteTags}
                  onChange={(e) => setNewNoteTags(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingNote(false)}>Cancel</Button>
              <Button onClick={handleAddNote}>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="organization">Organization</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(note.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setDeleteNoteId(note.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <Badge className={getCategoryClass(note.category)}>
                  {note.category}
                </Badge>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-muted-foreground line-clamp-4 whitespace-pre-wrap">
                  {note.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between text-xs text-muted-foreground pt-3 border-t">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {format(new Date(note.updatedAt), 'MMM d, yyyy')}
                </div>
                {note.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="mr-1 h-3 w-3" />
                    {note.tags.slice(0, 2).join(', ')}
                    {note.tags.length > 2 && '...'}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <h3 className="text-lg font-medium mb-2">No notes found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first note to get started
          </p>
          <Button onClick={() => setIsAddingNote(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Note
          </Button>
        </div>
      )}
      
      {/* Edit Note Dialog */}
      <Dialog open={editingNote !== null} onOpenChange={(open) => !open && setEditingNote(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Title"
                value={editNoteTitle}
                onChange={(e) => setEditNoteTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Textarea
                placeholder="Content"
                className="min-h-[200px]"
                value={editNoteContent}
                onChange={(e) => setEditNoteContent(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Select value={editNoteCategory} onValueChange={setEditNoteCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Input
                placeholder="Tags (comma separated)"
                value={editNoteTags}
                onChange={(e) => setEditNoteTags(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingNote(null)}>Cancel</Button>
            <Button onClick={handleEditNote}>Update Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Note Dialog */}
      <Dialog open={deleteNoteId !== null} onOpenChange={(open) => !open && setDeleteNoteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteNoteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteNote}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Notes;
