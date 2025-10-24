import React from 'react';
import type { EnharmonicPreference } from '../types';

interface EnharmonicPreferenceSelectorProps {
  selectedPreference: EnharmonicPreference;
  onPreferenceSelect: (preference: EnharmonicPreference) => void;
}

const PreferenceButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, isSelected, onClick }) => {
  const baseClasses = `
    w-full px-4 py-2 
    text-sm font-semibold rounded-lg 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
  `;
  
  const selectedClasses = "bg-sky-600 text-white shadow-md ring-sky-500";
  const unselectedClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 ring-slate-600";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      {label}
    </button>
  );
}

export const EnharmonicPreferenceSelector: React.FC<EnharmonicPreferenceSelectorProps> = ({ selectedPreference, onPreferenceSelect }) => {
  return (
    <div className="p-2 bg-slate-800/80 rounded-xl shadow-lg w-full">
      <div className="grid grid-cols-2 gap-2">
        <PreferenceButton 
              label="Sustenidos (#)" 
              isSelected={selectedPreference === 'sharp'} 
              onClick={() => onPreferenceSelect('sharp')} />
          <PreferenceButton 
              label="Bemóis (b)" 
              isSelected={selectedPreference === 'flat'} 
              onClick={() => onPreferenceSelect('flat')} />
      </div>
    </div>
  );
}