import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';
import { VideoTestimonials } from '@/components/about/VideoTestimonials';
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
        </Container>

        {/* fades hero into black below */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-black" />
      </section>

      <section className="relative overflow-hidden bg-black pb-16 sm:pb-24 pt-8">
        <Container className="relative">
          {/* ── OUR STORY ── */}
          <div className="mt-8 sm:mt-12 relative mx-auto w-full">
            {/* Subtle ambient lighting for the background */}
            <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 h-[500px] w-[500px] rounded-full bg-[#12ced6]/5 blur-[120px]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
              {/* Left Column: Text */}
              <div className="flex flex-col items-start">
                <Reveal>
                  <Badge>Our Story</Badge>
                </Reveal>
                
                <BlurTextReveal
                  as="h2"
                  text="Established in 2014, driven by"
                  className="mt-8 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                />

                <BlurTextReveal
                  as="h2"
                  text="creativity & innovation continuously."
                  delay={0.2}
                  className="mt-1 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                />
                
                <Reveal delay={0.4} className="mt-8">
                  <p className="text-base sm:text-lg font-medium leading-relaxed text-muted/90">
                    At Bigtopsocial, we believe powerful marketing blends strategy, creativity, and
                    performance. We craft campaigns that look great, connect deeply, and drive real
                    growth.
                  </p>
                  <div className="mt-8 h-px w-32 bg-gradient-to-r from-[#12ced6]/40 to-transparent" />
                </Reveal>
              </div>

              {/* Right Column: Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {stats.map((s, idx) => (
                  <Reveal key={s.numeral} delay={0.3 + idx * 0.1}>
                    <div className="group relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden rounded-[16px] bg-[#050505] border border-white/[0.05] p-6 sm:p-7 transition-all duration-500 hover:bg-[#0a0a0a] hover:-translate-y-1 hover:border-white/[0.1] hover:shadow-[0_10px_40px_-10px_rgba(18,206,214,0.15)]">
                      <div className="pointer-events-none absolute -inset-px rounded-[16px] bg-gradient-to-br from-[#12ced6]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Top Row: Icon Only */}
                      <div className="relative z-10 flex items-start">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.05] text-[13px] font-bold text-[#12ced6]">
                          {s.numeral}
                        </span>
                      </div>
                      
                      {/* Bottom Row: Value, Suffix, and Label */}
                      <div className="relative z-10 mt-10 flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl sm:text-[64px] font-bold tracking-tighter text-white leading-none">
                            {s.value}
                          </span>
                          <span className="text-2xl sm:text-3xl font-bold text-white">
                            {s.suffix}
                          </span>
                        </div>
                        <span className="text-right text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] text-white">
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* VISION & MISSION SECTION */}
          <Reveal delay={0.1} className="mt-20 mx-auto w-full max-w-6xl">
            <div className="mb-10 flex flex-col items-center text-center">
              <Badge>Purpose</Badge>
              <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">Our Vision & Mission</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Vision */}
              <div className="group relative overflow-hidden rounded-[24px] bg-white/[0.02] border border-white/[0.05] p-8 sm:p-12 transition-colors hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#12ced6]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.05] border border-white/10 mb-6">
                    <svg className="h-7 w-7 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-4">Our Vision</h3>
                  <p className="text-base leading-relaxed text-muted/90">
                    To be the global catalyst for brand transformation, shaping the future of digital marketing by creating unforgettable experiences that connect people, purpose, and lasting value.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="group relative overflow-hidden rounded-[24px] bg-white/[0.02] border border-white/[0.05] p-8 sm:p-12 transition-colors hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#12ced6]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.05] border border-white/10 mb-6">
                    <svg className="h-7 w-7 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-4">Our Mission</h3>
                  <p className="text-base leading-relaxed text-muted/90">
                    To empower brands with innovative strategies, creative brilliance, and data-driven performance, delivering scalable growth and meaningful engagement at every touchpoint.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── AWARDS & ACHIEVEMENTS ── */}
          <Reveal delay={0.15} className="mt-24 mx-auto w-full max-w-7xl">
            <div className="flex flex-col items-start">
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
            </div>

            <div className="mt-16 max-w-4xl relative">
              <div className="flex flex-col relative pb-10">
                {/* Vertical line spanning the timeline */}
                <div className="absolute left-[50px] sm:left-[80px] top-10 bottom-4 w-px bg-white/10" />

                {awards.map((a, idx) => (
                  <Reveal key={`${a.year}-${a.title}`} delay={idx * 0.05}>
                    <div className="group relative flex items-start py-8 sm:py-10 transition-colors duration-500 hover:bg-white/[0.02] rounded-2xl">
                      {/* Glowing highlight on hover (background) */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />

                      {/* Left side: Year */}
                      <div className="w-[50px] sm:w-[80px] shrink-0 pt-[2px] text-left sm:text-right pr-4 sm:pr-8 relative z-10">
                        <span className="text-sm sm:text-base font-medium tracking-widest text-muted/60 transition-colors duration-300 group-hover:text-[#12ced6]">
                          {a.year}
                        </span>
                      </div>

                      {/* Center: The Node */}
                      <div className="absolute left-[50px] sm:left-[80px] top-[43px] sm:top-[45px] flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-background transition-all duration-300 group-hover:border-[#12ced6] group-hover:bg-[#12ced6] group-hover:shadow-[0_0_15px_rgba(18,206,214,0.6)] z-20" />

                      {/* Right side: Content */}
                      <div className="flex-1 pl-8 sm:pl-12 relative z-10">
                        <h3 className="text-2xl sm:text-[32px] font-medium tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-white leading-tight">
                          {a.title}
                        </h3>
                        <p className="mt-3 text-[15px] sm:text-base text-muted/70">
                          <span className="font-medium text-[#12ced6]/80 transition-colors duration-300 group-hover:text-[#12ced6]">{a.category}</span>
                          <span className="mx-2 text-white/20">—</span>
                          <span className="text-muted/60">for {a.brand}</span>
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* PICTURES SECTION */}
          <Reveal delay={0.2} className="mt-24 mx-auto w-full max-w-7xl">
            <div className="mb-12 flex flex-col items-center text-center">
              <Badge>Team Members</Badge>
              <BlurTextReveal
                as="h2"
                text="The minds behind"
                className="mt-8 max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              />
              <BlurTextReveal
                as="h2"
                text="Bigtopsocial."
                delay={0.2}
                className="mt-1 max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                We’re a multi-disciplinary collective of strategists, directors, designers, and performance marketers united by a single goal: turning ambitious brands into market leaders.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 lg:gap-12 mt-12 w-full">
              {/* Top Row: 3 Main Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8 w-full max-w-5xl mx-auto">
                {[
                  { tag: 'CEO', name: 'Vedansh Mamilwar', image: '', bio: 'Driving the long-term vision and strategy for Bigtopsocial.' },
                  { tag: 'CTO', name: 'Sarang Thakre', image: '/Team images/Sarang Thakre.jpeg', bio: 'Architecting scalable tech solutions and leading engineering.' },
                  { tag: 'COO', name: 'Mayur FulBandhe', image: '/Team images/Mayur.jpeg', bio: 'Optimizing daily operations and ensuring seamless execution.' },
                ].map((item, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-[24px] bg-white/[0.02] aspect-[4/5] sm:aspect-[3/4]">
                    <Image
                      src={item.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23444'%3E%3Crect width='24' height='24' fill='%23050505'/%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"}
                      alt={`${item.name} portrait`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    
                    {/* Shadow / Blur overlay for text readability */}
                    <div className="pointer-events-none absolute -bottom-4 left-0 w-full h-3/5 bg-black/70 blur-2xl z-10" />
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

                    <div className="absolute bottom-0 left-0 p-6 sm:p-8 flex flex-col items-start w-full z-20">
                      <Badge>{item.tag}</Badge>
                      <p className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight">{item.name}</p>
                      <p className="mt-2 text-sm sm:text-base text-white/90 line-clamp-3 leading-relaxed">{item.bio}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row: Rest of the Team */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 w-full max-w-5xl mx-auto mt-6">
                {Array.from({ length: 15 }).map((_, idx) => {
                  const m = aboutTeam.slice(3)[idx] || { name: 'Join Our Team', role: 'Open Position', image: null };
                  return (
                  <div key={idx} className="group relative overflow-hidden rounded-[20px] bg-white/[0.02] aspect-[4/5] transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_-10px_rgba(18,206,214,0.15)] flex items-center justify-center">
                    
                    {/* Image Background */}
                    <Image
                      src={m.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23444'%3E%3Crect width='24' height='24' fill='%23050505'/%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"}
                      alt={m.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out scale-[1.02] group-hover:scale-[1.07]"
                    />

                    {/* Hover subtle cyan gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#12ced6]/20 via-[#12ced6]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen z-10" />
                    
                    {/* Heavy dark gradient for text readability at the bottom */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

                    {/* Text Overlay (Bottom Left) */}
                    <div className="absolute bottom-0 left-0 p-5 flex flex-col items-start w-full z-20 text-left">
                      <span className="text-base sm:text-lg font-semibold text-foreground group-hover:text-white transition-colors duration-300 leading-tight">{m.name}</span>
                      <span className="mt-1.5 text-[10px] sm:text-[11px] font-medium text-[#12ced6] uppercase tracking-[0.1em] sm:tracking-[0.15em]">{m.role}</span>
                    </div>
                  </div>
                )})}
              </div>
            </div>

          </Reveal>
        </Container>
      </section>




      {/* ── CLIENT FEEDBACK (3D ANIMATED TESTIMONIALS) ── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-16 sm:py-24">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-[#12ced6]/10 blur-[120px]" />

        <Container className="relative z-10">
          <Reveal className="flex flex-col items-start">
            <Badge>VIDEO STORIES</Badge>
            <BlurTextReveal
              as="h2"
              text="Hear from our partners"
              className="mt-8 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            />

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Watch how we help forward-thinking brands scale, build premium identities, and generate
              measurable growth through strategic video campaigns.
            </p>
          </Reveal>

          <VideoTestimonials />
        </Container>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-16 sm:py-24">
        {/* Subtle ambient lighting for the background */}
        <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 h-[500px] w-[500px] rounded-full bg-[#12ced6]/5 blur-[120px]" />

        <Container className="relative z-10">
          <Reveal className="flex flex-col items-center text-center">
            <Badge>Sectors</Badge>
            <BlurTextReveal
              as="h2"
              text="Industries We Power"
              className="mt-8 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              We bring strategic growth and a premium aesthetic to a wide range of industries, 
              connecting specialized brands with their ideal audiences.
            </p>
          </Reveal>

          <div className="relative mt-16 sm:mt-20 max-w-5xl mx-auto pt-10 pb-4 px-2 sm:px-4 overflow-hidden">
            {/* Horizontal Root Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* Central Root Node */}
            <div className="absolute top-[-5px] left-1/2 h-[11px] w-[11px] -translate-x-1/2 rounded-full border-2 border-[#12ced6] bg-background shadow-[0_0_20px_rgba(18,206,214,0.8)]" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 relative">
              {industries.map((industry, idx) => (
                <Reveal 
                  key={industry} 
                  delay={idx * 0.05} 
                  className="relative w-full"
                  style={{ zIndex: 50 - idx }}
                >
                  <div className="relative group flex flex-col items-center pt-8">
                    
                    {/* Vertical hanging branch extending upwards */}
                    <div className="absolute bottom-[calc(100%-31px)] left-1/2 w-px h-[2000px] -translate-x-1/2 bg-white/10 transition-colors duration-500 group-hover:bg-[#12ced6]/60 -z-10" />
                    
                    {/* The Node connecting the branch to the card */}
                    <div className="absolute top-[26px] left-1/2 h-[11px] w-[11px] -translate-x-1/2 rounded-full border-2 border-white/20 bg-background transition-all duration-300 group-hover:border-[#12ced6] group-hover:bg-[#12ced6] group-hover:shadow-[0_0_15px_rgba(18,206,214,0.6)] z-20" />
                    
                    {/* The Card */}
                    <div className="relative z-10 w-full rounded-[14px] bg-[#050505] border border-white/[0.05] p-3 sm:p-4 text-center transition-all duration-500 hover:bg-[#0a0a0a] hover:-translate-y-1 hover:border-[#12ced6]/40 hover:shadow-[0_10px_30px_-10px_rgba(18,206,214,0.15)] min-h-[64px] flex flex-col justify-center">
                      <div className="pointer-events-none absolute -inset-px rounded-[14px] bg-gradient-to-br from-[#12ced6]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="relative z-10 text-[13px] sm:text-[15px] font-medium tracking-wide text-foreground/80 group-hover:text-white transition-colors duration-300">
                        {industry}
                      </span>
                    </div>

                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
