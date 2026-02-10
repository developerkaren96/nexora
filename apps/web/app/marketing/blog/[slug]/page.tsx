import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame, Tag, CtaBand } from "../../_components/page-frame";
import { POSTS } from "../../_data/blog";
import { Clock, ArrowLeft, ArrowRight, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — Блог Nexora` : "Статья — Nexora",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageFrame
      eyebrow={post.category}
      title={post.title}
      lede={post.excerpt}
      badge={<Tag tone="indigo">{post.date} · {post.readTime}</Tag>}
    >
      {/* Author bar */}
      <div className="-mt-6 mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[14px] font-semibold text-white">
            {post.author.charAt(0)}
          </span>
          <div>
            <div className="text-[13.5px] font-semibold">{post.author}</div>
            <div className="text-[11.5px] text-zinc-500">{post.authorRole}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">поделиться</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
            className="grid size-8 place-items-center rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Twitter className="size-3.5" />
          </a>
          <a
            href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://nexora.app/blog/${post.slug}`)}`}
            className="grid size-8 place-items-center rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Linkedin className="size-3.5" />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`https://nexora.app/blog/${post.slug}`)}`}
            className="grid size-8 place-items-center rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <LinkIcon className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Hero image */}
      <div className={`mb-12 aspect-[16/7] overflow-hidden rounded-2xl bg-gradient-to-br ${post.gradient}`}>
        <div
          aria-hidden
          className="size-full opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.7) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Article body */}
      <article className="prose mx-auto max-w-3xl text-[15px] leading-[1.75] text-zinc-700 dark:text-zinc-300">
        {post.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="mt-12 text-[24px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
                {block.text}
              </h2>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={i}
                className="my-8 border-l-4 border-indigo-500 bg-indigo-50/50 py-4 pl-6 pr-4 font-serif text-[19px] italic leading-snug text-zinc-800 dark:bg-indigo-950/20 dark:text-zinc-200"
              >
                {block.text}
              </blockquote>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="my-6 list-disc space-y-2 pl-6 marker:text-indigo-500">
                {block.items?.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            );
          }
          return (
            <p key={i} className="mt-5">
              {block.text}
            </p>
          );
        })}
      </article>

      {/* Footer nav */}
      <div className="mt-16 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="size-3.5" /> Все статьи
        </Link>
        <span className="font-mono text-[11px] text-zinc-500">
          <Clock className="mr-1 inline size-3" /> {post.readTime}
        </span>
      </div>

      {/* Related */}
      <section className="mt-16">
        <h2 className="text-[20px] font-semibold tracking-tight">Читать дальше</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-xl border border-zinc-200 transition hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <div className={`aspect-[16/9] bg-gradient-to-br ${p.gradient}`} />
              <div className="p-4">
                <Tag tone="zinc">{p.category}</Tag>
                <h3 className="mt-2 text-[14px] font-semibold leading-snug tracking-tight transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {p.title}
                </h3>
                <div className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-zinc-500">
                  Читать <ArrowRight className="size-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </PageFrame>
  );
}
