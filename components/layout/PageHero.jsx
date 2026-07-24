import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { Badge } from '@/components/ui/Badge';

export function PageHero({
  badge,
  title,
  titleLine1,
  titleLine2,
  description,
  children,
  videoSrc = 'https://res.cloudinary.com/diqnwnz6x/video/upload/v1779957986/herovideo2_qdgibs.mp4',
  center = true,
  className = '',
}) {
  const line1 = titleLine1 || title;

  return (
    <section className={`relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-44 ${className}`}>
      {/* Background Video */}
      {videoSrc && (
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
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Hero Content */}
      <Container className="relative z-10">
        <Reveal className={`flex flex-col ${center ? 'items-center text-center' : 'items-start text-left'}`}>
          {badge && (typeof badge === 'string' ? <Badge>{badge}</Badge> : badge)}

          {line1 && (
            <BlurTextReveal
              as="h1"
              text={line1}
              className={`mt-6 text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-foreground ${
                center ? 'lg:mx-auto' : ''
              }`}
            />
          )}

          {titleLine2 && (
            <BlurTextReveal
              as="h1"
              text={titleLine2}
              delay={0.3}
              className={`mt-1 text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-foreground ${
                center ? 'lg:mx-auto' : ''
              }`}
            />
          )}

          {description && (
            <p
              className={`mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${
                center ? 'lg:mx-auto' : ''
              }`}
            >
              {description}
            </p>
          )}

          {children}
        </Reveal>
      </Container>

      {/* Fade overlay blending hero seamlessly into dark page sections below */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
