
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type CompanionType = 'coach' | 'wizard' | 'cat' | 'robot' | 'teacher';

interface AccountabilityCompanionProps {
  overdueTasks: number;
  lastActiveDate?: Date;
  userName?: string;
  onDismiss: () => void;
  companionType: CompanionType;
}

const AccountabilityCompanion: React.FC<AccountabilityCompanionProps> = ({
  overdueTasks,
  lastActiveDate,
  userName = "Champion",
  onDismiss,
  companionType
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (overdueTasks > 0) {
      setIsVisible(true);
      setCurrentMessage(getRandomMessage());
    }
  }, [overdueTasks, companionType]);

  const companions = {
    coach: {
      emoji: '💪',
      name: 'Coach Rocky',
      style: 'Tough & Motivational'
    },
    wizard: {
      emoji: '🧙‍♂️',
      name: 'Grumpus the Wise',
      style: 'Mystical & Stern'
    },
    cat: {
      emoji: '🐱',
      name: 'Whiskers',
      style: 'Sassy & Judgmental'
    },
    robot: {
      emoji: '🤖',
      name: 'PROD-1',
      style: 'Logical & Ruthless'
    },
    teacher: {
      emoji: '👩‍🏫',
      name: 'Ms. Henderson',
      style: 'Educational & Firm'
    }
  };

  const getRandomMessage = () => {
    const messages = {
      coach: [
        `${userName}, drop and give me 20... completed quests! What's with all these overdue tasks?`,
        "No pain, no gain! But skipping quests? That's just pain with no gain!",
        "I've seen stronger commitment from a soggy pretzel! Get moving!",
        "You said you'd conquer today. Right now you're being conquered BY today!"
      ],
      wizard: [
        `${userName}, you dare ignore the ancient wisdom of... doing your tasks?`,
        "I foresee... many incomplete quests in your future. Unless you act NOW!",
        "By my beard! These overdue quests are casting a curse of procrastination!",
        "The crystal ball shows me someone who talks big but acts small. Ring any bells?"
      ],
      cat: [
        `${userName}, I've seen litter boxes with better organization than your quest list.`,
        "Meow. Seriously? I spend 16 hours a day napping and I'M more productive than you.",
        "If you were a mouse, you'd have starved by now with this work ethic.",
        "I'm judging you. Yes, with these exact eyes. Do your quests."
      ],
      robot: [
        `ERROR 404: ${userName}'s motivation not found. Please restart productivity.exe`,
        "CALCULATING... You are operating at 23% efficiency. This is suboptimal.",
        "ALERT: Procrastination levels critical. Immediate action required to prevent system failure.",
        "SCANNING... Multiple overdue tasks detected. Initiating shame protocol."
      ],
      teacher: [
        `${userName}, I'm disappointed but not surprised. Where's your homework... I mean, quests?`,
        "Class, today we're studying the consequences of poor time management. Exhibit A: You.",
        "I don't want to hear 'the dog ate my motivation.' Get those tasks done!",
        "Pop quiz: What happens when you ignore your responsibilities? You get a visit from me!"
      ]
    };

    const companionMessages = messages[companionType];
    return companionMessages[Math.floor(Math.random() * companionMessages.length)];
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  if (!isVisible) return null;

  const companion = companions[companionType];

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
      <Card className="max-w-sm p-4 bg-pixel-red/10 border-2 border-pixel-red shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="text-4xl animate-bounce">{companion.emoji}</div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-pixel-light text-sm">{companion.name}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 hover:bg-pixel-red/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="text-xs text-pixel-red mb-2 italic">{companion.style}</div>
            
            <div className="bg-card p-2 rounded border border-pixel-red/30 mb-3">
              <p className="text-sm text-pixel-light leading-relaxed">
                "{currentMessage}"
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-pixel-red">
                🚨 {overdueTasks} overdue quest{overdueTasks !== 1 ? 's' : ''}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentMessage(getRandomMessage())}
                className="h-6 text-xs border-pixel-red text-pixel-red hover:bg-pixel-red/10"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                More
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountabilityCompanion;
