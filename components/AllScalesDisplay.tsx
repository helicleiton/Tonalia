import React from 'react';
import type { ChordType, EnharmonicPreference } from '../types';
import { SHARP_KEYS, FLAT_KEYS, IONIAN_HARMONIC_FIELD_TRIAD_DEGREES, IONIAN_HARMONIC_FIELD_TETRAD_DEGREES } from '../constants';
import { generateScale, generateHarmonicField, getChordName } from '../utils/musicTheory';
import { playChord } from '../utils/audio';

interface AllScalesDisplayProps {
  chordType: ChordType;
  enharmonicPreference: EnharmonicPreference;
}

const ChordCell: React.FC<{ chord: any }> = ({ chord }) => {
  const qualityClasses: { [key: string]: string } = {
    M: 'text-blue-300',
    m: 'text-gray-300',
    dim: 'text-red-400',
    maj7: 'text-blue-300',
    m7: 'text-gray-300',
    dom7: 'text-yellow-300',
    m7b5: 'text-red-400',
  };

  return (
    <td className="px-2 py-3 sm:px-4 whitespace-nowrap">
        <button 
            onClick={() => playChord(chord, 3)} 
            className={`w-full text-center font-mono font-semibold transition-colors duration-200 hover:text-white rounded-md p-1 hover:bg-white/10 focus:outline-none focus:bg-white/10 ${qualityClasses[chord.quality] || 'text-gray-200'}`}
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
    <div className="w-full mt-4 p-4 sm:p-6 bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm border border-white/5 overflow-x-auto">
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-300 mb-6 sm:mb-8">
        Campos Harmônicos Maiores
      </h3>
      <table className="w-full min-w-[700px] text-left text-sm sm:text-base text-gray-300">
        <thead className="text-xs text-purple-300 uppercase bg-gray-700/50">
          <tr>
            <th className="px-2 py-3 sm:px-4 font-bold text-base">Tonalidade</th>
            {degreeHeaders.map(degree => (
                <th key={degree} className="px-2 py-3 sm:px-4 text-center">{degree}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {keysToShow.map((key) => {
            const scale = generateScale(key, 'ionian');
            const field = generateHarmonicField(scale, 'ionian', chordType);
            return (
              <tr key={key} className="hover:bg-gray-700/50">
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
  );
};
