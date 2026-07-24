import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { projectTeasers } from '@/lib/content/projects';

export const metadata = {
  title: 'Explore Our Portfolio',
};

export default function ProjectIndexPage() {
  return (
    <section className="pb-24">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32">
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

        <Container className="relative -mt-[30vh] sm:-mt-[24vh]">
          <Reveal className="lg:text-center">
            <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
              Explore Our Portfolio
            </div>
            <BlurTextReveal
              as="h1"
              text="Explore Our"
              className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto"
            />

            <BlurTextReveal
              as="h1"
              text="Impactful Projects"
              delay={0.4}
              className="mt-1 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto"
            />

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-auto">
              From ambitious startups to established brands, we build powerful digital experiences
              that elevate presence and drive measurable results.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="relative z-10 -mt-[46vh] sm:-mt-[34vh]">
        <div className="grid gap-6 sm:grid-cols-2">
          {projectTeasers.map((p, idx) => (
            <Reveal key={p.slug} delay={idx * 0.06}>
              <Link
                href={`/project/${p.slug}`}
                className="group block overflow-hidden rounded-card border border-white/[0.08] bg-card transition hover:border-white/20"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    unoptimized
                    loading="lazy"
                    className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="text-lg font-semibold text-foreground">{p.title}</span>
                  <span className="text-sm text-foreground/70">{p.year}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
