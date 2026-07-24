'use client';

import { useState } from 'react';
import Image from 'next/image';
import { testimonials } from '@/lib/content/home';

export function MobileTestimonials() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, 2);

  return (
    <div className="lg:hidden mt-10 px-4 sm:px-6">
      <div className="flex flex-col gap-4">
        {visible.map(t => (
          <div
            key={t.name}
            className="relative overflow-hidden rounded-[24px] bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            {/* stars */}
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* quote */}
            <p className="mt-4 text-[14px] leading-[1.8] text-white/80">&ldquo;{t.quote}&rdquo;</p>

            {/* author */}
            <div className="mt-5 flex items-center gap-3">
              {t.bgImage ? (
                <Image
                  src={t.bgImage}
                  alt={t.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 shrink-0 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-[13px] font-medium text-white">{t.name}</p>
                <p className="mt-0.5 text-[11px] text-white/40">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length > 2 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(v => !v)}
            className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            {showAll ? 'Show less' : `Show more (${testimonials.length - 2})`}
          </button>
        </div>
      )}
    </div>
  );
}
