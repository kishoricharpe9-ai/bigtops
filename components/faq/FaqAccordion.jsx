'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { faqItems } from '@/lib/content/faq';

export function FaqAccordion() {
  const [open, setOpen] = useState(null);
  const reduce = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const shouldAnimate = isHydrated && !reduce;

  return (
    <div className="divide-y divide-white/[0.08] rounded-card bg-[#0d0d0b]">
      {faqItems.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className="px-5 py-4 transition-colors hover:bg-white/[0.02] sm:px-6"
          >
            <button
              type="button"
              className="group flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-foreground sm:text-base">
                {item.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg leading-none text-muted transition-all duration-300 group-hover:border-white/20 group-hover:text-foreground ${
                  isOpen ? 'rotate-45 bg-white/[0.06] text-foreground' : ''
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`${item.question}-body`}
                  initial={shouldAnimate ? { opacity: 0, y: -6 } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  exit={shouldAnimate ? { opacity: 0, y: -6 } : undefined}
                  transition={
                    shouldAnimate
                      ? {
                          duration: 0.28,
                          ease: [0.16, 1, 0.3, 1],
                        }
                      : undefined
                  }
                >
                  <p className="pt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
