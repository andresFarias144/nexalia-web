"use client";

export const viewportOnce = { once: true, amount: 0.22 };

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: easeOutExpo,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};
