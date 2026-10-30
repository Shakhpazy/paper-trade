import { Clock3 } from "lucide-react";

export default function Dashboard() {
  const metrics = [
    { label: "Account balance", value: "$0.00" },
    { label: "Open positions", value: "0" },
    { label: "Day P&L", value: "$0.00" },
  ];

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
        {metrics.map((metric) => (
          <section key={metric.label} className="rounded-2xl border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{metric.value}</p>
          </section>
        ))}
      </div>

      <section className="mt-4 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">Recent activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your completed paper trades will appear here.
            </p>
          </div>
          <Clock3 className="size-5 text-muted-foreground" />
        </div>
        <div className="mt-8 flex min-h-44 items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
          <p className="max-w-sm text-sm text-muted-foreground">
            No activity yet. Place your first simulated trade to begin tracking performance.
          </p>
        </div>
      </section>
    </div>
  );
}
