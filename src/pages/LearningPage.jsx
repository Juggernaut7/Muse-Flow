import React from 'react';
import { motion } from 'framer-motion';
import ChordDisplay from '../Music/ChordDisplay';
import Keyboard from '../Music/Keyboard';

const LearningPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl shadow-inner w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 sm:mb-8 md:mb-10 text-center">
        Learn & Explore Music
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Interactive Keyboard</h3>
          <Keyboard />
          <p className="mt-4 sm:mt-6 text-gray-600 text-center max-w-md text-sm sm:text-base">
            Use your mouse or keyboard (A-J for white keys, W-U for black keys) to play notes.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Chord Explorer</h3>
          <ChordDisplay />
          <p className="mt-4 sm:mt-6 text-gray-600 text-center max-w-md text-sm sm:text-base">
            Select a root note and chord type to see its notes and hear how it sounds.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningPage;