import type { Metadata } from "next";
import { ssrApi } from "@/lib/api";
import { BlockRenderer } from "@/components/site/block-renderer";

type Page = { title: string; description?: string; blocks: any[]; metaJson?: any };

async function fetchHome(slug: string): Promise<Page | null> {
  try {
    // Tenant resolved via X-Tenant-Slug header on the API side.
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/site/page?path=/`, {
      headers: { "X-Tenant-Slug": slug },
      cache: "no-store",
    });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchHome(slug);
  return { title: page?.title ?? slug, description: page?.description };
}

export default async function TenantHome({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await fetchHome(slug);
  if (!page) return <div className="grid min-h-screen place-items-center"><p className="text-muted-foreground">Site is being prepared…</p></div>;
  return <BlockRenderer blocks={page.blocks} />;
}
