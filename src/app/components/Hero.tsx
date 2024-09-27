"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { textVariant } from "/Users/yasingunaydin/Documents/GitHub/yuk-yolu-full-stack-app/utils/motion.js";

const textArray = [
  { title: "yükünü", color: "rgb(250 204 21)" },
  { title: "tırını", color: "rgb(249, 115, 22)" },
];

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentText((textTitle) => (textTitle + 1) % textArray.length),
      3500
    );
    return () => clearInterval(interval);
  });

  return (
    <section className="container my-16">
      <div className="flex flex-col text-4xl lg:text-5xl md:text-5xl font-bold text-center items-center">
        <h1>Bir sonraki</h1>
        <div className="flex gap-2">
          <motion.h1
            key={currentText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            variants={textVariant(1.1)}
            style={{ color: textArray[currentText].color }} // Sets the color dynamically
          >
            {textArray[currentText].title}
          </motion.h1>
          <h1>bul</h1>
        </div>
      </div>

      <form className="flex gap-2 mt-14 max-w-xl mx-auto">
        <input
          type="search"
          className="border border-gray-400 w-full py-2 px-3 rounded-md"
          placeholder="Ara..."
        />
        <button className="bg-yellow-400 text-white py-2 px-4 rounded-md">
          Ara
        </button>
      </form>
    </section>
  );
}
