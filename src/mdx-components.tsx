import type { MDXComponents } from "mdx/types";
import {
  CaseImage,
  CaseVideo,
  Callout,
  MetricRow,
  DiagramEmbed,
  MDXh1,
  MDXh2,
  MDXh3,
  MDXp,
  MDXul,
  MDXol,
} from "@/components/MDXComponents";

const mdxComponents = {
  CaseImage,
  CaseVideo,
  Callout,
  MetricRow,
  DiagramEmbed,
  h1: MDXh1,
  h2: MDXh2,
  h3: MDXh3,
  p: MDXp,
  ul: MDXul,
  ol: MDXol,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
