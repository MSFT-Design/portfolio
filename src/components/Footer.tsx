"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MotionSection } from "./MotionSection";

const credits = [
  { role: "Design & Direction", name: "James Babarinde" },
  { role: "Discipline", name: "Product Design · Design Systems · Spatial UI" },
  { role: "Stack", name: "Next.js · Tailwind · Framer Motion" },
];

const links = [
  { label: "LinkedIn", href: "#" },
  { label: "Read.cv", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Email", href: "mailto:jbabarinde@microsoft.com" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/30">
      {/* Scene divider */}
      <div className="scene-divider" />

      <div className="max-w-content mx-auto px-6 py-32 md:py-48">
        {/* Cinematic CTA */}
        <MotionSection className="mb-24 md:mb-32">
          <div className="max-w-3xl">
            <span className="timecode block mb-6">Next Scene</span>
            <h2 className="text-display-xl md:text-display-hero font-extrabold tracking-tighter mb-8">
              Let&apos;s build
              <br />
              <span className="gradient-text animate-gradient">
                something real.
              </span>
            </h2>
            <p className="text-body-lg text-text-tertiary max-w-lg mb-10">
              I help teams design scalable platforms, build design systems, and
              ship products that grow with their users.
            </p>
            <motion.a
              href="mailto:jbabarinde@microsoft.com"
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 text-body-lg text-text-primary hover:text-accent transition-colors group"
            >
              <span className="w-12 h-px bg-accent group-hover:w-20 transition-all duration-500" />
              Start a conversation
            </motion.a>
          </div>
        </MotionSection>

        {/* End Credits */}
        <MotionSection delay={0.1}>
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {credits.map((credit) => (
              <div key={credit.role}>
                <span className="timecode block mb-2">{credit.role}</span>
                <span className="text-body text-text-secondary">{credit.name}</span>
              </div>
            ))}
          </div>
        </MotionSection>

        {/* Links */}
        <MotionSection delay={0.15}>
          <div className="flex flex-wrap gap-8 mb-20">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-caption text-text-tertiary hover:text-text-secondary transition-colors uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </MotionSection>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-border/20">
          <p className="timecode">
            &copy; {new Date().getFullYear()} James Babarinde
          </p>
          <p className="timecode mt-2 md:mt-0">
            Designed with obsessive attention to system and craft
          </p>
        </div>
      </div>
    </footer>
  );
}
