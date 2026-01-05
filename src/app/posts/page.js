import Link from "next/link";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/ui/Header";

export const metadata = {
    title: "Blog | mitdevy",
    description: "All posts published on mitdevy.",
};

export default function PostsPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-[color:var(--color-sand)] text-[color:var(--color-ink)]">
            <div className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12 sm:px-10">
                <Header />

                <main className="mt-12">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                                Blog
                            </p>
                            <h1 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
                                All posts
                            </h1>
                        </div>
                        <Link
                            className="text-sm font-medium text-[color:var(--color-muted)]"
                            href="/"
                        >
                            Back home
                        </Link>
                    </div>

                    <section className="mt-10 space-y-6">
                        {posts.length === 0 && (
                            <div className="border-t border-[color:var(--color-line)] pt-6 text-sm text-[color:var(--color-muted)]">
                                No posts yet. Add Markdown files in
                                content/posts.
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
            </div>
        </div>
    );
}
