"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CursorEffect — A hard-edged circle with mix-blend-mode: difference
 * that inverts all colors underneath it, plus a small dark dot in the center.
 */
export function CursorEffect() {
  const [visible, setVisible] = useState(false);
  const [moving, setMoving] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Smooth spring follow for the outer circle
  const springConfig = { damping: 28, stiffness: 220, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
      setMoving(true);

      // Reset idle timer — fade out circle after 800ms of no movement
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setMoving(false), 800);
    },
    [cursorX, cursorY, visible]
  );

  const handleMouseLeave = useCallback(() => setVisible(false), []);
  const handleMouseEnter = useCallback(() => setVisible(true), []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, [tabindex]")) {
        setHoveringInteractive(true);
      }
    };
    const onOut = () => setHoveringInteractive(false);

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  const circleSize = hoveringInteractive ? 40 : 80;
  const dotSize = hoveringInteractive ? 4 : 6;

  return (
    <>
      {/* Hard circle — solid white, mix-blend-mode: difference inverts everything beneath */}
      <motion.div
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          x,
          y,
          width: circleSize,
          height: circleSize,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          opacity: visible && moving ? 1 : 0,
          transition:
            "width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
        }}
        aria-hidden="true"
      />

      {/* Center dot — dark, sits on top, tracks cursor exactly (no spring lag) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          transition:
            "width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease",
        }}
        aria-hidden="true"
      />
    </>
  );
}
