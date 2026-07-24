import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { aboutTeam, awards, industries } from '@/lib/content/about';
import { stats, testimonials } from '@/lib/content/home';

export const metadata = {
  title: 'About Us',
};

function Badge({ children }) {
  return (
    <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
      {children}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-44 sm:pb-20 sm:pt-52">
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
        <Container className="relative">
          <Reveal className="flex flex-col items-center text-center">
            <Badge>About Us</Badge>
            <BlurTextReveal
              as="h1"
              text="Where brands"
              className="mt-8 text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] tracking-tight text-foreground"
            />

            <BlurTextReveal
              as="h1"
              text="become unforgettable"
              delay={0.4}
              className="mt-0 text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] tracking-tight text-foreground"
            />

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              A team of creators and marketers elevating brands with powerful content and campaigns.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div className="group relative overflow-hidden rounded-[24px] bg-white/[0.02]">
              <Image
                src="https://res.cloudinary.com/diqnwnz6x/image/upload/v1779963938/Relaxed-Team-Portrait-Rumble-Melbourne_m5ykm7.jpg"
                alt="The Bigtopsocial team"
                width={1600}
                height={900}
                priority
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </Reveal>
        </Container>

        {/* fades hero into black below */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* ── OUR STORY ── */}
      <section className="relative py-16 sm:py-24">
        {/* reinforces black at the very top of this section */}
        <div className="pointer-events-none absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-black to-transparent" />
        <Container>
          <Reveal className="flex flex-col items-start">
            <Badge>Our Story</Badge>
            <BlurTextReveal
              as="h2"
              text="Established in 2014, driven by"
              className="mt-8 max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            />

            <BlurTextReveal
              as="h2"
              text="creativity & innovation continuously."
              delay={0.2}
              className="mt-1 max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <Reveal key={s.numeral} delay={idx * 0.05}>
                <div className="h-full transform-gpu rounded-[18px] bg-card transition-transform duration-500 ease-out motion-safe:hover:scale-[1.02]">
                  <div className="flex min-h-[280px] flex-col justify-between p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-foreground">{s.numeral}</span>
                      <span className="text-right text-xs text-muted">{s.label}</span>
                    </div>
                    <div className="mt-12 flex items-end gap-1">
                      <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        {s.value}
                      </span>
                      <span className="pb-1 text-lg font-semibold text-muted">{s.suffix}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <p className="max-w-2xl text-lg font-medium leading-relaxed text-foreground/90">
              At Bigtopsocial, we believe powerful marketing blends strategy, creativity, and
              performance. We craft campaigns that look great, connect deeply, and drive real
              growth.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── AWARDS & ACHIEVEMENTS ── */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <Container>
          <Reveal className="flex flex-col items-start">
            <Badge>Awards</Badge>
            <BlurTextReveal
              as="h2"
              text="Awards & Achievements"
              className="mt-8 max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            />

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              We&rsquo;re honored to be recognized for our creativity, performance, and commitment
              to delivering outstanding marketing results.
            </p>
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[18px]">
            <div className="divide-y divide-white/[0.06]">
              {awards.map(a => (
                <div
                  key={`${a.year}-${a.title}`}
                  className="grid grid-cols-12 gap-4 px-5 py-5 text-sm transition-colors hover:bg-white/[0.02] sm:px-8 sm:py-6"
                >
                  <span className="col-span-3 text-muted sm:col-span-2">{a.year}</span>
                  <span className="col-span-9 font-medium text-foreground sm:col-span-4">
                    {a.title}
                  </span>
                  <span className="col-span-7 col-start-4 text-muted sm:col-span-4 sm:col-start-auto">
                    {a.category}
                  </span>
                  <span className="col-span-5 text-right text-muted sm:col-span-2">{a.brand}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CLIENT FEEDBACK ── */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <Container>
          <Reveal className="flex flex-col items-start">
            <Badge>Testimonial</Badge>
            <BlurTextReveal
              as="h2"
              text="Client Feedback"
              className="mt-8 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            />

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Discover success stories from satisfied clients. Learn how we assisted them in
              reaching their objectives and generating significant, enduring results.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, idx) => {
              const featured = idx === 1 || idx === 4;
              if (featured) {
                return (
                  <Reveal key={t.name} delay={idx * 0.04}>
                    <div className="relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[18px] p-6">
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
                      <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                        <div>
                          <Stars />
                          <p className="mt-5 text-sm leading-relaxed text-white">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                            {t.name.charAt(0)}
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold text-white">{t.name}</div>
                            <div className="text-white/50">{t.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              }
              return (
                <Reveal key={t.name} delay={idx * 0.04}>
                  <div className="h-full rounded-[18px] bg-card">
                    <figure className="flex h-full min-h-[280px] flex-col justify-between p-6">
                      <div>
                        <Stars />
                        <blockquote className="mt-5 text-sm leading-relaxed text-foreground/90">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                      </div>
                      <figcaption className="mt-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-foreground">
                          {t.name.charAt(0)}
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold text-foreground">{t.name}</div>
                          <div className="text-muted">{t.role}</div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <Container>
          <Reveal>
            <BlurTextReveal
              as="h2"
              text="Industries We Power."
              className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
            />

            <div className="mt-8 flex flex-wrap gap-3">
              {industries.map(industry => (
                <span
                  key={industry}
                  className="rounded-full bg-white/[0.03] px-5 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {industry}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── MINDS BEHIND BIGTOPSOCIAL ── */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <Container>
          <Reveal className="flex flex-col items-start">
            <Badge>Team Members</Badge>
            <BlurTextReveal
              as="h2"
              text="Minds behind Bigtopsocial"
              className="mt-8 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            />

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Our team blends strategy, creativity, and performance to build marketing that drives
              real growth.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {aboutTeam.map((m, idx) => (
              <Reveal key={`${m.name}-${idx}`} delay={idx * 0.04}>
                <div className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-card">
                  <div className="relative aspect-square overflow-hidden">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-5xl font-semibold text-foreground/40">
                        {m.name.charAt(0)}
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-foreground">{m.name}</h3>
                    <p className="mt-1 text-sm text-muted">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
