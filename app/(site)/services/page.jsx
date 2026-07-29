import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { getAllServices } from '@/lib/content/services';

export const metadata = {
  title: 'Our Services',
};

const bentoConfig = {
  'digital-marketing': {
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-2 lg:row-span-2',
    minHeight: 'min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    showBody: true
  },
  'performance-marketing': {
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1 lg:row-span-1',
    minHeight: 'min-h-[200px] lg:min-h-[240px]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    showBody: false
  },
  'seo': {
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1 lg:row-span-1',
    minHeight: 'min-h-[200px] lg:min-h-[240px]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    showBody: false
  },
  'web-development': {
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-1 lg:row-span-1',
    minHeight: 'min-h-[200px] lg:min-h-[240px]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    showBody: false
  },
  'branding': {
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1 lg:row-span-1',
    minHeight: 'min-h-[200px] lg:min-h-[240px]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    showBody: false
  },
  'influencer-marketing': {
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1 lg:row-span-1',
    minHeight: 'min-h-[200px] lg:min-h-[240px]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    showBody: false
  }
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

      <Container className="relative z-10 -mt-[34vh] sm:-mt-[20vh] max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((s, idx) => {
            const config = bentoConfig[s.slug] || bentoConfig['seo']; // fallback
            
            return (
              <Reveal key={s.slug} delay={idx * 0.05} className={`${config.colSpan} ${config.rowSpan} h-full`}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex flex-col justify-between h-full w-full rounded-2xl bg-[#0e0f11] border border-white/[0.06] p-6 sm:p-8 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12] overflow-hidden relative"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={s.bgImage}
                      alt={s.title}
                      fill
                      className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f11] via-[#0e0f11]/80 to-[#0e0f11]/20" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#12ced6]/0 to-[#12ced6]/0 opacity-0 group-hover:from-[#12ced6]/10 group-hover:to-transparent group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0" />
                  
                  {/* Top Icon */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.1] bg-black/40 backdrop-blur-sm text-white/90 group-hover:text-[#12ced6] group-hover:border-[#12ced6]/30 transition-colors duration-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {config.icon}
                    </svg>
                  </div>
                  
                  {/* Bottom Content */}
                  <div className={`relative z-10 flex flex-col items-start ${config.minHeight} justify-end`}>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight group-hover:text-white transition-colors duration-300">
                      {s.title}
                    </h3>
                    
                    {config.showBody && (
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted max-w-md">
                        {s.body}
                      </p>
                    )}
                    
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#12ced6] group-hover:text-[#25e9f3] transition-colors">
                      Learn more 
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
