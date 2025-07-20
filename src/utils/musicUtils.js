import * as Tone from 'tone';
import { NOTE_FREQUENCIES } from './constants';

// Initialize Tone.js for audio context
Tone.start();

// Create a simple synth for playing notes
const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'triangle' },
  envelope: { attack: 0.005, decay: 0.1, sustain: 0.2, release: 0.5 }
}).toDestination();

export const playNote = (note) => {
  synth.triggerAttackRelease(note, '8n');
};

export const getChordNotes = (root, type) => {
  const notes = Object.keys(NOTE_FREQUENCIES);
  const rootIndex = notes.indexOf(root);
  if (rootIndex === -1) return [];

  let intervals = [];
  switch (type) {
    case 'major':
      intervals = [0, 4, 7];
      break;
    case 'minor':
      intervals = [0, 3, 7];
      break;
    case 'seventh':
      intervals = [0, 4, 7, 10];
      break;
    default:
      return [];
  }

  return intervals
    .map(interval => notes[rootIndex + interval])
    .filter(note => note && NOTE_FREQUENCIES[note]);
};