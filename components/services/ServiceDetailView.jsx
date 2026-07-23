import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';

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

          <div className="mt-6 grid grid-cols-1 gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 0.05}>
                <div className="h-full transform-gpu rounded-[18px] bg-card transition-transform duration-500 ease-out motion-safe:hover:scale-[1.02]">
                  <div className="flex min-h-[280px] flex-col justify-between p-6 sm:p-7">
                    <span className="text-sm font-semibold text-foreground/50">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>

        <Container className="relative z-10 mt-12 max-w-3xl">
          {/* Overview */}
          <Reveal delay={0.05}>
            <BlurTextReveal
              as="h2"
              text="Service overview"
              className="text-xl font-semibold text-foreground sm:text-2xl"
            />

            {service.overview.map((p, idx) => (
              <p key={idx} className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {p}
              </p>
            ))}
            <p className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
              <span className="font-semibold text-foreground">Who it&apos;s for: </span>
              {service.whoFor}
            </p>
          </Reveal>

          {/* Tools & platforms */}
          <Reveal delay={0.1}>
            <BlurTextReveal
              as="h2"
              text="Tools & platforms"
              className="mt-12 text-xl font-semibold text-foreground sm:text-2xl"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {service.tools.map(t => (
                <span
                  key={t}
                  className="rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Industries */}
          <Reveal delay={0.15}>
            <BlurTextReveal
              as="h2"
              text="Recommended for"
              className="mt-12 text-xl font-semibold text-foreground sm:text-2xl"
            />

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {service.industries.map(ind => (
                <li
                  key={ind}
                  className="flex items-center gap-2 text-sm leading-relaxed text-muted sm:text-base"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-foreground/60"
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {ind}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Results + CTA */}
          <Reveal delay={0.2}>
            <div className="mt-14 rounded-[18px] border border-white/[0.08] bg-card p-8 text-center">
              <p className="text-lg font-medium text-foreground">
                Want results from {service.title}?
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/project?service=${service.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-foreground transition hover:border-white/30"
                >
                  See Results
                </Link>
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background transition hover:bg-foreground/90"
                >
                  Get a Quote for this Service
                </Link>
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
