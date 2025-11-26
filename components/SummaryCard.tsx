import React from 'react';
import { ActivityType } from '../types';
import { ACTIVITY_CONFIG } from '../constants';
import { Plus, Edit2 } from 'lucide-react';

interface SummaryCardProps {
  type: ActivityType;
  value: number;
  goal?: number;
  onQuickAdd: () => void;
  onEditGoal?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ type, value, goal, onQuickAdd, onEditGoal }) => {
  const config = ACTIVITY_CONFIG[type];
  const Icon = config.icon;

  // Calculate progress percentage if goal is set
  const progress = goal ? Math.min(100, Math.max(0, (value / goal) * 100)) : 0;
  const isGoalMet = goal && value >= goal;

  return (
    <div className={`relative group overflow-hidden rounded-3xl p-6 glass-panel glass-card transition-all duration-500 hover:-translate-y-1`}>
      {/* Dynamic Background Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-20 blur-[50px] transition-opacity duration-700 group-hover:opacity-40 rounded-full ${config.bgColor}`} />

      {/* Background Icon Decoration */}
      <div className={`absolute top-[-10%] right-[-10%] p-3 opacity-[0.05] ${config.color} transition-transform duration-700 ease-out group-hover:scale-125 group-hover:rotate-12`}>
        <Icon size={120} />
      </div>

      {/* Edit Goal Button */}
      {onEditGoal && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEditGoal();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 scale-90 hover:scale-100 z-20 backdrop-blur-md"
          title="Edit Goal"
        >
          <Edit2 size={16} />
        </button>
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-3 rounded-2xl ${config.bgLight} ${config.color} ring-1 ring-inset ${config.borderColor} shadow-lg shadow-black/20`}>
            <Icon size={22} />
          </div>
          <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest">{config.label}</h3>
        </div>

        <div className="flex flex-col my-2">
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-4xl font-black tracking-tight ${isGoalMet ? config.color : 'text-slate-100'}`}>
              {value.toLocaleString()}
            </span>
            <span className="text-sm text-slate-500 font-semibold">
              {goal ? `/ ${goal}` : ''} {config.unit}
            </span>
          </div>
          
          {/* Progress Bar */}
          {goal !== undefined && (
            <div className="w-full h-1.5 bg-slate-800/50 rounded-full mt-4 overflow-hidden backdrop-blur-sm">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${config.bgColor} ${isGoalMet ? 'shadow-[0_0_15px_currentColor]' : ''}`} 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd();
          }}
          className={`mt-4 flex items-center justify-center w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700/80 hover:text-white hover:border-slate-600 transition-all active:scale-95 group-hover:translate-y-0 translate-y-2 opacity-80 group-hover:opacity-100`}
        >
          <Plus size={14} className="mr-2" />
          Log Entry
        </button>
      </div>
    </div>
  );
};