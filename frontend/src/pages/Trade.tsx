import { useLiveAssets } from "@/hooks/useLiveAssets";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";


export default function Trade() {
  const { data: assets = [], isPending, isError, error } = useLiveAssets();

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Trade</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
          Research an asset and place a simulated order.
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-semibold">Live assets</h2>
            <p className="mt-1 text-sm text-muted-foreground">Prices update every few seconds.</p>
          </div>
          <p className="text-sm text-muted-foreground">{assets.length} assets</p>
        </div>

        {isPending && <p className="p-6 text-sm text-muted-foreground">Loading assets...</p>}

        {isError && <p className="p-6 text-sm text-destructive">{error.message}</p>}

        {!isPending && !isError && assets.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">Waiting for live market data...</p>
        )}

        {!isPending && !isError && assets.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium sm:px-6">Asset</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 text-right font-medium">Price</th>
                  <th className="px-4 py-3 text-right font-medium">Last updated</th>
                  <th className="px-5 py-3 sm:px-6"><span className="sr-only">Action</span></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assets.map((asset) => (
                  <tr key={asset.id} className="transition-colors hover:bg-muted/20">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={asset.logo_url}
                          alt=""
                          width={36}
                          height={36}
                          className="size-9 rounded-full object-contain"
                        />
                        <div>
                          <p className="font-medium">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
                        {asset.asset_type.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-medium tabular-nums">
                      ${Number(asset.last_price).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-muted-foreground">
                      {new Date(asset.last_price_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right sm:px-6">
                      <Link
                        to={`/trade/${asset.symbol}`}
                        className={buttonVariants({ size: "sm" })}
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
