import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// import { Howl } from 'howler'; // No longer needed for metronome click
import * as Tone from 'tone'; // Import Tone.js
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
// Assuming these are correctly imported from your components/UI folder
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);
  const synthRef = useRef(null); // Ref for Tone.js synth

  // Initialize Tone.js synth once
  useEffect(() => {
    // Tone.start() ensures audio context is running, called in musicUtils.js
    synthRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: {
        attack: 0.0006,
        decay: 0.5,
        sustain: 0,
        release: 0.8,
      },
    }).toDestination();

    return () => {
      // Dispose of the synth when the component unmounts
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const playClickSound = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease("C2", "16n"); // Play a short, low note for a click
    }
  }, []);

  const startMetronome = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    // Clear any existing interval to prevent multiple intervals
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Ensure Tone.js audio context is started (important for mobile browsers)
    Tone.start().then(() => {
      playClickSound(); // Play first click immediately
      intervalRef.current = setInterval(() => {
        playClickSound();
      }, (60 / bpm) * 1000); // Calculate interval in milliseconds
    }).catch(error => {
      console.error("Failed to start Tone.js audio context:", error);
      // Optionally, show a modal message to the user about audio issues
    });
  }, [bpm, isPlaying, playClickSound]);

  const stopMetronome = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // If BPM changes while playing, restart metronome with new BPM
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
    return () => stopMetronome(); // Cleanup on unmount
  }, [bpm, isPlaying, startMetronome, stopMetronome]);

  const handleBpmChange = (e) => {
    const newBpm = parseInt(e.target.value, 10);
    if (!isNaN(newBpm) && newBpm >= 40 && newBpm <= 240) { // Reasonable BPM range
      setBpm(newBpm);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center space-y-4 sm:space-y-6 max-w-sm mx-auto w-full"
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Metronome</h3>
      <div className="flex items-center justify-center space-x-4">
        <Input
          id="bpm"
          type="number"
          value={bpm}
          onChange={handleBpmChange}
          className="w-20 sm:w-24 text-center text-base sm:text-lg md:text-xl"
          min="40"
          max="240"
        />
        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">BPM</span>
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={isPlaying ? stopMetronome : startMetronome} variant={isPlaying ? 'secondary' : 'primary'}>
          {isPlaying ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
          {isPlaying ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={() => { stopMetronome(); setBpm(120); }} variant="outline">
          <FaRedo className="mr-2" /> Reset
        </Button>
      </div>
    </motion.div>
  );
};

export default Metronome;
