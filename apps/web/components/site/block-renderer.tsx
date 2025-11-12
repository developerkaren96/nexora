import { Button } from "@/components/ui/button";

type Block = { type: string; props?: any };

/** Renders a tenant page's block tree. Add new block types by registering them here. */
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return <main className="min-h-screen">{blocks.map((b, i) => <Render key={i} block={b} />)}</main>;
}

function Render({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return (
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 px-6 py-24 text-center dark:from-zinc-950 dark:to-zinc-900">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{block.props?.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{block.props?.subtitle}</p>
          {block.props?.cta && <Button asChild className="mt-8"><a href={block.props.cta.href}>{block.props.cta.label}</a></Button>}
        </section>
      );
    case "features":
      return (
        <section className="container grid gap-6 py-20 md:grid-cols-3">
          {(block.props?.items ?? []).map((it: any, i: number) => (
            <div key={i} className="rounded-xl border p-6"><h3 className="text-lg font-semibold">{it.title}</h3>{it.body && <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>}</div>
          ))}
        </section>
      );
    case "cta":
      return (
        <section className="container py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{block.props?.title}</h2>
          <Button className="mt-6">{block.props?.buttonLabel}</Button>
        </section>
      );
    case "section":
      return <section className="container py-20"><h2 className="text-3xl font-semibold tracking-tight">{block.props?.title}</h2></section>;
    default:
      return null;
  }
}
