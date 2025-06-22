
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type CompanionType = 'coach' | 'wizard' | 'cat' | 'robot' | 'teacher';

interface CompanionSettingsProps {
  selectedCompanion: CompanionType;
  onCompanionChange: (companion: CompanionType) => void;
}

const CompanionSettings: React.FC<CompanionSettingsProps> = ({
  selectedCompanion,
  onCompanionChange
}) => {
  const companions = [
    {
      type: 'coach' as CompanionType,
      emoji: '💪',
      name: 'Tough Coach',
      description: 'Motivational but stern, pushes you to be your best'
    },
    {
      type: 'wizard' as CompanionType,
      emoji: '🧙‍♂️',
      name: 'Grumpy Wizard',
      description: 'Mystical and wise, but easily annoyed by procrastination'
    },
    {
      type: 'cat' as CompanionType,
      emoji: '🐱',
      name: 'Sassy Cat',
      description: 'Judgmental and sarcastic, masters of guilt trips'
    },
    {
      type: 'robot' as CompanionType,
      emoji: '🤖',
      name: 'Ruthless Robot',
      description: 'Logical and efficient, no patience for excuses'
    },
    {
      type: 'teacher' as CompanionType,
      emoji: '👩‍🏫',
      name: 'Strict Teacher',
      description: 'Educational approach with disappointed parent energy'
    }
  ];

  return (
    <Card className="p-4 border-2 border-pixel-purple/30">
      <h3 className="text-lg font-bold text-pixel-light mb-4 text-center">
        Choose Your Accountability Companion
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {companions.map((companion) => (
          <Button
            key={companion.type}
            variant={selectedCompanion === companion.type ? "default" : "outline"}
            className={`h-auto p-3 justify-start ${
              selectedCompanion === companion.type 
                ? 'bg-pixel-purple border-pixel-purple' 
                : 'hover:bg-pixel-purple/10 border-pixel-purple/30'
            }`}
            onClick={() => onCompanionChange(companion.type)}
          >
            <div className="flex items-center space-x-3 w-full">
              <span className="text-2xl">{companion.emoji}</span>
              <div className="text-left flex-1">
                <div className="font-bold text-sm">{companion.name}</div>
                <div className="text-xs opacity-80 mt-1">{companion.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default CompanionSettings;
