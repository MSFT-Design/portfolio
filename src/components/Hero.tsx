"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Immersive Particle Grid ─── */
function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w: number, h: number;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const gridSize = 80;
    let time = 0;

    // Floating particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * 2000,
        y: Math.random() * 2000,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.002;

      const mx = mouseRef.current.x * w;
      const my = mouseRef.current.y * h;
      const mouseRadius = 200;

      // ─── Grid lines with mouse distortion ───
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= w + gridSize; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= h; y += 4) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = dist < mouseRadius ? (1 - dist / mouseRadius) * 15 : 0;
          const offsetX = push * (dx / (dist || 1));
          const wave = Math.sin(time * 2 + y * 0.008) * 2;
          if (y === 0) ctx.moveTo(x + offsetX + wave, y);
          else ctx.lineTo(x + offsetX + wave, y);
        }
        const alphaBase = 0.04 + 0.03 * Math.sin(time + x * 0.003);
        ctx.strokeStyle = `rgba(0, 0, 0, ${alphaBase * 0.7})`;
        ctx.stroke();
      }

      for (let y = 0; y <= h + gridSize; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = dist < mouseRadius ? (1 - dist / mouseRadius) * 15 : 0;
          const offsetY = push * (dy / (dist || 1));
          const wave = Math.sin(time * 2 + x * 0.008) * 2;
          if (x === 0) ctx.moveTo(x, y + offsetY + wave);
          else ctx.lineTo(x, y + offsetY + wave);
        }
        const alphaBase = 0.04 + 0.03 * Math.sin(time + y * 0.003);
        ctx.strokeStyle = `rgba(0, 0, 0, ${alphaBase * 0.7})`;
        ctx.stroke();
      }

      // ─── Intersection glow near cursor ───
      for (let gx = 0; gx <= w + gridSize; gx += gridSize) {
        for (let gy = 0; gy <= h + gridSize; gy += gridSize) {
          const dx = gx - mx;
          const dy = gy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius * 1.2) {
            const proximity = 1 - dist / (mouseRadius * 1.2);
            const pulse = 0.5 + 0.5 * Math.sin(time * 3 + dist * 0.02);
            const r = 2 + proximity * 3 * pulse;
            const alpha = proximity * 0.6 * pulse;

            // Push point away from cursor
            const push = dist < mouseRadius ? (1 - dist / mouseRadius) * 15 : 0;
            const px = gx + push * (dx / (dist || 1));
            const py = gy + push * (dy / (dist || 1));

            ctx.beginPath();
            ctx.arc(px, py, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 123, 255, ${alpha * 0.8})`;
            ctx.fill();

            // Glow halo
            if (proximity > 0.5) {
              ctx.beginPath();
              ctx.arc(px, py, r + 6, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(74, 123, 255, ${alpha * 0.12})`;
              ctx.fill();
            }
          }
        }
      }

      // ─── Floating particles ───
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearCursor = dist < mouseRadius;
        const alpha = nearCursor
          ? p.alpha + (1 - dist / mouseRadius) * 0.4
          : p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.6})`;
        ctx.fill();
      });

      // ─── Mouse glow halo ───
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius);
      gradient.addColorStop(0, "rgba(74, 123, 255, 0.04)");
      gradient.addColorStop(0.5, "rgba(74, 123, 255, 0.015)");
      gradient.addColorStop(1, "rgba(74, 123, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(mx - mouseRadius, my - mouseRadius, mouseRadius * 2, mouseRadius * 2);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}

/* ─── Glass Portal Window ─── */
function GlassPortal() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Main glass frame — centered viewport window */}
      <div
        className="absolute inset-6 md:inset-10 rounded-2xl"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.04)",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(74,123,255,0.008) 50%, rgba(0,0,0,0.005) 100%)",
          backdropFilter: "blur(0.5px)",
          boxShadow:
            "inset 0 1px 0 0 rgba(0,0,0,0.03), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 0 120px rgba(74,123,255,0.02)",
        }}
      >
        {/* Top-left corner bracket */}
        <div className="absolute top-0 left-0">
          <div className="w-12 h-px bg-gradient-to-r from-black/8 to-transparent" />
          <div className="w-px h-12 bg-gradient-to-b from-black/8 to-transparent" />
        </div>
        {/* Top-right corner bracket */}
        <div className="absolute top-0 right-0">
          <div className="w-12 h-px bg-gradient-to-l from-black/8 to-transparent ml-auto" />
          <div className="w-px h-12 bg-gradient-to-b from-black/8 to-transparent ml-auto" />
        </div>
        {/* Bottom-left corner bracket */}
        <div className="absolute bottom-0 left-0">
          <div className="w-px h-12 bg-gradient-to-t from-black/8 to-transparent" />
          <div className="w-12 h-px bg-gradient-to-r from-black/8 to-transparent" />
        </div>
        {/* Bottom-right corner bracket */}
        <div className="absolute bottom-0 right-0">
          <div className="w-px h-12 bg-gradient-to-t from-black/8 to-transparent ml-auto" />
          <div className="w-12 h-px bg-gradient-to-l from-black/8 to-transparent ml-auto" />
        </div>

        {/* Gradient shine sweep */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.015) 45%, rgba(0,0,0,0.025) 50%, rgba(0,0,0,0.015) 55%, transparent 60%)",
          }}
        />
      </div>

      {/* Outer vignette — subtle on light bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, transparent 0%, rgba(242,240,238,0.5) 70%, rgba(242,240,238,0.9) 100%)",
        }}
      />
    </div>
  );
}

/* ─── HUD Overlay ─── */
function HUDOverlay() {
  return (
    <div className="absolute inset-8 md:inset-12 pointer-events-none z-10" aria-hidden="true">
      {/* Top-left label */}
      <div className="absolute top-4 left-4 timecode">
        Scene 01 — Entry
      </div>

      {/* Bottom-right timecode */}
      <div className="absolute bottom-4 right-4 timecode">
        Principal Product Designer
      </div>

      {/* Top-right recording dot */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-rec animate-rec-blink" />
        <span className="timecode">REC</span>
      </div>
    </div>
  );
}

/* ─── Main Hero ─── */
interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  showGrid?: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Hero({
  title,
  subtitle,
  description,
  badge,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -80]);
  const glassOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="scene-full relative" role="banner">
      {/* Immersive animated background */}
      <GridCanvas />

      {/* Glass portal window overlay */}
      <motion.div style={{ opacity: glassOpacity }} className="absolute inset-0 z-[2]">
        <GlassPortal />
      </motion.div>

      {/* Bottom fade — transitions into the white project zone */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, rgb(242, 240, 238), transparent)",
        }}
      />

      {/* HUD recording overlay */}
      <HUDOverlay />

      {/* Content */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative max-w-content mx-auto px-6 w-full z-10"
      >
        <div className="max-w-5xl">
          {/* Name */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mb-10"
          >
            <span className="text-caption uppercase tracking-[0.15em] text-[#6a6a75] font-medium">
              James Babarinde
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="text-display-hero font-extrabold tracking-tighter leading-[0.92] text-[#0a0a0c]"
          >
            {title
              ? title.split("\\n").map((line, i) => (
                  <span key={i} className="block">
                    {line.includes("*") ? (
                      <>
                        {line.split("*").map((part, j) =>
                          j % 2 === 1 ? (
                            <span
                              key={j}
                              className="gradient-text animate-gradient"
                            >
                              {part}
                            </span>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                      </>
                    ) : (
                      line
                    )}
                  </span>
                ))
              : (
                <>
                  <span className="block">Design is</span>
                  <span className="block">
                    <span className="gradient-text animate-gradient">architecture</span>
                  </span>
                </>
              )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.7}
              className="text-heading-lg text-[#3a3a42] font-light max-w-2xl mt-8"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Description */}
          {description && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.85}
              className="text-body-lg text-[#6a6a75] max-w-xl mt-4"
            >
              {description}
            </motion.p>
          )}

          {/* Scroll cue */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.1}
            className="mt-20"
          >
            <motion.div
              className="flex items-center gap-4"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-[#6a6a75]/40 to-transparent" />
              <span className="timecode">Scroll to descend</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
