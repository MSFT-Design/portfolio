import { getAllCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { CaseStudyLayout } from "./CaseStudyLayout";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  CaseImage,
  CaseVideo,
  Callout,
  MetricRow,
  DiagramEmbed,
  ImageCarousel,
  MDXh1,
  MDXh2,
  MDXh3,
  MDXp,
  MDXul,
  MDXol,
  MDXImg,
} from "@/components/MDXComponents";
import remarkGfm from "remark-gfm";

const mdxComponents = {
  CaseImage,
  CaseVideo,
  Callout,
  MetricRow,
  DiagramEmbed,
  ImageCarousel,
  h1: MDXh1,
  h2: MDXh2,
  h3: MDXh3,
  p: MDXp,
  ul: MDXul,
  ol: MDXol,
  img: MDXImg,
};

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Not Found" };

  return {
    title: `${study.meta.title} — Portfolio`,
    description: study.meta.description,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <CaseStudyLayout meta={study.meta}>
      <MDXRemote
        source={study.content}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </CaseStudyLayout>
  );
}
