export type Note = 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

export type ScaleType = 
  | 'ionian' 
  | 'dorian' 
  | 'phrygian' 
  | 'lydian' 
  | 'mixolydian' 
  | 'aeolian' 
  | 'locrian'
  | 'harmonicMinor' 
  | 'melodicMinor';

export type ChordType = 'triad' | 'tetrad';

export type EnharmonicPreference = 'sharp' | 'flat';

export type Scale = string[];

export type ChordQuality = 
  | 'M' 
  | 'm' 
  | 'dim' 
  | 'aug' 
  | 'maj7' 
  | 'm7' 
  | 'dom7' 
  | 'm7b5' 
  | 'mMaj7' 
  | 'maj7#5'
  | 'dim7';


export interface Chord {
  degree: string;
  root: string;
  quality: ChordQuality;
}

export type HarmonicField = Chord[];

export type ModalTab = 'functions' | 'variations';
