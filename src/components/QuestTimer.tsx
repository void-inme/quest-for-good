
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Clock } from 'lucide-react';

interface QuestTimerProps {
  questId: string;
  estimatedMinutes?: number;
  onComplete: (questId: string, bonusXP: number) => void;
  disabled?: boolean;
}

const QuestTimer: React.FC<QuestTimerProps> = ({ 
  questId, 
  estimatedMinutes = 25, 
  onComplete,
  disabled = false 
}) => {
  const [timeLeft, setTimeLeft] = useState(estimatedMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setIsRunning(false);
    
    // Calculate bonus XP based on time remaining
    const bonusXP = timeLeft > 0 ? Math.floor((timeLeft / (estimatedMinutes * 60)) * 10) : 0;
    onComplete(questId, bonusXP);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(estimatedMinutes * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  return (
    <div className="flex items-center space-x-2 bg-pixel-dark/20 rounded-lg p-2">
      <Clock className="w-4 h-4 text-pixel-gold" />
      <span className={`text-sm font-mono ${timeLeft < 300 ? 'text-pixel-red' : 'text-pixel-gold'}`}>
        {formatTime(timeLeft)}
      </span>
      
      <div className="flex space-x-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleTimer}
          disabled={disabled || isCompleted}
          className="h-6 w-6 p-0"
        >
          {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={resetTimer}
          disabled={disabled}
          className="h-6 w-6 p-0"
        >
          <Square className="w-3 h-3" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleComplete}
          disabled={disabled || isCompleted}
          className="h-6 w-6 p-0 text-pixel-green"
        >
          ✓
        </Button>
      </div>
      
      {timeLeft === 0 && !isCompleted && (
        <span className="text-xs text-pixel-green animate-pulse">Time's up! Complete for bonus XP!</span>
      )}
    </div>
  );
};

export default QuestTimer;
