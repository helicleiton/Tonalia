import { NOTE_PITCHES } from '../constants';
import type { Chord, ChordQuality } from '../types';

let audioContext: AudioContext | null = null;
const DURATION = 0.7; // segundos
const VOLUME = 0.3;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Converte um número de pitch MIDI para frequência (Hz)
const pitchToFrequency = (pitch: number): number => {
  return 440 * Math.pow(2, (pitch - 69) / 12);
};

// Reproduz uma única frequência por uma determinada duração
const playFrequency = (frequency: number, startTime: number, stopTime: number) => {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  // Envelope de volume para evitar "cliques"
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(VOLUME, startTime + 0.05); // Ataque rápido
  gainNode.gain.setValueAtTime(VOLUME, stopTime - 0.1);
  gainNode.gain.linearRampToValueAtTime(0, stopTime); // Release

  oscillator.start(startTime);
  oscillator.stop(stopTime);
};

// Função pública para tocar uma única nota pelo nome e oitava
export const playNote = (noteName: string, octave: number = 4) => {
  const pitchValue = NOTE_PITCHES[noteName as keyof typeof NOTE_PITCHES];
  if (pitchValue === undefined) return;

  const context = getAudioContext();
  // A oitava 0 no MIDI começa no C0, então ajustamos
  const finalPitch = pitchValue + (octave * 12);
  const frequency = pitchToFrequency(finalPitch);
  const startTime = context.currentTime;
  const stopTime = startTime + DURATION;

  playFrequency(frequency, startTime, stopTime);
};

const getChordIntervals = (quality: ChordQuality): number[] => {
    switch(quality) {
        case 'M': return [0, 4, 7];
        case 'm': return [0, 3, 7];
        case 'dim': return [0, 3, 6];
        case 'aug': return [0, 4, 8];
        case 'maj7': return [0, 4, 7, 11];
        case 'm7': return [0, 3, 7, 10];
        case 'dom7': return [0, 4, 7, 10];
        case 'm7b5': return [0, 3, 6, 10];
        case 'dim7': return [0, 3, 6, 9];
        case 'mMaj7': return [0, 3, 7, 11];
        case 'maj7#5': return [0, 4, 8, 11];
        default: return [];
    }
};

// Função pública para tocar um acorde
export const playChord = (chord: Chord, octave: number = 3) => {
    const rootPitch = NOTE_PITCHES[chord.root as keyof typeof NOTE_PITCHES];
    if (rootPitch === undefined) return;

    const intervals = getChordIntervals(chord.quality);
    const pitches = intervals.map(interval => rootPitch + (octave * 12) + interval);
    
    const context = getAudioContext();
    const startTime = context.currentTime;
    const stopTime = startTime + DURATION;

    pitches.forEach(pitch => {
        const frequency = pitchToFrequency(pitch);
        playFrequency(frequency, startTime, stopTime);
    });
};
