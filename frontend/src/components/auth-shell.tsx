import { ChartNoAxesCombined, ShieldCheck, TrendingUp } from "lucide-react"

export function AuthShell({
  children,
  eyebrow,
  title,
  description,
}: {
  children: React.ReactNode
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
      <aside className="relative hidden overflow-hidden border-r border-border bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 20% 15%, color-mix(in oklch, var(--primary) 20%, transparent), transparent 36%)",
          }}
        />

        <div className="relative flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <ChartNoAxesCombined className="size-5" />
          </div>
          <div>
            <p className="font-semibold tracking-tight">PaperTrade</p>
            <p className="text-xs text-muted-foreground">Practice with purpose</p>
          </div>
        </div>

        <div className="relative max-w-xl py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] xl:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground xl:text-lg">
            {description}
          </p>

          <div className="mt-10 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <TrendingUp className="size-5 text-primary" />
              Simulated market practice
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-primary" />
              No real capital at risk
            </div>
          </div>
        </div>

        <p className="relative text-xs text-muted-foreground">
          Build confidence before trading live.
        </p>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ChartNoAxesCombined className="size-[18px]" />
            </div>
            <p className="font-semibold tracking-tight">PaperTrade</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
