'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Word({ children, progress, range, baseOpacity, isHighlighted }) {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);

  return (
    <span className="inline-block mr-[0.25em] relative">
      <motion.span
        style={{ opacity }}
        className={isHighlighted ? "bg-gradient-to-r from-sky-400 to-[#12ced6] bg-clip-text text-transparent" : undefined}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * ScrollTextOpacity: Animates text opacity word-by-word based on scroll position.
 * As the user scrolls down, words smoothly transition from dim baseOpacity (0.25) to full opacity (1.0).
 */
export function ScrollTextOpacity({
  text,
  className,
  as = 'p',
  baseOpacity = 0.25,
  highlightWords = [],
  offset = ['start 0.85', 'start 0.35'],
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });

  const words = text.split(' ');
  const Tag = motion[as] || motion.p;

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            baseOpacity={baseOpacity}
            isHighlighted={isHighlighted}
          >
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}
