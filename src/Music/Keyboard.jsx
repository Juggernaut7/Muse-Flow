import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playNote } from '../utils/musicUtils';

const Keyboard = () => {
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  const blackKeys = ['C#4', 'D#4', 'F#4', 'G#4', 'A#4', 'C#5', 'D#5', 'F#5', 'G#5', 'A#5'];

  const keyMap = {
    'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4', 'f': 'F4', 't': 'F#4', 'g': 'G4',
    'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4', 'k': 'C5', 'o': 'C#5', 'l': 'D5', 'p': 'D#5',
    ';': 'E5', "'": 'F5', '[': 'F#5', ']': 'G5', '\\': 'A5',
  };

  const handleKeyDown = useCallback((event) => {
    const note = keyMap[event.key.toLowerCase()];
    if (note) {
      playNote(note);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative flex justify-center bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl overflow-hidden w-full max-w-4xl mx-auto">
      <div className="flex justify-center">
        {notes.map(note => (
          <motion.button
            key={note}
            onClick={() => playNote(note)}
            whileTap={{ scale: 0.95, backgroundColor: '#6366F1' }}
            className="
              relative w-8 sm:w-10 md:w-12 h-32 sm:h-40 md:h-48 bg-white border-2 border-gray-300 rounded-b-lg mx-0.5
              flex items-end justify-center text-xs sm:text-sm font-semibold text-gray-700
              hover:bg-gray-100 transition-colors duration-100 ease-out
            "
          >
            {note.replace('4', '').replace('5', '')}
          </motion.button>
        ))}
      </div>
      <div className="absolute top-0 flex justify-center w-full -mt-2">
        {blackKeys.map((note, index) => {
          const offsets = [
            5.5, 14.5, 32.5, 41.5, 50.5, 68.5, 77.5, 95.5, 104.5, 113.5
          ].map(val => `calc(${val}% + 2px)`);
          return (
            <motion.button
              key={note}
              onClick={() => playNote(note)}
              whileTap={{ scale: 0.95, backgroundColor: '#6366F1' }}
              className="
                absolute w-6 sm:w-7 md:w-8 h-20 sm:h-24 md:h-32 bg-gray-800 border-2 border-gray-900 rounded-b-lg
                hover:bg-gray-700 transition-colors duration-100 ease-out z-10
              "
              style={{ left: offsets[index] }}
            >
              <span className="sr-only">{note}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;