import { Activity, ActivityType } from '../types';
import { APP_STORAGE_KEY, ONBOARDING_KEY, GOAL_WATER_KEY } from '../constants';

export const getStoredActivities = (): Activity[] => {
  try {
    const data = localStorage.getItem(APP_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load activities', e);
    return [];
  }
};

export const saveActivity = (activity: Activity): Activity[] => {
  const current = getStoredActivities();
  const updated = [activity, ...current];
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const isOnboardingComplete = (): boolean => {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
};

export const setOnboardingComplete = (): void => {
  localStorage.setItem(ONBOARDING_KEY, 'true');
};

export const getWaterGoal = (): number => {
  const stored = localStorage.getItem(GOAL_WATER_KEY);
  return stored ? parseInt(stored, 10) : 8; // Default 8 glasses
};

export const saveWaterGoal = (goal: number): void => {
  localStorage.setItem(GOAL_WATER_KEY, goal.toString());
};

export const getDailyStats = (dateStr: string): Record<ActivityType, number> => {
  const activities = getStoredActivities();
  
  // Filter activities for the specific date (ignoring time)
  const todaysActivities = activities.filter(act => 
    new Date(act.date).toDateString() === new Date(dateStr).toDateString()
  );

  const stats = {
    [ActivityType.WATER]: 0,
    [ActivityType.STEPS]: 0,
    [ActivityType.SLEEP]: 0,
  };

  todaysActivities.forEach(act => {
    stats[act.type] += act.value;
  });

  return stats;
};

export const getHistoryLast7Days = (): Record<string, Activity[]> => {
  const activities = getStoredActivities();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const filtered = activities.filter(a => new Date(a.date) >= sevenDaysAgo);
  
  // Group by date
  const grouped: Record<string, Activity[]> = {};
  
  filtered.forEach(act => {
    const dateKey = new Date(act.date).toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(act);
  });

  return grouped;
};