import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { getAllServices } from '@/lib/content/services';

export const metadata = {
  title: 'Our Services',
};

export default function ServicesIndexPage() {
  const services = getAllServices();

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
              Our Services
            </div>
            <BlurTextReveal
              as="h1"
              text="Built to Grow"
              className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto"
            />

            <BlurTextReveal
              as="h1"
              text="Modern Brands"
              delay={0.4}
              className="mt-1 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto"
            />

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-auto">
              A full-service offering — strategy, design, content, and paid media — engineered to
              make your brand visible, credible, and profitable.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="relative z-10 -mt-[34vh] sm:-mt-[34vh]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.slug} delay={idx * 0.06}>
              <Link
                href={`/services/${s.slug}`}
                className="group block h-full overflow-hidden rounded-card bg-card transition"
              >
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
                  <span className="text-lg font-semibold text-foreground">{s.title}</span>
                  <p className="text-sm leading-relaxed text-muted">{s.body}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#12ced6]">
                    Learn more →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
