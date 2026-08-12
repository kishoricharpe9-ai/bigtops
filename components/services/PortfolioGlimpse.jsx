'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';

const images = [
  { id: 1, src: '/portfolio/portfolio-1.jpg', title: 'Modern Web Design' },
  { id: 2, src: '/portfolio/portfolio-2.jpg', title: 'Social Media Campaign' },
  { id: 3, src: '/portfolio/portfolio-3.jpg', title: 'Brand Identity' },
  { id: 4, src: '/portfolio/portfolio-4.jpg', title: 'Data Analytics UI' },
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 15 : -15,
    };
  }
};

export function PortfolioGlimpse() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap around index safely
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="mt-16 w-full flex flex-col items-center">
      <Reveal delay={0.15} className="w-full max-w-4xl">
        <BlurTextReveal
          as="h2"
          text="Portfolio Glimpse"
          className="text-xl font-semibold text-foreground sm:text-2xl mb-6 inline-block text-left w-full"
        />
      </Reveal>
      
      <Reveal delay={0.2} className="w-full max-w-4xl">
        <div className="relative w-full overflow-hidden rounded-[24px] bg-black/40 border border-white/10 aspect-[4/3] sm:aspect-[16/9] group [perspective:1000px] shadow-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 }
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[imageIndex].src}
                alt={images[imageIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20">
                <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-[0.15em] text-white bg-[#12ced6]/20 border border-[#12ced6]/50 rounded-full uppercase backdrop-blur-md">
                  Featured Work
                </span>
                <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">{images[imageIndex].title}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 hover:bg-[#12ced6]/20 hover:border-[#12ced6]/50 opacity-0 group-hover:opacity-100"
            onClick={() => paginate(-1)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 hover:bg-[#12ced6]/20 hover:border-[#12ced6]/50 opacity-0 group-hover:opacity-100"
            onClick={() => paginate(1)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Reveal>
    </div>
  );
}
