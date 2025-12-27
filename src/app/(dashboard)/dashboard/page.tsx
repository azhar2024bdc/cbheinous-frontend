"use client";

import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-104px)] flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1
          className="relative text-5xl md:text-7xl lg:text-8xl font-extrabold 
  bg-gradient-to-r from-primary-bg to-primary bg-clip-text text-transparent
  drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)]

  before:absolute before:top-[4px] before:left-[4px] before:text-gray-800/30
  before:-z-10
  [text-shadow:_2px_2px_0_#000,_4px_4px_10px_rgba(0,0,0,0.3)]
   [perspective:500px] [transform:rotateX(8deg)] [transform-style:preserve-3d]
  transition-transform duration-500 hover:[transform:rotateX(0deg)]"
        >
          Welcome to Your Dashboard
        </h1>

        <p className="mt-6 text-lg md:text-xl text-text-primary max-w-2xl mx-auto">
          Manage your data, track progress, and explore insights — all in one
          place.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-bg  to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Page;
