"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { AnimatePresence, motion } from 'framer-motion';
import { PortfolioGlimpse } from '@/components/services/PortfolioGlimpse';

export function ServiceTabbedView({ services }) {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const activeService = services.find((s) => s.slug === activeSlug);

  return (
    <>
      <Container className="relative z-10 -mt-[34vh] sm:-mt-[20vh] max-w-7xl">
        <Reveal delay={0.2} className="mb-16 flex flex-wrap justify-center gap-3">
          {services.map((s) => (
            <button
              key={`tab-${s.slug}`}
              onClick={() => setActiveSlug(s.slug)}
              className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeSlug === s.slug
                  ? 'border-[#12ced6] bg-[#12ced6]/10 text-white shadow-[0_0_15px_rgba(18,206,214,0.3)]'
                  : 'border-white/10 bg-black/60 text-white/80 hover:border-[#12ced6]/50 hover:bg-[#12ced6]/10 hover:text-white hover:shadow-[0_0_15px_rgba(18,206,214,0.3)]'
              } backdrop-blur-md`}
            >
              {s.title}
            </button>
          ))}
        </Reveal>
      </Container>

      <div className="relative min-h-[800px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Overlapping hero image for the selected service */}
            <Container className="relative z-20">
              <Reveal>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-white/[0.02] shadow-2xl">
                  <Image
                    src={activeService.bgImage}
                    alt={activeService.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 sm:p-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                      {activeService.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
                      {activeService.tagline}
                    </p>
                  </div>
                </div>
              </Reveal>
            </Container>

            <section className="relative py-12 sm:py-16">
              {/* How we execute */}
              <Container className="relative z-10">
                <BlurTextReveal
                  as="h2"
                  text="How we execute it"
                  className="text-xl font-semibold text-foreground sm:text-2xl"
                />

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {activeService.process.map((step, idx) => (
                    <Reveal key={step.title} delay={idx * 0.05} className="h-full">
                      <div className="group relative h-full transform-gpu overflow-hidden rounded-[24px] border border-white/10 transition-all duration-500 ease-out motion-safe:hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(18,206,214,0.15)]">
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={`/process/step-${idx + 1}.jpg`}
                            alt=""
                            fill
                            className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 transition-opacity duration-500 group-hover:opacity-80" />
                        </div>

                        <div className="relative z-10 flex min-h-[280px] flex-col justify-between p-6 sm:p-8">
                          <span className="text-xl font-bold text-white/30 transition-colors duration-500 group-hover:text-[#12ced6]/60">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="text-lg font-semibold text-white tracking-tight">{step.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/70">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Container>

              <Container className="relative z-10 mt-16 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                  {/* Left Column: Overview */}
                  <div className="lg:col-span-7 xl:col-span-8">
                    <Reveal delay={0.05}>
                      <BlurTextReveal
                        as="h2"
                        text="Service overview"
                        className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                      />
                      <div className="mt-6 space-y-5">
                        {activeService.overview.map((p, idx) => (
                          <p key={idx} className="text-base leading-relaxed text-white/70 sm:text-lg">
                            {p}
                          </p>
                        ))}
                      </div>
                      
                      <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#12ced6]/10 to-transparent p-6 sm:p-8 border border-[#12ced6]/20 relative overflow-hidden shadow-[0_0_30px_rgba(18,206,214,0.05)]">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#12ced6] shadow-[0_0_15px_rgba(18,206,214,1)]" />
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#12ced6] uppercase mb-3">Who it's for</h4>
                        <p className="text-base font-medium text-white/90 leading-relaxed">
                          {activeService.whoFor}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Right Column: Tools & Industries */}
                  <div className="lg:col-span-5 xl:col-span-4 space-y-12 mt-12 lg:mt-0">
                    {/* Tools & platforms */}
                    <Reveal delay={0.1}>
                      <BlurTextReveal
                        as="h3"
                        text="Tools & platforms"
                        className="text-lg font-bold tracking-tight text-white mb-5"
                      />
                      <div className="flex flex-wrap gap-2.5">
                        {activeService.tools.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-white/80 transition-all hover:bg-[#12ced6]/10 hover:border-[#12ced6]/40 hover:text-white"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Reveal>

                    {/* Industries */}
                    <Reveal delay={0.15}>
                      <BlurTextReveal
                        as="h3"
                        text="Recommended for"
                        className="text-lg font-bold tracking-tight text-white mb-5"
                      />
                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {activeService.industries.map((ind) => (
                          <li
                            key={ind}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#12ced6]/30 transition-all hover:bg-white/[0.04] group"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50 group-hover:bg-[#12ced6]/20 group-hover:text-[#12ced6] transition-colors">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>
                </div>

                <PortfolioGlimpse />

                {/* Results + CTA */}
                <Reveal delay={0.2}>
                  <div className="mt-14 relative overflow-hidden rounded-[24px] border border-[#12ced6]/20 bg-black p-10 sm:p-14 text-center shadow-[0_0_40px_rgba(18,206,214,0.1)] group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#12ced6]/10 via-transparent to-[#12ced6]/5 opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#12ced6]/20 blur-[80px] pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#12ced6]/20 blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Ready to elevate your <span className="text-[#12ced6]">{activeService.title}</span>?
                      </h3>
                      <p className="mt-3 text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                        Partner with us to build strategies that drive measurable growth and long-lasting impact.
                      </p>
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                          href={`/project?service=${activeService.slug}`}
                          className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 backdrop-blur-md"
                        >
                          See Results
                        </Link>
                        <Link
                          href={`/contact?service=${activeService.slug}`}
                          className="inline-flex h-12 items-center justify-center rounded-full bg-[#12ced6] px-8 text-sm font-bold text-black transition-all hover:bg-[#25e9f3] hover:scale-105 shadow-[0_0_20px_rgba(18,206,214,0.4)]"
                        >
                          Get a Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </Container>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
