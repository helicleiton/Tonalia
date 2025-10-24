import React from 'react';
import type { ScaleType } from '../types';
import { SCALE_TYPE_NAMES } from '../constants';

interface ScaleTypeSelectorProps {
  selectedType: ScaleType;
  onTypeSelect: (type: ScaleType) => void;
}

const TypeButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, isSelected, onClick }) => {
  const baseClasses = `
    w-full px-3 py-2
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

export const ScaleTypeSelector: React.FC<ScaleTypeSelectorProps> = ({ selectedType, onTypeSelect }) => {
  const scaleTypes: ScaleType[] = [
    'ionian', 
    'dorian', 
    'phrygian', 
    'lydian', 
    'mixolydian', 
    'aeolian',
    'locrian',
    'harmonicMinor', 
    'melodicMinor'
  ];
  
  return (
    <div className="mb-8 w-full max-w-3xl mx-auto grid grid-cols-3 sm:grid-cols-3 gap-2 p-1 bg-gray-800 rounded-lg shadow-lg">
       {scaleTypes.map(type => (
          <TypeButton 
            key={type}
            label={SCALE_TYPE_NAMES[type]} 
            isSelected={selectedType === type} 
            onClick={() => onTypeSelect(type)} />
       ))}
    </div>
  );
}