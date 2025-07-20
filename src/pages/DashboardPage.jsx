import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaMusic } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = ({ onNavigate }) => {
  const { username } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-inner w-full max-w-7xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4 sm:mb-6">
        Welcome, {username}!
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 md:mb-10">
        Your musical journey begins here.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl">
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-indigo-50 transition-all duration-300"
          onClick={() => onNavigate("learning")}
        >
          <FaBook className="text-4xl sm:text-5xl md:text-6xl text-indigo-600 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Learn & Explore
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover music theory, chords, and scales.
          </p>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:bg-indigo-50 transition-all duration-300"
          onClick={() => onNavigate("creation")}
        >
          <FaMusic className="text-4xl sm:text-5xl md:text-6xl text-purple-600 mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Create & Play
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Compose melodies, practice with a metronome, and more.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
