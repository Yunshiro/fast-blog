import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, formatDate } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-20 sm:py-28">
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            ← Back
          </Link>
          <Link
            href="/about"
            className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            About
          </Link>
        </div>

        <article>
          <header className="mb-10">
            <time
              dateTime={post.date}
              className="text-sm text-zinc-400 dark:text-zinc-500 font-mono"
            >
              {formatDate(post.date)}
            </time>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded-sm font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="prose prose-zinc dark:prose-invert max-w-none
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-zinc-300 dark:prose-a:decoration-zinc-600
              prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-600 prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400
              prose-code:text-sm prose-code:bg-zinc-200/50 dark:prose-code:bg-zinc-800/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-800 prose-pre:rounded-lg
              prose-li:text-zinc-600 dark:prose-li:text-zinc-300
              prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
              prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
    </div>
  );
}
