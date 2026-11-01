import { useLiveAssets } from "@/hooks/useLiveAssets"
import { Link } from "react-router"
import { buttonVariants } from "@/components/ui/button"

export default function Trade() {
  const { data: assets = [], isPending, isError, error } = useLiveAssets()

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Trade</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Select an asset to trade.
        </p>
      </header>

      <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold">Live assets</h2>

        {isPending && <p className="mt-4 text-sm text-muted-foreground">Loading assets...</p>}
        {isError && <p className="mt-4 text-sm text-destructive">{error.message}</p>}
        {!isPending && !isError && assets.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">No assets found.</p>
        )}

        {assets.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-b text-sm text-muted-foreground">
                <tr>
                  <th className="py-3">Asset</th>
                  <th className="py-3">Type</th>
                  <th className="py-3 text-right">Price</th>
                  <th className="py-3 text-right">Last updated</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={asset.logo_url} alt="" className="size-8" />
                        <div>
                          <p className="font-medium">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm">{asset.asset_type}</td>
                    <td className="py-4 text-right">${Number(asset.last_price).toFixed(2)}</td>
                    <td className="py-4 text-right text-sm text-muted-foreground">
                      {new Date(asset.last_price_at).toLocaleTimeString()}
                    </td>
                    <td className="py-4 text-right">
                      <Link to={`/trade/${asset.symbol}`} className={buttonVariants()}>
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
  )
}
