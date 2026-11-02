import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CaseStudyMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  role: string;
  team: string;
  duration: string;
  hero_image?: string;
  hero_video?: string;
  featured?: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/case-studies");

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: data.category || "Uncategorized",
        tags: data.tags || [],
        date: data.date || "",
        role: data.role || "",
        team: data.team || "",
        duration: data.duration || "",
        hero_image: data.hero_image,
        hero_video: data.hero_video,
        featured: data.featured || false,
      } as CaseStudyMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudy(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      date: data.date || "",
      role: data.role || "",
      team: data.team || "",
      duration: data.duration || "",
      hero_image: data.hero_image,
      hero_video: data.hero_video,
      featured: data.featured || false,
    } as CaseStudyMeta,
    content,
  };
}
