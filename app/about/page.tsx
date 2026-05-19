import Link from "next/link";
import type { Metadata } from "next";
import { renderMarkdown } from "@/lib/posts";

export const metadata: Metadata = {
  title: "About",
  description: "About this blog and its author.",
};

export default async function AboutPage() {
  const rendered = await renderMarkdown("about.md");

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors mb-10"
        >
          ← Back
        </Link>

        <article
          className="prose prose-zinc dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed
            prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-zinc-300 dark:prose-a:decoration-zinc-600
            prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100"
          dangerouslySetInnerHTML={{ __html: rendered?.contentHtml ?? "" }}
        />
      </main>
    </div>
  );
}
