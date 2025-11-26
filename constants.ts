import { ActivityType } from './types';
import { Droplets, Footprints, Moon } from 'lucide-react';

export const APP_STORAGE_KEY = 'mediorg_data_v1';
export const ONBOARDING_KEY = 'mediorg_onboarding_complete';
export const GOAL_WATER_KEY = 'mediorg_goal_water';

export const ACTIVITY_CONFIG = {
  [ActivityType.WATER]: {
    label: 'Water',
    unit: 'glasses',
    icon: Droplets,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500',
    bgLight: 'bg-cyan-950/50', // Darker background for dark mode
    borderColor: 'border-cyan-500/30',
    placeholder: 'e.g., 2',
    step: 1,
  },
  [ActivityType.STEPS]: {
    label: 'Steps',
    unit: 'steps',
    icon: Footprints,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500',
    bgLight: 'bg-emerald-950/50',
    borderColor: 'border-emerald-500/30',
    placeholder: 'e.g., 5000',
    step: 100,
  },
  [ActivityType.SLEEP]: {
    label: 'Sleep',
    unit: 'hours',
    icon: Moon,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500',
    bgLight: 'bg-violet-950/50',
    borderColor: 'border-violet-500/30',
    placeholder: 'e.g., 7.5',
    step: 0.5,
  },
};