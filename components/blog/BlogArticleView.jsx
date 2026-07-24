import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';

export function BlogArticleView({ post }) {
  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-white/[0.06] pb-16 pt-28 sm:pt-32">
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

        <Container className="relative -mt-[24vh] sm:-mt-[14vh]">
          <p className="text-sm text-muted">{post.publishDate}</p>
          <BlurTextReveal
            as="h1"
            text={post.title}
            className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl"
          />

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-foreground/90">
              {post.category}
            </span>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-[46vh] pb-6 sm:-mt-[42vh]">
        <Container>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card sm:aspect-[16/9]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-8 border-y border-white/[0.06] py-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Category
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{post.category}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Publish date
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{post.publishDate}</p>
            </div>
          </div>
        </Container>
      </section>

      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          {post.sections.map((sec, i) => (
            <Reveal key={`${sec.heading}-${i}`} delay={i * 0.04}>
              <BlurTextReveal
                as="h2"
                text={sec.heading}
                className="mt-12 text-xl font-semibold text-foreground first:mt-0 sm:text-2xl"
              />

              {sec.paragraphs?.map((p, pi) => (
                <p
                  key={`${sec.heading}-p-${pi}`}
                  className="mt-4 text-sm leading-relaxed text-muted sm:text-base"
                >
                  {p}
                </p>
              ))}
              {sec.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-base">
                  {sec.bullets.map((b, bi) => (
                    <li key={`${sec.heading}-b-${bi}`}>{b}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </Container>
      </article>

      <section className="border-t border-white/[0.06] py-16">
        <Container>
          <BlurTextReveal
            as="h2"
            text="More articles"
            className="text-2xl font-semibold text-foreground"
          />

          <Link
            href="/blog"
            className="mt-3 inline-block text-sm font-semibold text-foreground/80 underline-offset-4 hover:underline"
          >
            View all blogs
          </Link>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {post.prev && (
              <Link
                href={`/blog/${post.prev.slug}`}
                className="rounded-card bg-[#0d0d0b] px-5 py-4 text-sm font-semibold text-foreground transition hover:bg-[#141412]"
              >
                ‹ {post.prev.title}
              </Link>
            )}
            {post.next && (
              <Link
                href={`/blog/${post.next.slug}`}
                className="rounded-card bg-[#0d0d0b] px-5 py-4 text-sm font-semibold text-foreground transition hover:bg-[#141412] sm:text-right"
              >
                {post.next.title} ›
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
