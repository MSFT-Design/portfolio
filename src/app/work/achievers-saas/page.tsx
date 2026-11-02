import type { Metadata } from "next";
import { AchieversCaseStudy } from "./AchieversCaseStudy";

export const metadata: Metadata = {
  title: "Achievers SaaS — End-to-end Product Design — Portfolio",
  description:
    "Product design and design system frameworks for an enterprise recognition platform serving Barclays, GM, Samsung, and Scotiabank.",
};

export default function AchieversPage() {
  return <AchieversCaseStudy />;
}
