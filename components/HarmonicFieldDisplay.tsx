import React from 'react';
import type { HarmonicField, Note, Chord, ScaleType, ChordType } from '../types';
import { SCALE_TYPE_NAMES } from '../constants';
import { playChord } from '../utils/audio';
import { getChordName } from '../utils/musicTheory';

const ChordCard: React.FC<{ chord: Chord; onClick: () => void; }> = ({ chord, onClick }) => {
  const qualityClasses: { [key in Chord['quality']]: string } = {
    M: 'bg-blue-600/80 border-blue-500 text-white',
    m: 'bg-gray-700 border-gray-600 text-gray-200',
    dim: 'bg-red-800/80 border-red-700 text-gray-200',
    aug: 'bg-purple-700/80 border-purple-600 text-white',
    maj7: 'bg-blue-600/80 border-blue-500 text-white',
    m7: 'bg-gray-700 border-gray-600 text-gray-200',
    dom7: 'bg-yellow-600/80 border-yellow-500 text-white',
    m7b5: 'bg-red-800/80 border-red-700 text-gray-200',
    mMaj7: 'bg-indigo-700/80 border-indigo-600 text-white',
    'maj7#5': 'bg-purple-600/80 border-purple-500 text-white',
    dim7: 'bg-red-900/80 border-red-800 text-gray-200',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center 
        p-4 rounded-lg shadow-lg h-28 w-full
        border-b-4
        transition-all transform hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500
        ${qualityClasses[chord.quality]}
      `}
    >
      <span className="text-sm font-semibold opacity-80">{chord.degree}</span>
      <span className="text-xl sm:text-2xl font-bold mt-1 text-center">{getChordName(chord)}</span>
    </button>
  );
};

interface HarmonicFieldDisplayProps {
  field: HarmonicField;
  rootNote: Note;
  scaleType: ScaleType;
  chordType: ChordType;
  onChordClick: (chord: Chord, index: number) => void;
}

export const HarmonicFieldDisplay: React.FC<HarmonicFieldDisplayProps> = ({ field, rootNote, scaleType, chordType, onChordClick }) => {
  const scaleTypeName = SCALE_TYPE_NAMES[scaleType];
  const chordTypeName = chordType === 'triad' ? '(Tríades)' : '(Tétrades)';
  const scaleName = `${rootNote} ${scaleTypeName}`;

  return (
    <div className="w-full mt-4 sm:mt-8 p-4 sm:p-6 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm border border-white/5">
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-300 mb-6 sm:mb-8">
        Campo Harmônico de {scaleName} <span className="text-xl sm:text-2xl text-purple-400 font-semibold">{chordTypeName}</span>
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 sm:gap-4">
        {field.map((chord, index) => (
          <ChordCard 
            key={chord.degree} 
            chord={chord} 
            onClick={() => {
              playChord(chord, 3);
              onChordClick(chord, index);
            }} 
          />
        ))}
      </div>
    </div>
  );
};
