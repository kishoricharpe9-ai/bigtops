import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';

function renderBlock(block, sectionIdx, blockIdx) {
  if (block.type === 'paragraphs') {
    return block.paragraphs.map((p, idx) => (
      <p
        key={`${sectionIdx}-${blockIdx}-p-${idx}`}
        className="mt-4 text-sm leading-relaxed text-muted sm:text-base"
      >
        {p}
      </p>
    ));
  }
  return (
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
      {block.items.map((item, idx) => (
        <li
          key={`${sectionIdx}-${blockIdx}-li-${idx}`}
          className="flex items-start gap-2 text-sm leading-relaxed text-muted sm:text-base"
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
            className="mt-1 shrink-0 text-foreground/60"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyView({ project }) {
  return (
    <>
      {/* Hero with looping video background */}
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
              Case Study · {project.date}
            </div>
            <BlurTextReveal
              as="h1"
              text={project.title}
              className="mt-6 max-w-4xl text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.05] tracking-tight text-foreground lg:mx-auto"
            />

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg lg:mx-auto">
              {project.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-2 lg:justify-center">
              {project.pills.map((p, idx) => (
                <span
                  key={`${p}-${idx}`}
                  className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>

        {/* fades hero into black below */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* Overlapping cover image */}
      <Container className="relative z-20 -mt-[28vh] sm:-mt-[32vh]">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-white/[0.02] shadow-2xl">
            <Image
              src={project.coverSrc}
              alt={project.coverAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </Reveal>
      </Container>

      {/* Meta + Live link */}
      <section className="relative py-12 sm:py-16">
        <div className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-black to-transparent" />
        <Container className="relative z-10">
          <Reveal>
            <div className="grid gap-8 rounded-[18px] border border-white/[0.08] bg-card p-6 sm:grid-cols-3 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {project.servicesLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{project.servicesValue}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {project.categoryLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{project.categoryValue}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {project.clientLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{project.clientValue}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <a
              href={project.liveHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-foreground transition hover:border-[#12ced6]/50 hover:bg-white/[0.04]"
            >
              View Live Website →
            </a>
          </Reveal>
        </Container>
      </section>

      {/* Case-study content blocks */}
      <section className="pb-6">
        <Container className="max-w-3xl">
          {project.blocks.map((section, i) => (
            <Reveal key={section.heading + String(i)} delay={i * 0.05}>
              <BlurTextReveal
                as="h2"
                text={section.heading}
                className="mt-14 text-xl font-semibold text-foreground first:mt-0 sm:text-2xl"
              />

              {section.content.map((c, j) => (
                <div key={j}>{renderBlock(c, i, j)}</div>
              ))}
            </Reveal>
          ))}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="rounded-[18px] border border-white/[0.08] bg-card p-8 text-center">
              <p className="text-lg font-medium text-foreground">
                Want results like {project.clientValue}?
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/how-we-can-help"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-foreground transition hover:border-white/30"
                >
                  Find Your Fit
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background transition hover:bg-foreground/90"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* More cases */}
      <section className="border-t border-white/[0.06] py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <BlurTextReveal
              as="h2"
              text="More case studies"
              className="text-2xl font-semibold text-foreground sm:text-3xl"
            />

            <Link
              href="/project"
              className="text-sm font-semibold text-foreground/80 underline-offset-4 hover:underline"
            >
              View more works →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.moreCases.map(c => (
              <Link
                key={c.slug}
                href={`/project/${c.slug}`}
                className="rounded-card bg-[#0d0d0b] px-5 py-4 text-sm font-semibold text-foreground transition hover:bg-[#141412]"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
