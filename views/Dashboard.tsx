import React, { useEffect, useState, useRef } from 'react';
import { ActivityType } from '../types';
import { getDailyStats, getWaterGoal, saveWaterGoal } from '../services/storageService';
import { getHealthInsight } from '../services/geminiService';
import { SummaryCard } from '../components/SummaryCard';
import { Sparkles, RefreshCw, X, Activity, LogOut } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from 'recharts';

interface DashboardProps {
  lastUpdated: number;
  onQuickAdd: (type: ActivityType) => void;
  userName?: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ lastUpdated, onQuickAdd, userName = 'User', onLogout }) => {
  const [stats, setStats] = useState<Record<ActivityType, number>>({
    WATER: 0, STEPS: 0, SLEEP: 0
  });
  const [waterGoal, setWaterGoal] = useState<number>(8);
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Date formatting for requirement: "Display today's date"
  const todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    const daily = getDailyStats(new Date().toISOString());
    setStats(daily);
    setWaterGoal(getWaterGoal());
  }, [lastUpdated]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrolled(scrollContainerRef.current.scrollTop > 20);
    }
  };

  const fetchInsight = async () => {
    setLoadingInsight(true);
    const text = await getHealthInsight(stats);
    setInsight(text);
    setLoadingInsight(false);
  };

  const handleEditWaterGoal = () => {
    setTempGoal(waterGoal.toString());
    setIsEditingGoal(true);
  };

  const saveGoal = () => {
    const val = parseInt(tempGoal, 10);
    if (!isNaN(val) && val > 0) {
      saveWaterGoal(val);
      setWaterGoal(val);
      setIsEditingGoal(false);
    }
  };

  const chartData = [
    { name: 'Mon', steps: 4000 },
    { name: 'Tue', steps: 3000 },
    { name: 'Wed', steps: 2000 },
    { name: 'Thu', steps: 2780 },
    { name: 'Fri', steps: 1890 },
    { name: 'Sat', steps: 2390 },
    { name: 'Sun', steps: stats[ActivityType.STEPS] || 500 },
  ];

  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <div className="h-[calc(100vh-72px)] relative bg-slate-950 overflow-hidden">
      {/* Dynamic Header */}
      <div className={`absolute top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'glass-header shadow-lg shadow-black/20 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center transition-all duration-300">
            {scrolled && <Activity className="text-blue-500 mr-2 animate-fade-in" size={20} />}
            <div>
              <h1 className={`font-bold text-white transition-all duration-300 leading-none ${scrolled ? 'text-lg' : 'text-3xl'}`}>
                {scrolled ? 'MediOrg' : `Hi, ${userName}`}
              </h1>
              {!scrolled && (
                <p className="text-slate-400 font-medium text-sm mt-2 animate-fade-in flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                  {todayDate}
                </p>
              )}
            </div>
          </div>
          
          <div className={`flex items-center space-x-4 transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Log Out"
            >
              <LogOut size={20} />
            </button>
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center overflow-hidden border border-white/10 shadow-lg cursor-pointer hover:shadow-blue-500/20">
              <span className="font-bold text-white text-sm tracking-widest">{initials}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto pt-28 pb-24 px-6 scroll-smooth no-scrollbar"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Insight Card - Full width on mobile, spans 2 cols on desktop if needed or full width */}
            <div className="md:col-span-3 group p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl text-white shadow-xl shadow-purple-900/30 relative overflow-hidden transition-transform hover:scale-[1.005]">
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-3 text-white/90">
                  <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Daily Assistant</span>
                </div>
                <p className="font-medium text-lg leading-snug">
                  {insight || "Your daily health analysis is ready. Tap below to generate insights."}
                </p>
                {!insight && (
                  <button 
                    onClick={fetchInsight}
                    disabled={loadingInsight}
                    className="mt-4 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm font-bold backdrop-blur-sm transition-colors flex items-center"
                  >
                    {loadingInsight ? <RefreshCw className="animate-spin mr-2" size={14} /> : null}
                    {loadingInsight ? 'Analyzing...' : 'Generate Insight'}
                  </button>
                )}
              </div>
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-900 opacity-40 rounded-full blur-2xl -ml-5 -mb-5"></div>
            </div>

            {/* Summary Cards */}
            <SummaryCard 
              type={ActivityType.WATER} 
              value={stats[ActivityType.WATER]} 
              goal={waterGoal}
              onEditGoal={handleEditWaterGoal}
              onQuickAdd={() => onQuickAdd(ActivityType.WATER)}
            />
            
            <SummaryCard 
              type={ActivityType.STEPS} 
              value={stats[ActivityType.STEPS]} 
              onQuickAdd={() => onQuickAdd(ActivityType.STEPS)}
            />
            
            <SummaryCard 
              type={ActivityType.SLEEP} 
              value={stats[ActivityType.SLEEP]} 
              onQuickAdd={() => onQuickAdd(ActivityType.SLEEP)}
            />

            {/* Chart - Spans full width */}
            <div className="md:col-span-3 glass-panel p-6 rounded-3xl">
              <h3 className="font-bold text-slate-300 mb-6 text-xs uppercase tracking-widest flex items-center">
                <Activity size={14} className="mr-2 text-blue-500" />
                Weekly Activity
              </h3>
              <div className="h-48 w-full -ml-2">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                     <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} 
                      dy={10}
                     />
                     <Tooltip 
                      cursor={{fill: '#1e293b', radius: 4}} 
                      contentStyle={{
                        backgroundColor: '#0f172a', 
                        borderRadius: '12px', 
                        border: '1px solid #1e293b', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)', 
                        color: '#f1f5f9',
                        fontSize: '12px'
                      }} 
                     />
                     <Bar 
                      dataKey="steps" 
                      fill="#3b82f6" 
                      radius={[4, 4, 4, 4]} 
                      barSize={20} 
                    />
                   </BarChart>
                 </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Goal Edit Modal */}
      {isEditingGoal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-slide-up sm:animate-slide-up-sm relative overflow-hidden">
            {/* Modal Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Hydration Goal</h3>
              <button 
                onClick={() => setIsEditingGoal(false)} 
                className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider text-center">Daily Target (Glasses)</label>
              <div className="flex items-center justify-center relative">
                <button 
                  onClick={() => setTempGoal(prev => Math.max(1, parseInt(prev || '0') - 1).toString())}
                  className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white hover:border-slate-600 font-bold text-2xl transition-all active:scale-95"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={tempGoal} 
                  onChange={(e) => setTempGoal(e.target.value)}
                  className="w-24 mx-4 py-2 border-none text-6xl font-black text-center text-blue-500 focus:ring-0 outline-none bg-transparent"
                  autoFocus
                />
                <button 
                  onClick={() => setTempGoal(prev => (parseInt(prev || '0') + 1).toString())}
                  className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white hover:border-slate-600 font-bold text-2xl transition-all active:scale-95"
                >
                  +
                </button>
              </div>
              <p className="text-center text-slate-500 text-sm mt-6 font-medium bg-slate-800/50 py-2 rounded-lg border border-slate-800/50 inline-block px-4 mx-auto block w-max">Recommended: 8 glasses</p>
            </div>
            
            <button 
              onClick={saveGoal} 
              className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-900/40 transition-all border border-blue-500/50"
            >
              Set Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};