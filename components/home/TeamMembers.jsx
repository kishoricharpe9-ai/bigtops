'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { motion } from 'framer-motion';

const team = [
  {
    name: 'Vedansh Mamilwar',
    role: 'CEO',
    category: 'Leadership',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23444'%3E%3Crect width='24' height='24' fill='%23050505'/%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E",
  },
  {
    name: 'Sarang Thakre',
    role: 'CTO',
    category: 'Leadership',
    image: '/Team images/Sarang Thakre.jpeg',
  },
  {
    name: 'Mayur FulBandhe',
    role: 'COO',
    category: 'Leadership',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23444'%3E%3Crect width='24' height='24' fill='%23050505'/%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E",
  },
];

export function TeamMembers() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-background">
      <Container className="relative z-10">
        <Reveal className="mb-14 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md transition hover:border-white/20 hover:bg-black/80 before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#12ced6]"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Team Members
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl tracking-tight text-white sm:text-5xl font-sans font-semibold">
            Meet Our <span className="font-serif italic font-light text-white/90">Team Members</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted">
            The creative minds, designers, and engineers behind our performance systems and high-converting channels.
          </p>
        </Reveal>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full px-4 sm:px-0">
          {team.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#12ced6]/40 hover:bg-white/[0.04]"
              >
                {/* Image Container with 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#121212]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  
                  {/* Category Badge overlaying photo top-left */}
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
                    {member.category}
                  </div>

                  {/* Glassmorphic details panel overlaying photo bottom */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md transition-all duration-300 group-hover:border-[#12ced6]/30 group-hover:bg-black/50">
                    <h3 className="text-lg font-bold text-white tracking-tight leading-none">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-white/60">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
