'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { Badge } from '@/components/ui/Badge';

function videoPoster(src) {
  return src.replace('/upload/q_auto,f_auto/', '/upload/q_auto,so_0/').replace(/\.mp4$/, '.jpg');
}

/* ─── Lightbox Modal Component ─── */
function VideoLightbox({ testimonial, onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl overflow-hidden rounded-[24px] bg-[#0d0d0f] border border-white/10 shadow-2xl flex flex-col md:flex-row md:aspect-[16/9]"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Area (left side or full top on mobile) */}
        <div className="relative flex-1 bg-black aspect-video md:aspect-auto md:h-full">
          <video
            src={testimonial.videoUrl}
            className="h-full w-full object-contain"
            controls
            autoPlay
            playsInline
          />
        </div>

        {/* Info Area (right side or bottom on mobile) */}
        <div className="w-full md:w-[320px] shrink-0 p-6 md:p-8 flex flex-col justify-between border-t border-white/10 md:border-t-0 md:border-l border-white/[0.08] bg-[#0d0d0f]/80 backdrop-blur-md">
          <div className="flex flex-col h-full justify-center">
            {/* Stars */}
            <div className="flex gap-1 text-[#12ced6]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/90 italic font-medium">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Client Metadata */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#12ced6]/10 border border-[#12ced6]/20 text-sm font-semibold text-[#12ced6]">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-xs text-muted mt-0.5">{testimonial.role}</div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-muted tracking-wider uppercase mt-8 md:mt-0 text-center md:text-left">
            Customer Success Story
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white hover:scale-105 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ─── Individual Card Component ─── */
function TestimonialCard({
  testimonial,
  isActive,
  isAutoplayActive,
  onOpen,
  onMouseEnter,
  onMouseLeave,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      // Reset playhead slightly to avoid visual freeze frames
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div
      onClick={() => onOpen(testimonial)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative flex flex-col justify-end aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-card border transition-all duration-500 cursor-pointer shadow-xl ${
        isActive
          ? 'border-[#12ced6]/40 shadow-[0_0_20px_rgba(18,206,214,0.06)]'
          : 'border-white/[0.06]'
      } hover:border-[#12ced6]/50 hover:shadow-[0_0_30px_rgba(18,206,214,0.12)]`}
    >
      {/* Autoplay Progress Bar */}
      {isAutoplayActive && (
        <motion.div
          key={testimonial.id}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4, ease: 'linear' }}
          style={{ originX: 0 }}
          className="absolute top-0 left-0 right-0 h-[3px] bg-[#12ced6] z-20"
        />
      )}

      {/* Video / Poster Layer */}
      <video
        ref={videoRef}
        src={testimonial.videoUrl}
        poster={videoPoster(testimonial.videoUrl)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Glassmorphic/Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

      {/* Pulsing Play Button overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md shadow-xl transition-all duration-500 ${
            isActive
              ? 'scale-105 bg-[#12ced6] border-[#12ced6] text-black'
              : 'group-hover:scale-110 group-hover:bg-[#12ced6] group-hover:border-[#12ced6] group-hover:text-black'
          }`}
        >
          {/* Pulse ring */}
          <span
            className={`absolute -inset-2 rounded-full border border-[#12ced6]/30 animate-ping ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } transition-opacity duration-500`}
          />

          <svg className="w-5 h-5 translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Text details */}
      <div className="relative z-10 p-6 md:p-7 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#12ced6]">Video Review</p>
        <p className="text-sm text-foreground/90 font-medium leading-relaxed line-clamp-2">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-2.5 mt-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-foreground">
            {testimonial.name.charAt(0)}
          </div>
          <div className="text-left">
            <h4 className="text-xs font-semibold text-foreground leading-none">
              {testimonial.name}
            </h4>
            <span className="text-[10px] text-muted leading-none mt-1 inline-block">
              {testimonial.role}
            </span>
          </div>
        </div>
      </div>

      {/* Top micro-glow accent */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#12ced6]/50 to-transparent transition-transform duration-500 origin-center ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </div>
  );
}

/* ─── Main Video Testimonials Section ─── */
export function VideoTestimonials({ testimonials }) {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive visible count check
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleCount(3);
      else if (w >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxScroll = Math.max(0, testimonials.length - visibleCount);

  // Sync scrollIndex when autoplayIndex moves out of the visible viewport window
  useEffect(() => {
    if (autoplayIndex < scrollIndex) {
      setScrollIndex(autoplayIndex);
    } else if (autoplayIndex >= scrollIndex + visibleCount) {
      setScrollIndex(Math.min(maxScroll, autoplayIndex - visibleCount + 1));
    }
  }, [autoplayIndex, scrollIndex, visibleCount, maxScroll]);

  const next = () => {
    setAutoplayIndex(prev => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplayIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (e, info) => {
    if (maxScroll === 0) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -50 || velocity < -200) {
      next();
    } else if (offset > 50 || velocity > 200) {
      prev();
    }
  };

  // Cycle autoplay index every 4 seconds if no hover, no modal is open
  useEffect(() => {
    if (selectedTestimonial !== null || hoveredIndex !== null) {
      return;
    }
    const interval = setInterval(() => {
      setAutoplayIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length, selectedTestimonial, hoveredIndex, autoplayIndex]);

  const showButtons = testimonials.length > 1;

  return (
    <section className="relative border-t border-white/[0.06] py-16 sm:py-24 bg-black/40 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -left-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#12ced6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-[#12ced6]/5 blur-[120px] pointer-events-none" />

      <Container>
        <Reveal className="flex flex-col items-start">
          <Badge>Video Stories</Badge>
          <BlurTextReveal
            as="h2"
            text="Hear from our partners"
            className="mt-8 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Watch how we help forward-thinking brands scale, build premium identities, and generate
            measurable growth through strategic video campaigns.
          </p>
        </Reveal>

        {/* Carousel Container */}
        <div className="relative mt-16 w-full max-w-[440px] sm:max-w-2xl md:max-w-3xl lg:max-w-[1200px] mx-auto px-4 sm:px-0">
          {/* Navigation Buttons (conditional based on visible items) */}
          {showButtons && (
            <>
              {/* Left Arrow Button */}
              <button
                onClick={prev}
                aria-label="Previous Testimonial"
                className="absolute left-2 sm:-left-16 md:-left-20 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/75 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#12ced6] hover:text-[#12ced6] hover:bg-black/80 active:scale-95 shadow-lg"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={next}
                aria-label="Next Testimonial"
                className="absolute right-2 sm:-right-16 md:-right-20 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/75 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#12ced6] hover:text-[#12ced6] hover:bg-black/80 active:scale-95 shadow-lg"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel Viewport with internal card margins/padding */}
          <div className="overflow-hidden rounded-[20px] -mx-3 px-3">
            <motion.div
              drag={maxScroll > 0 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${scrollIndex * (100 / visibleCount)}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="flex w-full cursor-grab active:cursor-grabbing"
            >
              {testimonials.map((t, idx) => {
                const isHoveringAny = hoveredIndex !== null;
                const isActive = isHoveringAny ? hoveredIndex === idx : autoplayIndex === idx;
                const isAutoplayActive =
                  autoplayIndex === idx && hoveredIndex === null && !selectedTestimonial;

                return (
                  <div
                    key={t.id}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 select-none"
                  >
                    <TestimonialCard
                      testimonial={t}
                      isActive={isActive}
                      isAutoplayActive={isAutoplayActive}
                      onOpen={setSelectedTestimonial}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Lightbox Animation */}
      <AnimatePresence>
        {selectedTestimonial && (
          <VideoLightbox
            testimonial={selectedTestimonial}
            onClose={() => setSelectedTestimonial(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default VideoTestimonials;
