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

  const buttonClasses = `
    w-16 h-16 sm:w-20 sm:h-20
    rounded-lg
    flex flex-col items-center justify-center
    font-bold text-lg sm:text-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    ${
      isSelected
        ? 'bg-blue-600 text-white shadow-lg transform -translate-y-1'
        : `text-white ${isAccidental ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600`
    }
    ${isSelected ? 'ring-blue-500' : 'ring-gray-600'}
  `;

  return (
    <button onClick={onClick} className={buttonClasses}>
      <span>{note}</span>
    </button>
  );
};

export const KeySelector: React.FC<KeySelectorProps> = ({ selectedKey, onKeySelect, enharmonicPreference }) => {
  const keysToShow = enharmonicPreference === 'sharp' ? SHARP_KEYS : FLAT_KEYS;
  
  return (
    <div className="p-4 sm:p-6 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm border border-white/5">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-300 mb-4 sm:mb-6">
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