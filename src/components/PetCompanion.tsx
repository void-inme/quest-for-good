
import React, { useState, useEffect } from 'react';

interface PetCompanionProps {
  happiness: number;
  level: number;
  lastFed?: Date;
  questsCompletedToday: number;
}

const PetCompanion: React.FC<PetCompanionProps> = ({ 
  happiness, 
  level, 
  lastFed,
  questsCompletedToday 
}) => {
  const [petState, setPetState] = useState<'happy' | 'neutral' | 'sad' | 'excited'>('neutral');
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    if (questsCompletedToday > 0) {
      setPetState('excited');
      setAnimation('animate-bounce');
      setTimeout(() => setAnimation(''), 1000);
    } else if (happiness >= 80) {
      setPetState('happy');
    } else if (happiness >= 50) {
      setPetState('neutral');
    } else {
      setPetState('sad');
    }
  }, [happiness, questsCompletedToday]);

  const getPetEmoji = () => {
    const pets = ['🐱', '🐶', '🐰', '🦊', '🐼'];
    return pets[level % pets.length];
  };

  const getPetMessage = () => {
    switch (petState) {
      case 'excited':
        return "Great job on that quest! I'm so proud! 🌟";
      case 'happy':
        return "You're doing amazing! Keep it up! ✨";
      case 'neutral':
        return "Ready for our next adventure? 💪";
      case 'sad':
        return "I believe in you... let's tackle a quest together? 🥺";
      default:
        return "Let's go on an adventure! 🚀";
    }
  };

  const getMoodColor = () => {
    switch (petState) {
      case 'excited': return 'text-pixel-gold';
      case 'happy': return 'text-pixel-green';
      case 'neutral': return 'text-pixel-blue';
      case 'sad': return 'text-pixel-red';
      default: return 'text-pixel-light';
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 border-2 border-pixel-purple/30">
      <div className="text-center">
        <div className={`text-6xl mb-2 ${animation}`}>
          {getPetEmoji()}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-pixel-light">
            Level {level} Companion
          </h3>
          
          <div className="progress-bar h-2 mb-2">
            <div 
              className="progress-fill"
              style={{ width: `${happiness}%` }}
            />
          </div>
          
          <p className={`text-sm ${getMoodColor()} italic`}>
            "{getPetMessage()}"
          </p>
          
          <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
            <span>Happiness: {happiness}%</span>
            <span>Quests today: {questsCompletedToday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCompanion;
