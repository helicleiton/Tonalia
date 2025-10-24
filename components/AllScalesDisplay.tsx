import React from 'react';
import type { Chord, ChordType, EnharmonicPreference } from '../types';
import { SHARP_KEYS, FLAT_KEYS, IONIAN_HARMONIC_FIELD_TRIAD_DEGREES, IONIAN_HARMONIC_FIELD_TETRAD_DEGREES } from '../constants';
import { generateScale, generateHarmonicField, getChordName } from '../utils/musicTheory';
import { playChord } from '../utils/audio';

interface AllScalesDisplayProps {
  chordType: ChordType;
  enharmonicPreference: EnharmonicPreference;
}

const ChordCell: React.FC<{ chord: Chord }> = ({ chord }) => {
  const qualityClasses: { [key: string]: string } = {
    M: 'text-sky-300',
    maj7: 'text-sky-300',
    m: 'text-slate-300',
    m7: 'text-slate-300',
    dim: 'text-red-400',
    m7b5: 'text-red-400',
    dom7: 'text-amber-300',
  };

  return (
    <td className="px-2 py-3 sm:px-4 whitespace-nowrap text-center">
        <button 
            onClick={() => playChord(chord, 3)} 
            className={`w-full font-mono font-semibold transition-colors duration-200 hover:text-white rounded-md p-1 hover:bg-white/5 focus:outline-none focus:bg-white/10 ${qualityClasses[chord.quality] || 'text-slate-200'}`}
        >
            {getChordName(chord)}
        </button>
    </td>
  );
};

export const AllScalesDisplay: React.FC<AllScalesDisplayProps> = ({ chordType, enharmonicPreference }) => {
  const keysToShow = enharmonicPreference === 'sharp' ? SHARP_KEYS : FLAT_KEYS;
  const degreeHeaders = chordType === 'triad' ? IONIAN_HARMONIC_FIELD_TRIAD_DEGREES : IONIAN_HARMONIC_FIELD_TETRAD_DEGREES;

  return (
    <div className="w-full mt-4 bg-slate-900/50 rounded-xl shadow-2xl backdrop-blur-md border border-white/5 overflow-hidden">
      <div className="overflow-auto max-h-[70vh]">
        <table className="w-full min-w-[700px] text-left text-sm sm:text-base text-slate-300 border-separate border-spacing-0">
          <thead className="text-xs text-violet-300 uppercase bg-slate-800/60 backdrop-blur-sm sticky top-0 z-10">
            <tr>
              <th className="px-2 py-4 sm:px-4 font-bold text-base text-left border-b border-slate-700">Tonalidade</th>
              {degreeHeaders.map(degree => (
                  <th key={degree} className="px-2 py-4 sm:px-4 text-center font-semibold border-b border-slate-700">{degree}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {keysToShow.map((key) => {
              const scale = generateScale(key, 'ionian');
              const field = generateHarmonicField(scale, 'ionian', chordType);
              return (
                <tr key={key} className="hover:bg-slate-700/50">
                  <td className="px-2 py-3 sm:px-4 font-bold text-lg text-white">{key}</td>
                  {field.map((chord) => (
                      <ChordCell key={chord.degree} chord={chord} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};