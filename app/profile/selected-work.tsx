const WORK_PLACEHOLDERS = [
  {
    category: "Internal systems",
    title: "Manufacturing ERP",
  },
  {
    category: "Product engineering",
    title: "Consumer E-commerce",
  },
  {
    category: "Current focus",
    title: "AI Agent Experiments",
  },
] as const;

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-title">
      <div className="mb-6 flex flex-col gap-1.5">
        <h2
          id="selected-work-title"
          className="text-2xl font-medium tracking-tight"
        >
          Selected Work
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Representative projects and detailed case studies are being prepared.
        </p>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {WORK_PLACEHOLDERS.map((work) => (
          <article
            key={work.title}
            className="grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {work.category}
            </p>
            <h3 className="text-base font-medium">{work.title}</h3>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </article>
        ))}
      </div>
    </section>
  );
}
