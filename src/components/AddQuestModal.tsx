
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface AddQuestModalProps {
  onAddQuest: (quest: {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
  }) => void;
}

const AddQuestModal: React.FC<AddQuestModalProps> = ({ onAddQuest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    category: 'Personal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAddQuest(formData);
    setFormData({
      title: '',
      description: '',
      difficulty: 'easy',
      category: 'Personal'
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pixel-blue hover:bg-pixel-blue/80 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Quest
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-2 border-pixel-blue/30">
        <DialogHeader>
          <DialogTitle className="text-pixel-light">Create New Quest</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-pixel-light mb-2">Quest Name</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Complete morning workout..."
              className="bg-background border-pixel-blue/30"
            />
          </div>

          <div>
            <label className="block text-sm text-pixel-light mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="30 minutes of cardio and strength training"
              className="bg-background border-pixel-blue/30 resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-pixel-light mb-2">Difficulty</label>
              <Select value={formData.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                setFormData(prev => ({ ...prev, difficulty: value }))
              }>
                <SelectTrigger className="bg-background border-pixel-blue/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (10 XP)</SelectItem>
                  <SelectItem value="medium">Medium (25 XP)</SelectItem>
                  <SelectItem value="hard">Hard (50 XP)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-pixel-light mb-2">Category</label>
              <Select value={formData.category} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, category: value }))
              }>
                <SelectTrigger className="bg-background border-pixel-blue/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Learning">Learning</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1 border-pixel-blue/30"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-pixel-blue hover:bg-pixel-blue/80"
            >
              Create Quest
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestModal;
