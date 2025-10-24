import React from 'react';
import type { Scale, ScaleType } from '../types';
import { SCALE_TYPE_NAMES, NOTE_PITCHES } from '../constants';
import { playNote } from '../utils/audio';

interface ScaleDisplayProps {
  scale: Scale;
  scaleType: ScaleType;
  intervals: string[];
  onNoteClick: (note: string, index: number) => void;
}

const NotePill: React.FC<{ note: string; isRoot?: boolean; onClick: () => void; }> = ({ note, isRoot = false, onClick }) => {
  const baseClasses = `
    w-20 h-20 sm:w-24 sm:h-24
    rounded-full
    flex items-center justify-center
    font-bold text-xl sm:text-2xl
    shadow-lg
    transition-transform transform hover:scale-105
    flex-shrink-0 cursor-pointer
    border-2
    focus:outline-none focus:ring-4
  `;

  const rootClasses = `
    bg-sky-600 text-white 
    border-sky-400
    focus:ring-sky-500/50
  `;
  const normalClasses = `
    bg-slate-700 text-slate-200 
    border-slate-600
    focus:ring-sky-500/50
  `;

  return (
    <button onClick={onClick} className={`${baseClasses} ${isRoot ? rootClasses : normalClasses}`}>
      <span>{note}</span>
    </button>
  );
};

const IntervalIndicator: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex-1 flex items-center justify-center min-w-[3rem] sm:min-w-[4rem]">
      <span className="text-slate-400 font-mono text-sm sm:text-base border border-slate-700 rounded-md px-2 py-1 bg-slate-800">
        {name}
      </span>
    </div>
  );
};


export const ScaleDisplay: React.FC<ScaleDisplayProps> = ({ scale, scaleType, intervals, onNoteClick }) => {
  if (!scale || scale.length === 0) {
    return null;
  }
  const rootNote = scale[0];
  const scaleTypeName = SCALE_TYPE_NAMES[scaleType];
  const scaleName = `${rootNote} ${scaleTypeName}`;

  return (
    <div className="w-full mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-900/50 rounded-xl shadow-2xl backdrop-blur-md border border-white/5">
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-sky-300 mb-6 sm:mb-8">
        Escala de {scaleName}
      </h3>
      <div 
        className="relative flex items-center justify-start overflow-x-auto p-4 -mx-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20px, black 95%, transparent)'
        }}
      >
        <div className="flex items-center justify-center space-x-1 sm:space-x-2 px-4">
          {(() => {
            let octave = 4;
            let lastPitch = NOTE_PITCHES[scale[0] as keyof typeof NOTE_PITCHES] - 1;

            return scale.map((note, index) => {
              const currentPitch = NOTE_PITCHES[note as keyof typeof NOTE_PITCHES];
              
              if (currentPitch < lastPitch) {
                octave++;
              }
              lastPitch = currentPitch;

              return (
                <React.Fragment key={`${note}-${index}`}>
                  <NotePill 
                    note={note} 
                    isRoot={index === 0 || index === scale.length - 1} 
                    onClick={() => {
                      playNote(note, octave);
                      onNoteClick(note, index);
                    }}
                  />
                  {index < scale.length - 1 && <IntervalIndicator name={intervals[index]} />}
                </React.Fragment>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};