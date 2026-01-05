import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const findPostsDirectory = () => {
    let currentDir = process.cwd();

    for (let i = 0; i < 6; i += 1) {
        const candidate = path.join(currentDir, "content", "posts");
        if (fs.existsSync(candidate)) {
            return candidate;
        }

        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            break;
        }
        currentDir = parentDir;
    }

    return path.join(process.cwd(), "content", "posts");
};

const postsDirectory = findPostsDirectory();

marked.use(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }

            return hljs.highlightAuto(code).value;
        },
    })
);

marked.setOptions({
    mangle: false,
    headerIds: false,
});

const normalizeMeta = (data, slug) => ({
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    tag: data.tag || "Post",
    readTime: data.readTime || "",
});

const toTimestamp = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

export const getPostSlugs = () => {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs
        .readdirSync(postsDirectory)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => fileName.replace(/\.md$/, ""));
};

export const getAllPosts = () => {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const posts = fs
        .readdirSync(postsDirectory)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return normalizeMeta(data, slug);
        });

    return posts.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
};

export const getPostBySlug = (slug) => {
    if (!slug) {
        return null;
    }

    const normalizedSlug = decodeURIComponent(
        Array.isArray(slug) ? slug.join("/") : slug
    ).replace(/\.md$/, "");

    let fullPath = path.join(postsDirectory, `${normalizedSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        const match = getPostSlugs().find(
            (candidate) =>
                candidate.toLowerCase() === normalizedSlug.toLowerCase()
        );

        if (!match) {
            return null;
        }

        fullPath = path.join(postsDirectory, `${match}.md`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        meta: normalizeMeta(data, normalizedSlug),
        html: marked.parse(content),
    };
};