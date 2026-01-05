import Link from "next/link";

export default function Header() {
    return (
        <header>
            <nav className="flex flex-wrap gap-6 text-sm font-medium text-[color:var(--color-muted)]">
                <Link
                    className="transition-colors hover:text-[color:var(--color-ink)]"
                    href="/"
                >
                    home
                </Link>
                <Link
                    className="transition-colors hover:text-[color:var(--color-ink)]"
                    href="/posts"
                >
                    blog
                </Link>
            </nav>
        </header>
    );
}