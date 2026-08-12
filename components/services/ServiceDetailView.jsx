import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { PortfolioGlimpse } from '@/components/services/PortfolioGlimpse';

export function ServiceDetailView({ service, others }) {
  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32">
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
        </div>

        <Container className="relative z-10 -translate-y-[8vh] sm:-translate-y-[10vh]">
          <Reveal className="lg:text-center">
            <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
              Our Services
            </div>
            <BlurTextReveal
              as="h1"
              text={service.title}
              className="mt-6 max-w-4xl text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-tight text-white lg:mx-auto"
            />

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg lg:mx-auto">
              {service.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-2 lg:justify-center">
              {service.subServices.map(s => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>

        {/* fades hero into black below */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* Overlapping hero image — pulls up so it sits half over the hero */}
      <Container className="relative z-20 -mt-[28vh] sm:-mt-[32vh]">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-white/[0.02] shadow-2xl">
            <Image
              src={service.bgImage}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </Reveal>
      </Container>

      <section className="relative py-12 sm:py-16">
        {/* reinforces black at the very top of this section */}
        <div className="pointer-events-none absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-black to-transparent" />
        {/* How we execute */}
        <Container className="relative z-10">
          <BlurTextReveal
            as="h2"
            text="How we execute it"
            className="text-xl font-semibold text-foreground sm:text-2xl"
          />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, idx) => (
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
                  {service.overview.map((p, idx) => (
                    <p key={idx} className="text-base leading-relaxed text-white/70 sm:text-lg">
                      {p}
                    </p>
                  ))}
                </div>
                
                <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#12ced6]/10 to-transparent p-6 sm:p-8 border border-[#12ced6]/20 relative overflow-hidden shadow-[0_0_30px_rgba(18,206,214,0.05)]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#12ced6] shadow-[0_0_15px_rgba(18,206,214,1)]" />
                  <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#12ced6] uppercase mb-3">Who it's for</h4>
                  <p className="text-base font-medium text-white/90 leading-relaxed">
                    {service.whoFor}
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
                  {service.tools.map((t) => (
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
                  {service.industries.map((ind) => (
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
                  Ready to elevate your <span className="text-[#12ced6]">{service.title}</span>?
                </h3>
                <p className="mt-3 text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                  Partner with us to build strategies that drive measurable growth and long-lasting impact.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/project?service=${service.slug}`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 backdrop-blur-md"
                  >
                    See Results
                  </Link>
                  <Link
                    href={`/contact?service=${service.slug}`}
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

      <section className="py-16">
        <Container>
          <BlurTextReveal
            as="h2"
            text="Explore more services"
            className="text-2xl font-semibold text-foreground"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(s => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-card bg-[#0d0d0b] px-5 py-4 text-sm font-semibold text-foreground transition hover:bg-[#141412]"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
