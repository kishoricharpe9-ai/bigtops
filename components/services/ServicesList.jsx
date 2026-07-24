'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';

export function ServicesList({ services }) {
  const [activeService, setActiveService] = useState(null);



  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Container className="relative z-10 -mt-[34vh] sm:-mt-[34vh]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.slug} delay={idx * 0.06}>
              <motion.div
                layoutId={`card-container-${s.slug}`}
                onClick={() => setActiveService(s)}
                className="group relative block h-full overflow-hidden rounded-card border border-white/[0.08] bg-[#0a0a0a]/95 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#12ced6]/60 hover:shadow-[0_12px_30px_rgba(18,206,214,0.15)] cursor-pointer"
              >
                {/* Glowing top border accent on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#12ced6] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />

                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={s.bgImage}
                    alt={s.title}
                    fill
                    loading="lazy"
                    className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col gap-2 px-5 py-5">
                  <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-white">
                    {s.title}
                  </span>
                  <p className="text-sm leading-relaxed text-muted transition-colors group-hover:text-foreground/80">
                    {s.body}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#12ced6] transition-colors duration-300">
                    Learn more
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Floating Detailed Card Modal */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md z-0"
            />

            {/* Modal Card Container */}
            <motion.div
              layoutId={`card-container-${activeService.slug}`}
              data-lenis-prevent
              className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto !overscroll-auto rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            >
              {/* Top accent glow line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#12ced6] to-transparent z-20" />

              {/* Close Button */}
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-black/80"
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Hero Image */}
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <Image
                  src={activeService.bgImage}
                  alt={activeService.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/30 to-black/10" />
              </div>

              {/* Content body */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.35 }}
                className="px-6 py-6 sm:px-10 sm:py-8"
              >
                {/* Badge */}
                <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#12ced6] before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
                  Our Services
                </div>

                {/* Title & Tagline */}
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {activeService.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {activeService.tagline}
                </p>

                {/* Sub-services tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeService.subServices.map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                <hr className="my-8 border-white/[0.08]" />

                {/* Grid info: Overview & Recommended for */}
                <div className="grid gap-8 md:grid-cols-3">
                  {/* Service Overview */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-white">Service Overview</h3>
                    {activeService.overview.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                        {para}
                      </p>
                    ))}
                    <p className="text-sm leading-relaxed text-foreground/90 sm:text-base pt-2">
                      <span className="font-semibold text-white">Who it&apos;s for: </span>
                      {activeService.whoFor}
                    </p>
                  </div>

                  {/* Tools & Recommended for */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Tools & Platforms</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {activeService.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-white/[0.05] px-2.5 py-1 text-xs text-foreground/95"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Recommended for</h3>
                      <ul className="space-y-2">
                        {activeService.industries.map((ind) => (
                          <li
                            key={ind}
                            className="flex items-center gap-2 text-xs sm:text-sm text-muted"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="shrink-0 text-[#12ced6]"
                              aria-hidden
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            {ind}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <hr className="my-8 border-white/[0.08]" />

                {/* How we execute section */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">How we execute it</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {activeService.process.map((step, idx) => (
                      <div
                        key={step.title}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 flex flex-col justify-between min-h-[170px]"
                      >
                        <span className="text-xs font-semibold text-white/30">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-muted">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action Box */}
                <div className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
                  <p className="text-base font-medium text-white sm:text-lg">
                    Want results from {activeService.title}?
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`/project?service=${activeService.slug}`}
                      onClick={() => setActiveService(null)}
                      className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 px-6 text-xs sm:text-sm font-semibold text-foreground transition-colors hover:border-white/30 hover:bg-white/[0.02]"
                    >
                      See Results
                    </Link>
                    <Link
                      href={`/contact?service=${activeService.slug}`}
                      onClick={() => setActiveService(null)}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-[#12ced6] px-6 text-xs sm:text-sm font-semibold text-black transition-opacity hover:opacity-90"
                    >
                      Get a Quote for this Service
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
