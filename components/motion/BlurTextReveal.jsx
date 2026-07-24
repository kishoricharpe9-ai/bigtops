'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveals a string one word at a time, each word fading + sliding up while a
 * blur sharpens to focus. Companion to the block-level <Reveal>. Pass `as` to
 * render it as the real heading element so semantics and font styles are kept.
 * Words wrap naturally because the spaces between them stay as real text nodes.
 */
export function BlurTextReveal({
  text,
  className,
  as = 'span',
  stagger = 0.2,
  delay = 0,
  duration = 2,
  blur = 17,
  y = 16,
  once = true,
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- framer-motion's indexed component types don't narrow cleanly to a JSX-usable element type
  const MotionTag = motion[as];
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word = {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      style={as === 'span' ? { display: 'inline-block' } : undefined}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px' }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span
            variants={word}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
