"use client";

// Per-word blur-in text reveal — the signature effect from the 21st.dev
// "circular testimonials" component: each word animates from blurred +
// transparent + slightly-down into place, staggered. `resetKey` re-triggers
// the reveal when it changes (e.g. language switch). Respects
// prefers-reduced-motion by rendering the text plainly.
import { motion, useReducedMotion } from "framer-motion";

export function BlurText({
  text,
  resetKey,
  className,
}: {
  text: string;
  resetKey?: string | number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className} key={resetKey}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${resetKey}-${i}`}
          initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}
