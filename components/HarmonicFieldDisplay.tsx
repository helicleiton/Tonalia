import React from 'react';
import type { HarmonicField, Note, Chord, ScaleType, ChordType } from '../types';
import { SCALE_TYPE_NAMES } from '../constants';
import { playChord } from '../utils/audio';
import { getChordName } from '../utils/musicTheory';

const ChordCard: React.FC<{ chord: Chord; onClick: () => void; }> = ({ chord, onClick }) => {
  const qualityClasses: { [key: string]: string } = {
    // Maior
    M: 'from-sky-600 to-sky-800 border-sky-500 text-white',
    maj7: 'from-sky-600 to-sky-800 border-sky-500 text-white',
    // Menor
    m: 'from-slate-600 to-slate-800 border-slate-500 text-slate-200',
    m7: 'from-slate-600 to-slate-800 border-slate-500 text-slate-200',
    mMaj7: 'from-indigo-600 to-indigo-800 border-indigo-500 text-white',
    // Diminuto
    dim: 'from-red-700 to-red-900 border-red-600 text-slate-200',
    m7b5: 'from-red-700 to-red-900 border-red-600 text-slate-200',
    dim7: 'from-red-800 to-red-900 border-red-700 text-slate-200',
    // Aumentado
    aug: 'from-purple-600 to-purple-800 border-purple-500 text-white',
    'maj7#5': 'from-purple-600 to-purple-800 border-purple-500 text-white',
    // Dominante
    dom7: 'from-amber-600 to-amber-800 border-amber-500 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center 
        p-4 rounded-xl shadow-lg h-28 w-full
        bg-gradient-to-br
        border-b-4
        transition-all transform hover:-translate-y-1 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400
        ${qualityClasses[chord.quality] || 'from-gray-600 to-gray-800 border-gray-500'}
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
    <div className="w-full mt-4 sm:mt-8 p-4 sm:p-6 bg-slate-900/50 rounded-xl shadow-2xl backdrop-blur-md border border-white/5">
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-sky-300 mb-6 sm:mb-8">
        Campo Harmônico de {scaleName} <span className="text-xl sm:text-2xl text-violet-400 font-semibold">{chordTypeName}</span>
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