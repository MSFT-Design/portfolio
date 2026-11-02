"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { withBasePath } from "@/lib/asset";

/* ═══════════════════════════════════════════════════════════
   Cinematic Travel Section — Full Page
   A quiet, reflective sequence — not a typical webpage.
   Moving through memories, not navigating content.
   All images contained in rounded containers, never full-bleed.
   ═══════════════════════════════════════════════════════════ */

/* ─── 1. Entry Frame ─── */
function EntryFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      <motion.div
        style={{ scale, y, opacity }}
        className="relative w-full max-w-5xl mx-auto px-6 md:px-12"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
          <Image
            src={withBasePath("/images/travel/mountain-landscape.png")}
            alt="Mountain landscape at sunset"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 90vw, 70vw"
          />
          {/* Subtle dark gradient at bottom of image */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[30%] rounded-b-2xl pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(5,5,6,0.6), transparent)",
            }}
          />
          {/* Small corner label inside image */}
          <span className="absolute bottom-6 left-8 timecode text-white/50">
            Travel
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── 2. Opening Beat ─── */
function OpeningBeat() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);

  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.25, 0.4], [30, 0]);

  const line3Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);

  const sectionOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[160vh] overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center">
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="max-w-5xl mx-auto px-8 md:px-20 w-full"
        >
          <motion.div style={{ opacity: line1Opacity, y: line1Y }}>
            <p
              className="font-extrabold tracking-tighter leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)" }}
            >
              After one of my more intense projects,
              <br />
              I left.
            </p>
          </motion.div>

          <div className="mt-12 md:mt-16">
            <motion.p
              style={{ opacity: line2Opacity, y: line2Y }}
              className="text-text-secondary font-light leading-relaxed mb-3"
            >
              <span style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}>
                No itinerary.
              </span>
            </motion.p>
            <motion.p
              style={{ opacity: line3Opacity, y: line3Y }}
              className="text-text-secondary font-light leading-relaxed"
            >
              <span style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}>
                Just a sketchbook.
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 3. Sketchbook Sequence (Horizontal Scroll) ─── */
function SketchbookSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const smoothX = useSpring(x, { stiffness: 80, damping: 30 });

  const text1Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const text2Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  const sketchPages = [
    { src: "/images/travel/sketchbook-street.jpg", tilt: -2 },
    { src: "/images/travel/sketchbook-people.jpg", tilt: 1.5 },
    { src: "/images/travel/sketchbook-street.jpg", tilt: -1 },
    { src: "/images/travel/sketchbook-people.jpg", tilt: 2 },
  ];

  return (
    <section ref={ref} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x: smoothX }}
          className="flex gap-8 md:gap-12 pl-[10vw] pr-[40vw] items-center"
        >
          {sketchPages.map((page, i) => (
            <div
              key={i}
              className="shrink-0 w-[65vw] md:w-[40vw] h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden relative"
              style={{
                transform: `rotate(${page.tilt}deg) perspective(800px) rotateY(${page.tilt * 0.5}deg)`,
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <Image
                src={withBasePath(page.src)}
                alt="Sketchbook page"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 65vw, 40vw"
              />
              <div className="absolute inset-0 bg-amber-50/5 mix-blend-overlay rounded-2xl" />
            </div>
          ))}
        </motion.div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex items-end pb-16 md:pb-20 pointer-events-none z-10">
          <div className="max-w-5xl mx-auto px-8 md:px-20 w-full">
            <motion.p
              style={{ opacity: text1Opacity }}
              className="text-text-tertiary font-light italic mb-2"
            >
              <span style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)" }}>
                I draw as I move
              </span>
            </motion.p>
            <motion.p
              style={{ opacity: text2Opacity }}
              className="text-text-tertiary font-light italic"
            >
              <span style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)" }}>
                I follow what I see
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Walking Sequence ─── */
function WalkingSequence() {
  const landscapes = [
    {
      src: "/images/travel/hills-path.png",
      text: "Lines in architecture",
      textPosition: "bottom-10 left-8 md:left-12",
    },
    {
      src: "/images/travel/hills-wide.jpg",
      text: "Patterns in nature",
      textPosition: "bottom-10 right-8 md:right-12",
    },
    {
      src: "/images/travel/mountain-landscape.png",
      text: "Shadows across the ground",
      textPosition: "bottom-10 left-8 md:left-12",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 space-y-16 md:space-y-24">
      {landscapes.map((scene, i) => (
        <WalkingPanel key={i} {...scene} index={i} />
      ))}
    </section>
  );
}

function WalkingPanel({
  src,
  text,
  textPosition,
}: {
  src: string;
  text: string;
  textPosition: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.7, 0.85],
    [0, 1, 1, 0]
  );
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [15, 0]);

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto px-6 md:px-12">
      <motion.div style={{ y: parallaxY }} className="relative">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={withBasePath(src)}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 70vw"
          />
          {/* Vignette inside the rounded container */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(5,5,6,0.35) 100%)",
            }}
          />
        </div>

        {/* Text overlay anchored within the image */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className={`absolute ${textPosition} z-10`}
        >
          <p
            className="text-white/80 font-light tracking-tight"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)" }}
          >
            {text}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── 5. Connection Moment ─── */
function ConnectionMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lines = [
    "People would stop",
    "Sit beside me",
    "Flip through the pages",
  ];

  return (
    <section ref={ref} className="relative min-h-[140vh] overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-8 md:px-20 w-full">
          <div className="flex flex-col items-center">
            {/* Sketchbook close-up — tilted, contained */}
            <div
              className="relative w-[60vw] md:w-[32vw] overflow-hidden rounded-2xl mb-16 md:mb-20"
              style={{
                boxShadow:
                  "0 12px 50px rgba(0,0,0,0.25), 0 3px 12px rgba(0,0,0,0.15)",
                transform: "rotate(-1.5deg)",
              }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={withBasePath("/images/travel/sketchbook-people.jpg")}
                  alt="Sketchbook close-up"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 32vw"
                />
              </div>
            </div>

            {/* Text lines — quiet, staggered reveal */}
            <div className="text-center space-y-4">
              {lines.map((line, i) => {
                const start = 0.2 + i * 0.12;
                const end = start + 0.12;
                return (
                  <ConnectionLine
                    key={i}
                    text={line}
                    scrollYProgress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectionLine({
  text,
  scrollYProgress,
  range,
}: {
  text: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  const y = useTransform(scrollYProgress, range, [15, 0]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="text-text-secondary font-light"
    >
      <span style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}>{text}</span>
    </motion.p>
  );
}

/* ─── 6. Reflection Block ─── */
function ReflectionBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.25, 0.75, 0.95],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0.05, 0.25], [50, 0]);

  return (
    <section ref={ref} className="relative py-40 md:py-56">
      <motion.div
        style={{ opacity, y }}
        className="max-w-prose mx-auto px-8 md:px-12"
      >
        <p
          className="text-text-secondary font-light leading-[1.9] mb-8"
          style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}
        >
          Travelling through Tokyo, Seoul, and Taipei — filling notebooks not
          with landmarks, but with the invisible logic of how places move
          people. Train station wayfinding in Shinjuku. The layered signage
          systems of Shibuya. The quiet hierarchy of a Taiwanese night market
          stall.
        </p>
        <p
          className="text-text-secondary font-light leading-[1.9] mb-8"
          style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}
        >
          Every city is a design system. The patterns repeat at every scale —
          from transit maps to street food menus. Observation became the
          foundation of how I think about interfaces. Not what things look like,
          but how they guide behavior. How they create paths people follow
          without thinking.
        </p>
        <p
          className="text-text-tertiary font-light leading-[1.9]"
          style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}
        >
          I stopped designing for a while. I just watched. And when I came back,
          everything I made was different.
        </p>
      </motion.div>
    </section>
  );
}

/* ─── 7. Exit Frame ─── */
function ExitFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);

  return (
    <section ref={ref} className="relative py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div style={{ scale }} className="relative">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={withBasePath("/images/travel/hills-path.png")}
              alt="Path disappearing into the hills"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 70vw"
            />
            {/* Darken overlay */}
            <div className="absolute inset-0 bg-background/40 rounded-2xl" />
          </div>

          {/* Delayed text overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="text-center px-8 max-w-2xl"
            >
              <p
                className="text-white/90 font-light tracking-tight leading-[1.4]"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
              >
                The moments you do not plan for
              </p>
              <p
                className="text-white/90 font-light tracking-tight leading-[1.4] mt-2"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
              >
                tend to stay with you the longest
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Full Travel Section (for /travels page)
   ═══════════════════════════════════════════ */
export function TravelSection() {
  return (
    <div className="relative">
      <EntryFrame />
      <OpeningBeat />
      <SketchbookSequence />
      <WalkingSequence />
      <ConnectionMoment />
      <ReflectionBlock />
      <ExitFrame />
    </div>
  );
}

/* ═══════════════════════════════════════════
   Travel Entry Point (for /about page)
   Compact preview that links to full page
   ═══════════════════════════════════════════ */
export function TravelEntryPoint() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.06, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="timecode">01</span>
            <span className="w-12 h-px bg-text-tertiary/30" />
            <span className="timecode">Observation</span>
          </div>
          <h2
            className="font-extrabold tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Sketching systems
            <br />
            across Asia.
          </h2>
        </motion.div>

        {/* Image grid — two contained rounded images */}
        <a href="/travels" className="group block">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {/* Landscape */}
            <motion.div
              style={{ scale: imgScale }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={withBasePath("/images/travel/mountain-landscape.png")}
                alt="Mountain landscape at sunset"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,6,0.5), transparent 50%)",
                }}
              />
            </motion.div>

            {/* Sketchbook */}
            <motion.div
              style={{ scale: imgScale }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={withBasePath("/images/travel/sketchbook-people.jpg")}
                alt="Sketchbook drawing of a street scene"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,6,0.5), transparent 50%)",
                }}
              />
            </motion.div>
          </div>

          {/* Description + view link */}
          <motion.div
            style={{ opacity: captionOpacity }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <p className="text-body-lg text-text-secondary font-light max-w-lg leading-relaxed">
              Travelling through Tokyo, Seoul, and Taipei — filling notebooks
              not with landmarks, but with the invisible logic of how places
              move people.
            </p>
            <span className="text-text-tertiary text-sm font-mono tracking-wide uppercase group-hover:text-accent transition-colors duration-300 shrink-0">
              View journey →
            </span>
          </motion.div>
        </a>
      </div>
    </section>
  );
}
