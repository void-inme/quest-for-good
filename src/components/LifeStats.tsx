
import React from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';

interface LifeStatsProps {
  mind: number;
  body: number;
  spirit: number;
  maxStat?: number;
}

const LifeStats: React.FC<LifeStatsProps> = ({ 
  mind, 
  body, 
  spirit, 
  maxStat = 100 
}) => {
  const stats = [
    { name: 'Mind', value: mind, icon: Brain, color: 'pixel-blue', gradient: 'from-pixel-blue to-purple-400' },
    { name: 'Body', value: body, icon: Heart, color: 'pixel-red', gradient: 'from-pixel-red to-red-400' },
    { name: 'Spirit', value: spirit, icon: Sparkles, color: 'pixel-purple', gradient: 'from-pixel-purple to-pink-400' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 border-2 border-pixel-blue/30">
      <h3 className="text-lg font-bold text-pixel-light mb-4 text-center">Life Stats</h3>
      
      <div className="space-y-3">
        {stats.map((stat) => {
          const percentage = (stat.value / maxStat) * 100;
          const Icon = stat.icon;
          
          return (
            <div key={stat.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 text-${stat.color}`} />
                  <span className="text-sm text-pixel-light">{stat.name}</span>
                </div>
                <span className="text-xs text-pixel-gold">{stat.value}/{maxStat}</span>
              </div>
              
              <div className="progress-bar h-3">
                <div 
                  className={`h-full transition-all duration-700 bg-gradient-to-r ${stat.gradient} rounded-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LifeStats;
