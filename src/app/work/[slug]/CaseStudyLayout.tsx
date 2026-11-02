"use client";

import { MotionSection } from "@/components/MotionSection";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudyMeta } from "@/lib/case-studies";
import type { ReactNode } from "react";

interface CaseStudyLayoutProps {
  meta: CaseStudyMeta;
  children: ReactNode;
}

export function CaseStudyLayout({ meta, children }: CaseStudyLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative max-w-content mx-auto px-6 w-full pt-32 pb-16">
          {/* Breadcrumb */}
          <MotionSection delay={0.1}>
            <div className="flex items-center gap-2 text-caption text-text-tertiary mb-8">
              <Link
                href="/work"
                className="hover:text-text-secondary transition-colors"
              >
                Work
              </Link>
              <span>/</span>
              <span className="text-text-secondary">{meta.title}</span>
            </div>
          </MotionSection>

          {/* Category */}
          <MotionSection delay={0.15}>
            <span className="inline-block px-6 py-1 text-overline uppercase text-accent bg-accent-muted rounded-full mb-6">
              {meta.category}
            </span>
          </MotionSection>

          {/* Title */}
          <MotionSection delay={0.25}>
            <h1 className="text-display-xl font-bold text-text-primary mb-6 max-w-3xl">
              {meta.title}
            </h1>
          </MotionSection>

          {/* Description */}
          <MotionSection delay={0.35}>
            <p className="text-heading text-text-secondary font-light max-w-2xl mb-10">
              {meta.description}
            </p>
          </MotionSection>

          {/* Meta grid */}
          <MotionSection delay={0.45}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm">
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">
                  Role
                </div>
                <div className="text-body text-text-primary">{meta.role}</div>
              </div>
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">
                  Team
                </div>
                <div className="text-body text-text-primary">{meta.team}</div>
              </div>
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">
                  Duration
                </div>
                <div className="text-body text-text-primary">
                  {meta.duration}
                </div>
              </div>
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">
                  Year
                </div>
                <div className="text-body text-text-primary">
                  {new Date(meta.date).getFullYear()}
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Hero media */}
      {(meta.hero_image || meta.hero_video) && (
        <MotionSection className="max-w-content mx-auto px-6 mb-section">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-surface-elevated">
            {meta.hero_video ? (
              <video
                src={meta.hero_video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : meta.hero_image ? (
              <Image
                src={meta.hero_image}
                alt={meta.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full dot-pattern opacity-30" />
            )}
          </div>
        </MotionSection>
      )}

      {/* MDX content */}
      <article className="max-w-4xl mx-auto px-6 pb-section">
        <div className="prose prose-invert prose-lg max-w-none">
          {children}
        </div>
      </article>

      {/* Back link */}
      <div className="max-w-content mx-auto px-6 pb-section">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-body text-text-tertiary hover:text-accent transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path
              d="M16 10H4M4 10L9 5M4 10L9 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to all work
        </Link>
      </div>
    </>
  );
}
