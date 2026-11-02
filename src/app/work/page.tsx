"use client";

import { Hero } from "@/components/Hero";
import { WorkCard } from "@/components/WorkCard";
import { MotionSection } from "@/components/MotionSection";

const projects = [
  {
    title: "Spatial UI — Microsoft Teams on Apple Vision Pro",
    description:
      "Led spatial design for the first Microsoft Teams experience on visionOS, defining interaction principles, depth hierarchy, and platform-specific design patterns for Apple Vision Pro.",
    category: "Spatial Computing",
    tags: ["visionOS", "Spatial UI", "Platform UX", "Design Systems", "Accessibility"],
    href: "/work/spatial-ui",
    image: "/images/spatial-ui-hero.jpg",
    featured: true,
  },
  {
    title: "Microsoft SaaS — Multi-feature Configurable Components",
    description:
      "Designed reusable, configurable components spanning social feed and team selection experiences across Enterprise, Consumer, and Education SKUs.",
    category: "Platform Systems",
    tags: ["Design System", "Accessibility", "Telemetry", "A/B Testing"],
    href: "/work/microsoft-saas",
    image: "/images/msft-hero.jpg",
    featured: true,
  },
  {
    title: "Achievers SaaS — End-to-end Product Design",
    description:
      "Product design and design system frameworks for an enterprise recognition platform serving clients including Barclays, GM, Samsung, and Scotiabank.",
    category: "Enterprise SaaS",
    tags: ["User Research", "System Design", "Prototyping", "Telemetry"],
    href: "/work/achievers-saas",
    image: "/images/achievers-hero.jpg",
    featured: true,
  },
  {
    title: "Enterprise Design System",
    description:
      "Built a unified component library serving 12 product teams, reducing design-to-dev handoff time by 60%.",
    category: "Design Systems",
    tags: ["Figma", "React", "Tokens", "Documentation"],
    href: "/work/enterprise-design-system",
    featured: true,
  },
  {
    title: "Platform Architecture Redesign",
    description:
      "Led the UX architecture for a B2B analytics platform, rethinking navigation and data density patterns.",
    category: "Platform Strategy",
    tags: ["UX Architecture", "Research", "Prototyping"],
    href: "/work/platform-redesign",
  },
  {
    title: "Developer Experience Portal",
    description:
      "Designed API documentation and developer onboarding that decreased time-to-first-API-call by 40%.",
    category: "DevEx",
    tags: ["API Design", "Documentation", "Developer Tools"],
    href: "/work/developer-experience",
  },
  {
    title: "Data Visualization Framework",
    description:
      "Created a composable charting system with accessibility-first design and responsive data density.",
    category: "Data Design",
    tags: ["D3.js", "Accessibility", "Responsive"],
    href: "/work/data-visualization",
  },
  {
    title: "Multi-Product Navigation",
    description:
      "Unified navigation patterns across a suite of 6 products, improving cross-product discoverability by 35%.",
    category: "IA & Navigation",
    tags: ["Information Architecture", "Wayfinding", "User Testing"],
    href: "/work/multi-product-navigation",
  },
  {
    title: "Design Token Infrastructure",
    description:
      "Architected a multi-brand token system supporting theming, dark mode, and platform-specific outputs.",
    category: "Infrastructure",
    tags: ["Style Dictionary", "Figma Variables", "CI/CD"],
    href: "/work/design-tokens",
  },
];

const filters = ["All", "Spatial Computing", "Platform Systems", "Enterprise SaaS", "Design Systems", "Platform Strategy", "DevEx", "Data Design", "Infrastructure"];

export default function WorkPage() {
  return (
    <>
      <Hero
        title={"Selected *work*"}
        subtitle="A curated collection of platform design, systems thinking, and UX architecture projects."
        badge="Portfolio"
        showGrid={false}
      />

      <section className="max-w-content mx-auto px-6 pb-section">
        {/* Filter pills */}
        <MotionSection className="flex flex-wrap gap-2 mb-12">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`px-4 py-2 text-caption rounded-lg border transition-all duration-200 ${
                i === 0
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "border-border text-text-tertiary hover:text-text-secondary hover:border-border"
              }`}
            >
              {filter}
            </button>
          ))}
        </MotionSection>

        {/* Projects grid */}
        <div className="grid gap-8">
          {projects.map((project, i) => (
            <WorkCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
