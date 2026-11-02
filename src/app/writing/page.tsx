"use client";

import { Hero } from "@/components/Hero";
import { MotionSection } from "@/components/MotionSection";
import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
  {
    title: "The Architecture of Design Systems",
    excerpt:
      "Why treating your design system as a product — with its own roadmap, governance, and metrics — is the key to long-term success.",
    date: "Mar 2026",
    readTime: "8 min",
    category: "Design Systems",
    featured: true,
  },
  {
    title: "Why Platform Thinking Matters for Designers",
    excerpt:
      "Moving beyond feature design to platform design changes everything about how you approach problems, stakeholders, and scale.",
    date: "Feb 2026",
    readTime: "6 min",
    category: "Strategy",
    featured: true,
  },
  {
    title: "Scaling UX: From Artisan to Architect",
    excerpt:
      "The career transition from hands-on IC work to systems-level thinking, and how to maintain craft while operating at scale.",
    date: "Jan 2026",
    readTime: "10 min",
    category: "Career",
    featured: false,
  },
  {
    title: "Design Tokens Are an API",
    excerpt:
      "Reframing design tokens as a contract between design and engineering unlocks better tooling, governance, and collaboration.",
    date: "Dec 2025",
    readTime: "7 min",
    category: "Infrastructure",
    featured: false,
  },
  {
    title: "The Developer Experience of Design Systems",
    excerpt:
      "Your design system's biggest users are engineers. Here's how to design for their workflows, mental models, and pain points.",
    date: "Nov 2025",
    readTime: "9 min",
    category: "DevEx",
    featured: false,
  },
  {
    title: "Measuring Design System Health",
    excerpt:
      "Beyond adoption metrics — how to track consistency, velocity, satisfaction, and the real impact of your design system.",
    date: "Oct 2025",
    readTime: "5 min",
    category: "Metrics",
    featured: false,
  },
];

export default function WritingPage() {
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <Hero
        title={"Thinking *in public*"}
        subtitle="Essays and perspectives on design systems, platform strategy, and the craft of scalable design."
        badge="Writing"
        showGrid={false}
      />

      {/* Featured */}
      <section className="max-w-content mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((post, i) => (
            <MotionSection key={post.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group h-full p-8 rounded-2xl border border-border bg-surface hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <span className="text-overline uppercase text-accent font-medium">
                  {post.category}
                </span>
                <h2 className="text-heading-lg font-semibold text-text-primary mt-3 mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-body text-text-tertiary mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-caption text-text-tertiary">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
              </motion.article>
            </MotionSection>
          ))}
        </div>
      </section>

      {/* All articles */}
      <section className="max-w-content mx-auto px-6 pb-section">
        <div className="divide-y divide-border">
          {rest.map((post, i) => (
            <MotionSection key={post.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
                className="group py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 text-overline text-accent bg-accent-muted rounded-md">
                      {post.category}
                    </span>
                    <span className="text-caption text-text-tertiary">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-body-lg font-medium text-text-primary group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-body text-text-tertiary mt-1 line-clamp-1 max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-caption text-text-tertiary">
                    {post.readTime}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-text-tertiary group-hover:text-accent transition-all group-hover:translate-x-1"
                  >
                    <path
                      d="M4 10H16M16 10L11 5M16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.article>
            </MotionSection>
          ))}
        </div>
      </section>
    </>
  );
}
