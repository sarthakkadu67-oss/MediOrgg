import React, { useState } from 'react';
import { ActivityType, LogFormData, Activity } from '../types';
import { ACTIVITY_CONFIG } from '../constants';
import { Button } from '../components/Button';
import { saveActivity } from '../services/storageService';
import { ChevronLeft, Check, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ActivityLogProps {
  initialType?: ActivityType;
  onClose: () => void;
  onSave: () => void;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ initialType = ActivityType.WATER, onClose, onSave }) => {
  const [formData, setFormData] = useState<LogFormData>({
    type: initialType,
    value: '',
    time: new Date().toTimeString().slice(0, 5),
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);

  const activeConfig = ACTIVITY_CONFIG[formData.type];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleTypeSelect = (type: ActivityType) => {
    setFormData(prev => ({ ...prev, type, value: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(formData.value);
    if (isNaN(val) || val <= 0) {
      setError(`Please enter a valid amount.`);
      return;
    }
    const newActivity: Activity = {
      id: uuidv4(),
      type: formData.type,
      value: val,
      date: new Date().toISOString(),
      notes: formData.notes,
    };
    saveActivity(newActivity);
    onSave();
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 animate-slide-up">
      <div className="flex items-center p-4 border-b border-slate-800/50">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg text-white">Log Activity</h2>
        <div className="w-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto">
        
        {/* Type Selector */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Activity Type</label>
          <div className="flex space-x-3">
            {Object.values(ActivityType).map((t) => {
              const config = ACTIVITY_CONFIG[t];
              const Icon = config.icon;
              const isSelected = formData.type === t;
              
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeSelect(t)}
                  className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                    isSelected 
                      ? `${config.borderColor} ${config.bgLight} ${config.color} ring-1 ring-inset ring-white/10` 
                      : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <Icon size={24} className="mb-2" />
                  <span className="text-xs font-bold">{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Value Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
            Amount ({activeConfig.unit})
          </label>
          <div className="relative">
            <input
              type="number"
              name="value"
              step={activeConfig.step}
              value={formData.value}
              onChange={handleChange}
              placeholder={activeConfig.placeholder}
              className={`w-full text-4xl font-black p-5 rounded-2xl bg-slate-900/50 border-2 focus:bg-slate-900 focus:outline-none focus:ring-0 transition-colors ${
                error ? 'border-red-500/50 text-red-400 placeholder:text-red-900/50' : 'border-slate-800 focus:border-blue-500/50 text-white placeholder:text-slate-800'
              }`}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-sm pointer-events-none uppercase">
              {activeConfig.unit}
            </div>
          </div>
          {error && (
            <div className="flex items-center text-red-400 text-sm mt-3 animate-pulse">
              <AlertCircle size={14} className="mr-1.5" />
              {error}
            </div>
          )}
        </div>

        {/* Time Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white appearance-none"
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Notes (Optional)</label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="How did you feel?"
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white resize-none placeholder:text-slate-700"
          />
        </div>

        <div className="mt-8 mb-24">
           <Button type="submit" fullWidth variant="primary" className="h-14 text-lg">
             <Check className="mr-2" /> Save Entry
           </Button>
        </div>
      </form>
    </div>
  );
};