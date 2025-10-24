import React from 'react';
import { SHARP_KEYS, FLAT_KEYS } from '../constants';
import type { Note, EnharmonicPreference } from '../types';

interface KeySelectorProps {
  selectedKey: Note;
  onKeySelect: (key: Note) => void;
  enharmonicPreference: EnharmonicPreference;
}

const NoteButton: React.FC<{
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}> = ({ note, isSelected, onClick }) => {
  const isAccidental = note.includes('#') || note.includes('b');

  const baseClasses = `
    w-16 h-16 sm:w-20 sm:h-20
    rounded-xl
    flex flex-col items-center justify-center
    font-bold text-lg sm:text-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    border border-transparent
  `;

  const selectedClasses = `
    bg-gradient-to-br from-sky-500 to-sky-600 text-white 
    shadow-lg shadow-sky-500/30
    transform -translate-y-1
    ring-sky-400
  `;

  const unselectedClasses = `
    text-white 
    ${isAccidental ? 'bg-slate-800' : 'bg-slate-700'} 
    hover:bg-slate-600 hover:border-slate-500
    ring-sky-500
  `;

  return (
    <button onClick={onClick} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      <span>{note}</span>
    </button>
  );
};

export const KeySelector: React.FC<KeySelectorProps> = ({ selectedKey, onKeySelect, enharmonicPreference }) => {
  const keysToShow = enharmonicPreference === 'sharp' ? SHARP_KEYS : FLAT_KEYS;
  
  return (
    <div className="p-4 sm:p-6 bg-slate-900/50 rounded-xl shadow-2xl backdrop-blur-md border border-white/5 mt-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-sky-300 mb-4 sm:mb-6">
        Selecione a Tônica
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
        {keysToShow.map((note) => (
          <NoteButton
            key={note}
            note={note}
            isSelected={note === selectedKey}
            onClick={() => onKeySelect(note)}
          />
        ))}
      </div>
    </div>
  );
};