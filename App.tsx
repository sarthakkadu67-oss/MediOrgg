import React, { useState, useEffect } from 'react';
import { ViewState, ActivityType } from './types';
import { getCurrentUser, User, logout } from './services/authService';
import { LandingPage } from './views/LandingPage';
import { Dashboard } from './views/Dashboard';
import { ActivityLog } from './views/ActivityLog';
import { HistoryView } from './views/History';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedLogType, setSelectedLogType] = useState<ActivityType>(ActivityType.WATER);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setView('DASHBOARD');
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const navigateTo = (newView: ViewState) => {
    setView(newView);
  };

  const handleQuickAdd = (type: ActivityType) => {
    setSelectedLogType(type);
    navigateTo('LOG_ACTIVITY');
  };

  const handleSaveActivity = () => {
    setLastUpdated(Date.now());
    navigateTo('DASHBOARD');
  };

  if (!user) {
    return <LandingPage onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'DASHBOARD':
        return (
          <>
            <Dashboard 
              lastUpdated={lastUpdated} 
              onQuickAdd={handleQuickAdd} 
              userName={user.name} 
              onLogout={handleLogout}
            />
            <BottomNav currentView={view} onChangeView={navigateTo} />
          </>
        );
      case 'HISTORY':
        return (
          <>
            <HistoryView lastUpdated={lastUpdated} />
            <BottomNav currentView={view} onChangeView={navigateTo} />
          </>
        );
      case 'LOG_ACTIVITY':
        return (
          <div className="fixed inset-0 z-[60] bg-slate-950">
            <ActivityLog 
              initialType={selectedLogType}
              onClose={() => navigateTo('DASHBOARD')}
              onSave={handleSaveActivity}
            />
          </div>
        );
      default:
        return (
          <Dashboard 
            lastUpdated={lastUpdated} 
            onQuickAdd={handleQuickAdd} 
            userName={user.name} 
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-blue-500/30 selection:text-blue-200">
      {renderContent()}
    </div>
  );
}