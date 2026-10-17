"use client";

import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

// The first render (SSR + hydration) is never hidden; only client navigations animate in.
let hasMounted = false;

export default function Template({ children }: { children: ReactNode }) {
  const animate = hasMounted;
  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
