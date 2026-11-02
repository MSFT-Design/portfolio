"use client";

import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/MotionSection";
import { motion } from "framer-motion";

const experiments = [
  {
    title: "Generative UI Patterns",
    description:
      "Exploring how AI can dynamically adapt interface layouts, density, and information hierarchy based on user context and behavior patterns.",
    tags: ["AI/ML", "Adaptive UI", "Prototyping"],
    status: "Active",
    icon: "✦",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Spatial Design Tokens",
    description:
      "Visualizing token relationships in 3D space — mapping color, spacing, and typography as a navigable spatial system.",
    tags: ["Three.js", "Design Tokens", "Visualization"],
    status: "Active",
    icon: "◈",
    color: "from-accent/20 to-cyan-500/20",
  },
  {
    title: "Motion Language System",
    description:
      "A systematic approach to UI animation — defining motion primitives, easing curves, and choreography rules as a composable system.",
    tags: ["Framer Motion", "Animation", "Systems"],
    status: "Ongoing",
    icon: "◉",
    color: "from-emerald-500/20 to-accent/20",
  },
  {
    title: "Component Stress Testing",
    description:
      "Automated visual regression testing that pushes components to their limits with extreme content, edge cases, and a11y audits.",
    tags: ["Testing", "Playwright", "Accessibility"],
    status: "Paused",
    icon: "◇",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Design System Analytics",
    description:
      "Tracking component adoption, usage patterns, and consistency metrics across products to measure design system health.",
    tags: ["Analytics", "Metrics", "Governance"],
    status: "Complete",
    icon: "▣",
    color: "from-violet-500/20 to-accent/20",
  },
  {
    title: "Micro-Interaction Library",
    description:
      "A collection of polished micro-interactions — toggles, loaders, transitions, and feedback patterns — as reusable React primitives.",
    tags: ["React", "Animation", "Open Source"],
    status: "Active",
    icon: "◐",
    color: "from-pink-500/20 to-accent/20",
  },
];

const statusColors: Record<string, string> = {
  Active: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Ongoing: "text-accent bg-accent/10 border-accent/20",
  Paused: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Complete: "text-text-tertiary bg-surface-elevated border-border",
};

export default function ExperimentsPage() {
  return (
    <>
      <Hero
        title={"*Experiments* &\\nExplorations"}
        subtitle="Side projects, prototypes, and design provocations that push my thinking forward."
        badge="Lab"
        showGrid={false}
      />

      <section className="max-w-content mx-auto px-6 pb-section">
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {experiments.map((exp) => (
            <StaggerItem key={exp.title}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent/30 transition-all duration-500 cursor-pointer"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                      {exp.icon}
                    </div>
                    <span
                      className={`px-6 py-1 text-overline rounded-full border ${
                        statusColors[exp.status]
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-heading font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-body text-text-tertiary mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-caption text-text-tertiary bg-surface-elevated rounded-md border border-border-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
