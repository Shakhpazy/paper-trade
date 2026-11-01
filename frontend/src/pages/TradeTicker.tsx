import { useLiveAsset } from "@/hooks/useLiveAsset";
import { TradeOrderForm } from "@/components/trade-order-form";
import { Link, useParams } from "react-router"
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";


export default function TradeTicker() {
    const { ticker } = useParams()
    const { data: asset, isPending, isError, error, isLive } = useLiveAsset(ticker)

    if (isPending) {
        return <p className="p-8 text-sm text-muted-foreground">Loading asset...</p>
    }

    if (isError) {
        return <p className="p-8 text-sm text-destructive">{error?.message}</p>
    }

    if (!asset) {
        return (
            <div className="p-8">
                <p className="text-sm text-muted-foreground">Asset not found.</p>
                <Link to="/trade" className="mt-3 inline-block text-sm text-primary">Back to trade</Link>
            </div>
        )
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <header className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Trade</h1>
                <div className="mt-2 flex items-center gap-4">
                    <img src={asset.logo_url} alt={asset.name} className="w-12 h-12" />
                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    {asset.name} ({asset.symbol}) · ${Number(asset.last_price).toFixed(2)}
                    {!isLive && " · Last saved price"}
                    </p>
                </div>
            </header>

            <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <section className="min-w-0 overflow-hidden rounded-2xl border bg-card p-3 shadow-sm sm:p-4">
                    <AdvancedRealTimeChart
                        symbol={asset.asset_type === "STOCK"
                            ? `NASDAQ:${asset.symbol}`
                            : `${asset.symbol}USD`}
                        theme="dark"
                        width="100%"
                        height={600}
                    />
                </section>
                <TradeOrderForm asset={asset} />
            </div>
        </div>
    )
}
