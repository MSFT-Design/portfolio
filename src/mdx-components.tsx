import type { MDXComponents } from "mdx/types";
import type { ImgHTMLAttributes } from "react";
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

// Prefix root-relative asset paths with basePath so markdown `![](/images/x.png)`
// resolves when the site is served under a subpath (e.g. GitHub Pages /portfolio).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function MDXImg({ src = "", alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const resolvedSrc = typeof src === "string" && src.startsWith("/") ? `${basePath}${src}` : src;
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img src={resolvedSrc} alt={alt} {...rest} />;
}

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
  img: MDXImg,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
