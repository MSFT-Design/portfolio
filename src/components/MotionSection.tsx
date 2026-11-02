"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* ─── Scene Section: Full-viewport cinematic scene ─── */
interface SceneSectionProps {
  children: ReactNode;
  className?: string;
  sceneNumber?: string;
  sceneLabel?: string;
  dark?: boolean;
}

export function SceneSection({
  children,
  className = "",
  sceneNumber,
  sceneLabel,
  dark = false,
}: SceneSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [80, 0, 0, -40]);

  return (
    <div
      ref={ref}
      className={`scene relative ${dark ? "bg-surface" : "bg-background"} ${className}`}
    >
      {/* Scene divider at top */}
      <div className="absolute top-0 left-0 right-0 scene-divider" />

      {/* HUD scene label */}
      {sceneNumber && (
        <div className="absolute top-8 left-8 z-10 pointer-events-none">
          <span className="timecode">
            {sceneNumber}{sceneLabel ? ` — ${sceneLabel}` : ""}
          </span>
        </div>
      )}

      <motion.div style={{ opacity, y }} className="relative z-[1]">
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Typographic Anchor: Large text between scenes ─── */
interface TypoAnchorProps {
  text: string;
  accent?: string;
  className?: string;
}

export function TypoAnchor({ text, accent, className = "" }: TypoAnchorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-40, 0, 0, 40]);

  return (
    <div
      ref={ref}
      className={`relative py-32 md:py-48 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <motion.div
        style={{ opacity, x }}
        className="max-w-content mx-auto px-6"
      >
        <h2 className="text-display-xl md:text-display-hero font-extrabold tracking-tighter">
          {text}
          {accent && (
            <>
              <br />
              <span className="gradient-text animate-gradient">{accent}</span>
            </>
          )}
        </h2>
      </motion.div>
    </div>
  );
}

/* ─── Motion Section: Standard animated section ─── */
interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function MotionSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: MotionSectionProps) {
  const offset = directionMap[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ─── */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      custom={staggerDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
