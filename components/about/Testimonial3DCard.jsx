'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function Stars() {
  return (
    <div className="flex gap-1.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

export function Testimonial3DCard({ testimonial, index, isFeatured }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: xPct, y: yPct });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[24px] border p-7 backdrop-blur-2xl transition-all duration-500 transform-gpu ${
          isHovered
            ? '-translate-y-2 border-[#12ced6]/60 shadow-[0_15px_40px_rgba(18,206,214,0.25),0_0_20px_rgba(18,206,214,0.3)]'
            : isFeatured
            ? 'border-[#12ced6]/30 shadow-[0_10px_30px_rgba(18,206,214,0.15)] bg-card/90'
            : 'border-white/10 shadow-lg bg-card/90'
        }`}
      >
        {/* Background Video Layer for Featured OR Hovered cards */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isFeatured || isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          >
            <source
              src="https://res.cloudinary.com/diqnwnz6x/video/upload/v1779957986/herovideo2_qdgibs.mp4"
              type="video/mp4"
            />
          </video>
          {/* Overlay gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Dynamic Specular Mouse Spotlight Reflection */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(18, 206, 214, 0.25), transparent 60%)`,
          }}
        />

        {/* Star Rating */}
        <div className="relative z-20">
          <Stars />
        </div>

        {/* Testimonial Quote */}
        <div className="relative z-20 my-5">
          <blockquote className="text-sm leading-relaxed font-normal text-white/95 sm:text-[15px] drop-shadow-sm">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
        </div>

        {/* Author Avatar & Meta */}
        <div className="relative z-20 flex items-center gap-3.5 border-t border-white/10 pt-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#12ced6] to-[#0a8e94] text-sm font-bold text-black shadow-md shadow-[#12ced6]/30 border border-white/30">
            {testimonial.name.charAt(0)}
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white group-hover:text-[#12ced6] transition-colors">
              {testimonial.name}
            </div>
            <div className="text-xs text-white/60">{testimonial.role}</div>
          </div>
        </div>

        {/* Animated Corner Cyan Glow Accent */}
        <div
          className={`pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-[#12ced6]/30 blur-2xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-125' : 'opacity-0 scale-75'
          }`}
        />
      </div>
    </motion.div>
  );
}
