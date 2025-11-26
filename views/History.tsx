import React, { useState, useEffect, useCallback } from 'react';
import { getHistoryLast7Days } from '../services/storageService';
import { Activity, ActivityType } from '../types';
import { ACTIVITY_CONFIG } from '../constants';
import { RefreshCw, Filter, Calendar } from 'lucide-react';

interface HistoryProps {
  lastUpdated: number;
}

export const HistoryView: React.FC<HistoryProps> = ({ lastUpdated }) => {
  const [history, setHistory] = useState<Record<string, Activity[]>>({});
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | ActivityType>('ALL');

  const loadData = useCallback(() => {
    const data = getHistoryLast7Days();
    setHistory(data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, lastUpdated]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 800);
  };

  const getFilteredData = () => {
    if (activeFilter === 'ALL') return history;
    const filtered: Record<string, Activity[]> = {};
    Object.keys(history).forEach(date => {
      const activities = history[date].filter(a => a.type === activeFilter);
      if (activities.length > 0) {
        filtered[date] = activities;
      }
    });
    return filtered;
  };

  const filteredHistory = getFilteredData();
  const dates = Object.keys(filteredHistory).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const filters = [
    { label: 'All', value: 'ALL' },
    { label: 'Water', value: ActivityType.WATER },
    { label: 'Steps', value: ActivityType.STEPS },
    { label: 'Sleep', value: ActivityType.SLEEP },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <div className="glass-header sticky top-0 z-20">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">History</h1>
          <button 
            onClick={handleRefresh} 
            className={`p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-all ${refreshing ? 'animate-spin text-blue-400' : ''}`}
          >
            <RefreshCw size={20} />
          </button>
        </div>
        
        {/* Filter Chips */}
        <div className="px-6 pb-4 flex space-x-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => {
            const isActive = activeFilter === f.value;
            const config = f.value !== 'ALL' ? ACTIVITY_CONFIG[f.value as ActivityType] : null;
            
            let activeClass = 'bg-slate-800 text-white shadow-lg shadow-black/20 border-slate-600';
            if (isActive && config) {
               if (f.value === ActivityType.WATER) activeClass = 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500';
               if (f.value === ActivityType.STEPS) activeClass = 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border-emerald-500';
               if (f.value === ActivityType.SLEEP) activeClass = 'bg-violet-600 text-white shadow-lg shadow-violet-900/40 border-violet-500';
            } else if (isActive) {
               activeClass = 'bg-slate-700 text-white border-slate-600';
            }

            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value as 'ALL' | ActivityType)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  isActive 
                    ? activeClass
                    : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-28 no-scrollbar">
        {dates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4">
              <Filter size={24} className="text-slate-600" />
            </div>
            <p className="font-medium">No activities found.</p>
            {activeFilter !== 'ALL' && (
              <p className="text-xs mt-2 text-slate-600">Try selecting a different filter.</p>
            )}
          </div>
        ) : (
          dates.map((date) => (
            <div key={date} className="mb-6 animate-fade-in">
              <div className="flex items-center mb-3 ml-2">
                 <Calendar size={12} className="text-slate-500 mr-2" />
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{date}</h3>
              </div>
              <div className="space-y-3">
                {filteredHistory[date].sort((a,b) => b.id.localeCompare(a.id)).map((act) => {
                  const config = ACTIVITY_CONFIG[act.type];
                  const Icon = config.icon;
                  
                  return (
                    <div key={act.id} className="group relative overflow-hidden bg-slate-900/40 backdrop-blur-sm p-4 rounded-2xl border border-slate-800 flex items-center justify-between transition-all hover:border-slate-700 hover:bg-slate-900">
                      
                      {/* Left color bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bgColor}`}></div>

                      <div className="flex items-center space-x-4 pl-2">
                        <div className={`p-2.5 rounded-xl ${config.bgLight} ${config.color} ring-1 ring-inset ring-white/5`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-200 text-sm">{config.label}</p>
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
                            {new Date(act.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-lg ${config.color}`}>
                          {act.value} <span className="text-xs font-bold text-slate-500">{config.unit}</span>
                        </p>
                        {act.notes && (
                           <p className="text-xs text-slate-500 max-w-[120px] truncate">{act.notes}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};