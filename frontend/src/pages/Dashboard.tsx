import { useAccountCash } from "@/hooks/accountData";

export default function Dashboard() {
  const { data, isLoading } = useAccountCash();

  const balance = Number(data?.cash_balance).toFixed(2);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Paper account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Overview</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
          A clear view of your simulated trading account.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Account balance</p>
          <p className="mt-3 text-2xl font-semibold">{isLoading ? "loading..." : `$${balance}`}</p>
        </section>
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Open positions</p>
          <p className="mt-3 text-2xl font-semibold">0</p>
        </section>
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Day P&L</p>
          <p className="mt-3 text-2xl font-semibold">$0.00</p>
        </section>
      </div>

      <section className="mt-4 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold">Recent activity</h2>
        <div className="mt-8 flex min-h-44 items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
          <p className="text-sm text-muted-foreground">No activity yet.</p>
        </div>
      </section>
    </div>
  );
}
