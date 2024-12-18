'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { CircleArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { textVariant } from '../../../motion.js';

const textArray = [
  { title: 'yükünü', color: 'rgb(250 204 21)' },
  { title: 'tırını', color: 'rgb(249, 115, 22)' },
];

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentText((prev) => (prev + 1) % textArray.length),
      3500
    );
    return () => clearInterval(interval);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isBottom =
      window.innerHeight + latest >= document.documentElement.scrollHeight;
    setVisible(!isBottom);
  });

  return (
    <section className='container my-16'>
      <div className='flex items-center justify-center -mt-10 mb-3'>
        <span className='inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600 ring-1 ring-inset ring-orange-500/10'>
          🎉 Hoş geldiniz!
        </span>
      </div>

      <div className='absolute z-[-1] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_80%)]'></div>
      <div className='bg-gradient-to-r from-gray-600 to-gray-900 text-transparent bg-clip-text flex flex-col text-4xl lg:text-6xl md:text-5xl font-bold text-center items-center'>
        <h1>Bir sonraki</h1>
        <div className='flex gap-2'>
          <motion.h1
            key={currentText}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            variants={textVariant(1.1)}
            style={{ color: textArray[currentText].color }}
          >
            {textArray[currentText].title}
          </motion.h1>
          <h1>bul</h1>
        </div>
      </div>

      {/* Need filter here */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'
      >
        <CircleArrowDown className='text-3xl animate-bounce text-yellow-400' />
      </motion.div>
    </section>
  );
}
