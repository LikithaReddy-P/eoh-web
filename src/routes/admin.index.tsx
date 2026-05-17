import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, ImageIcon, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({ component: Overview });

function Overview() {
  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const [m, e, g] = await Promise.all([
        supabase.from("members").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
      ]);
      return { members: m.count ?? 0, events: e.count ?? 0, gallery: g.count ?? 0 };
    },
  });

  const stats = [
    { label: "Board members", value: data?.members ?? "—", icon: Users },
    { label: "Events", value: data?.events ?? "—", icon: CalendarDays },
    { label: "Gallery photos", value: data?.gallery ?? "—", icon: ImageIcon },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl">Overview</h1>
      <p className="mt-2 text-muted-foreground">A quick pulse on the EOH content you manage.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <s.icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-3xl">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
