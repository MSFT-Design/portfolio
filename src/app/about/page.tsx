"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { TravelEntryPoint } from "@/components/TravelSection";

/* ─── Fade-up variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ─── Narrative Section Wrapper ─── */
function NarrativeSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal Rule ─── */
function Divider() {
  return (
    <div className="max-w-content mx-auto px-6 md:px-20">
      <div className="scene-divider" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   About Page
   ═══════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      {/* ── Hero / Intro ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pb-24 pt-40">
        <div className="absolute inset-0 dot-pattern opacity-10" />

        <div className="relative max-w-content mx-auto px-6 md:px-20 w-full z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <span className="timecode block mb-6">About</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="text-display-hero font-extrabold tracking-tighter leading-[0.9] mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            A decade
            <br />
            <span className="gradient-text animate-gradient">of design.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="text-body-lg text-text-secondary font-light max-w-2xl leading-relaxed"
          >
            After 10 years in the industry, I started to expand my understanding
            of history and culture through travel and sketching. For creative fun,
            my current personal project is building an FPS video game. I also find
            deep fulfilment by being an educator in Vancouver Film School.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 01 — Cinematic Travel Sequence
          ════════════════════════════════════════════ */}
      <TravelEntryPoint />

      <Divider />

      {/* ════════════════════════════════════════════
          Section 02 — Teaching
          Structured, grid-like, precise
          ════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-surface/50">
        {/* Grid pattern — structured background */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative max-w-content mx-auto px-6 md:px-20">
          {/* Section label */}
          <NarrativeSection>
            <div className="flex items-center gap-4 mb-16">
              <span className="timecode">02</span>
              <span className="w-12 h-px bg-text-tertiary/30" />
              <span className="timecode">Transmission</span>
            </div>
          </NarrativeSection>

          {/* Large title */}
          <NarrativeSection className="mb-16">
            <h2
              className="font-extrabold tracking-tighter leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
            >
              Design educator
              <br />
              at Vancouver FS.
            </h2>
          </NarrativeSection>

          {/* Content — rigid two-column, structured */}
          <div className="grid md:grid-cols-2 gap-16">
            <NarrativeSection>
              <div className="flex gap-4">
                <div className="w-[3px] bg-accent/20 shrink-0 rounded-full" />
                <div>
                  <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
                    I teach UX and prototyping at Vancouver Film School.
                    Building the curriculum and mentoring students through
                    their final projects is fulfilling.
                  </p>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    That work carries into my role as an accessibility and
                    design systems lead, where I also develop course content
                    for designers at Microsoft.
                  </p>
                </div>
              </div>
            </NarrativeSection>

            <NarrativeSection>
              {/* Structured grid of principles */}
              <div className="grid grid-cols-2 gap-px bg-border/30">
                {[
                  { label: "Principle", value: "Mentorship" },
                  { label: "Grounded", value: "Give back" },
                  { label: "Approach", value: "Guidance" },
                  { label: "Teach", value: "Growth" },
                ].map((item) => (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-background p-6"
                  >
                    <span className="timecode block mb-2">{item.label}</span>
                    <span className="text-heading font-semibold text-text-primary tracking-tight">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </NarrativeSection>
          </div>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════
          Section 03 — Game Development
          Dynamic, energetic, diagonal energy
          ════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Dynamic diagonal lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 60px, rgba(74,123,255,0.3) 60px, rgba(74,123,255,0.3) 61px)",
          }}
        />

        <div className="relative max-w-content mx-auto px-6 md:px-20">
          {/* Section label */}
          <NarrativeSection>
            <div className="flex items-center gap-4 mb-16">
              <span className="timecode">03</span>
              <span className="w-12 h-px bg-text-tertiary/30" />
              <span className="timecode">Experimentation</span>
            </div>
          </NarrativeSection>

          {/* Large title */}
          <NarrativeSection className="mb-16">
            <h2
              className="font-extrabold tracking-tighter leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
            >
              Building a
              <br />
              video game.
            </h2>
          </NarrativeSection>

          {/* Content — dynamic, asymmetric */}
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <NarrativeSection className="md:col-span-6 md:col-start-1">
              <div className="flex gap-4">
                <div className="w-[3px] bg-accent/20 shrink-0 rounded-full" />
                <div>
                  <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
                    Game systems are the most unforgiving test of design architecture.
                    State management, physics, AI behavior trees, procedural generation —
                    every decision compounds. There&apos;s no room for ambiguity in a system
                    that runs sixty times a second.
                  </p>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    Building a game from scratch is an exercise in pure systems thinking:
                    defining rules, constraints, and feedback loops that create emergent
                    behavior. It&apos;s the most experimental form of the same work I do
                    in product design — designing the conditions for experience,
                    not the experience itself.
                  </p>
                </div>
              </div>
            </NarrativeSection>

            <NarrativeSection className="md:col-span-4 md:col-start-8">
              {/* Dynamic stat blocks */}
              <div className="space-y-6">
                {[
                  { stat: "60fps", label: "Every frame is a design decision" },
                  { stat: "ECS", label: "Entity-component architecture" },
                  { stat: "PCG", label: "Procedural content generation" },
                  { stat: "FSM", label: "State machines as interaction models" },
                ].map((item, i) => (
                  <motion.div
                    key={item.stat}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-l-2 border-accent/20 pl-5"
                  >
                    <span className="text-display font-extrabold tracking-tighter text-text-primary block leading-none mb-1">
                      {item.stat}
                    </span>
                    <span className="text-caption text-text-tertiary">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </NarrativeSection>
          </div>
        </div>
      </section>

    </>
  );
}
