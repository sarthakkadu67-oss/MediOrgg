import React from 'react';
import { LayoutDashboard, History, Plus } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItemClass = (view: ViewState) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
      currentView === view ? 'text-blue-400 scale-105' : 'text-slate-500 hover:text-slate-300'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800 h-[72px] px-6 safe-area-bottom shadow-2xl z-50">
      <div className="flex justify-between items-center h-full max-w-5xl mx-auto relative">
        <button className={navItemClass('DASHBOARD')} onClick={() => onChangeView('DASHBOARD')}>
          <LayoutDashboard size={24} strokeWidth={currentView === 'DASHBOARD' ? 2.5 : 2} />
          <span className="text-[10px] font-bold tracking-wide">Today</span>
        </button>

        {/* Floating Action Button */}
        <div className="relative -top-8">
          <button 
            className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_35px_rgba(37,99,235,0.6)] hover:-translate-y-2 active:scale-95 transition-all duration-300 border-4 border-slate-950"
            onClick={() => onChangeView('LOG_ACTIVITY')}
          >
             <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <Plus size={32} strokeWidth={3} />
          </button>
        </div>

        <button className={navItemClass('HISTORY')} onClick={() => onChangeView('HISTORY')}>
          <History size={24} strokeWidth={currentView === 'HISTORY' ? 2.5 : 2} />
          <span className="text-[10px] font-bold tracking-wide">History</span>
        </button>
      </div>
    </nav>
  );
};