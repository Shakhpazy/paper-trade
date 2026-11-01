import { ChartNoAxesCombined } from "lucide-react"

export function AuthShell({ children }: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ChartNoAxesCombined className="size-5" />
          </div>
          <div>
            <p className="font-semibold">PaperTrade</p>
            <p className="text-xs text-muted-foreground">Paper trading account</p>
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
