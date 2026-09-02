import type { TocItem } from "@/app/[locale]/blog/toc";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  items: TocItem[];
};

function TocLinks({ items }: TableOfContentsProps) {
  return (
    <ol className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            className={cn(
              "block border-l border-border py-1 pl-3 text-sm leading-5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              item.level === 3 && "pl-6 text-xs",
            )}
            href={`#${item.id}`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <details className="group mb-8 border-y border-border py-3 xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
          文章目录
          <span
            aria-hidden="true"
            className="text-muted-foreground transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <nav aria-label="文章目录" className="mt-3">
          <TocLinks items={items} />
        </nav>
      </details>

      <aside className="absolute inset-y-0 left-[calc(100%+3rem)] hidden w-56 xl:block">
        <nav aria-label="文章目录" className="sticky top-8">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            文章目录
          </p>
          <TocLinks items={items} />
        </nav>
      </aside>
    </>
  );
}
