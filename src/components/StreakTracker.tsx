
import React from 'react';
import { Flame, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate?: Date;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ 
  currentStreak, 
  longestStreak,
  lastCompletionDate 
}) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isStreakActive = lastCompletionDate && 
    (lastCompletionDate.toDateString() === today.toDateString() ||
     lastCompletionDate.toDateString() === yesterday.toDateString());

  return (
    <div className="bg-card rounded-lg p-4 border-2 border-pixel-gold/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-pixel-light flex items-center space-x-2">
          <Flame className={`w-5 h-5 ${isStreakActive ? 'text-pixel-gold animate-pulse' : 'text-muted-foreground'}`} />
          <span>Quest Streak</span>
        </h3>
        <Calendar className="w-5 h-5 text-pixel-blue" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${isStreakActive ? 'text-pixel-gold' : 'text-muted-foreground'}`}>
            {currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
          {currentStreak > 0 && (
            <Badge className="mt-1 bg-pixel-gold/20 text-pixel-gold border-pixel-gold">
              🔥 On Fire!
            </Badge>
          )}
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-pixel-purple">
            {longestStreak}
          </div>
          <div className="text-sm text-muted-foreground">Personal Best</div>
          {longestStreak >= 7 && (
            <Badge className="mt-1 bg-pixel-purple/20 text-pixel-purple border-pixel-purple">
              🏆 Legend
            </Badge>
          )}
        </div>
      </div>
      
      {!isStreakActive && currentStreak > 0 && (
        <div className="mt-3 text-center">
          <p className="text-sm text-pixel-red">
            ⚠️ Complete a quest today to keep your streak alive!
          </p>
        </div>
      )}
    </div>
  );
};

export default StreakTracker;
