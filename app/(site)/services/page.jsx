import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { getAllServices } from '@/lib/content/services';
import { ServiceTabbedView } from '@/components/services/ServiceTabbedView';

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
              text="Comprehensive marketing"
              className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:mx-auto"
            />

            <BlurTextReveal
              as="h1"
              text="solutions built for growth"
              delay={0.4}
              className="mt-1 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:mx-auto"
            />

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-auto">
              End-to-end digital strategies designed to scale your business, elevate your brand, and drive measurable results across every touchpoint.
            </p>
          </Reveal>
        </Container>
      </div>

      <ServiceTabbedView services={services} />
    </section>
  );
}
