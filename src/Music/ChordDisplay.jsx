import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { getChordNotes, playNote } from "../utils/musicUtils";
import { NOTE_FREQUENCIES } from "../utils/constants";
import Button from "../components/UI/Button";

const ChordDisplay = () => {
  const [rootNote, setRootNote] = useState("C4");
  const [chordType, setChordType] = useState("major");
  const [currentChordNotes, setCurrentChordNotes] = useState([]);

  useEffect(() => {
    const notes = getChordNotes(rootNote, chordType);
    setCurrentChordNotes(notes);
  }, [rootNote, chordType]);

  const playChord = () => {
    currentChordNotes.forEach((note, index) => {
      setTimeout(() => playNote(note), index * 50);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center space-y-4 sm:space-y-6 max-w-md mx-auto w-full"
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
        Chord Explorer
      </h3>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          value={rootNote}
          onChange={(e) => setRootNote(e.target.value)}
          className="p-2 sm:p-3 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-lg w-full sm:w-auto"
        >
          {Object.keys(NOTE_FREQUENCIES)
            .filter((note) => !note.includes("#"))
            .map((note) => (
              <option key={note} value={note}>
                {note.replace("4", "").replace("5", "")}
              </option>
            ))}
        </select>
        <select
          value={chordType}
          onChange={(e) => setChordType(e.target.value)}
          className="p-2 sm:p-3 border rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-lg w-full sm:w-auto"
        >
          <option value="major">Major</option>
          <option value="minor">Minor</option>
          <option value="seventh">Seventh</option>
        </select>
      </div>
      <div className="mt-4">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-semibold">
          Notes in chord:
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {currentChordNotes.length > 0 ? (
            currentChordNotes.map((note, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-800 px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base md:text-lg font-medium"
              >
                {note.replace("4", "").replace("5", "")}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm sm:text-base">
              Select a root note and type
            </span>
          )}
        </div>
      </div>
      <Button onClick={playChord} className="mt-4 sm:mt-6">
        <FaPlay className="mr-2" /> Play Chord
      </Button>
    </motion.div>
  );
};

export default ChordDisplay;
