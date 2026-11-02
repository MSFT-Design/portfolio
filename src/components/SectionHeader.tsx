"use client";

import { MotionSection } from "./MotionSection";
import Link from "next/link";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  href,
  linkLabel = "View all",
}: SectionHeaderProps) {
  return (
    <MotionSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
      <div>
        {label && (
          <span className="timecode mb-4 block">
            {label}
          </span>
        )}
        <h2 className="text-display-lg font-bold text-text-primary tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-body-lg text-text-tertiary mt-3 max-w-xl">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group flex items-center gap-3 text-caption uppercase tracking-widest text-text-tertiary hover:text-accent transition-colors shrink-0"
        >
          {linkLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </MotionSection>
  );
}
