
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'trophy': return <Trophy className="w-6 h-6" />;
      case 'medal': return <Medal className="w-6 h-6" />;
      case 'crown': return <Crown className="w-6 h-6" />;
      default: return <Trophy className="w-6 h-6" />;
    }
  };

  return (
    <div className={`
      flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300
      ${achievement.unlocked 
        ? 'bg-pixel-gold/10 border-pixel-gold text-pixel-gold animate-pixel-glow' 
        : 'bg-muted/20 border-muted text-muted-foreground opacity-50'
      }
    `}>
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center
        ${achievement.unlocked 
          ? 'bg-pixel-gold/20 text-pixel-gold' 
          : 'bg-muted/30 text-muted-foreground'
        }
      `}>
        {getIcon(achievement.icon)}
      </div>
      
      <div className="flex-1">
        <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
        <p className="text-xs opacity-80">{achievement.description}</p>
        {achievement.unlocked && achievement.unlockedAt && (
          <p className="text-xs text-pixel-green mt-1">
            Unlocked {achievement.unlockedAt.toLocaleDateString()}
          </p>
        )}
      </div>

      {achievement.unlocked && (
        <Badge className="bg-pixel-green/20 text-pixel-green border-pixel-green">
          ✓ Unlocked
        </Badge>
      )}
    </div>
  );
};

export default AchievementBadge;
