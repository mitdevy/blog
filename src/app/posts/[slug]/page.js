import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Header from "@/components/ui/Header";

export const generateStaticParams = () =>
    getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }) => {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {};
    }

    return {
        title: `${post.meta.title} | mitdevy`,
        description: post.meta.excerpt || "Blog post from mitdevy.",
    };
};

export default async function PostPage({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[color:var(--color-sand)] text-[color:var(--color-ink)]">
            <div className="mx-auto flex w-full max-w-2xl flex-col px-6 py-12 sm:px-10">
                <Header />
                <main className="mt-12">
                    <Link
                        className="text-sm font-medium text-[color:var(--color-muted)]"
                        href="/posts"
                    >
                        ← Back to all posts
                    </Link>

                    <article className="mt-6 border-t border-[color:var(--color-line)] pt-6">
                        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                            {post.meta.title}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                            <span>{formatDate(post.meta.date)}</span>
                            <span className="h-1 w-1 rounded-full bg-[color:var(--color-line)]" />
                            <span>{post.meta.readTime}</span>
                            <span className="h-1 w-1 rounded-full bg-[color:var(--color-line)]" />
                            <span>{post.meta.tag}</span>
                        </div>
                        {post.meta.excerpt && (
                            <p className="mt-4 text-sm leading-6 text-[color:var(--color-muted)]">
                                {post.meta.excerpt}
                            </p>
                        )}
                        <div
                            className="markdown mt-8"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />
                    </article>
                </main>
            </div>
        </div>
    );
}