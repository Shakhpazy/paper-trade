export default function Trade() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Trade</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
          Research an asset and place a simulated order.
        </p>
      </header>

      <section className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed bg-card/60 p-8 text-center">
        <div className="max-w-sm">
          <h2 className="font-semibold">Trade ticket coming next</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This page is ready for your symbol search and order form.
          </p>
        </div>
      </section>
    </div>
  );
}
