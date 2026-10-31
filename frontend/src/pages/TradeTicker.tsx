import { useState } from "react"
import { useParams } from "react-router"

export default function TradeTicker() {

    const { ticker } = useParams()
    

    return (
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <header className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Trade</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    {ticker}
                </p>
            </header>

            <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                <h2 className="font-semibold"></h2>

            </section>
        </div>
    )
}