import type { Note, ChordQuality, ScaleType } from './types';

export const SHARP_KEYS: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_KEYS: Note[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];


export const SHARP_TO_FLAT: { [key: string]: Note } = {
  'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
};
export const FLAT_TO_SHARP: { [key: string]: Note } = {
  'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
};


// --- Nomes de Exibição ---
export const SCALE_TYPE_NAMES: { [key in ScaleType]: string } = {
  ionian: 'Ionian (Maior)',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  aeolian: 'Aeolian (Menor)',
  locrian: 'Locrian',
  harmonicMinor: 'Menor Harmônica',
  melodicMinor: 'Menor Melódica',
};

export const DEGREE_NAMES: string[] = ['Tônica', 'Supertônica', 'Mediante', 'Subdominante', 'Dominante', 'Submediante', 'Sensível / Subtônica'];


// --- Geração de Escala Diatônica ---
export const NOTE_PITCHES: { [key in Note]: number } = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};
export const NATURAL_PITCHES: { [key: string]: number } = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 };
export const NOTE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];


// --- Intervalos das Escalas ---
export const IONIAN_SCALE_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
export const IONIAN_INTERVAL_NAMES = ['W', 'W', 'H', 'W', 'W', 'W', 'H'];

export const DORIAN_SCALE_INTERVALS = [2, 1, 2, 2, 2, 1, 2];
export const DORIAN_INTERVAL_NAMES = ['W', 'H', 'W', 'W', 'W', 'H', 'W'];

export const PHRYGIAN_SCALE_INTERVALS = [1, 2, 2, 2, 1, 2, 2];
export const PHRYGIAN_INTERVAL_NAMES = ['H', 'W', 'W', 'W', 'H', 'W', 'W'];

export const LYDIAN_SCALE_INTERVALS = [2, 2, 2, 1, 2, 2, 1];
export const LYDIAN_INTERVAL_NAMES = ['W', 'W', 'W', 'H', 'W', 'W', 'H'];

export const MIXOLYDIAN_SCALE_INTERVALS = [2, 2, 1, 2, 2, 1, 2];
export const MIXOLYDIAN_INTERVAL_NAMES = ['W', 'W', 'H', 'W', 'W', 'H', 'W'];

export const AEOLIAN_SCALE_INTERVALS = [2, 1, 2, 2, 1, 2, 2];
export const AEOLIAN_INTERVAL_NAMES = ['W', 'H', 'W', 'W', 'H', 'W', 'W'];

export const LOCRIAN_SCALE_INTERVALS = [1, 2, 2, 1, 2, 2, 2];
export const LOCRIAN_INTERVAL_NAMES = ['H', 'W', 'W', 'H', 'W', 'W', 'W'];

export const HARMONIC_MINOR_SCALE_INTERVALS = [2, 1, 2, 2, 1, 3, 1];
export const HARMONIC_MINOR_INTERVAL_NAMES = ['W', 'H', 'W', 'W', 'H', 'W+H', 'H'];

export const MELODIC_MINOR_SCALE_INTERVALS = [2, 1, 2, 2, 2, 2, 1]; // Ascendente
export const MELODIC_MINOR_INTERVAL_NAMES = ['W', 'H', 'W', 'W', 'W', 'W', 'H'];


// --- Campos Harmônicos ---

// Ionian (Maior)
export const IONIAN_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['M', 'm', 'm', 'M', 'M', 'm', 'dim'];
export const IONIAN_HARMONIC_FIELD_TRIAD_DEGREES = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
export const IONIAN_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['maj7', 'm7', 'm7', 'maj7', 'dom7', 'm7', 'm7b5'];
export const IONIAN_HARMONIC_FIELD_TETRAD_DEGREES = ['Imaj7', 'iim7', 'iiim7', 'IVmaj7', 'V7', 'vim7', 'viiø7'];

// Dorian
export const DORIAN_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['m', 'm', 'M', 'M', 'm', 'dim', 'M'];
export const DORIAN_HARMONIC_FIELD_TRIAD_DEGREES = ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'];
export const DORIAN_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['m7', 'm7', 'maj7', 'dom7', 'm7', 'm7b5', 'maj7'];
export const DORIAN_HARMONIC_FIELD_TETRAD_DEGREES = ['im7', 'iim7', 'IIImaj7', 'IV7', 'vm7', 'viø7', 'VIImaj7'];

// Phrygian
export const PHRYGIAN_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['m', 'M', 'M', 'm', 'dim', 'M', 'm'];
export const PHRYGIAN_HARMONIC_FIELD_TRIAD_DEGREES = ['i', 'bII', 'bIII', 'iv', 'v°', 'bVI', 'bvii'];
export const PHRYGIAN_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['m7', 'maj7', 'dom7', 'm7', 'm7b5', 'maj7', 'm7'];
export const PHRYGIAN_HARMONIC_FIELD_TETRAD_DEGREES = ['im7', 'bIImaj7', 'bIII7', 'ivm7', 'vø7', 'bVImaj7', 'bviim7'];

// Lydian
export const LYDIAN_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['M', 'M', 'm', 'dim', 'M', 'm', 'm'];
export const LYDIAN_HARMONIC_FIELD_TRIAD_DEGREES = ['I', 'II', 'iii', '#iv°', 'V', 'vi', 'vii'];
export const LYDIAN_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['maj7', 'dom7', 'm7', 'm7b5', 'maj7', 'm7', 'm7'];
export const LYDIAN_HARMONIC_FIELD_TETRAD_DEGREES = ['Imaj7', 'II7', 'iiim7', '#ivø7', 'Vmaj7', 'vim7', 'viim7'];

// Mixolydian
export const MIXOLYDIAN_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['M', 'm', 'dim', 'M', 'm', 'm', 'M'];
export const MIXOLYDIAN_HARMONIC_FIELD_TRIAD_DEGREES = ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'bVII'];
export const MIXOLYDIAN_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['dom7', 'm7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7'];
export const MIXOLYDIAN_HARMONIC_FIELD_TETRAD_DEGREES = ['I7', 'iim7', 'iiiø7', 'IVmaj7', 'vm7', 'vim7', 'bVIImaj7'];

// Aeolian (Menor Natural)
export const AEOLIAN_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['m', 'dim', 'M', 'm', 'm', 'M', 'M'];
export const AEOLIAN_HARMONIC_FIELD_TRIAD_DEGREES = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
export const AEOLIAN_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', 'dom7'];
export const AEOLIAN_HARMONIC_FIELD_TETRAD_DEGREES = ['im7', 'iiø7', 'IIImaj7', 'ivm7', 'vm7', 'VImaj7', 'VII7'];

// Locrian
export const LOCRIAN_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['dim', 'M', 'm', 'm', 'M', 'M', 'm'];
export const LOCRIAN_HARMONIC_FIELD_TRIAD_DEGREES = ['i°', 'bII', 'biii', 'iv', 'bV', 'bVI', 'bvii'];
export const LOCRIAN_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['m7b5', 'maj7', 'm7', 'm7', 'maj7', 'dom7', 'm7'];
export const LOCRIAN_HARMONIC_FIELD_TETRAD_DEGREES = ['iø7', 'bIImaj7', 'bIIIm7', 'ivm7', 'bVmaj7', 'bVI7', 'bVIIm7'];

// Menor Harmônica
export const HARMONIC_MINOR_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['m', 'dim', 'aug', 'm', 'M', 'M', 'dim'];
export const HARMONIC_MINOR_HARMONIC_FIELD_TRIAD_DEGREES = ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°'];
export const HARMONIC_MINOR_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['mMaj7', 'm7b5', 'maj7#5', 'm7', 'dom7', 'maj7', 'dim7'];
export const HARMONIC_MINOR_HARMONIC_FIELD_TETRAD_DEGREES = ['imM7', 'iiø7', 'IIImaj7(#5)', 'ivm7', 'V7', 'VImaj7', 'vii°7'];

// Menor Melódica (Ascendente)
export const MELODIC_MINOR_HARMONIC_FIELD_TRIAD_QUALITIES: ChordQuality[] = ['m', 'm', 'aug', 'M', 'M', 'dim', 'dim'];
export const MELODIC_MINOR_HARMONIC_FIELD_TRIAD_DEGREES = ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'];
export const MELODIC_MINOR_HARMONIC_FIELD_TETRAD_QUALITIES: ChordQuality[] = ['mMaj7', 'm7', 'maj7#5', 'dom7', 'dom7', 'm7b5', 'm7b5'];
export const MELODIC_MINOR_HARMONIC_FIELD_TETRAD_DEGREES = ['imM7', 'iim7', 'IIImaj7(#5)', 'IV7', 'V7', 'viø7', 'viiø7'];