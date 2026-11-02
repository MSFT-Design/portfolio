"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, type ReactNode } from "react";

/* ───── Custom MDX Components ───── */

function CaseImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className=""
    >
      <div className="rounded-2xl overflow-hidden border border-border">
        <Image src={src} alt={alt} width={1920} height={1080} className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-caption text-text-tertiary text-center">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function CaseVideo({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12"
    >
      <div className="relative rounded-2xl overflow-hidden border border-border bg-surface-elevated">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-caption text-text-tertiary text-center">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function Callout({
  children,
  type = "info",
}: {
  children: ReactNode;
  type?: "info" | "insight" | "metric";
}) {
  const styles = {
    info: "border-accent/30 bg-accent/5",
    insight: "border-emerald-500/30 bg-emerald-500/5",
    metric: "border-amber-500/30 bg-amber-500/5",
  };

  const icons = {
    info: "💡",
    insight: "🔍",
    metric: "📊",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 p-6 rounded-xl border-l-4 ${styles[type]}`}
    >
      <span className="mr-2">{icons[type]}</span>
      {children}
    </motion.div>
  );
}

function MetricRow({
  metrics,
}: {
  metrics: { label: string; value: string; change?: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12"
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="p-6 rounded-xl border border-border bg-surface text-center"
        >
          <div className="text-display font-bold text-accent">
            {metric.value}
          </div>
          {metric.change && (
            <div className="text-caption text-emerald-400 mt-1">
              {metric.change}
            </div>
          )}
          <div className="text-caption text-text-tertiary mt-2">
            {metric.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function DiagramEmbed({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12 p-8 rounded-2xl border border-border bg-surface"
    >
      {children}
    </motion.div>
  );
}

function ImageCarousel({
  images,
}: {
  images: { src: string; alt: string; caption?: string }[];
}) {
  const [current, setCurrent] = useState(0);

  const go = (dir: 1 | -1) =>
    setCurrent((prev) => (prev + dir + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12"
    >
      <div className="relative rounded-2xl overflow-hidden border border-border bg-surface">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[current].src}
              alt={images[current].alt}
              width={1920}
              height={1080}
              className="w-full h-auto block"
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
          aria-label="Previous image"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
          aria-label="Next image"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Caption + dots */}
      <div className="mt-3 text-center">
        {images[current].caption && (
          <p className="text-caption text-text-tertiary mb-2">
            {images[current].caption}
          </p>
        )}
        <div className="flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === current
                  ? "bg-accent w-4"
                  : "bg-text-tertiary/30 hover:bg-text-tertiary/50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ───── Export individual components for MDX ───── */
export { CaseImage, CaseVideo, Callout, MetricRow, DiagramEmbed, ImageCarousel };

export function MDXh1(props: any) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-display-lg font-bold text-text-primary mt-16 mb-6"
      {...props}
    />
  );
}

export function MDXh2(props: any) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-heading-lg font-semibold text-text-primary mt-12 mb-4"
      {...props}
    />
  );
}

export function MDXh3(props: any) {
  return (
    <h3
      className="text-heading font-semibold text-text-primary mt-8 mb-3"
      {...props}
    />
  );
}

export function MDXp(props: any) {
  return (
    <p className="text-body-lg text-text-secondary leading-relaxed mb-6" {...props} />
  );
}

export function MDXul(props: any) {
  return (
    <ul className="text-body-lg text-text-secondary space-y-2 mb-6 list-disc pl-6" {...props} />
  );
}

export function MDXol(props: any) {
  return (
    <ol className="text-body-lg text-text-secondary space-y-2 mb-6 list-decimal pl-6" {...props} />
  );
}
