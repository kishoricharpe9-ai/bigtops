'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { useMatchMedia } from '@/lib/useMatchMedia';

const cards = [
  {
    title: 'Brand reveal post',
    meta: 'Feed post • 01',
    type: 'Image',
    src: '/post contents/1.png',
  },
  {
    title: 'Campaign highlight',
    meta: 'Carousel • 02',
    type: 'Image',
    src: '/post contents/2.png',
  },
  { title: 'Product teaser', meta: 'Feed post • 03', type: 'Image', src: '/post contents/3.png' },
  {
    title: 'Social proof card',
    meta: 'Feed post • 04',
    type: 'Image',
    src: '/post contents/4.png',
  },
  { title: 'Behind the scenes', meta: 'Carousel • 05', type: 'Image', src: '/post contents/5.png' },
  { title: 'Founder vision', meta: 'Feed post • 06', type: 'Image', src: '/post contents/6.png' },
  { title: 'Feature showcase', meta: 'Feed post • 07', type: 'Image', src: '/post contents/7.png' },
  {
    title: 'Community highlight',
    meta: 'Carousel • 08',
    type: 'Image',
    src: '/post contents/8.png',
  },
];

function StageCard({ card, isActive, offset, distance, spacing, onClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (card.type !== 'Video' || !videoRef.current) return;
    if (isActive) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [isActive, card.type]);

  const scale = isActive ? 1 : distance === 1 ? 0.9 : distance === 2 ? 0.8 : 0.7;
  const opacity = isActive ? 1 : distance === 1 ? 0.5 : distance === 2 ? 0.25 : 0.1;
  const translateY = isActive ? 0 : distance === 1 ? -12 : distance === 2 ? -22 : -32;
  const blur = distance >= 3 ? 1.5 : distance === 2 ? 0.8 : 0;
  const brightness = isActive ? 1 : distance === 1 ? 0.65 : 0.4;

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ zIndex: 100 - distance, filter: `blur(${blur}px) brightness(${brightness})` }}
      animate={{ x: offset * spacing, scale, opacity, y: translateY }}
      transition={{ type: 'spring', stiffness: 200, damping: 26, mass: 0.8 }}
      onClick={onClick}
    >
      <div className="w-[72vw] max-w-[17rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] overflow-hidden rounded-[24px] bg-card shadow-[0_24px_64px_rgba(0,0,0,0.5)] pointer-events-none">
        <div className="relative aspect-[4/5]">
          {card.type === 'Image' ? (
            <Image
              src={card.src}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 22rem, 24rem"
              loading={isActive ? 'eager' : 'lazy'}
            />
          ) : (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              preload={isActive ? 'metadata' : 'none'}
            >
              <source src={card.src} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.06)_55%,transparent)]" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/50">
              {card.meta}
            </p>
            <h3 className="mt-1.5 text-base font-medium tracking-tight text-white">{card.title}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PostStageSlider() {
  const reduceMotion = useReducedMotion();
  // Desktop-only section (parent uses `hidden lg:block`). Avoid mounting it on
  // mobile so its videos and autoplay timer stay idle there.
  const isDesktop = useMatchMedia('(min-width: 1024px)');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [spacing, setSpacing] = useState(260);

  const timerRef = useRef(null);

  // Responsive card spacing
  useEffect(() => {
    if (!isDesktop) return;
    const update = () => {
      const w = window.innerWidth;
      setSpacing(w < 480 ? 210 : w < 768 ? 240 : w < 1024 ? 270 : 300);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, [isDesktop]);

  const goTo = useCallback(next => {
    const total = cards.length;
    setActiveIndex(((next % total) + total) % total);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (reduceMotion || isInteracting || !isDesktop) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % cards.length);
    }, 3800);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion, isInteracting, isDesktop]);

  if (!isDesktop) return null;

  return (
    <section className="relative z-0 py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Stage — gesture zone, clips horizontal overflow, no rounded corners */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsInteracting(false), 1200);
          }}
        >
          {/* Card stage */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ height: 'clamp(22rem, 55vw, 38rem)' }}
            onPanEnd={(_e, info) => {
              if (Math.abs(info.offset.x) > 35) {
                goTo(activeIndex + (info.offset.x < 0 ? 1 : -1));
              }
            }}
          >
            {cards.map((card, index) => {
              const total = cards.length;
              let offset = index - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
              const distance = Math.abs(offset);

              return (
                <StageCard
                  key={card.src}
                  card={card}
                  isActive={offset === 0}
                  offset={offset}
                  distance={distance}
                  spacing={spacing}
                  onClick={() => goTo(index)}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
