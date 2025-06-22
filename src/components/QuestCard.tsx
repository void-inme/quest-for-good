
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Clock } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  goldReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  category: string;
}

interface QuestCardProps {
  quest: Quest;
  onComplete: (questId: string) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-pixel-green border-pixel-green bg-pixel-green/10';
      case 'medium': return 'text-pixel-gold border-pixel-gold bg-pixel-gold/10';
      case 'hard': return 'text-pixel-red border-pixel-red bg-pixel-red/10';
      default: return 'text-pixel-blue border-pixel-blue bg-pixel-blue/10';
    }
  };

  const handleComplete = () => {
    if (quest.completed) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onComplete(quest.id);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className={`quest-card ${isAnimating ? 'animate-quest-complete' : ''} ${quest.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`font-bold text-pixel-light mb-2 ${quest.completed ? 'line-through' : ''}`}>
            {quest.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{quest.description}</p>
          
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={getDifficultyColor(quest.difficulty)}>
              {quest.difficulty.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-pixel-purple border-pixel-purple">
              {quest.category}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-pixel-gold" />
            <span className="text-pixel-gold">{quest.xpReward} XP</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-pixel-gold">💰</span>
            <span className="text-pixel-gold">{quest.goldReward}</span>
          </div>
        </div>

        <Button
          onClick={handleComplete}
          disabled={quest.completed}
          variant={quest.completed ? "secondary" : "default"}
          size="sm"
          className={`${quest.completed 
            ? 'bg-pixel-green text-pixel-dark' 
            : 'bg-pixel-blue hover:bg-pixel-blue/80'
          } transition-all duration-300`}
        >
          {quest.completed ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Complete
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 mr-1" />
              Do Quest
            </>
          )}
        </Button>
      </div>

      {isAnimating && (
        <div className="absolute top-2 right-2 animate-xp-gain text-pixel-gold font-bold">
          +{quest.xpReward} XP
        </div>
      )}
    </div>
  );
};

export default QuestCard;
