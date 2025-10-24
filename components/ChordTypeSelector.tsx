import React from 'react';
import type { ChordType } from '../types';

interface ChordTypeSelectorProps {
  selectedType: ChordType;
  onTypeSelect: (type: ChordType) => void;
}

const TypeButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, isSelected, onClick }) => {
  const baseClasses = `
    w-full sm:w-auto flex-1 sm:flex-initial sm:px-12 py-3 
    text-base sm:text-lg font-bold rounded-lg 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
  `;
  
  const selectedClasses = "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md ring-violet-500";
  const unselectedClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 ring-slate-600";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      {label}
    </button>
  );
}

export const ChordTypeSelector: React.FC<ChordTypeSelectorProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="mb-8 w-full max-w-sm mx-auto flex flex-col sm:flex-row items-center justify-center p-1 bg-slate-800/80 rounded-xl space-y-2 sm:space-y-0 sm:space-x-2 shadow-lg">
       <TypeButton label="Tríades" isSelected={selectedType === 'triad'} onClick={() => onTypeSelect('triad')} />
       <TypeButton label="Tétrades" isSelected={selectedType === 'tetrad'} onClick={() => onTypeSelect('tetrad')} />
    </div>
  );
}