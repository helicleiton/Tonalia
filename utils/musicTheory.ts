import type { Note, Scale, HarmonicField, ScaleType, ChordType, Chord, ChordQuality } from '../types';
import {
  NOTE_PITCHES,
  NATURAL_PITCHES,
  NOTE_LETTERS,
  SHARP_KEYS,
  SCALE_TYPE_NAMES
} from '../constants';
import * as c from '../constants';

const getScaleIntervals = (type: ScaleType): number[] => {
  switch (type) {
    case 'ionian': return c.IONIAN_SCALE_INTERVALS;
    case 'dorian': return c.DORIAN_SCALE_INTERVALS;
    case 'phrygian': return c.PHRYGIAN_SCALE_INTERVALS;
    case 'lydian': return c.LYDIAN_SCALE_INTERVALS;
    case 'mixolydian': return c.MIXOLYDIAN_SCALE_INTERVALS;
    case 'aeolian': return c.AEOLIAN_SCALE_INTERVALS;
    case 'locrian': return c.LOCRIAN_SCALE_INTERVALS;
    case 'harmonicMinor': return c.HARMONIC_MINOR_SCALE_INTERVALS;
    case 'melodicMinor': return c.MELODIC_MINOR_SCALE_INTERVALS;
    default: return [];
  }
};

export const generateScale = (rootNote: Note, type: ScaleType): Scale => {
  const intervals = getScaleIntervals(type);
  const scale: string[] = [rootNote];

  let currentPitch = NOTE_PITCHES[rootNote];
  const rootLetter = rootNote.charAt(0);
  let currentLetterIndex = NOTE_LETTERS.indexOf(rootLetter);

  for (const interval of intervals.slice(0, 6)) {
    currentPitch = (currentPitch + interval) % 12;
    currentLetterIndex = (currentLetterIndex + 1) % 7;
    const nextNoteLetter = NOTE_LETTERS[currentLetterIndex];

    const naturalPitch = NATURAL_PITCHES[nextNoteLetter];
    
    let diff = currentPitch - naturalPitch;

    if (diff > 6) diff -= 12;
    if (diff < -6) diff += 12;

    let accidentals = '';
    if (diff > 0) {
      accidentals = '#'.repeat(diff);
    } else if (diff < 0) {
      accidentals = 'b'.repeat(-diff);
    }

    scale.push(nextNoteLetter + accidentals);
  }
  
  scale.push(rootNote);

  return scale;
};

export const generateHarmonicField = (scale: Scale, scaleType: ScaleType, chordType: ChordType): HarmonicField => {
  const scaleDegrees = scale.slice(0, 7);
  let qualities: ChordQuality[] = [];
  let degrees: string[] = [];

  if (chordType === 'triad') {
    switch (scaleType) {
      case 'ionian': qualities = c.IONIAN_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.IONIAN_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'dorian': qualities = c.DORIAN_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.DORIAN_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'phrygian': qualities = c.PHRYGIAN_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.PHRYGIAN_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'lydian': qualities = c.LYDIAN_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.LYDIAN_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'mixolydian': qualities = c.MIXOLYDIAN_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.MIXOLYDIAN_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'aeolian': qualities = c.AEOLIAN_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.AEOLIAN_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'locrian': qualities = c.LOCRIAN_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.LOCRIAN_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'harmonicMinor': qualities = c.HARMONIC_MINOR_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.HARMONIC_MINOR_HARMONIC_FIELD_TRIAD_DEGREES; break;
      case 'melodicMinor': qualities = c.MELODIC_MINOR_HARMONIC_FIELD_TRIAD_QUALITIES; degrees = c.MELODIC_MINOR_HARMONIC_FIELD_TRIAD_DEGREES; break;
    }
  } else { // tetrad
    switch (scaleType) {
      case 'ionian': qualities = c.IONIAN_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.IONIAN_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'dorian': qualities = c.DORIAN_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.DORIAN_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'phrygian': qualities = c.PHRYGIAN_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.PHRYGIAN_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'lydian': qualities = c.LYDIAN_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.LYDIAN_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'mixolydian': qualities = c.MIXOLYDIAN_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.MIXOLYDIAN_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'aeolian': qualities = c.AEOLIAN_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.AEOLIAN_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'locrian': qualities = c.LOCRIAN_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.LOCRIAN_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'harmonicMinor': qualities = c.HARMONIC_MINOR_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.HARMONIC_MINOR_HARMONIC_FIELD_TETRAD_DEGREES; break;
      case 'melodicMinor': qualities = c.MELODIC_MINOR_HARMONIC_FIELD_TETRAD_QUALITIES; degrees = c.MELODIC_MINOR_HARMONIC_FIELD_TETRAD_DEGREES; break;
    }
  }

  return scaleDegrees.map((note, index) => ({
    root: note,
    quality: qualities[index],
    degree: degrees[index],
  }));
};

export const getChordName = (chord: Chord): string => {
  const name = chord.root;
  switch (chord.quality) {
    case 'm': return `${name}m`;
    case 'dim': return `${name}°`;
    case 'aug': return `${name}+`;
    case 'maj7': return `${name}maj7`;
    case 'm7': return `${name}m7`;
    case 'dom7': return `${name}7`;
    case 'm7b5': return `${name}m7(b5)`;
    case 'mMaj7': return `${name}m(maj7)`;
    case 'maj7#5': return `${name}maj7(#5)`;
    case 'dim7': return `${name}°7`;
    default: return name;
  }
};

const allScaleTypes: ScaleType[] = [
  'ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian',
  'locrian', 'harmonicMinor', 'melodicMinor'
];

export const analyzeChordFunctions = (clickedChord: Chord) => {
  const results: { key: Note; scale: string; degree: string; }[] = [];
  const targetChordName = getChordName(clickedChord);
  
  const isTetrad = ['maj7', 'm7', 'dom7', 'm7b5', 'mMaj7', 'maj7#5', 'dim7'].includes(clickedChord.quality);

  for (const rootNote of SHARP_KEYS) {
      for (const scaleType of allScaleTypes) {
          const scale = generateScale(rootNote, scaleType);
          const field = generateHarmonicField(scale, scaleType, isTetrad ? 'tetrad' : 'triad');

          for (const chordInField of field) {
              if (getChordName(chordInField) === targetChordName) {
                  results.push({
                      key: rootNote,
                      scale: SCALE_TYPE_NAMES[scaleType],
                      degree: chordInField.degree,
                  });
              }
          }
      }
  }
  return results;
};

export const getDegreeVariations = (rootNote: Note, degreeIndex: number) => {
  return allScaleTypes.map(scaleType => {
    const scale = generateScale(rootNote, scaleType);
    const triadField = generateHarmonicField(scale, scaleType, 'triad');
    const tetradField = generateHarmonicField(scale, scaleType, 'tetrad');

    return {
        scaleType: scaleType,
        triad: triadField[degreeIndex],
        tetrad: tetradField[degreeIndex],
    };
  });
};
