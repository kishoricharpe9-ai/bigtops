import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { blogPosts } from '@/lib/content/blog';

export const metadata = {
  title: 'Blogs',
};

export default function BlogIndexPage() {
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

        <Container className="relative -mt-[32vh] sm:-mt-[18vh]">
          <Reveal className="lg:text-center">
            <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
              Blogs
            </div>
            <BlurTextReveal
              as="h1"
              text="Explore Our"
              className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto"
            />

            <BlurTextReveal
              as="h1"
              text="Insight-Driven Thinking"
              delay={0.4}
              className="mt-1 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:mx-auto"
            />

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-auto">
              Strategic insights, marketing clarity, and growth-focused thinking from Bigtopsocial.
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="relative z-10 -mt-[48vh] sm:-mt-[34vh]">
        <div className="grid gap-5 sm:grid-cols-2">
          {blogPosts.map((post, idx) => (
            <Reveal key={post.slug} delay={idx * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[18px] bg-card">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5">
                      <h2 className="text-base font-semibold leading-snug text-white">
                        {post.title}
                      </h2>
                      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
