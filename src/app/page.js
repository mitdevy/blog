import Link from "next/link";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/ui/Header";

export default function Home() {
    const posts = getAllPosts();
    const year = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-[color:var(--color-sand)] text-[color:var(--color-ink)]">
            <div className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12 sm:px-10">
                <Header />

                <main className="mt-12">
                    <section className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                            website
                        </p>
                        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                	    Alperen Yiğiter
                        </h1>
                        <p className="text-base text-[color:var(--color-muted)]">
	    		   A blog about programming and tech industry, or just general.
                        </p>
                    </section>

                    <section className="mt-12 space-y-6">
                        {posts.length === 0 && (
                            <div className="border-t border-[color:var(--color-line)] pt-6 text-sm text-[color:var(--color-muted)]">
                                New posts will show up here once you add
                                Markdown files.
                            </div>
                        )}
                        {posts.map((post, index) => (
                            <article
                                key={post.slug}
                                className={`border-t border-[color:var(--color-line)] mb-3 pt-3 ${
                                    index === 0 ? "border-t-0 pt-0" : ""
                                }`}
                            >
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                                    <span className="text-sm text-[color:var(--color-muted)] sm:min-w-[120px]">
                                        {formatDate(post.date)}
                                    </span>
                                    <Link
                                        className="text-base font-medium text-[color:var(--color-ink)] transition-colors hover:underline"
                                        href={`/posts/${post.slug}`}
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </section>
                </main>

                <footer className="mt-16 text-sm text-[color:var(--color-muted)]">
                    <div className="flex flex-wrap gap-4">
                        <a
                            className="transition-colors hover:text-[color:var(--color-ink)]"
                            href="https://github.com/mitdevy"
                            rel="noreferrer"
                            target="_blank"
                        >
                            github
                        </a>
                        <a
                            className="transition-colors hover:text-[color:var(--color-ink)]"
                            href="mailto:alperenyigiterrr@gmail.com"
                            rel="noreferrer"
                            target="_blank"
                        >
                	    contact me
                        </a>
                    </div>
                    <p className="mt-6 text-xs uppercase tracking-[0.2em]">
                        (c) {year}
                    </p>
                </footer>
            </div>
        </div>
    );
}
