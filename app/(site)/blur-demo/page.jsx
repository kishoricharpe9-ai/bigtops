'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { BlurTextReveal } from '@/components/motion/BlurTextReveal';

function Slider({ label, value, min, max, step, unit, onChange }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-foreground/80">{label}</span>
        <span className="font-mono text-foreground/60">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </label>
  );
}

export default function BlurDemoPage() {
  const [text, setText] = useState('Elevating brands Forward, Faster');
  const [stagger, setStagger] = useState(0.08);
  const [duration, setDuration] = useState(0.8);
  const [blur, setBlur] = useState(12);
  const [y, setY] = useState(16);
  const [delay, setDelay] = useState(0);
  const [nonce, setNonce] = useState(0);

  // Remount the reveal whenever a param or the replay nonce changes so the
  // animation re-fires for instant preview.
  const key = `${text}-${stagger}-${duration}-${blur}-${y}-${delay}-${nonce}`;

  return (
    <main className="min-h-screen bg-background py-28 text-foreground sm:py-32">
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Motion lab</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Word-by-word blur reveal</h1>
        <p className="mt-2 max-w-xl text-sm text-foreground/70">
          Each word fades and slides up while a blur sharpens to focus. Tune the knobs below — the
          preview replays on every change.
        </p>

        {/* Preview stage */}
        <div className="mt-10 flex min-h-[40svh] items-center justify-center rounded-2xl border border-border-subtle bg-card px-6 py-16">
          <BlurTextReveal
            key={key}
            text={text}
            once={false}
            stagger={stagger}
            duration={duration}
            blur={blur}
            y={y}
            delay={delay}
            className="text-center text-[clamp(2rem,6vw,4rem)] leading-[1.1] tracking-tight"
          />
        </div>

        {/* Controls */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-foreground/80">Text</span>
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </label>

          <Slider
            label="Stagger (per word)"
            value={stagger}
            min={0}
            max={0.4}
            step={0.01}
            unit="s"
            onChange={setStagger}
          />

          <Slider
            label="Duration (per word)"
            value={duration}
            min={0.2}
            max={2}
            step={0.05}
            unit="s"
            onChange={setDuration}
          />

          <Slider
            label="Start blur"
            value={blur}
            min={0}
            max={40}
            step={1}
            unit="px"
            onChange={setBlur}
          />

          <Slider
            label="Start offset (y)"
            value={y}
            min={0}
            max={80}
            step={1}
            unit="px"
            onChange={setY}
          />

          <Slider
            label="Initial delay"
            value={delay}
            min={0}
            max={1.5}
            step={0.05}
            unit="s"
            onChange={setDelay}
          />

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setNonce(n => n + 1)}
              className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              Replay
            </button>
          </div>
        </div>
        {/* Render Reel Demo */}
        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Render Reel</p>
          <h2 className="mt-2 text-xl font-semibold sm:text-2xl">Reel Preview</h2>
          <p className="mt-2 max-w-xl text-sm text-foreground/70">
            Native video playback via Cloudinary.
          </p>
          <div className="mt-6 flex justify-center">
            {/* Replace the src below with your Cloudinary .mp4 URL */}
            <video
              src="https://res.cloudinary.com/diqnwnz6x/video/upload/v1779956593/Bored_of_the_same_old_weekend_routines_in_Nagpur_Leave_the_city_noise_behind_Just_a_1-hour_sc_ljs15v.mp4"
              style={{ width: 320, height: 569, objectFit: 'cover' }}
              className="rounded-2xl bg-black"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
