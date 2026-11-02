"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MotionSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/MotionSection";
import {
  PhoneMock,
  TabletMock,
  BrowserMock,
  DeviceShowcase,
} from "@/components/DeviceMocks";

/* ═══════════════════════════════════════════════════════
   Achievers SaaS — Custom Case Study Page
   Mirrors the section flow from jbabs.io/achievers with
   HTML device mocks replacing static images.
   Styled to match CaseStudyLayout (Spatial UI pattern).
   ═══════════════════════════════════════════════════════ */

/* ─── Mini-components for in-device UI ─── */

function ProgressBar({ value, color, max = 100 }: { value: number; color: string; max?: number }) {
  return (
    <div className="w-full h-[4px] bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  const colors = ["#7c3aed", "#2563eb", "#059669", "#dc2626", "#d97706", "#6366f1"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: colors[idx],
        fontSize: size * 0.4,
      }}
    >
      {name[0]}
    </div>
  );
}

/* ─── Team Report (Model A) — phone screen ─── */
function TeamReportModelA() {
  const members = [
    { name: "Anna Berton", budget: 11, received: 3, sent: 1 },
    { name: "Jake Mchenry", budget: 24, received: 3, sent: 3 },
  ];
  return (
    <div className="bg-white text-black text-[10px] h-full">
      <div className="bg-white border-b border-gray-200 py-2 px-6 flex items-center gap-2">
        <span className="text-gray-400">←</span>
        <span className="font-semibold text-[12px] flex-1 text-center">My Team</span>
      </div>
      <div className="p-3 border-b border-gray-100">
        <p className="font-semibold text-[12px]">Team goal</p>
        <p className="text-gray-500 text-[9px]">Your teams progress this week.</p>
        <div className="flex items-center mt-2 gap-1">
          {["A", "B", "C", "D", "E", "F"].map((l) => (
            <Avatar key={l} name={l} size={22} />
          ))}
          <div className="ml-auto w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-[10px] font-bold text-blue-700">
            57%
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-1.5 border border-blue-600 text-blue-600 rounded text-[10px] font-medium">
            Follow up
          </button>
          <button className="flex-1 py-1.5 border border-gray-300 text-gray-600 rounded text-[10px] font-medium">
            See all
          </button>
        </div>
      </div>
      {members.map((m) => (
        <div key={m.name} className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Avatar name={m.name} size={24} />
            <span className="font-semibold text-[11px]">{m.name}</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[9px] mb-0.5">
                <span className="text-red-500 font-medium">Budget {m.budget}%</span>
                <span>100%</span>
              </div>
              <ProgressBar value={m.budget} color="#ef4444" />
            </div>
            <div>
              <div className="flex justify-between text-[9px] mb-0.5">
                <span className="text-blue-600 font-medium">Received {m.received}</span>
                <span>12</span>
              </div>
              <ProgressBar value={m.received} max={12} color="#2563eb" />
            </div>
            <div>
              <div className="flex justify-between text-[9px] mb-0.5">
                <span className="text-green-600 font-medium">Sent {m.sent}</span>
                <span>8</span>
              </div>
              <ProgressBar value={m.sent} max={8} color="#16a34a" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Team Report (Model B) — phone screen ─── */
function TeamReportModelB() {
  const reports = [
    { name: "Ann Baptista", sent: 3, received: 11, budget: "50%", status: "avg", color: "#16a34a" },
    { name: "Roger Philips", sent: 3, received: 6, budget: "75%", status: "avg", color: "#16a34a" },
    { name: "Erin Ekstrom", sent: 2, received: 1, budget: "11%", status: "below", color: "#ef4444" },
    { name: "Kaiya Schleifer", sent: 2, received: 0, budget: "38%", status: "below", color: "#ef4444" },
  ];
  return (
    <div className="bg-white text-black text-[10px] h-full">
      <div className="bg-white border-b border-gray-200 py-2 px-6 flex items-center">
        <span className="text-gray-400">←</span>
        <span className="font-semibold text-[12px] flex-1 text-center">My Team</span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-[11px]">Jocelyn and Team</span>
          <span className="text-blue-600 text-[10px]">January</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] text-gray-500 mb-2">
          <div>Sent Recognitions <span className="text-blue-600 font-bold text-[11px] block">15</span></div>
          <div>Team Size <span className="text-blue-600 font-bold text-[11px] block">6</span></div>
          <div>Received Recognitions <span className="text-blue-600 font-bold text-[11px] block">33</span></div>
          <div>Budget Usage <span className="text-blue-600 font-bold text-[11px] block">34%</span></div>
        </div>
      </div>
      <div className="px-6">
        <div className="flex items-center gap-3 text-[9px] font-medium mb-1 text-gray-500">
          <span className="text-purple-600">Sent ↓</span>
          <span>Received ↓</span>
          <span>Budget ↓</span>
        </div>
        <div className="bg-purple-600 text-white text-[8px] rounded px-2 py-1 mb-2">
          2.5 Sent / person — 2 above average · 3 below average
        </div>
      </div>
      <div className="px-6 space-y-1">
        {reports.map((r) => (
          <div key={r.name} className="flex items-center py-2 border-b border-gray-100 text-[9px]">
            <Avatar name={r.name} size={22} />
            <div className="ml-2 flex-1">
              <span className="font-medium text-[10px] block">{r.name}</span>
              <span style={{ color: r.color }} className="text-[8px] font-medium">
                {r.status === "avg" ? "Average ▲" : "Average ▼"}
              </span>
            </div>
            <div className="text-right grid grid-cols-3 gap-3 text-[9px]">
              <div><span className="text-purple-600 font-bold">{r.sent}</span></div>
              <div>{r.received}</div>
              <div>{r.budget}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Design System Components Spec ─── */
function DesignSystemSpec() {
  const states = ["Disabled", "Default", "Dragged", "Focused", "Hover", "Pressed", "Selected"];
  return (
    <div className="bg-[#1e1e2e] text-white p-4 h-full">
      <div className="grid grid-cols-2 gap-3">
        {/* Primary states */}
        <div className="bg-[#2a2a3e] rounded-lg p-3">
          <p className="text-[9px] font-semibold mb-1">Primary / Secondary states</p>
          <p className="text-[7px] text-gray-400 mb-2">96 min-width / 48 height</p>
          <div className="space-y-[6px]">
            {states.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`px-2 py-0.5 rounded-full text-[7px] font-medium ${
                    i === 0 ? "opacity-40" : ""
                  }`}
                  style={{ backgroundColor: i === 0 ? "#555" : "#7c3aed" }}
                >
                  {s}
                </div>
                <div className="w-4 h-4 rounded-full bg-purple-500 text-[6px] flex items-center justify-center font-bold">
                  {[54, 54, 54, 54, 40, 37, 40][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Color palette */}
        <div className="bg-[#2a2a3e] rounded-lg p-3">
          <p className="text-[9px] font-semibold mb-2">Color-Misc-#</p>
          <div className="space-y-[6px]">
            {[
              { n: 1, label: "White", bg: "#fff", text: "#000" },
              { n: 2, label: "Black", bg: "#000", text: "#fff" },
              { n: 4, label: "Danger", bg: "#ef4444", text: "#fff" },
              { n: 5, label: "Info", bg: "#3b82f6", text: "#fff" },
              { n: 6, label: "Misc", bg: "#f97316", text: "#fff" },
              { n: 7, label: "Misc", bg: "#ec4899", text: "#fff" },
              { n: 8, label: "Success", bg: "#22c55e", text: "#fff" },
            ].map((c) => (
              <div key={c.n} className="flex items-center gap-2">
                <span className="text-[7px] text-gray-400 w-3">{c.n}</span>
                <div
                  className="px-6 py-0.5 rounded-full text-[7px] font-medium"
                  style={{ backgroundColor: c.bg, color: c.text }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Dark mode toggle */}
      <div className="flex items-center gap-2 mt-3 justify-end text-[8px]">
        <span className="text-gray-400">Light Mode</span>
        <div className="w-8 h-4 bg-purple-600 rounded-full relative">
          <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
        </div>
        <span className="text-white font-medium">Dark Mode</span>
      </div>
    </div>
  );
}

/* ─── Social Feed — phone screen ─── */
function SocialFeedMobile() {
  return (
    <div className="bg-white text-black text-[10px] h-full">
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
        <span className="text-gray-400">☰</span>
        <span className="font-semibold text-[12px] text-purple-700">Inspire</span>
        <div className="flex gap-2">
          <span className="text-gray-400">🔔</span>
          <Avatar name="U" size={20} />
        </div>
      </div>
      {/* Stories */}
      <div className="flex gap-2 p-2 overflow-hidden">
        {["A", "B", "C", "D", "E"].map((l) => (
          <div key={l} className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-purple-500 p-[2px]">
              <Avatar name={l} size={32} />
            </div>
          </div>
        ))}
      </div>
      {/* Post */}
      <div className="px-6 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Avatar name="Jim" size={22} />
          <div>
            <p className="font-semibold text-[10px]"><span className="text-purple-700">Jim Barrone</span> was recognized by Evan Rosenstein</p>
          </div>
        </div>
        <div className="w-full h-24 rounded-lg bg-gradient-to-br from-purple-900 to-purple-600 mb-2" />
        <p className="font-semibold text-[10px] mb-1">Live Passionately</p>
        <p className="text-[8px] text-gray-500 leading-relaxed">
          Michelle, your passion for the Experience Project is so contagious. Thank you for all of the work you have done to push us forward.
        </p>
        <div className="flex items-center gap-4 mt-2 text-[9px] text-gray-400">
          <span>🎉 2</span>
          <span>❤️ 2</span>
          <span>💬 2</span>
        </div>
      </div>
      {/* Second post preview */}
      <div className="px-6 py-2">
        <div className="flex items-center gap-2">
          <Avatar name="Alison" size={22} />
          <p className="font-semibold text-[10px]"><span className="text-purple-700">Alison May</span> was recognized by Jesse Loree</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Social Feed — desktop ─── */
function SocialFeedDesktop() {
  return (
    <div className="bg-gray-50 text-black text-[9px] h-full flex">
      {/* Sidebar */}
      <div className="w-10 bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-3">
        {["🏠", "🎵", "➕", "💬", "🔗", "👥"].map((icon, i) => (
          <div key={i} className="w-6 h-6 rounded-lg flex items-center justify-center text-[12px] hover:bg-gray-100">
            {icon}
          </div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <span className="font-bold text-[12px] text-purple-700">Inspire</span>
          <div className="flex gap-2 items-center">
            <span>➕</span>
            <span>🔍</span>
            <span>🔔</span>
            <Avatar name="U" size={18} />
          </div>
        </div>
        <div className="p-4 flex gap-4">
          {/* Feed */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Home</span>
              <span className="text-gray-400 text-[8px]">Filter ▼</span>
            </div>
            {/* Story bar */}
            <div className="flex gap-2 mb-3 overflow-hidden">
              <div className="w-24 h-14 rounded-lg bg-gradient-to-br from-purple-900 to-purple-600 flex items-end p-1">
                <span className="text-white text-[7px]">Meditation Monday...</span>
              </div>
              <div className="w-24 h-14 rounded-lg bg-gradient-to-br from-blue-900 to-blue-600 flex items-end p-1">
                <span className="text-white text-[7px]">Corporate headshots</span>
              </div>
            </div>
            {/* Post */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Avatar name="M" size={22} />
                <span className="font-medium text-[10px]">Michelle Manor was recognized by Ivan Polo</span>
              </div>
              <div className="w-full h-28 rounded-lg bg-gradient-to-br from-purple-900 to-purple-600 mb-2" />
              <p className="font-semibold text-[10px]">Live Passionately</p>
              <p className="text-gray-500 text-[8px] mt-1">Michelle, your passion for the Experience Project is so contagious.</p>
              <div className="flex gap-4 mt-2 text-gray-400 text-[8px]">
                <span>🎉 Boost 2</span>
                <span>❤️ Like 2</span>
                <span>💬 Comment 2</span>
              </div>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="w-36">
            <div className="bg-white rounded-lg border border-gray-200 p-2 mb-2">
              <p className="font-semibold text-[9px] mb-2">Suggested follows</p>
              {["Anna Green", "Rebecca Alistor", "Annabelle Harper"].map((name) => (
                <div key={name} className="flex items-center gap-1.5 mb-1.5">
                  <Avatar name={name} size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[8px] truncate">{name}</p>
                    <p className="text-gray-400 text-[6px]">Project Manager</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-2">
              <p className="font-semibold text-[9px] mb-2">Celebrations</p>
              {["Anna Green", "Zachery Archer"].map((name) => (
                <div key={name} className="flex items-center gap-1.5 mb-1.5">
                  <Avatar name={name} size={16} />
                  <div>
                    <p className="font-medium text-[8px]">{name}</p>
                    <p className="text-gray-400 text-[6px]">Happy Birthday!</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Profile — phone screen ─── */
function ProfileScreen() {
  return (
    <div className="bg-white text-black text-[10px] h-full">
      <div className="h-20 bg-gradient-to-r from-purple-700 to-purple-500 relative">
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-14 h-14 rounded-full border-3 border-white bg-purple-300 flex items-center justify-center text-white text-lg font-bold shadow-lg">
            S
          </div>
        </div>
      </div>
      <div className="pt-8 px-4 text-center">
        <p className="font-bold text-[13px]">Sanjay Palma</p>
        <p className="text-purple-600 text-[9px]">Points Accumulated: 5,000</p>
        <p className="text-green-600 text-[8px] mt-1">You recognized Sanjay 3 weeks ago</p>
        <div className="flex gap-2 mt-3 justify-center">
          <button className="px-4 py-1.5 bg-white border border-gray-300 rounded text-[9px] font-medium">
            Recognize →
          </button>
          <button className="px-4 py-1.5 bg-white border border-green-500 text-green-600 rounded text-[9px] font-medium">
            Following ✓
          </button>
        </div>
        <div className="flex gap-4 mt-3 justify-center border-b border-gray-200 pb-2 text-[9px] text-gray-500">
          <span className="text-purple-700 font-medium border-b-2 border-purple-700 pb-2">About</span>
          <span>Info</span>
          <span>Activity</span>
          <span>Org Chart</span>
        </div>
        <div className="text-left mt-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🌱</span>
            <div>
              <p className="text-purple-700 font-semibold text-[10px]">Cultivator</p>
              <p className="text-gray-500 text-[8px]">Exploration, Learning, and Flexibility</p>
            </div>
          </div>
          <p className="text-[9px] text-gray-600 mt-2">Manager, Financial Analyst</p>
          <p className="text-[9px] text-gray-600">Finance & Accounting</p>
          <p className="text-[9px] text-gray-600">Chicago, USA</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Theming showcase — browser ─── */
function ThemingShowcase() {
  const themes = [
    { accent: "#7c3aed", name: "Purple" },
    { accent: "#059669", name: "Green" },
    { accent: "#dc2626", name: "Red" },
  ];
  return (
    <div className="bg-[#1e1e2e] p-4 h-full">
      <div className="grid grid-cols-3 gap-3">
        {themes.map((t) => (
          <div key={t.name} className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <div className="h-2" style={{ backgroundColor: t.accent }} />
            <div className="p-2 text-[7px]">
              <div className="flex items-center gap-1 mb-2">
                <span className="font-bold text-[9px]" style={{ color: t.accent }}>Inspire</span>
              </div>
              <p className="font-semibold text-[8px] mb-1">Community</p>
              <div className="flex gap-1 mb-2">
                <div className="w-12 h-8 rounded bg-gradient-to-br from-purple-900 to-purple-600" />
                <div className="w-12 h-8 rounded bg-gradient-to-br from-purple-900 to-purple-600" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accent }} />
                <span className="text-[6px] text-gray-600">Michelle Manor was recognized</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Page Component
   Matches CaseStudyLayout hero / meta / section patterns
   ═══════════════════════════════════════════════════════ */

export function AchieversCaseStudy() {
  return (
    <>
      {/* ── Hero (matches CaseStudyLayout) ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative max-w-content mx-auto px-6 w-full pt-32 pb-16">
          {/* Breadcrumb */}
          <MotionSection delay={0.1}>
            <div className="flex items-center gap-2 text-caption text-text-tertiary mb-8">
              <Link href="/work" className="hover:text-text-secondary transition-colors">
                Work
              </Link>
              <span>/</span>
              <span className="text-text-secondary">Achievers SaaS</span>
            </div>
          </MotionSection>

          {/* Category */}
          <MotionSection delay={0.15}>
            <span className="inline-block px-6 py-1 text-overline uppercase text-accent bg-accent-muted rounded-full mb-6">
              Enterprise SaaS
            </span>
          </MotionSection>

          {/* Title */}
          <MotionSection delay={0.25}>
            <h1 className="text-display-xl font-bold text-text-primary mb-6 max-w-3xl">
              End-to-end SaaS Product Design
            </h1>
          </MotionSection>

          {/* Description */}
          <MotionSection delay={0.35}>
            <p className="text-heading text-text-secondary font-light max-w-2xl mb-6">
              Product design &amp; frameworks for a suite of enterprise SaaS products spanning e-commerce, product inventory, pulse surveys, social and feed. Clients included Barclays, General Motors, Samsung &amp; Scotiabank.
            </p>
            <div className="flex flex-wrap gap-2 text-caption text-text-tertiary mb-10">
              {["User Interviews", "User Research", "Telemetry", "Prototyping", "System Design"].map((t) => (
                <span key={t} className="px-2.5 py-1 bg-surface-elevated/60 rounded-md border border-border-subtle/60">
                  {t}
                </span>
              ))}
            </div>
          </MotionSection>

          {/* Meta grid (matches CaseStudyLayout) */}
          <MotionSection delay={0.45}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm">
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">Role</div>
                <div className="text-body text-text-primary">Product Design Lead</div>
              </div>
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">Team</div>
                <div className="text-body text-text-primary">Achievers</div>
              </div>
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">Platforms</div>
                <div className="text-body text-text-primary">Android, iOS &amp; Web</div>
              </div>
              <div>
                <div className="text-overline uppercase text-text-tertiary mb-1">End User</div>
                <div className="text-body text-text-primary">Enterprise employees</div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ── Hero Device Showcase ── */}
      <MotionSection className="max-w-content mx-auto px-6 mb-section">
        <DeviceShowcase className="flex justify-center items-end gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden md:block"
          >
            <PhoneMock className="scale-[0.65] origin-bottom">
              <TeamReportModelA />
            </PhoneMock>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <PhoneMock className="scale-[0.75] origin-bottom">
              <TeamReportModelB />
            </PhoneMock>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <PhoneMock className="scale-[0.65] origin-bottom">
              <ProfileScreen />
            </PhoneMock>
          </motion.div>
        </DeviceShowcase>
      </MotionSection>

      {/* ── Design System ── */}
      <section className="max-w-content mx-auto px-6 py-section">
        <MotionSection>
          <h2 className="text-heading-lg font-semibold text-text-primary mb-4">
            Design System — Web &amp; Mobile
          </h2>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="text-body-lg text-text-secondary max-w-prose mb-6 leading-relaxed">
            I created a design system for Achievers by following the principles of atomic design. Throughout the process, I actively sought feedback from internal stakeholders as well as external industry experts from companies such as Shopify, Wealthsimple, Telus, and Slack.
          </p>
          <p className="text-body-lg text-text-secondary max-w-prose mb-12 leading-relaxed">
            By working in a collaborative, feedback-driven approach, I was able to develop a functional, scalable design system that incorporated accessibility standards within three months. As the system evolved, I continued to work closely with my engineering team to implement a dark mode feature, further improving the overall user experience.
          </p>
        </MotionSection>

        <DeviceShowcase className="flex justify-center">
          <TabletMock className="w-full max-w-2xl">
            <DesignSystemSpec />
          </TabletMock>
        </DeviceShowcase>
      </section>

      {/* ── Product Implementation ── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-content mx-auto px-6 py-section">
          <MotionSection>
            <h2 className="text-heading-lg font-semibold text-text-primary mb-4">
              Product Implementation
            </h2>
          </MotionSection>

          <MotionSection delay={0.1}>
            <p className="text-body-lg text-text-secondary max-w-prose leading-relaxed">
              To ensure the success of the platform migration, I began by analyzing data from the current platform to identify pain points and areas for improvement. I conducted user research through surveys and interviews with both internal and external stakeholders to prioritize these issues and opportunities. As there was also a business requirement to increase daily active usage, I leveraged existing research from similar platforms to enhance our core features.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* ── Reporting Feature ── */}
      <section className="max-w-content mx-auto px-6 py-section">
        <MotionSection>
          <h2 className="text-heading-lg font-semibold text-text-primary mb-4">
            Reporting Feature — End-to-end Design
          </h2>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="text-body-lg text-text-secondary max-w-prose mb-6 leading-relaxed">
            My Teams Report is a feature built from manager feedback among a variety of customers, most notably General Motors. As many employees were non-desk workers, managers needed to understand employee engagement throughout the day. This reporting feature communicates team usage index and performance statistics very quickly on-the-go.
          </p>
        </MotionSection>

        {/* Goals */}
        <MotionSection delay={0.15} className="mb-12">
          <h3 className="text-heading font-semibold text-text-primary mb-4">Goals</h3>
          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {[
              { num: "01", text: "Quick view of employee usage" },
              { num: "02", text: "Ability to compare individual progress" },
              { num: "03", text: "Team budget progress" },
            ].map((g) => (
              <StaggerItem key={g.num}>
                <motion.div
                  whileHover={{ y: -3, borderColor: "rgba(74, 123, 255, 0.3)" }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-xl border border-border bg-surface"
                >
                  <span className="text-overline text-accent font-mono">{g.num}</span>
                  <p className="text-body text-text-primary mt-2 font-medium">{g.text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </MotionSection>

        {/* A/B Test */}
        <MotionSection delay={0.1} className="mb-16">
          <h3 className="text-heading font-semibold text-text-primary mb-2">A/B Test</h3>
          <p className="text-body-lg text-text-secondary mb-8 max-w-prose">
            I designed two UX models for an A/B test, taking into consideration feedback from wireframes and user testing.
          </p>
        </MotionSection>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Model A */}
          <DeviceShowcase className="text-center">
            <p className="text-overline uppercase text-accent font-medium tracking-widest mb-6">Model A — Individual Focus</p>
            <div className="flex justify-center">
              <PhoneMock>
                <TeamReportModelA />
              </PhoneMock>
            </div>
            <p className="text-caption text-text-tertiary mt-6 max-w-xs mx-auto">
              Focused on individual performance and statistics in relation to team averages.
            </p>
          </DeviceShowcase>

          {/* Model B */}
          <DeviceShowcase className="text-center">
            <p className="text-overline uppercase text-accent font-medium tracking-widest mb-6">Model B — Team First</p>
            <div className="flex justify-center">
              <PhoneMock>
                <TeamReportModelB />
              </PhoneMock>
            </div>
            <p className="text-caption text-text-tertiary mt-6 max-w-xs mx-auto">
              Prioritized overall team statistics with clear UI cues for above/below average performance.
            </p>
          </DeviceShowcase>
        </div>

        <MotionSection>
          <div className="p-6 rounded-xl border-l-4 border-accent/30 bg-accent/5">
            <p className="text-body-lg text-text-secondary">
              As a result of close communication and user testing with General Motors, this feature was key in the <strong className="text-text-primary">renewal of their service agreement</strong> for this product.
            </p>
          </div>
        </MotionSection>
      </section>

      {/* ── Profile ── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-content mx-auto px-6 py-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <MotionSection>
                <h2 className="text-heading-lg font-semibold text-text-primary mb-4">Profile</h2>
              </MotionSection>
              <MotionSection delay={0.1}>
                <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
                  I designed a content-rich profile feature to promote engagement among employees. This encouraged employees to send each other recognitions for achievements that may have gone unnoticed.
                </p>
                <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
                  Through this social uplifting platform, recognitions become visible to managers and higher levels of leadership. Recognition recipients are rewarded with points redeemable in the marketplace.
                </p>
                <p className="text-body-lg text-text-tertiary">
                  The goal of this feature is to educate employees on each other&apos;s working styles and to encourage meaningful recognitions by highlighting commonalities and opportunities for growth.
                </p>
              </MotionSection>
            </div>

            <DeviceShowcase className="flex justify-center">
              <PhoneMock>
                <ProfileScreen />
              </PhoneMock>
            </DeviceShowcase>
          </div>
        </div>
      </section>

      {/* ── Social & Feed ── */}
      <section className="max-w-content mx-auto px-6 py-section">
        <MotionSection>
          <h2 className="text-heading-lg font-semibold text-text-primary mb-4">
            Social &amp; Feed
          </h2>
        </MotionSection>

        <MotionSection delay={0.1}>
          <p className="text-body-lg text-text-secondary max-w-prose mb-12 leading-relaxed">
            As customers valued efficiency when spending time on the platform, I created a feed focused around &lsquo;catch-up&rsquo; between closely related orgs. The feed also allowed customers to discover friends and events slightly outside of their immediate organization, keeping them connected and informed.
          </p>
        </MotionSection>

        {/* Phone + Desktop side by side */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <DeviceShowcase className="lg:col-span-2 flex justify-center">
            <PhoneMock>
              <SocialFeedMobile />
            </PhoneMock>
          </DeviceShowcase>

          <DeviceShowcase className="lg:col-span-3">
            <BrowserMock url="app.achievers.com/community" className="w-full">
              <div className="h-[380px]">
                <SocialFeedDesktop />
              </div>
            </BrowserMock>
          </DeviceShowcase>
        </div>
      </section>

      {/* ── Theming ── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-content mx-auto px-6 py-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <MotionSection>
                <h2 className="text-heading-lg font-semibold text-text-primary mb-4">Theming</h2>
              </MotionSection>
              <MotionSection delay={0.1}>
                <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
                  One of the key features that set our product apart was the ability to add custom branding. This was a key deciding factor for many customers when choosing our product as their white-label service.
                </p>
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  I ensured the product remained accessible for all users by providing innovative ways to display custom branding without compromising readability or accessibility — avoiding any visual interferences with text or interactive elements.
                </p>
              </MotionSection>
            </div>

            <DeviceShowcase>
              <BrowserMock url="admin.achievers.com/theming" className="w-full">
                <div className="h-[300px]">
                  <ThemingShowcase />
                </div>
              </BrowserMock>
            </DeviceShowcase>
          </div>
        </div>
      </section>

      {/* ── Back link (matches CaseStudyLayout) ── */}
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
