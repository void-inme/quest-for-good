
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Zap } from 'lucide-react';

interface QuestCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  quest: {
    title: string;
    xpReward: number;
    goldReward: number;
  };
  bonusXP?: number;
  streakBonus?: number;
}

const QuestCelebration: React.FC<QuestCelebrationProps> = ({
  isOpen,
  onClose,
  quest,
  bonusXP = 0,
  streakBonus = 0
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const compliments = [
    "You're on fire! 🔥",
    "That was legendary! ⚡",
    "Quest mastered! 🏆",
    "Absolutely crushing it! 💪",
    "Level up vibes! ✨",
    "Pure excellence! 🌟",
    "Champion mode activated! 👑",
    "Unstoppable force! 🚀"
  ];

  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
  const totalXP = quest.xpReward + bonusXP + streakBonus;

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              {['🎉', '⭐', '💫', '🔥', '💎'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="bg-card border-4 border-pixel-gold rounded-lg p-8 max-w-md mx-4 text-center animate-scale-in">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-pixel-gold mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-pixel-light mb-2">
            🎉 Great job, Hero!
          </h2>
          <p className="text-pixel-gold text-lg mb-2">{randomCompliment}</p>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold text-pixel-light mb-3">
            Quest Completed: "{quest.title}"
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-pixel-gold" />
                <span>Base XP</span>
              </div>
              <span className="text-pixel-gold font-bold">+{quest.xpReward}</span>
            </div>
            
            {bonusXP > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-pixel-blue" />
                  <span>Time Bonus</span>
                </div>
                <span className="text-pixel-blue font-bold">+{bonusXP}</span>
              </div>
            )}
            
            {streakBonus > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-pixel-purple" />
                  <span>Streak Bonus</span>
                </div>
                <span className="text-pixel-purple font-bold">+{streakBonus}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="text-pixel-gold">💰 Gold</span>
              <span className="text-pixel-gold font-bold">+{quest.goldReward}</span>
            </div>
            
            <div className="flex items-center justify-between border-t-2 border-pixel-gold pt-2">
              <span className="text-xl font-bold text-pixel-light">Total XP</span>
              <span className="text-xl text-pixel-gold font-bold">+{totalXP}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={onClose}
          className="bg-pixel-gold text-pixel-dark hover:bg-pixel-gold/80 font-bold"
        >
          Continue Quest! 🚀
        </Button>
      </div>
    </div>
  );
};

export default QuestCelebration;
