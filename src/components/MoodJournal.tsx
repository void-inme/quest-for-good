
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MoodJournalProps {
  onMoodSelect: (mood: string, suggestions: string[]) => void;
}

const MoodJournal: React.FC<MoodJournalProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { 
      emoji: '😊', 
      name: 'Energetic', 
      suggestions: ['Complete 3 challenging quests', 'Try a new skill', 'Organize your workspace']
    },
    { 
      emoji: '😌', 
      name: 'Calm', 
      suggestions: ['Read for 30 minutes', 'Practice meditation', 'Write in a journal']
    },
    { 
      emoji: '😤', 
      name: 'Motivated', 
      suggestions: ['Tackle your biggest task', 'Set new goals', 'Clean and organize']
    },
    { 
      emoji: '😔', 
      name: 'Down', 
      suggestions: ['Do something creative', 'Take a walk outside', 'Call a friend']
    },
    { 
      emoji: '😰', 
      name: 'Stressed', 
      suggestions: ['Break tasks into smaller steps', 'Take deep breaths', 'Listen to music']
    },
    { 
      emoji: '🤔', 
      name: 'Neutral', 
      suggestions: ['Review your goals', 'Plan tomorrow', 'Learn something new']
    }
  ];

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.name);
    onMoodSelect(mood.name, mood.suggestions);
  };

  return (
    <Card className="p-4 border-2 border-pixel-purple/30">
      <h3 className="text-lg font-bold text-pixel-light mb-4 text-center">
        How are you feeling today?
      </h3>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {moods.map((mood) => (
          <Button
            key={mood.name}
            variant="ghost"
            className={`h-16 flex flex-col space-y-1 ${
              selectedMood === mood.name 
                ? 'bg-pixel-purple/20 border-pixel-purple' 
                : 'hover:bg-pixel-blue/10'
            }`}
            onClick={() => handleMoodSelect(mood)}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs">{mood.name}</span>
          </Button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="text-center">
          <p className="text-sm text-pixel-gold">
            Perfect! I've suggested some quests that match your {selectedMood.toLowerCase()} mood.
          </p>
        </div>
      )}
    </Card>
  );
};

export default MoodJournal;
