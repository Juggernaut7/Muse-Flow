import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickSound] = useState(new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/241790/click.mp3'] }));
  const intervalRef = React.useRef(null);

  const startMetronome = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      clickSound.play();
    }, (60 / bpm) * 1000);
  }, [bpm, isPlaying, clickSound]);

  const stopMetronome = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
    return () => stopMetronome();
  }, [bpm, isPlaying, startMetronome, stopMetronome]);

  const handleBpmChange = (e) => {
    const newBpm = parseInt(e.target.value, 10);
    if (!isNaN(newBpm) && newBpm >= 40 && newBpm <= 240) {
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