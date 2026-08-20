'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';

const serviceIcons = {
  'digital-marketing': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'performance-marketing': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  ),
  'seo': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  ),
  'web-development': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  ),
  'branding': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  ),
  'influencer-marketing': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  )
};

export function ServicesClient({ services }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Read initial tab from URL query params (e.g. ?tab=web-development)
  const queryTab = searchParams.get('tab');
  const initialSlug = services.some(s => s.slug === queryTab) ? queryTab : services[0]?.slug;
  
  const [activeSlug, setActiveSlug] = useState(initialSlug);

  // Synchronize state when query tab changes (e.g. back button navigation)
  useEffect(() => {
    if (queryTab && services.some(s => s.slug === queryTab)) {
      setActiveSlug(queryTab);
    }
  }, [queryTab, services]);

  const handleTabChange = (slug) => {
    setActiveSlug(slug);
    // Update the URL search params without refreshing the page
    const params = new URLSearchParams(window.location.search);
    params.set('tab', slug);
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  const activeService = services.find(s => s.slug === activeSlug) || services[0];

  return (
    <section className="pb-24">
      {/* Hero Section */}
      <div className="relative flex min-h-[75vh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
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
          <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent to-black" />
        </div>

        <Container className="relative -mt-[10vh] sm:-mt-[15vh] z-10">
          <Reveal className="lg:text-center">
            <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
              Our Services
            </div>
            
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto">
              Built to Grow
            </h1>
            <h1 className="mt-1 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto">
              Modern Brands
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-auto">
              A full-service offering — strategy, design, content, and paid media — engineered to
              make your brand visible, credible, and profitable.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* Tabs Container */}
      <Container className="relative z-15 -mt-[15vh] sm:-mt-[10vh] max-w-6xl">
        <Reveal>
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#12ced6]/80 mb-6 text-center">
            Select a service to explore
          </div>
        </Reveal>

        {/* Pill-shaped Standalone Tabs */}
        <Reveal>
          <div className="mx-auto w-max max-w-full flex flex-row overflow-x-auto flex-nowrap items-center gap-3 py-2 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
            {services.map((s) => {
              const isActive = s.slug === activeSlug;

              return (
                <motion.button
                  key={s.slug}
                  onClick={() => handleTabChange(s.slug)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`relative flex items-center justify-center px-6 py-2.5 rounded-full sm:rounded-3xl border text-[11px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 outline-none shrink-0 text-center whitespace-nowrap leading-[1.4] ${
                    isActive 
                      ? 'border-[#12ced6] bg-black text-white shadow-[0_0_15px_rgba(18,206,214,0.12)]' 
                      : 'border-white/10 bg-black/40 text-white/60 hover:text-white/90 hover:border-white/30'
                  }`}
                >
                  {s.slug === 'visual-branding-and-design' ? (
                    <span>
                      Visual Branding &amp; <br /> Design
                    </span>
                  ) : s.slug === 'content-creation-and-reels' ? (
                    <span>
                      Content Creation &amp; <br /> Reels
                    </span>
                  ) : (
                    s.title
                  )}
                </motion.button>
              );
            })}
          </div>
        </Reveal>
      </Container>

      {/* Respective Service Data Section */}
      <Container className="mt-16 sm:mt-20 max-w-6xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.slug}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            {/* 1. Main Info: Title, Tagline, Badges & Hero Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex rounded-full border border-[#12ced6]/20 bg-[#12ced6]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#12ced6]">
                  Service Details
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
                  {activeService.title}
                </h2>
                
                <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                  {activeService.tagline}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeService.subServices.map(sub => (
                    <span
                      key={sub}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overlapping/Elevated visual Image card with glow */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full overflow-hidden rounded-2xl bg-white/[0.02] shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/[0.08] group">
                  <Image
                    src={activeService.bgImage}
                    alt={activeService.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* 2. Process Section */}
            <div className="border-t border-white/[0.06] pt-12">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.2em] text-[#12ced6]/80 font-semibold">Our Methodology</span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
                  How we execute it
                </h3>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {activeService.process.map((step, idx) => (
                  <div 
                    key={step.title} 
                    className="h-full rounded-[20px] bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden group"
                  >
                    {/* Background hover light effect */}
                    <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[#12ced6]/5 blur-2xl group-hover:bg-[#12ced6]/10 transition-colors duration-500" />
                    
                    <span className="text-lg font-bold text-[#12ced6]/40 group-hover:text-[#12ced6]/80 transition-colors duration-300">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    
                    <div className="mt-8">
                      <h4 className="text-base font-semibold text-foreground">{step.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Overview & Tools/Industries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-white/[0.06] pt-12">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl font-semibold text-white">
                  Service overview
                </h3>
                
                {activeService.overview.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
                
                <div className="bg-[#12ced6]/5 border border-[#12ced6]/10 rounded-2xl p-5 mt-4">
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                    <span className="font-semibold text-white">Who it&apos;s for: </span>
                    {activeService.whoFor}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                {/* Tools & Platforms */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Tools & platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeService.tools.map(t => (
                      <span
                        key={t}
                        className="rounded-full bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-xs font-semibold text-foreground/80 hover:text-white transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recommended for
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.industries.map(ind => (
                      <li
                        key={ind}
                        className="flex items-center gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#12ced6]/10 text-[#12ced6]">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        <span className="text-foreground/90 font-medium">{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Results + CTA Block */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#0e0f11] relative overflow-hidden p-8 sm:p-12 text-center before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/30 before:to-transparent">
              {/* Background gradient orb */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#12ced6]/5 to-transparent pointer-events-none" />
              
              <h3 className="text-xl sm:text-2xl font-bold text-white relative z-10">
                Ready to scale your brand with {activeService.title}?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-muted max-w-md mx-auto relative z-10">
                Let&apos;s build a custom plan engineered around your goals.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
                <Link
                  href={`/project?service=${activeService.slug}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 px-8 text-sm font-semibold text-foreground transition-all duration-300"
                >
                  See Results
                </Link>
                <Link
                  href={`/contact?service=${activeService.slug}`}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white hover:bg-white/90 px-8 text-sm font-semibold text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
