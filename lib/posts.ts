import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");
const postsDirectory = path.join(contentDir, "posts");

/**
 * Reads and renders a Markdown file, returning frontmatter data and HTML.
 */
export async function renderMarkdown(filePath: string) {
  const fullPath = path.join(contentDir, filePath);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    data,
    contentHtml: processedContent.toString(),
  };
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === "string");
  if (typeof tags === "string") return tags.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

/**
 * Returns all posts sorted by date, newest first.
 */
export function getSortedPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        tags: parseTags(data.tags),
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns a single post by slug, including rendered HTML.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const rendered = await renderMarkdown(`posts/${slug}.md`);
  if (!rendered) return null;

  return {
    slug,
    title: rendered.data.title ?? slug,
    date: rendered.data.date ?? "",
    description: rendered.data.description ?? "",
    tags: parseTags(rendered.data.tags),
    contentHtml: rendered.contentHtml,
  };
}

/**
 * Returns all unique slugs for static generation.
 */
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Returns a formatted date string like "May 15, 2026".
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
