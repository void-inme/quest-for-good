
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GameStats from '@/components/GameStats';
import QuestCard from '@/components/QuestCard';
import AchievementBadge from '@/components/AchievementBadge';
import AddQuestModal from '@/components/AddQuestModal';
import { Badge } from '@/components/ui/badge';

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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface GameState {
  level: number;
  xp: number;
  xpToNext: number;
  gold: number;
  totalQuests: number;
  completedQuests: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    xp: 0,
    xpToNext: 100,
    gold: 0,
    totalQuests: 0,
    completedQuests: 0
  });

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Complete Morning Workout',
      description: 'Do 30 minutes of exercise to start the day right',
      xpReward: 25,
      goldReward: 10,
      difficulty: 'medium',
      completed: false,
      category: 'Health'
    },
    {
      id: '2',
      title: 'Read for 20 Minutes',
      description: 'Read a book or educational article',
      xpReward: 15,
      goldReward: 5,
      difficulty: 'easy',
      completed: false,
      category: 'Learning'
    },
    {
      id: '3',
      title: 'Complete Project Milestone',
      description: 'Finish the next major feature for your current project',
      xpReward: 50,
      goldReward: 25,
      difficulty: 'hard',
      completed: false,
      category: 'Work'
    },
    {
      id: '4',
      title: 'Drink 8 Glasses of Water',
      description: 'Stay hydrated throughout the day',
      xpReward: 10,
      goldReward: 3,
      difficulty: 'easy',
      completed: false,
      category: 'Health'
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first quest',
      icon: 'trophy',
      unlocked: false
    },
    {
      id: '2',
      title: 'Quest Master',
      description: 'Complete 10 quests',
      icon: 'medal',
      unlocked: false
    },
    {
      id: '3',
      title: 'Level Up!',
      description: 'Reach level 2',
      icon: 'crown',
      unlocked: false
    },
    {
      id: '4',
      title: 'Gold Collector',
      description: 'Earn 100 gold',
      icon: 'trophy',
      unlocked: false
    }
  ]);

  useEffect(() => {
    const totalQuests = quests.length;
    const completedQuests = quests.filter(q => q.completed).length;
    
    setGameState(prev => ({
      ...prev,
      totalQuests,
      completedQuests
    }));
  }, [quests]);

  const calculateRewards = (difficulty: string) => {
    const rewards = {
      easy: { xp: 10, gold: 3 },
      medium: { xp: 25, gold: 10 },
      hard: { xp: 50, gold: 25 }
    };
    return rewards[difficulty as keyof typeof rewards] || rewards.easy;
  };

  const addQuest = (questData: {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
  }) => {
    const rewards = calculateRewards(questData.difficulty);
    const newQuest: Quest = {
      id: Date.now().toString(),
      ...questData,
      xpReward: rewards.xp,
      goldReward: rewards.gold,
      completed: false
    };
    
    setQuests(prev => [...prev, newQuest]);
  };

  const completeQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    // Update quest completion
    setQuests(prev => prev.map(q => 
      q.id === questId ? { ...q, completed: true } : q
    ));

    // Update game state with rewards
    setGameState(prev => {
      const newXp = prev.xp + quest.xpReward;
      const newGold = prev.gold + quest.goldReward;
      let newLevel = prev.level;
      let xpToNext = prev.xpToNext;

      // Check for level up
      if (newXp >= prev.xpToNext) {
        newLevel += 1;
        xpToNext = newLevel * 100; // Increasing XP requirement per level
      }

      return {
        ...prev,
        xp: newXp >= prev.xpToNext ? newXp - prev.xpToNext : newXp,
        gold: newGold,
        level: newLevel,
        xpToNext,
        completedQuests: prev.completedQuests + 1
      };
    });

    // Check achievements
    checkAchievements(quest);
  };

  const checkAchievements = (completedQuest: Quest) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;
      const completedQuestsCount = quests.filter(q => q.completed).length + 1;

      switch (achievement.id) {
        case '1': // First Steps
          shouldUnlock = completedQuestsCount >= 1;
          break;
        case '2': // Quest Master
          shouldUnlock = completedQuestsCount >= 10;
          break;
        case '3': // Level Up
          shouldUnlock = gameState.level >= 2;
          break;
        case '4': // Gold Collector
          shouldUnlock = (gameState.gold + completedQuest.goldReward) >= 100;
          break;
      }

      if (shouldUnlock) {
        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
      }

      return achievement;
    }));
  };

  const activeQuests = quests.filter(q => !q.completed);
  const completedQuestsList = quests.filter(q => q.completed);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-pixel-light mb-2">QUEST LIFE</h1>
          <p className="text-pixel-gold">Level up your life, one quest at a time</p>
        </header>

        <GameStats {...gameState} />

        <Tabs defaultValue="quests" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="quests" className="data-[state=active]:bg-pixel-blue data-[state=active]:text-white">
              Active Quests
              {activeQuests.length > 0 && (
                <Badge className="ml-2 bg-pixel-green text-pixel-dark">
                  {activeQuests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-pixel-green data-[state=active]:text-pixel-dark">
              Completed
              {completedQuestsList.length > 0 && (
                <Badge className="ml-2 bg-pixel-gold text-pixel-dark">
                  {completedQuestsList.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-pixel-purple data-[state=active]:text-white">
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-pixel-light">Active Quests</h2>
              <AddQuestModal onAddQuest={addQuest} />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {activeQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={completeQuest}
                />
              ))}
              {activeQuests.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <h3 className="text-xl mb-2">No active quests</h3>
                  <p>Create your first quest to start your adventure!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <h2 className="text-2xl font-bold text-pixel-light">Completed Quests</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {completedQuestsList.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={completeQuest}
                />
              ))}
              {completedQuestsList.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <h3 className="text-xl mb-2">No completed quests yet</h3>
                  <p>Complete some quests to see them here!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <h2 className="text-2xl font-bold text-pixel-light">Achievements</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map(achievement => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
