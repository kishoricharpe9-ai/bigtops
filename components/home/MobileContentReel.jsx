'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { useMatchMedia } from '@/lib/useMatchMedia';

// ─── Data ────────────────────────────────────────────────────────────────────

function videoPoster(src) {
  return src.replace('/upload/q_auto,f_auto/', '/upload/q_auto,so_0/').replace(/\.mp4$/, '.jpg');
}

const POSTS = [
  { id: 'post-29', type: 'image', title: 'Atharva Oceana Building Dreams', src: '/post contents/29.jpg' },
  { id: 'post-24', type: 'image', title: 'Surabhi Magic of Revision', src: '/post contents/24.jpg' },
  { id: 'post-25', type: 'image', title: 'Aarav Infra Plots Nagpur', src: '/post contents/25.jpg' },
  { id: 'post-26', type: 'image', title: 'Atharva Oceana Living', src: '/post contents/26.jpg' },
  { id: 'post-27', type: 'image', title: 'Atharva Oceana 40% Sold', src: '/post contents/27.jpg' },
  { id: 'post-28', type: 'image', title: 'Atharva Oceana 3 BHK Floor Plan', src: '/post contents/28.jpg' },
  { id: 'post-19', type: 'image', title: '4 Ways to Solve Case Competitions', src: '/post contents/19.jpg' },
  { id: 'post-20', type: 'image', title: 'Crack Your Dream MBA Entrance', src: '/post contents/20.jpg' },
  { id: 'post-21', type: 'image', title: 'NTSW Athlete Feedback', src: '/post contents/21.jpg' },
  { id: 'post-22', type: 'image', title: 'Donate Your Old Skate Gear', src: '/post contents/22.jpg' },
  { id: 'post-23', type: 'image', title: 'Surabhi Academy JEE/NEET Success', src: '/post contents/23.jpg' },
  { id: 'post-14', type: 'image', title: 'How Coke Took Over Christmas', src: '/post contents/14.jpg' },
  { id: 'post-15', type: 'image', title: "What's Hot In Branding", src: '/post contents/15.jpg' },
  { id: 'post-16', type: 'image', title: 'HIDC Modern Living', src: '/post contents/16.jpg' },
  { id: 'post-17', type: 'image', title: 'Apartment Hunting Checklist', src: '/post contents/17.jpg' },
  { id: 'post-18', type: 'image', title: 'Free Stock Trading Webinar', src: '/post contents/18.jpg' },
  { id: 'post-1', type: 'image', title: 'NTX Skate Straps', src: '/post contents/9.jpg' },
  { id: 'post-2', type: 'image', title: 'NTX FIRE Bearings', src: '/post contents/10.jpg' },
  { id: 'post-3', type: 'image', title: 'NTX STORM Bearings', src: '/post contents/11.jpg' },
  { id: 'post-4', type: 'image', title: 'NTX Skate Bearing Oil', src: '/post contents/12.jpg' },
  { id: 'post-5', type: 'image', title: 'NTX Bearing Case Set', src: '/post contents/13.jpg' },
  { id: 'post-6', type: 'image', title: 'Brand Reveal', src: '/post contents/1.png' },
  { id: 'post-7', type: 'image', title: 'Campaign Visual', src: '/post contents/2.png' },
  { id: 'post-8', type: 'image', title: 'Product Showcase', src: '/post contents/3.png' },
  { id: 'post-9', type: 'image', title: 'Social Proof', src: '/post contents/4.png' },
  { id: 'post-10', type: 'image', title: 'Behind the Scenes', src: '/post contents/5.png' },
  { id: 'post-11', type: 'image', title: 'Founder Vision', src: '/post contents/6.png' },
  { id: 'post-12', type: 'image', title: 'Feature Showcase', src: '/post contents/7.png' },
  { id: 'post-13', type: 'image', title: 'Community Highlight', src: '/post contents/8.png' },
];

const REELS = [
  {
    id: 'reel-1',
    type: 'video',
    title: 'Weekend Routine',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956593/Bored_of_the_same_old_weekend_routines_in_Nagpur_Leave_the_city_noise_behind_Just_a_1-hour_sc_ljs15v.mp4',
  },
  {
    id: 'reel-2',
    type: 'video',
    title: 'Nisarga Resort',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956581/Nisarga_Lake_View_Resort_A_serene_lake-touch_farmhouse_near_Dhamangaon_Lake_Where_nature_uxfqza.mp4',
  },
  {
    id: 'reel-3',
    type: 'video',
    title: 'CAT Exam Prep',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956578/Most_students_think_cracking_the_CAT_exam_is_all_about_mastering_complex_math_equations._But_her_halywl.mp4',
  },
  {
    id: 'reel-4',
    type: 'video',
    title: 'NTX Crossover',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956575/Lock_your_center_dominate_every_turn_grip_harder_exit_stronger._NTXCrossover_EdgeControl_Ska_ploefd.mp4',
  },
  {
    id: 'reel-5',
    type: 'video',
    title: 'Commitment Nationwide',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956576/We_don_t_just_ship_products_we_deliver_commitment_nationwide_every_single_day._AllOverIndia_rmoza5.mp4',
  },
  {
    id: 'reel-6',
    type: 'video',
    title: 'River Lifeline',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956573/A_river_that_once_flowed_like_the_lifeline_of_a_city_today_carries_the_weight_of_its_neglect.For_cux7z8.mp4',
  },
  {
    id: 'reel-7',
    type: 'video',
    title: 'The Hitavada Decode',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956572/Why_is_India_maintaining_silence_on_the_ongoing_war_This_reel_of_The_Hitavada_decoding_the_confl_by7asc.mp4',
  },
  {
    id: 'reel-8',
    type: 'video',
    title: 'NTX FIRE Bearings Promo',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956569/NTX_FIRE_Bearings_Built_for_speed_control_durability.Designed_to_roll_smoother_faster_vybmiu.mp4',
  },
  {
    id: 'reel-9',
    type: 'video',
    title: 'Artynex Brass Sun Idol',
    src: 'https://res.cloudinary.com/diqnwnz6x/video/upload/q_auto,f_auto/v1779956568/Bring_the_power_of_the_sun_right_into_your_living_space_This_Artynex_Brass_Sun_Idol_is_more_than_f7zchs.mp4',
  },
];

// ─── Physics & Spatial Transformations ──────────────────────────────────────────

const STEP = 155;
const SNAP = { type: 'spring', stiffness: 400, damping: 38, mass: 0.65 };
const AUTO = { type: 'spring', stiffness: 82, damping: 22, mass: 1.1 };

const OFF = [-3, -2, -1, 0, 1, 2, 3];
const TX = [-310, -230, -148, 0, 148, 230, 310];
const SC = [0.5, 0.66, 0.83, 1, 0.83, 0.66, 0.5];
const OP = [0, 0.48, 0.8, 1, 0.8, 0.48, 0];
const RZ = [-10, -6, -3, 0, 3, 6, 10];
const RY = [22, 15, 8, 0, -8, -15, -22];
const DIM = [0.55, 0.32, 0.13, 0, 0.13, 0.32, 0.55];

// ─── Card Component with Animations ──────────────────────────────────────────

function Card({ item, index, total, scrollX, active, onOpen, onJump }) {
  const videoRef = useRef(null);
  const lastOff = useRef(0);
  const [isActiveCard, setIsActiveCard] = useState(false);

  const offset = useTransform(scrollX, sx => {
    let o = index + sx / STEP;
    o = o - Math.round(o / total) * total;
    return o;
  });

  const x = useTransform(offset, OFF, TX, { clamp: false });
  const scale = useTransform(offset, OFF, SC, { clamp: false });
  const opacity = useTransform(offset, OFF, OP, { clamp: false });
  const rotateZ = useTransform(offset, OFF, RZ, { clamp: false });
  const rotateY = useTransform(offset, OFF, RY, { clamp: false });
  const dim = useTransform(offset, OFF, DIM, { clamp: false });
  const zIndex = useTransform(offset, v => Math.max(1, Math.round(20 - Math.abs(v) * 4)));

  useEffect(() => {
    return offset.on('change', v => {
      lastOff.current = v;
      const isCentered = Math.abs(v) < 0.45;
      setIsActiveCard(isCentered);

      const vid = videoRef.current;
      if (!vid) return;
      if (active && isCentered) vid.play().catch(() => {});
      else if (!vid.paused) vid.pause();
    });
  }, [offset, active]);

  const isReel = item.type === 'video';

  return (
    <motion.div
      className="absolute inset-y-0 cursor-pointer select-none"
      style={{
        width: 'clamp(160px, 56vw, 230px)',
        left: 'calc(50vw - clamp(80px, 28vw, 115px))',
        x,
        scale,
        opacity,
        rotateZ,
        rotateY,
        zIndex,
        perspective: 1000,
        willChange: 'transform, opacity',
      }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        if (Math.abs(lastOff.current) < 0.48) onOpen(index);
        else onJump(index);
      }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[22px] bg-[#090909] transition-all duration-500 ${
          isActiveCard
            ? 'border-2 border-[#12ced6] shadow-[0_0_30px_rgba(18,206,214,0.45)]'
            : 'border border-white/10 shadow-xl'
        }`}
      >
        {/* Animated Top Accent Border on Active Card */}
        {isActiveCard && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[3px]"
            style={{
              background: 'linear-gradient(to right, transparent, #12ced6, #38bdf8, transparent)',
            }}
          />
        )}

        {/* Media Content */}
        {item.type === 'image' ? (
          <>
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover blur-xl opacity-40 scale-125 pointer-events-none"
              aria-hidden
            />
            <Image
              src={item.src}
              alt={item.id}
              fill
              sizes="(max-width:640px) 56vw, 230px"
              className="object-contain p-1 relative z-10 transition-transform duration-700"
              loading={Math.abs(index) < 2 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          </>
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            src={item.src}
            poster={videoPoster(item.src)}
          />
        )}

        {/* Dynamic Dark Dim Overlay for non-centered cards */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{ background: '#000', opacity: dim }}
        />

        {/* Glassmorphic Shine Effect */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{
            background:
              'linear-gradient(148deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.05) 26%, transparent 54%, rgba(0,0,0,.15) 100%)',
          }}
        />

        {/* Bottom Title Gradient Overlay on Active Card (with Shifted Badge on Bottom Right) */}
        {isActiveCard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-0 z-20 p-3 flex items-end justify-between bg-gradient-to-t from-black/95 via-black/40 to-transparent"
          >
            <h4 className="text-xs font-semibold text-white truncate pr-1">{item.title}</h4>
            <div className="flex items-center gap-1 rounded-full bg-black/80 px-2 py-0.5 text-[9px] font-medium text-white/90 border border-white/20 shrink-0">
              {isReel ? (
                <>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12ced6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#12ced6]" />
                  </span>
                  Reel
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#12ced6]" />
                  Image
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Lightbox Modal Component ──────────────────────────────────────────────────

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[min(88vw,340px)] overflow-hidden rounded-[26px] bg-black"
        style={{
          aspectRatio: '9/16',
          boxShadow: '0 32px 80px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.12)',
        }}
        initial={{ scale: 0.82, opacity: 0, y: 30, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        {item.type === 'image' ? (
          <Image
            src={item.src}
            alt={item.id}
            fill
            sizes="88vw"
            className="object-contain"
            priority
          />
        ) : (
          <video
            src={item.src}
            className="h-full w-full object-contain"
            controls
            autoPlay
            loop
            playsInline
          />
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(8px)' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

// ─── Reusable CardStack Component ─────────────────────────────────────────────

function CardStack({ items, label, autoplayOffset = 0 }) {
  const n = items.length;
  const scrollX = useMotionValue(0);
  const active = useMatchMedia('(max-width: 1023px)');

  const [activeIdx, setActiveIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);

  const ptrStartX = useRef(0);
  const ptrStartSX = useRef(0);
  const ptrTime = useRef(0);
  const dragging = useRef(false);
  const animCtrl = useRef(null);
  const autoTimer = useRef(null);
  const resumeT = useRef(null);

  const stopAnim = useCallback(() => {
    animCtrl.current?.stop();
    animCtrl.current = null;
  }, []);

  const snapToX = useCallback(
    (targetX, spring = SNAP) => {
      stopAnim();
      animCtrl.current = animate(scrollX, targetX, spring);
      setActiveIdx(((-Math.round(targetX / STEP) % n) + n) % n);
    },
    [scrollX, stopAnim, n],
  );

  const jumpTo = useCallback(
    modTarget => {
      const cur = Math.round(-scrollX.get() / STEP);
      const curMod = ((cur % n) + n) % n;
      let diff = modTarget - curMod;
      if (diff > n / 2) diff -= n;
      if (diff < -n / 2) diff += n;
      snapToX(-(cur + diff) * STEP);
    },
    [scrollX, snapToX, n],
  );

  const stopAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    if (resumeT.current) clearTimeout(resumeT.current);
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoTimer.current = setInterval(() => {
      if (dragging.current) return;
      const nextX = scrollX.get() - STEP;
      stopAnim();
      animCtrl.current = animate(scrollX, nextX, AUTO);
      setActiveIdx(((-Math.round(nextX / STEP) % n) + n) % n);
    }, 3600);
  }, [scrollX, stopAnim, stopAuto, n]);

  const scheduleResume = useCallback(() => {
    if (resumeT.current) clearTimeout(resumeT.current);
    resumeT.current = setTimeout(startAuto, 2400);
  }, [startAuto]);

  useEffect(() => {
    if (!active || openIdx !== null) {
      stopAuto();
      return;
    }
    const t = setTimeout(startAuto, autoplayOffset);
    return () => {
      clearTimeout(t);
      stopAuto();
    };
  }, [active, openIdx, startAuto, stopAuto, autoplayOffset]);

  const onPointerDown = e => {
    ptrStartX.current = e.clientX;
    ptrStartSX.current = scrollX.get();
    ptrTime.current = Date.now();
    dragging.current = false;
    stopAuto();
    stopAnim();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    const dx = e.clientX - ptrStartX.current;
    if (Math.abs(dx) > 5) dragging.current = true;
    if (dragging.current) scrollX.set(ptrStartSX.current + dx);
  };

  const onPointerUp = e => {
    const dx = e.clientX - ptrStartX.current;
    const dt = Math.max(1, Date.now() - ptrTime.current);
    const vel = dx / dt;
    const cur = -scrollX.get() / STEP;
    const target =
      Math.abs(vel) > 0.45 || Math.abs(dx) > 58
        ? Math.round(cur - Math.sign(dx) * 0.6)
        : Math.round(cur);
    snapToX(-target * STEP);
    setTimeout(() => {
      dragging.current = false;
    }, 40);
    scheduleResume();
  };

  const onPointerCancel = () => {
    snapToX(-Math.round(-scrollX.get() / STEP) * STEP);
    dragging.current = false;
    scheduleResume();
  };

  const openItem = openIdx !== null ? items[openIdx] : null;

  return (
    <div>
      <Container>
        {/* Animated Section Sub-Heading */}
        <div className="mb-3.5 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#12ced6]" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12ced6]" />
          </span>
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-white/80">
            {label}
          </p>
        </div>
      </Container>

      <div
        className="relative overflow-x-hidden"
        style={{
          height: 'clamp(290px, calc(56vw * 16 / 9), 420px)',
          touchAction: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(18,206,214,.06) 0%, transparent 100%)',
          }}
        />

        {items.map((item, i) => (
          <Card
            key={item.id}
            item={item}
            index={i}
            total={n}
            scrollX={scrollX}
            active={active}
            onOpen={setOpenIdx}
            onJump={idx => {
              jumpTo(idx);
              stopAuto();
              scheduleResume();
            }}
          />
        ))}
      </div>

      <Container>
        {/* Animated Pagination Dots */}
        <div className="mt-5 flex justify-center">
          <div className="flex items-center gap-[7px]">
            {items.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  jumpTo(i);
                  stopAuto();
                  scheduleResume();
                }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Go to ${label} ${i + 1}`}
                animate={{
                  width: i === activeIdx ? 22 : 6,
                  backgroundColor:
                    i === activeIdx ? '#12ced6' : 'rgba(255,255,255,.22)',
                  boxShadow:
                    i === activeIdx ? '0 0 10px rgba(18,206,214,0.8)' : 'none',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ height: 6, borderRadius: 9999 }}
              />
            ))}
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {openItem && <Lightbox item={openItem} onClose={() => setOpenIdx(null)} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function MobileContentReel() {
  return (
    <section className="lg:hidden select-none space-y-12 py-6 sm:py-12">
      <CardStack items={REELS} label="Reels" autoplayOffset={0} />
      <CardStack items={POSTS} label="Posts" autoplayOffset={1800} />
    </section>
  );
}
