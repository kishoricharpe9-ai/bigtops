'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'India',
  'Germany',
  'France',
  'UAE',
  'Singapore',
  'Other',
];

const categories = [
  'Startup',
  'Small Business',
  'Agency',
  'Enterprise',
  'E-commerce',
  'SaaS',
  'Non-Profit',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    category: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Prefill from the "How We Can Help" chatbot redirect.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const industry = params.get('industry');
    const problem = params.get('problem');
    const budget = params.get('budget');
    const timeline = params.get('timeline');
    const pkg = params.get('package');
    const services = params.get('services');

    if (!industry && !problem && !pkg) return;

    const lines = [
      pkg && `I'm interested in the ${pkg}${services ? ` (${services})` : ''}.`,
      industry && `Industry: ${industry}`,
      problem && `Main goal: ${problem}`,
      budget && `Budget: ${budget}`,
      timeline && `Timeline: ${timeline}`,
    ].filter(Boolean);

    setForm(f => ({ ...f, message: lines.join('\n') }));
  }, []);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputCls =
    'w-full rounded-full bg-white/[0.06] px-5 py-3.5 text-sm text-foreground placeholder:text-muted outline-none focus:bg-white/[0.09] transition-colors';
  const selectCls =
    'w-full rounded-full bg-white/[0.06] px-5 py-3.5 text-sm text-muted outline-none focus:bg-white/[0.09] transition-colors appearance-none cursor-pointer';

  const formCard = (
    <div className="grid gap-[1px] overflow-hidden rounded-[24px] bg-black/30 backdrop-blur-xl lg:grid-cols-[1fr_260px]">
      {/* Form panel */}
      <div className="bg-transparent p-5 sm:p-8">
        {submitted ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl text-foreground">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-foreground">Message sent!</h2>
            <p className="max-w-xs text-sm text-muted">
              Thanks for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-foreground">First name*</label>
                <input
                  name="firstName"
                  required
                  placeholder="Adam"
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-foreground">Last Name*</label>
                <input
                  name="lastName"
                  required
                  placeholder="Custo"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-foreground">How can we reach you?*</label>
              <input
                name="email"
                type="email"
                required
                placeholder="adam@framer.com"
                value={form.email}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative">
                <label className="mb-1.5 block text-xs text-foreground">Where Are you from?*</label>
                <select
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className={selectCls}
                >
                  <option value="" disabled>
                    Select your country...
                  </option>
                  {countries.map(c => (
                    <option key={c} value={c} className="bg-[#111] text-foreground">
                      {c}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute bottom-3.5 right-4 text-muted">
                  ▾
                </span>
              </div>
              <div className="relative">
                <label className="mb-1.5 block text-xs text-foreground">
                  What&apos;s the type of your company?*
                </label>
                <select
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className={selectCls}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map(c => (
                    <option key={c} value={c} className="bg-[#111] text-foreground">
                      {c}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute bottom-3.5 right-4 text-muted">
                  ▾
                </span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-foreground">Message*</label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Type your message..."
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-[18px] bg-white/[0.06] px-5 py-3.5 text-sm text-foreground placeholder:text-muted outline-none focus:bg-white/[0.09] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Submit Now
            </button>
          </form>
        )}
      </div>

      {/* Info sidebar */}
      <div className="flex flex-col gap-3 bg-transparent p-4">
        <div className="rounded-[18px] bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Email</p>
          <a
            href="mailto:hello@bigtopsocial.media"
            className="mt-3 block text-sm font-medium text-foreground transition hover:text-foreground/80"
          >
            hello@bigtopsocial.media
          </a>
        </div>
        <div className="rounded-[18px] bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Phone</p>
          <a
            href="tel:+40003454567"
            className="mt-3 block text-sm font-medium text-foreground transition hover:text-foreground/80"
          >
            4(000) 345-4567
          </a>
        </div>
        <div className="rounded-[18px] bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Address</p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
            475 Madison Avenue, Floor 12
            <br />
            New York, NY 10022
            <br />
            United States
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── MOBILE layout: natural flow ── */}
      <section className="relative min-h-[100svh] overflow-visible pb-16 pt-28 lg:hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        <Container className="relative z-10">
          <Reveal className="flex flex-col items-center text-center">
            <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
              Let&apos;s Work Together
            </div>
            <BlurTextReveal
              as="h1"
              text="Have Something in Mind?"
              className="mt-6 text-[clamp(2.5rem,9vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-foreground"
            />

            <BlurTextReveal
              as="h1"
              text="We are all here"
              delay={0.3}
              className="mt-1 text-[clamp(2.5rem,9vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-foreground"
            />

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Whether you need clarity, strategy, or full-scale execution — our team is here to
              support your growth.
            </p>
          </Reveal>

          <Reveal className="mt-8">{formCard}</Reveal>
        </Container>
      </section>

      {/* ── DESKTOP layout: full-viewport hero, form overlaps below ── */}
      <section className="relative hidden min-h-screen flex-col overflow-hidden lg:flex">
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-48 w-full bg-gradient-to-b from-transparent to-black" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
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

        <Container className="relative z-10 flex flex-1 flex-col items-center justify-center pb-[24vh] pt-32 text-center">
          <Reveal className="flex flex-col items-center">
            <div className="relative inline-flex overflow-hidden rounded-full border border-white/10 bg-black/70 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90 backdrop-blur-md before:absolute before:left-[12%] before:right-[12%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#12ced6]/60 before:to-transparent before:content-['']">
              Let&apos;s Work Together
            </div>
            <BlurTextReveal
              as="h1"
              text="Have Something in Mind?"
              className="mt-8 text-[clamp(3rem,8vw,6rem)] font-medium leading-[1.05] tracking-tight text-foreground"
            />

            <BlurTextReveal
              as="h1"
              text="We are all here"
              delay={0.35}
              className="mt-1 text-[clamp(3rem,8vw,6rem)] font-medium leading-[1.05] tracking-tight text-foreground"
            />

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
              Whether you need clarity, strategy, or full-scale execution — our team is here to
              support your growth.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Form card overlapping the hero (desktop) */}
      <section className="relative z-20 hidden -mt-[30vh] pb-24 lg:block">
        <Container className="max-w-6xl">
          <Reveal>{formCard}</Reveal>
        </Container>
      </section>
    </>
  );
}
