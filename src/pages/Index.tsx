import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GameStats from '@/components/GameStats';
import QuestCard from '@/components/QuestCard';
import AchievementBadge from '@/components/AchievementBadge';
import AddQuestModal from '@/components/AddQuestModal';
import LifeStats from '@/components/LifeStats';
import PetCompanion from '@/components/PetCompanion';
import MoodJournal from '@/components/MoodJournal';
import StreakTracker from '@/components/StreakTracker';
import { Badge } from '@/components/ui/badge';
import AccountabilityCompanion from '@/components/AccountabilityCompanion';
import CompanionSettings from '@/components/CompanionSettings';

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

interface LifeStatsState {
  mind: number;
  body: number;
  spirit: number;
}

interface PetState {
  happiness: number;
  level: number;
  lastFed?: Date;
}

interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate?: Date;
}

type CompanionType = 'coach' | 'wizard' | 'cat' | 'robot' | 'teacher';

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

  const [lifeStats, setLifeStats] = useState<LifeStatsState>({
    mind: 45,
    body: 60,
    spirit: 35
  });

  const [petState, setPetState] = useState<PetState>({
    happiness: 75,
    level: 3,
    lastFed: new Date()
  });

  const [streakState, setStreakState] = useState<StreakState>({
    currentStreak: 5,
    longestStreak: 12,
    lastCompletionDate: new Date()
  });

  const [questsCompletedToday, setQuestsCompletedToday] = useState(2);
  const [suggestedQuests, setSuggestedQuests] = useState<string[]>([]);
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionType>('coach');
  const [showCompanion, setShowCompanion] = useState(false);

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

  const getLifeStatForCategory = (category: string) => {
    const categoryMap: { [key: string]: keyof LifeStatsState } = {
      'Learning': 'mind',
      'Work': 'mind',
      'Health': 'body',
      'Personal': 'spirit',
      'Social': 'spirit'
    };
    return categoryMap[category] || 'spirit';
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

  const completeQuest = (questId: string, bonusXP: number = 0) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    // Update quest completion
    setQuests(prev => prev.map(q => 
      q.id === questId ? { ...q, completed: true } : q
    ));

    const totalXP = quest.xpReward + bonusXP;

    // Update game state with rewards
    setGameState(prev => {
      const newXp = prev.xp + totalXP;
      const newGold = prev.gold + quest.goldReward;
      let newLevel = prev.level;
      let xpToNext = prev.xpToNext;

      if (newXp >= prev.xpToNext) {
        newLevel += 1;
        xpToNext = newLevel * 100;
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

    // Update life stats based on quest category
    const statToIncrease = getLifeStatForCategory(quest.category);
    setLifeStats(prev => ({
      ...prev,
      [statToIncrease]: Math.min(100, prev[statToIncrease] + (quest.difficulty === 'hard' ? 5 : quest.difficulty === 'medium' ? 3 : 2))
    }));

    // Update pet happiness
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      lastFed: new Date()
    }));

    // Update streak
    const today = new Date();
    setStreakState(prev => {
      const newStreak = prev.lastCompletionDate?.toDateString() === today.toDateString() 
        ? prev.currentStreak 
        : prev.currentStreak + 1;
      
      return {
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastCompletionDate: today
      };
    });

    setQuestsCompletedToday(prev => prev + 1);
    checkAchievements(quest);
  };

  const handleMoodSelect = (mood: string, suggestions: string[]) => {
    setSuggestedQuests(suggestions);
    console.log(`Mood selected: ${mood}`, suggestions);
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

  // Check for overdue quests and show companion
  useEffect(() => {
    const overdueQuests = activeQuests.filter(quest => {
      // Consider a quest overdue if it's been active for more than 24 hours
      // This is a simple implementation - you could make it more sophisticated
      return !quest.completed;
    });

    if (overdueQuests.length > 0) {
      setShowCompanion(true);
    }
  }, [activeQuests]);

  const handleCompanionDismiss = () => {
    setShowCompanion(false);
    // Hide companion for 1 hour
    setTimeout(() => {
      const stillOverdue = activeQuests.filter(q => !q.completed).length;
      if (stillOverdue > 0) {
        setShowCompanion(true);
      }
    }, 3600000); // 1 hour
  };

  const overdueQuestCount = activeQuests.length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-pixel-light mb-2">QUEST LIFE</h1>
          <p className="text-pixel-gold">Level up your life, one quest at a time</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameStats {...gameState} />
          </div>
          <div>
            <StreakTracker {...streakState} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LifeStats {...lifeStats} />
          <PetCompanion 
            {...petState} 
            questsCompletedToday={questsCompletedToday}
          />
        </div>

        <MoodJournal onMoodSelect={handleMoodSelect} />

        <CompanionSettings 
          selectedCompanion={selectedCompanion}
          onCompanionChange={setSelectedCompanion}
        />

        {suggestedQuests.length > 0 && (
          <div className="bg-card rounded-lg p-4 border-2 border-pixel-green/30">
            <h3 className="text-lg font-bold text-pixel-light mb-3">Suggested Quests for Your Mood</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedQuests.map((suggestion, index) => (
                <Badge key={index} className="bg-pixel-green/20 text-pixel-green border-pixel-green">
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}

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

        {/* Accountability Companion */}
        {showCompanion && overdueQuestCount > 0 && (
          <AccountabilityCompanion
            overdueTasks={overdueQuestCount}
            userName="Champion"
            onDismiss={handleCompanionDismiss}
            companionType={selectedCompanion}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
