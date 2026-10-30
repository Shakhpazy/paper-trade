export default function History() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">History</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
          Review your completed orders and account activity.
        </p>
      </header>

      <section className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed bg-card/60 p-8 text-center">
        <div className="max-w-sm">
          <h2 className="font-semibold">No trade history yet</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Completed simulated orders will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}
