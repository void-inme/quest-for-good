
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface GameStatsProps {
  level: number;
  xp: number;
  xpToNext: number;
  gold: number;
  totalQuests: number;
  completedQuests: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  level,
  xp,
  xpToNext,
  gold,
  totalQuests,
  completedQuests
}) => {
  const xpPercentage = (xp / xpToNext) * 100;

  return (
    <div className="bg-card rounded-lg p-6 border-2 border-pixel-blue/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pixel-blue to-pixel-purple rounded-lg flex items-center justify-center animate-pixel-glow">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl text-pixel-light">HERO</h2>
            <p className="text-pixel-gold text-sm">Level {level}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-pixel-gold">💰</span>
            <span className="text-pixel-gold">{gold} GOLD</span>
          </div>
          <Badge variant="secondary" className="bg-pixel-green/20 text-pixel-green border-pixel-green">
            {completedQuests}/{totalQuests} Quests
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-pixel-light">Experience Points</span>
          <span className="text-pixel-gold">{xp} / {xpToNext} XP</span>
        </div>
        <div className="xp-bar h-4">
          <div 
            className="xp-fill"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameStats;
