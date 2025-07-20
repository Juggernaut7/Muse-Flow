import React from "react";
import { motion } from "framer-motion";
import Metronome from "../Music/Metronome";

const CreationPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] p-4 sm:p-6 md:p-8 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl shadow-inner w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 mb-6 sm:mb-8 md:mb-10 text-center">
        Create & Practice
      </h2>
      <div className="flex justify-center">
        <Metronome />
      </div>
      <p className="mt-6 sm:mt-8 text-gray-600テキストセンター max-w-md mx-auto text-sm sm:text-base">
        Set your desired BPM and practice your timing with the metronome. More
        creation tools coming soon!
      </p>
    </motion.div>
  );
};

export default CreationPage;
