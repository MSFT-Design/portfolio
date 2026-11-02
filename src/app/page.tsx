"use client";

import { Hero } from "@/components/Hero";
import { ProjectScene } from "@/components/ProjectScene";
import { DesignPhilosophyDiagram } from "@/components/SystemDiagram";
import { SectionHeader } from "@/components/SectionHeader";
import {
  SceneSection,
  TypoAnchor,
  MotionSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/MotionSection";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

/* ───── Data ───── */
const featuredWork = [
  {
    title: "Monocore — One system, across platforms",
    description: "Architecture and tooling connecting iOS, Android, shared variables and documentation through a canonical design-system model.",
    category: "Platform Systems",
    tags: ["Systems Architecture", "Design Systems", "Figma MCP"],
    href: "/work/monocore",
    featured: true,
  },
  {
    title: "Spatial UI — Microsoft Teams on Apple Vision Pro",
    description:
      "Led spatial design for the first Microsoft Teams experience on visionOS, defining interaction principles, depth hierarchy, and platform-specific design patterns.",
    category: "Spatial Computing",
    tags: ["visionOS", "Spatial UI", "Platform UX", "Design Systems", "Accessibility"],
    href: "/work/spatial-ui",
    image: "/images/spatial-ui-hero.jpg",
    featured: true,
  },
  {
    title: "Microsoft SaaS — Multi-feature Configurable Components",
    description:
      "Designed reusable, configurable components spanning social feed and team selection experiences across Enterprise, Consumer, and Education SKUs at Microsoft.",
    category: "Platform Systems",
    tags: ["Design System", "Accessibility", "Telemetry", "A/B Testing"],
    href: "/work/microsoft-saas",
    image: "/images/msft-hero.jpg",
    featured: true,
  },
  {
    title: "Achievers SaaS — End-to-end Product Design",
    description:
      "Product design and design system frameworks for an enterprise recognition platform serving Barclays, GM, Samsung, and Scotiabank.",
    category: "Enterprise SaaS",
    tags: ["User Research", "System Design", "Prototyping", "Telemetry"],
    href: "/work/achievers-saas",
    image: "/images/achievers-hero.jpg",
    featured: true,
  },
  {
    title: "Enterprise Design System",
    description:
      "Built a unified component library serving 12 product teams, reducing design-to-dev handoff time by 60% and ensuring visual consistency at scale.",
    category: "Design Systems",
    tags: ["Figma", "React", "Tokens", "Documentation"],
    href: "/work/enterprise-design-system",
    featured: true,
  },
];

/* ─── Fade-to-Black Scroll Overlay ─── */
function FadeToBlack() {
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.85], [0, 0.25, 0.55, 0.75]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[50]"
      style={{
        opacity: overlayOpacity,
        background:
          "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)",
      }}
      aria-hidden="true"
    />
  );
}

/* ─── White-to-Black Background Zone ─── */
function WhiteToBlackZone({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Near-white the whole way, quick snap to black at the very end
  const bg = useTransform(
    scrollYProgress,
    [0, 0.88, 0.95, 1],
    [
      "rgb(242, 240, 238)", // lighter white
      "rgb(238, 236, 233)", // still light
      "rgb(5, 5, 6)",       // snap to black fast
      "rgb(5, 5, 6)",       // hold black
    ]
  );

  // Invert text colors while in the light zone
  const [isLight, setIsLight] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIsLight(v < 0.94);
  });

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor: bg }}
      className={`relative transition-colors duration-0 ${isLight ? "white-zone" : ""}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Accessibility Interactive Demo ─── */
function AccessibilityDemo() {
  return (
    <MotionSection className="mt-16">
      <div className="relative rounded-lg border border-border/40 bg-surface/30 overflow-hidden hud-corners">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <span className="timecode text-accent/60">Live System Preview</span>
          <div className="flex items-center gap-3">
            <span className="rec-indicator timecode">Active</span>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contrast ratios */}
            <div>
              <span className="timecode block mb-4">Color Contrast</span>
              <div className="space-y-3">
                {[
                  { label: "Primary Text", ratio: "15.8:1", level: "AAA", color: "#F0F0F2" },
                  { label: "Secondary Text", ratio: "5.2:1", level: "AA", color: "#8A8A96" },
                  { label: "Accent on Dark", ratio: "4.7:1", level: "AA", color: "#4A7BFF" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-caption text-text-secondary">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-hud text-text-tertiary font-mono">{item.ratio}</span>
                      <span className="text-hud text-accent px-1.5 py-0.5 rounded border border-accent/20 font-mono">
                        {item.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus states */}
            <div>
              <span className="timecode block mb-4">Focus Management</span>
              <div className="space-y-4">
                <button
                  className="w-full px-4 py-3 text-caption text-text-secondary bg-surface-elevated rounded border border-border/40 text-left
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
                    hover:border-accent/30 transition-colors"
                  tabIndex={0}
                >
                  Tab to focus this element
                </button>
                <button
                  className="w-full px-4 py-3 text-caption text-text-secondary bg-surface-elevated rounded border border-border/40 text-left
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
                    hover:border-accent/30 transition-colors"
                  tabIndex={0}
                >
                  Keyboard-navigable interface
                </button>
                <div className="px-4 py-3 text-hud text-text-tertiary font-mono border border-border/20 rounded">
                  aria-label=&quot;Interactive demo&quot;
                </div>
              </div>
            </div>

            {/* Motion preferences */}
            <div>
              <span className="timecode block mb-4">Motion Sensitivity</span>
              <div className="space-y-4">
                <div className="p-4 rounded border border-border/30 bg-surface-elevated/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-caption text-text-secondary">prefers-reduced-motion</span>
                    <span className="text-hud text-accent font-mono">Respected</span>
                  </div>
                  <div className="w-full h-1 bg-border/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent/60 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
                <div className="p-4 rounded border border-border/30 bg-surface-elevated/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-caption text-text-secondary">Scroll animations</span>
                    <span className="text-hud text-accent font-mono">Progressive</span>
                  </div>
                  <div className="text-hud text-text-tertiary font-mono leading-relaxed">
                    All transitions degrade gracefully.
                    <br />
                    Content-first, motion-second.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

/* ─── System Layers Visualization ─── */
function SystemLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const layers = [
    {
      label: "Layer 01",
      title: "Foundations",
      items: ["Design Tokens", "Color System", "Typography Scale", "Spacing Grid"],
      y: layer1Y,
    },
    {
      label: "Layer 02",
      title: "Components",
      items: ["Primitives", "Composites", "Templates", "Behaviors"],
      y: layer2Y,
    },
    {
      label: "Layer 03",
      title: "Experiences",
      items: ["Page Patterns", "User Flows", "Platform Variants", "Accessibility"],
      y: layer3Y,
    },
  ];

  return (
    <div ref={ref} className="relative mt-16">
      <div className="grid md:grid-cols-3 gap-6">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            style={{ y: layer.y }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-lg border border-border/40 bg-surface/30 backdrop-blur-sm scanline"
            >
              <span className="timecode text-accent/60 block mb-6">
                {layer.label}
              </span>
              <h3 className="text-heading-lg font-bold text-text-primary mb-6 tracking-tight">
                {layer.title}
              </h3>
              <ul className="space-y-3">
                {layer.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + j * 0.05 + 0.3 }}
                    className="flex items-center gap-3 text-body text-text-secondary"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/40" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Layer depth indicator */}
              <div className="mt-8 flex items-center gap-2">
                {Array.from({ length: 3 }).map((_, k) => (
                  <div
                    key={k}
                    className={`h-px flex-1 ${k <= i ? "bg-accent/40" : "bg-border/30"}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ───── Page ───── */
export default function HomePage() {
  return (
    <>
      {/* Progressive fade to black as user scrolls */}
      <FadeToBlack />

      <div className="grain">
        {/* ── White-to-Black zone: covers hero + all projects ── */}
        <WhiteToBlackZone>
          {/* ── Scene 01: Hero ── */}
          <Hero
            title={"Design *Architect*"}
            subtitle="Systems built beneath the surface, felt in every interaction."
            description="Accessible. AI-ready. Built to scale."
          />

          {/* ── Projects — Open editorial sections ── */}
          <ProjectScene
            number="001"
            category="Spatial Computing"
            shortTitle="Spatial UI"
            title="Spatial UI — Microsoft Teams on Apple Vision Pro"
            description="Led spatial design for the first Microsoft Teams experience on visionOS, defining interaction principles, depth hierarchy, and platform-specific design patterns."
            tags={["visionOS", "Spatial UI", "Platform UX", "Design Systems", "Accessibility"]}
            href="/work/spatial-ui"
            image="/images/spatial-ui-hero.jpg"
            sideLabels={["visionOS", "Spatial", "Platform"]}
          />

          <ProjectScene
            number="002"
            category="Platform Systems"
            shortTitle="Microsoft SaaS"
            title="Microsoft SaaS — Multi-feature Configurable Components"
            description="Designed reusable, configurable components spanning social feed and team selection experiences across Enterprise, Consumer, and Education SKUs."
            tags={["Design System", "Accessibility", "Telemetry", "A/B Testing"]}
            href="/work/microsoft-saas"
            image="/images/msft-hero.jpg"
            sideLabels={["Enterprise", "Consumer", "Education"]}
            flip
          />

          <ProjectScene
            number="003"
            category="Enterprise SaaS"
            shortTitle="Achievers"
            title="Achievers SaaS — End-to-end Product Design"
            description="Product design and design system frameworks for an enterprise recognition platform serving Barclays, GM, Samsung, and Scotiabank."
            tags={["User Research", "System Design", "Prototyping", "Telemetry"]}
            href="/work/achievers-saas"
            image="/images/achievers-hero.jpg"
            sideLabels={["Research", "Systems", "Prototyping"]}
          />

          <ProjectScene
            number="004"
            category="Design Systems"
            shortTitle="Design System"
            title="Enterprise Design System"
            description="Built a unified component library serving 12 product teams, reducing design-to-dev handoff time by 60% and ensuring visual consistency at scale."
            tags={["Figma", "React", "Tokens", "Documentation"]}
            href="/work/enterprise-design-system"
            sideLabels={["Figma", "React", "Tokens"]}
            flip
          />
        </WhiteToBlackZone>

        {/* ── Typographic Anchor ── */}
        <TypoAnchor
          text="Systems over"
          accent="screens."
        />

        {/* ── Scene 02: Philosophy ── */}
        <SceneSection sceneNumber="02" sceneLabel="Philosophy">
          <div className="max-w-content mx-auto px-6 py-32">
            <SectionHeader
              label="Design Philosophy"
              title="I design the system, not just the surface."
              description="Every interface is an expression of underlying architecture. I start with the structure — tokens, components, patterns — and let the experience emerge from coherent foundations."
            />
            <DesignPhilosophyDiagram />
          </div>
        </SceneSection>

        {/* ── Typographic Anchor ── */}
        <TypoAnchor
          text="Navigate"
          accent="the layers."
        />

        {/* ── Scene 03: System Layers ── */}
        <SceneSection sceneNumber="03" sceneLabel="Architecture" dark>
          <div className="max-w-content mx-auto px-6 py-32">
            <SectionHeader
              label="System Architecture"
              title="Designing in depth, not in pixels."
              description="A design system is a living architecture. Each layer builds on the last — from atomic tokens to full product experiences."
              href="/architecture"
            />
            <SystemLayers />
          </div>
        </SceneSection>

        {/* ── Scene 04: Process ── */}
        <SceneSection sceneNumber="04" sceneLabel="Process">
          <div className="max-w-content mx-auto px-6 py-32">
            <SectionHeader
              label="How I Work"
              title="Three acts of design."
            />

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {[
                {
                  num: "Act I",
                  title: "Map the system",
                  description:
                    "Understand the full landscape — users, data flows, team structures, and technical constraints — before proposing solutions.",
                },
                {
                  num: "Act II",
                  title: "Design the primitives",
                  description:
                    "Identify the foundational building blocks — tokens, components, patterns — that create coherent, composable systems.",
                },
                {
                  num: "Act III",
                  title: "Scale through structure",
                  description:
                    "Build governance, documentation, and contribution models that let design scale beyond any individual designer.",
                },
              ].map((step) => (
                <StaggerItem key={step.num}>
                  <motion.div
                    whileHover={{ y: -4, borderColor: "rgba(74, 123, 255, 0.15)" }}
                    transition={{ duration: 0.3 }}
                    className="p-8 rounded-lg border border-border/40 bg-surface/20 backdrop-blur-sm h-full"
                  >
                    <span className="timecode text-accent/60">
                      {step.num}
                    </span>
                    <h3 className="text-heading font-semibold text-text-primary mt-6 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-body text-text-tertiary leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SceneSection>

        {/* ── Typographic Anchor ── */}
        <TypoAnchor
          text="Accessibility is"
          accent="a feature."
        />

        {/* ── Scene 05: Accessibility & System Thinking ── */}
        <SceneSection sceneNumber="05" sceneLabel="Accessibility" dark>
          <div className="max-w-content mx-auto px-6 py-32">
            <SectionHeader
              label="System Thinking"
              title="Inclusive by architecture."
              description="Accessibility isn't an afterthought — it's a system-level decision. Every token, every component, every interaction is built with inclusive intent."
            />
            <AccessibilityDemo />
          </div>
        </SceneSection>

        {/* ── Final Typographic Anchor ── */}
        <TypoAnchor
          text="What's next?"
          accent=""
        />
      </div>
    </>
  );
}
