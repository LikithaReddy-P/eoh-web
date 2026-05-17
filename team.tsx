import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Executive Board — Echoes of Hope" },
      { name: "description", content: "Meet the executive board of Echoes of Hope." },
      { property: "og:title", content: "EOH Executive Board" },
      { property: "og:description", content: "Meet the people leading Echoes of Hope." },
    ],
  }),
  component: TeamPage,
});

function MemberCard({ m }: { m: Tables<"members"> }) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-transform hover:-translate-y-1">
      <div className="flex items-start gap-5">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-secondary ring-2 ring-border">
          {m.photo_url ? (
            <img src={m.photo_url} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center font-display text-2xl text-primary/50">
              {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-display text-xl">{m.name}</h3>
          <p className="text-sm text-primary">{m.position}</p>
        </div>
      </div>
      {m.description && <p className="mt-5 text-sm text-muted-foreground">{m.description}</p>}
    </article>
  );
}

function TeamPage() {
  const { data: members, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("members").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const all = members ?? [];
  const current = all.filter((m) => !m.is_alumni);
  const alumni = all.filter((m) => m.is_alumni);

  return (
    <div className="container-prose py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Executive Board</p>
      <h1 className="mt-3 font-display text-5xl text-balance md:text-6xl">The hearts behind the work.</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        A small, dedicated team holding the threads together — and a wide circle of volunteers making it all possible.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="mt-6 h-6 w-2/3" />
                <Skeleton className="mt-3 h-4 w-1/2" />
              </div>
            ))
          : current.map((m) => <MemberCard key={m.id} m={m} />)}
      </div>

      {alumni.length > 0 && (
        <section className="mt-24">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Alumni</p>
          <h2 className="mt-3 font-display text-4xl text-balance md:text-5xl">Past executive board.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            With gratitude for those who shaped EOH and passed the torch forward.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alumni.map((m) => <MemberCard key={m.id} m={m} />)}
          </div>
        </section>
      )}
    </div>
  );
}
