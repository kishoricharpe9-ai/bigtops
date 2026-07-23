'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { processSteps } from '@/lib/content/home';

const stepImages = [
  '/testimonials/15M4kvkfOTEm4Aa0gaOHpjxbsg.png',
  '/testimonials/36gqztWcToPPHd22gfZKy1MeKM.png',
  '/testimonials/RnNDQCdRzWFSlr5xHMtOdaCwv0A.png',
  '/testimonials/wCeVqDNsespfMwpEZDJh9bvoe0.png',
];

function CardIcon({ index }) {
  const cls = 'h-6 w-6 text-sky-400';
  switch (index) {
    case 0:
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l5 5" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M12 4l8 4-8 4-8-4 8-4z" strokeLinejoin="round" />
          <path d="M4 12l8 4 8-4M4 16l8 4 8-4" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M4 18V8M9 18V5M14 18v-7M19 18V10" strokeLinecap="round" />
        </svg>
      );
  }
}

export function HowWeWorkTimeline() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const visibleDesktop = new Set();
    const visibleMobile = new Set();

    const desktopObserver = new IntersectionObserver(
      entries => {
        let changed = false;
        entries.forEach(entry => {
          const idxStr = entry.target.getAttribute('data-index');
          if (idxStr !== null) {
            const idx = Number(idxStr);
            if (entry.isIntersecting) {
              visibleDesktop.add(idx);
              changed = true;
            } else {
              visibleDesktop.delete(idx);
              changed = true;
            }
          }
        });
        if (changed && visibleDesktop.size > 0) {
          const maxIdx = Math.max(...Array.from(visibleDesktop));
          setActiveIndex(maxIdx);
        }
      },
      {
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0,
      }
    );

    const mobileObserver = new IntersectionObserver(
      entries => {
        let changed = false;
        entries.forEach(entry => {
          const idxStr = entry.target.getAttribute('data-index');
          if (idxStr !== null) {
            const idx = Number(idxStr);
            if (entry.isIntersecting) {
              visibleMobile.add(idx);
              changed = true;
            } else {
              visibleMobile.delete(idx);
              changed = true;
            }
          }
        });
        if (changed && visibleMobile.size > 0) {
          const maxIdx = Math.max(...Array.from(visibleMobile));
          setActiveIndex(maxIdx);
        }
      },
      {
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0,
      }
    );

    const desktopCards = cardRefs.current.slice(0, 4).filter(Boolean);
    desktopCards.forEach(card => desktopObserver.observe(card));

    const mobileCards = cardRefs.current.slice(4, 8).filter(Boolean);
    mobileCards.forEach(card => mobileObserver.observe(card));

    return () => {
      desktopObserver.disconnect();
      mobileObserver.disconnect();
    };
  }, []);


  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          
          {/* LEFT SIDE — Sticky Image Reel (Fade-in layout) */}
          <div className="hidden lg:block lg:order-1">
            <div className="sticky top-[calc(50vh-260px)]">
              {/* Outer HUD Stage Frame */}
              <div className="relative h-[520px] w-full overflow-hidden rounded-[28px] border border-white/[0.12] bg-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                
                {/* Fade-in Image Reel */}
                {processSteps.map((step, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 1.05,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 h-full w-full overflow-hidden"
                      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                    >
                      <Image
                        src={stepImages[stepImages.length - 1 - index] ?? step.image}
                        alt={step.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={index === 0}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    </motion.div>
                  );
                })}

                {/* HUD Bottom Info Bar */}
                <div className="absolute bottom-4 inset-x-4 z-30 overflow-hidden rounded-[18px] border border-white/15 bg-black/80 px-6 py-3.5 backdrop-blur-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-[#12ced6] animate-pulse" />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#12ced6]">
                        Stage 0{processSteps[activeIndex].step}
                      </p>
                    </div>
                    <p className="mt-0.5 text-base font-semibold text-white">
                      {processSteps[activeIndex].title}
                    </p>
                  </div>

                  {/* Vehicle selection step dots */}
                  <div className="flex gap-1.5">
                    {processSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 transition-all duration-500 rounded-full ${
                          activeIndex === i ? 'w-6 bg-[#12ced6]' : 'w-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Header, Subtitle, and Process Cards (Text part) */}
          <div className="lg:order-2">
            {/* Pill */}
            <div className="relative mx-auto mb-10 flex w-fit overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-[''] lg:mx-0 lg:inline-flex">
              How We Work?
            </div>

            <BlurTextReveal
              as="h2"
              text="Our proven growth process"
              className="mx-auto max-w-[22rem] text-center text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-[1.0] tracking-tight text-foreground lg:mx-0 lg:text-left"
            />

            <p className="mt-5 max-w-[30rem] text-sm leading-relaxed text-muted sm:text-base">
              We blend strategy, creativity, and data to design campaigns that grab attention,
              foster engagement, and drive tangible results.
            </p>

            {/* Desktop view: Vertical stack of cards */}
            <div className="hidden lg:flex flex-col mt-12 pb-[20vh]">
              {processSteps.map((step, index) => {
                const isActive = activeIndex === index;
                return (
                  <article
                    key={step.step}
                    ref={el => {
                      cardRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={`sticky group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[20px] border p-6 transition-all duration-500 sm:min-h-[320px] sm:p-8 backdrop-blur-xl hover:border-[#12ced6]/50 ${
                      isActive
                        ? 'border-[#12ced6]/30 bg-[#06101c]/95 shadow-xl'
                        : 'border-white/[0.08] bg-black/95 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]'
                    }`}
                    style={{
                      top: `calc(50vh - 160px + ${index * 16}px)`, 
                      marginTop: index === 0 ? '0' : '60vh', 
                      zIndex: 10 + index
                    }}
                  >
                    {/* Glowing top border on active/hover */}
                    <div
                      className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#12ced6] to-transparent transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                      }`}
                    />

                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? 'border-[#12ced6]/40 bg-[#12ced6]/15 shadow-[0_0_15px_rgba(18,206,214,0.3)]'
                            : 'border-white/10 bg-white/[0.06] group-hover:border-[#12ced6]/30'
                        }`}
                      >
                        <CardIcon index={index} />
                      </div>
                      <span
                        className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
                          isActive ? 'text-[#12ced6]' : 'text-muted'
                        }`}
                      >
                        0{index + 1} / 04
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-2xl font-semibold tracking-tight transition-colors sm:text-3xl ${
                          isActive ? 'text-white' : 'text-foreground/90'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <div
                        className={`my-4 h-px w-full transition-colors ${
                          isActive ? 'bg-[#12ced6]/30' : 'bg-white/10'
                        }`}
                      />
                      <p className="text-sm leading-relaxed text-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile/Tablet view: Vertical Sticky Overlapping Cards */}
            <div className="lg:hidden mt-12 relative w-full px-1 sm:px-4">
              {/* Sticky Image Reel */}
              <div className="sticky top-[8vh] z-0 h-[280px] w-full overflow-hidden rounded-[24px] border border-white/[0.12] bg-black/90 shadow-xl">
                {processSteps.map((step, index) => (
                  <Image
                    key={index}
                    src={stepImages[stepImages.length - 1 - index] ?? step.image}
                    alt={step.imageAlt}
                    fill
                    className={`object-cover transition-opacity duration-700 ease-in-out ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 1024px) 100vw"
                    priority={index === 0}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                {/* HUD Bottom Info Bar */}
                <div className="absolute bottom-4 inset-x-4 z-10 overflow-hidden rounded-[16px] border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#12ced6] animate-pulse" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#12ced6]">
                      Stage 0{processSteps[activeIndex].step}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-white truncate">
                    {processSteps[activeIndex].title}
                  </p>
                </div>
              </div>

              {/* Overlapping Cards */}
              <div className="relative z-10 pb-[20vh] -mt-[60px]">
                {processSteps.map((step, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <article
                      key={step.step}
                      ref={el => {
                        cardRefs.current[processSteps.length + index] = el;
                      }}
                      data-index={index}
                      className={`sticky group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[20px] border p-6 transition-all duration-500 backdrop-blur-xl sm:p-8 hover:border-[#12ced6]/50 ${
                        isActive
                          ? 'border-[#12ced6]/30 bg-[#06101c]/95 shadow-xl'
                          : 'border-white/[0.08] bg-black/95 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]'
                      }`}
                      style={{
                        top: `calc(8vh + 280px + 16px + ${index * 14}px)`, 
                        marginTop: index === 0 ? '60px' : '50vh', 
                        zIndex: 10 + index
                      }}
                    >
                      {/* Glowing top border on active/hover */}
                      <div
                        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#12ced6] to-transparent transition-opacity duration-500 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                        }`}
                      />

                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                            isActive
                              ? 'border-[#12ced6]/40 bg-[#12ced6]/15 shadow-[0_0_15px_rgba(18,206,214,0.3)]'
                              : 'border-white/10 bg-white/[0.06] group-hover:border-[#12ced6]/30'
                          }`}
                        >
                          <CardIcon index={index} />
                        </div>
                        <span
                          className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
                            isActive ? 'text-[#12ced6]' : 'text-muted'
                          }`}
                        >
                          0{index + 1} / 04
                        </span>
                      </div>

                      <div className="mt-6">
                        <h3
                          className={`text-xl font-semibold tracking-tight transition-colors sm:text-2xl ${
                            isActive ? 'text-white' : 'text-foreground/90'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <div
                          className={`my-4 h-px w-full transition-colors ${
                            isActive ? 'bg-[#12ced6]/30' : 'bg-white/10'
                          }`}
                        />
                        <p className="text-sm leading-relaxed text-muted sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
