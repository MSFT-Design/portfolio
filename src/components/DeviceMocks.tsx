"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════
   Pure HTML/CSS Device Mocks — no images, no dependencies.
   iPhone, iPad/Tablet, and Laptop frames built entirely
   from styled divs with realistic bezels, notches, and
   camera dots.
   ═══════════════════════════════════════════════════════ */

interface DeviceProps {
  children: ReactNode;
  className?: string;
}

/* ─── iPhone Mock ─── */
export function PhoneMock({ children, className = "" }: DeviceProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div
        className="relative bg-[#1a1a1a] rounded-[2.5rem] p-[10px] shadow-2xl"
        style={{
          boxShadow:
            "0 0 0 2px #333, 0 20px 60px rgba(0,0,0,0.5), 0 0 0 6px #0a0a0a",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div
              className="w-[120px] h-[28px] bg-[#1a1a1a] rounded-b-[14px]"
              style={{ clipPath: "inset(0 0 0 0 round 0 0 14px 14px)" }}
            />
            {/* Camera dot */}
            <div className="absolute top-[8px] right-[30px] w-[8px] h-[8px] rounded-full bg-[#0d0d1a] border border-[#333] shadow-inner" />
          </div>
        </div>

        {/* Screen */}
        <div className="relative w-[280px] h-[600px] bg-white rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="h-[44px] bg-white flex items-center justify-between px-6 pt-1">
            <span className="text-[11px] font-semibold text-black">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-sm bg-black"
                    style={{ height: `${6 + i * 2}px` }}
                  />
                ))}
              </div>
              <div className="w-4 h-[9px] rounded-sm border border-black ml-1 relative">
                <div className="absolute inset-[1px] bg-black rounded-[1px]" style={{ width: "70%" }} />
                <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-black rounded-r-sm" />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="h-[calc(100%-44px)] overflow-hidden">
            {children}
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-black/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ─── Tablet / iPad Mock ─── */
export function TabletMock({ children, className = "" }: DeviceProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div
        className="relative bg-[#1a1a1a] rounded-[1.5rem] p-[12px] shadow-2xl"
        style={{
          boxShadow:
            "0 0 0 2px #333, 0 25px 70px rgba(0,0,0,0.45), 0 0 0 5px #0a0a0a",
        }}
      >
        {/* Camera */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#0d0d1a] border border-[#333] z-10" />

        {/* Screen */}
        <div className="relative w-[540px] h-[400px] bg-white rounded-[0.75rem] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Laptop / MacBook Mock ─── */
export function LaptopMock({ children, className = "" }: DeviceProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Screen / Lid */}
      <div
        className="relative bg-[#1a1a1a] rounded-t-[12px] p-[8px] pb-[10px]"
        style={{
          boxShadow: "0 -2px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Camera */}
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#0d0d1a] border border-[#333] z-10" />

        {/* Screen */}
        <div className="relative w-[640px] h-[400px] bg-white rounded-[4px] overflow-hidden">
          {children}
        </div>
      </div>

      {/* Base / keyboard deck */}
      <div className="relative">
        {/* Hinge */}
        <div className="w-[660px] h-[8px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-sm" />
        {/* Base */}
        <div
          className="w-[740px] h-[10px] bg-[#c0c0c0] rounded-b-lg mx-auto"
          style={{
            background: "linear-gradient(to bottom, #c8c8c8, #a8a8a8)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        />
        {/* Notch / trackpad hint */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[4px] bg-[#888] rounded-b-md" />
      </div>
    </div>
  );
}

/* ─── Animated device group (staggered entrance) ─── */
interface DeviceShowcaseProps {
  children: ReactNode;
  className?: string;
}

export function DeviceShowcase({ children, className = "" }: DeviceShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Browser window mock ─── */
export function BrowserMock({ children, url, className = "" }: DeviceProps & { url?: string }) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-[#333]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-[#333]">
          {/* Traffic lights */}
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          </div>
          {/* URL bar */}
          {url && (
            <div className="flex-1 flex justify-center">
              <div className="bg-[#1a1a1a] rounded-md px-4 py-1 text-[11px] text-[#888] font-mono max-w-[300px] truncate">
                {url}
              </div>
            </div>
          )}
        </div>
        {/* Content */}
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
