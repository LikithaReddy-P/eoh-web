import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Echoes of Hope" },
      { name: "description", content: "Upcoming and past events from Echoes of Hope." },
      { property: "og:title", content: "EOH Events" },
      { property: "og:description", content: "Upcoming and past events from EOH." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container-prose py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Events</p>
      <h1 className="mt-3 font-display text-5xl text-balance md:text-6xl">Where hope meets action.</h1>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)
          : (events ?? []).map((e) => (
              <article key={e.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                  {e.images?.[0] ? (
                    <img src={e.images[0]} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-warm font-display text-4xl text-primary/40">EOH</div>
                  )}
                </div>
                <div className="p-7">
                  {e.event_date && (
                    <p className="flex items-center text-xs uppercase tracking-wider text-muted-foreground">
                      <Calendar className="mr-2 h-3 w-3" />
                      {new Date(e.event_date).toLocaleDateString(undefined, { dateStyle: "long" })}
                    </p>
                  )}
                  <h2 className="mt-3 font-display text-2xl">{e.title}</h2>
                  <p className="mt-3 text-muted-foreground">{e.description}</p>
                  {e.images && e.images.length > 1 && (
                    <div className="mt-5 flex gap-2 overflow-x-auto">
                      {e.images.slice(1).map((src, i) => (
                        <img key={i} src={src} alt="" loading="lazy" className="h-16 w-24 shrink-0 rounded-md object-cover" />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
        {!isLoading && events?.length === 0 && (
          <p className="col-span-full text-muted-foreground">No events yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
