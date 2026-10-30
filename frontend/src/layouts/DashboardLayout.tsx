import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  Clock3,
  LayoutDashboard,
  LogOut,
  WalletCards,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { supabase } from "@/config/supabase";

const navigation = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", to: "/portfolio", icon: WalletCards },
  { label: "Trade", to: "/trade", icon: ArrowLeftRight },
  { label: "History", to: "/history", icon: Clock3 },
];

export default function DashboardLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 flex h-screen w-[76px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-3 py-5 md:w-64 md:px-4">
        <div className="flex h-10 items-center gap-3 px-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <ChartNoAxesCombined className="size-5" />
          </div>
          <div className="hidden leading-tight md:block">
            <p className="font-semibold tracking-tight">PaperTrade</p>
            <p className="text-xs text-muted-foreground">Practice account</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Dashboard navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) =>
                [
                  "flex min-h-11 items-center justify-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors md:justify-start",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                ].join(" ")
              }
            >
              <Icon className="size-[18px] shrink-0" />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <Button
          variant="ghost"
          className="h-11 justify-center text-muted-foreground hover:text-foreground md:justify-start"
          onClick={handleLogout}
          title="Log out"
        >
          <LogOut className="size-[18px]" />
          <span className="hidden md:inline">Log out</span>
        </Button>
      </aside>

      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
