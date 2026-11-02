"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/asset";

interface ProjectSceneProps {
  number: string;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  href: string;
  image?: string;
  /** Vertical side labels */
  sideLabels?: string[];
  /** Flip layout — image on left */
  flip?: boolean;
}

export function ProjectScene({
  number,
  category,
  title,
  shortTitle,
  description,
  tags,
  href,
  image,
  sideLabels = [],
  flip = false,
}: ProjectSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Title: blurred & dim at bottom, sharp & bright at center, blurred & dim exiting top
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [0.15, 0.4, 1, 1, 0.4, 0.15]
  );
  const titleFilter = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [
      "blur(12px)",
      "blur(6px)",
      "blur(0px)",
      "blur(0px)",
      "blur(6px)",
      "blur(12px)",
    ]
  );

  return (
    <Link href={href} className="group block">
      <section
        ref={ref}
        className="relative min-h-screen flex items-center overflow-hidden py-24 md:py-0"
      >
        {/* Scene divider */}
        <div className="absolute top-0 left-0 right-0 scene-divider" />

        {/* Side labels — vertical text on the left edge */}
        {sideLabels.length > 0 && (
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col gap-6">
            {sideLabels.map((label) => (
              <span
                key={label}
                className="timecode [writing-mode:vertical-lr] rotate-180 tracking-[0.15em]"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Section number + category — top left */}
        <motion.div
          style={{ opacity }}
          className="absolute top-8 left-4 md:left-20 flex items-center gap-4 z-10"
        >
          <span className="timecode">{number}</span>
          <span className="w-8 h-px bg-text-tertiary/30" />
          <span className="timecode">{category}</span>
        </motion.div>

        {/* Main content */}
        <motion.div
          style={{ opacity }}
          className={`relative max-w-content mx-auto px-6 md:px-20 w-full z-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center ${
            flip ? "" : ""
          }`}
        >
          {/* Text column */}
          <motion.div
            style={{ y: textY }}
            className={`${
              flip ? "md:col-start-7 md:col-span-6 md:order-2" : "md:col-span-7"
            }`}
          >
            {/* Large display title — blurs in from bottom, sharpens at center */}
            <motion.h2
              style={{
                filter: titleFilter,
                opacity: titleOpacity,
                fontSize: "clamp(3rem, 7vw, 7rem)",
              }}
              className="font-extrabold tracking-tighter leading-[0.9] mb-8 group-hover:text-accent transition-colors duration-500 will-change-[filter,opacity]"
            >
              {shortTitle}
            </motion.h2>

            {/* Description with accent bar */}
            <div className="flex gap-4 mb-8 max-w-lg">
              <div className="w-[3px] bg-text-primary/20 group-hover:bg-accent/50 transition-colors duration-500 shrink-0 rounded-full" />
              <div>
                <p className="text-body-lg text-text-secondary leading-relaxed mb-2">
                  {description}
                </p>
              </div>
            </div>

            {/* Tags row with dividers */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
              {tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-4">
                  {i > 0 && (
                    <span className="w-px h-3 bg-text-tertiary/30" />
                  )}
                  <span className="timecode uppercase">{tag}</span>
                </span>
              ))}
            </div>

            {/* Project Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded border border-accent/40 bg-accent/5 text-accent hover:bg-accent/10 hover:border-accent/60 transition-all duration-150 font-medium tracking-wide group/btn"
            >
              <span className="text-sm uppercase">Explore Project</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="group-hover/btn:translate-x-1 transition-transform duration-150"
              >
                <path
                  d="M4 12L12 4M12 4H5M12 4V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Image column — floating, parallax */}
          <motion.div
            style={{ y: imageY }}
            className={`relative ${
              flip
                ? "md:col-start-1 md:col-span-5 md:order-1"
                : "md:col-start-9 md:col-span-4"
            }`}
          >
            {image ? (
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden group-hover:shadow-2xl transition-shadow duration-700">
                <Image
                  src={withBasePath(image)}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
                {/* Frosted glass overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ) : (
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-border/30">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom-right arrow indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 right-8 md:right-20 z-10 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="timecode">View project</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-text-tertiary group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300"
          >
            <path
              d="M4 12L12 4M12 4H5M12 4V11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </section>
    </Link>
  );
}
