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
    text-sm sm:text-base font-bold rounded-md 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
  `;
  
  const selectedClasses = "bg-blue-600 text-white shadow-md ring-blue-500";
  const unselectedClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600 ring-gray-600";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      {label}
    </button>
  );
}

export const EnharmonicPreferenceSelector: React.FC<EnharmonicPreferenceSelectorProps> = ({ selectedPreference, onPreferenceSelect }) => {
  return (
    <div className="mb-4 w-full max-w-xs mx-auto grid grid-cols-2 gap-2 p-1 bg-gray-800 rounded-lg shadow-lg">
       <PreferenceButton 
            label="Sustenidos (#)" 
            isSelected={selectedPreference === 'sharp'} 
            onClick={() => onPreferenceSelect('sharp')} />
        <PreferenceButton 
            label="Bemóis (b)" 
            isSelected={selectedPreference === 'flat'} 
            onClick={() => onPreferenceSelect('flat')} />
    </div>
  );
}