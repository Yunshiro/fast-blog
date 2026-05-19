import Link from "next/link";
import { getSortedPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPosts();

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-20 sm:py-28">
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            fast-blog
          </h1>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
            A minimalist blog. Clean typography, no distractions.
          </p>
          <Link
            href="/about"
            className="inline-block mt-3 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            About →
          </Link>
        </header>

        <section>
          <ul className="space-y-12">
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <time
                    dateTime={post.date}
                    className="text-sm text-zinc-400 dark:text-zinc-500 font-mono"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-1.5 mb-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-prose">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
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
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
