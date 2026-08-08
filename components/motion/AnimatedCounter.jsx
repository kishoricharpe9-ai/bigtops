"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const endValue = parseInt(value, 10);

  useEffect(() => {
    if (isInView && !isNaN(endValue)) {
      motionValue.set(endValue);
    }
  }, [motionValue, isInView, endValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  if (isNaN(endValue)) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>0</span>;
}
