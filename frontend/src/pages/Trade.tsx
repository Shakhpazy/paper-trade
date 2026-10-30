import { useLiveAssets } from "@/hooks/useLiveAssets";

export default function Trade() {
  const { data: assets = {}, isPending, isError, error } = useLiveAssets();

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Trade</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
          Research an asset and place a simulated order.
        </p>
      </header>

      <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold">Live assets</h2>

        {isPending && <p className="mt-4 text-sm text-muted-foreground">Loading assets...</p>}

        {isError && <p className="mt-4 text-sm text-destructive">{error.message}</p>}

        {!isPending && !isError && Object.keys(assets).length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">Waiting for live market data...</p>
        )}

        <div className="mt-4 divide-y">
          {Object.entries(assets).map(([symbol, asset]) => (
            <div key={symbol} className="flex items-center justify-between py-3">
              <span className="font-medium">{symbol}</span>
              <span>${asset.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
