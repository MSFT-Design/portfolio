"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface WorkCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  href: string;
  image?: string;
  index?: number;
  featured?: boolean;
}

export function WorkCard({
  title,
  description,
  category,
  tags,
  href,
  image,
  index = 0,
}: WorkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={href} className="group block">
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="relative overflow-hidden rounded-lg border border-border/50 bg-surface/40 backdrop-blur-sm hud-corners transition-colors duration-500 group-hover:border-accent/20"
        >
          {/* Image area */}
          <div className="relative overflow-hidden aspect-[16/9] bg-surface-elevated">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:opacity-80"
              />
            ) : (
              <div className="absolute inset-0 grid-pattern" />
            )}

            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

            {/* HUD category label */}
            <div className="absolute top-4 left-4 z-10">
              <span className="timecode text-accent/70">
                {category}
              </span>
            </div>

            {/* Arrow — appears on hover */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
              <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-accent"
                >
                  <path
                    d="M4 12L12 4M12 4H5M12 4V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h3 className="text-heading font-semibold text-text-primary mb-2 transition-colors duration-300 group-hover:text-accent tracking-tight">
              {title}
            </h3>

            <p className="text-body text-text-tertiary mb-5 line-clamp-2">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-hud uppercase tracking-widest text-text-tertiary/70 border border-border/40 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
