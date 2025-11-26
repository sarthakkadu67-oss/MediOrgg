export enum ActivityType {
  WATER = 'WATER',
  STEPS = 'STEPS',
  SLEEP = 'SLEEP',
}

export interface Activity {
  id: string;
  type: ActivityType;
  value: number;
  date: string; // ISO String
  notes?: string;
}

export interface DailySummary {
  water: number; // in ml or glasses
  steps: number; // count
  sleep: number; // hours
  date: string;
}

export type ViewState = 'ONBOARDING' | 'DASHBOARD' | 'LOG_ACTIVITY' | 'HISTORY';

export interface LogFormData {
  type: ActivityType;
  value: string;
  time: string;
  notes: string;
}