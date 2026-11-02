"use client";

import { Hero } from "@/components/Hero";
import { SystemDiagram } from "@/components/SystemDiagram";
import { SectionHeader } from "@/components/SectionHeader";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/MotionSection";
import { motion } from "framer-motion";

const principles = [
  {
    title: "Composability",
    description:
      "Design primitives that combine predictably. Every component should be useful alone and powerful in composition.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "Constraint-driven creativity",
    description:
      "Systems aren't limitations — they're the foundation that lets teams move fast with confidence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Progressive disclosure",
    description:
      "Surface the right complexity at the right time. Simple by default, powerful on demand.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Platform empathy",
    description:
      "Understand the full ecosystem — from API consumers to end users — and design for every layer.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const tokenDiagramNodes = [
  { id: "brand", label: "Brand Tokens", sublabel: "Color, typography", x: 120, y: 100, type: "accent" as const },
  { id: "semantic", label: "Semantic Tokens", sublabel: "Intent-based", x: 400, y: 100, type: "primary" as const },
  { id: "component", label: "Component Tokens", sublabel: "Scoped values", x: 680, y: 100, type: "primary" as const },
  { id: "figma", label: "Figma Variables", x: 200, y: 280, type: "secondary" as const },
  { id: "css", label: "CSS Variables", x: 400, y: 280, type: "secondary" as const },
  { id: "ios", label: "iOS Tokens", x: 600, y: 280, type: "secondary" as const },
  { id: "output", label: "Multi-Platform Output", sublabel: "Consistent experiences", x: 400, y: 390, type: "accent" as const },
];

const tokenDiagramConnections = [
  { from: "brand", to: "semantic", label: "References" },
  { from: "semantic", to: "component", label: "Applies" },
  { from: "brand", to: "figma" },
  { from: "semantic", to: "css" },
  { from: "component", to: "ios" },
  { from: "figma", to: "output" },
  { from: "css", to: "output" },
  { from: "ios", to: "output" },
];

export default function ArchitecturePage() {
  return (
    <>
      <Hero
        title={"Architecture *thinking*"}
        subtitle="How I approach system design, information architecture, and scalable UX infrastructure."
        badge="Approach"
        showGrid={false}
      />

      {/* Principles */}
      <section className="max-w-content mx-auto px-6 pb-section">
        <SectionHeader
          label="Principles"
          title="Design convictions"
          description="The beliefs that guide how I approach every design challenge."
        />

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <StaggerItem key={principle.title}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(74, 123, 255, 0.3)" }}
                transition={{ duration: 0.2 }}
                className="p-8 rounded-2xl border border-border bg-surface h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center text-accent mb-5">
                  {principle.icon}
                </div>
                <h3 className="text-heading font-semibold text-text-primary mb-3">
                  {principle.title}
                </h3>
                <p className="text-body text-text-tertiary leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Token Architecture Diagram */}
      <section className="relative py-section overflow-hidden">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative max-w-content mx-auto px-6">
          <SystemDiagram
            title="Token Architecture"
            description="A multi-layer token system that bridges design decisions across platforms and products."
            nodes={tokenDiagramNodes}
            connections={tokenDiagramConnections}
          />
        </div>
      </section>

      {/* Process */}
      <section className="max-w-content mx-auto px-6 py-section">
        <SectionHeader
          label="Process"
          title="From ambiguity to clarity"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {[
            {
              phase: "Discover",
              title: "Map the landscape",
              description:
                "Stakeholder interviews, competitive analysis, technical audits, and user research to understand the full problem space.",
            },
            {
              phase: "Define",
              title: "Frame the architecture",
              description:
                "Information architecture, system models, and design principles that create a shared mental model for the team.",
            },
            {
              phase: "Design",
              title: "Build the system",
              description:
                "Component design, interaction patterns, and documentation that enable consistent, scalable product development.",
            },
            {
              phase: "Deliver",
              title: "Ship and evolve",
              description:
                "Implementation support, quality assurance, and governance models that keep the system healthy over time.",
            },
          ].map((step, i) => (
            <MotionSection
              key={step.phase}
              delay={i * 0.1}
              className={`relative grid md:grid-cols-2 gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? "" : "md:direction-rtl"
              }`}
            >
              <div
                className={`pl-16 md:pl-0 ${
                  i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16 md:col-start-2"
                }`}
              >
                <span className="text-overline uppercase text-accent font-mono font-medium">
                  {step.phase}
                </span>
                <h3 className="text-heading-lg font-semibold text-text-primary mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-body text-text-tertiary">
                  {step.description}
                </p>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background" />
            </MotionSection>
          ))}
        </div>
      </section>
    </>
  );
}
