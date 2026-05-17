import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroFallback from "@/assets/hero.jpg";
import aboutFallback from "@/assets/about.jpg";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Echoes of Hope — One Connection At a Time" },
      { name: "description", content: "EOH is a community NGO connecting hearts, hands and hope. Discover our work, events and how to join." },
      { property: "og:title", content: "Echoes of Hope — One Connection At a Time" },
      { property: "og:description", content: "EOH connects hearts, hands and hope across our community." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { settings } = useSettings();
  const { branding, hero, about } = settings;
  const heroImg = hero.image_url || heroFallback;
  const aboutImg = about.image_url || aboutFallback;

  const { data: events } = useQuery({
    queryKey: ["events", "preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false, nullsFirst: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const { data: gallery } = useQuery({
    queryKey: ["gallery", "preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt={branding.ngo_name} className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        <div className="container-prose flex min-h-[78vh] flex-col justify-end pb-16 pt-32">
          <p className="animate-fade-up text-xs uppercase tracking-[0.3em] text-muted-foreground">{branding.ngo_name} · {branding.short_name}</p>
          <h1 className="animate-fade-up-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.1] text-balance md:text-7xl">
            {hero.title}
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg text-muted-foreground">{hero.subtitle}</p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            {hero.primary_cta_text && (
              <a href={hero.primary_cta_link}>
                <Button size="lg" className="rounded-full">{hero.primary_cta_text} <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </a>
            )}
            {hero.secondary_cta_text && (
              <a href={hero.secondary_cta_link}>
                <Button size="lg" variant="outline" className="rounded-full">{hero.secondary_cta_text}</Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="container-prose py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Heart, title: "Compassion in action", body: "Every initiative begins by listening to the people we serve." },
            { icon: Users, title: "Community first", body: "Volunteers, donors and beneficiaries — we move forward together." },
            { icon: Sparkles, title: "Small acts, big echoes", body: "We believe consistent kindness compounds into lasting change." },
          ].map((p) => (
            <div key={p.title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
              <p.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="bg-secondary/40 py-20">
        <div className="container-prose grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={aboutImg} alt={about.heading} loading="lazy" width={1280} height={1280} className="aspect-square w-full rounded-2xl object-cover shadow-soft" />
          </div>
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About {branding.short_name}</p>
            <h2 className="mt-3 font-display text-4xl text-balance md:text-5xl">{about.heading}</h2>
            <p className="mt-5 text-muted-foreground whitespace-pre-line">{about.body}</p>
            <Link to="/about" className="mt-6 inline-flex items-center text-sm font-medium text-primary">
              Read our story <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* RECENT EVENTS */}
      <section className="container-prose py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Recent</p>
            <h2 className="mt-2 font-display text-4xl">Events & moments</h2>
          </div>
          <Link to="/events" className="hidden text-sm font-medium text-primary md:inline-flex">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(events ?? []).map((e) => (
            <article key={e.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                {e.images?.[0] ? (
                  <img src={e.images[0]} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-warm font-display text-3xl text-primary/40">{branding.short_name}</div>
                )}
              </div>
              <div className="p-6">
                {e.event_date && <p className="text-xs uppercase tracking-wider text-muted-foreground">{new Date(e.event_date).toLocaleDateString(undefined, { dateStyle: "medium" })}</p>}
                <h3 className="mt-2 font-display text-xl">{e.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{e.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      {gallery && gallery.length > 0 && (
        <section className="container-prose pb-20">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl">Sweet moments</h2>
            <Link to="/gallery" className="text-sm font-medium text-primary">All photos <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {gallery.map((g) => (
              <div key={g.id} className="aspect-square overflow-hidden rounded-xl bg-muted">
                <img src={g.image_url} alt={g.caption ?? "Gallery"} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-prose pb-24">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-soft md:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-4xl text-balance md:text-5xl">Be the next echo of hope.</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Volunteer, donate, or simply share our work. Every connection counts.</p>
          <Link to="/contact"><Button size="lg" variant="secondary" className="mt-8 rounded-full">Get in touch</Button></Link>
        </div>
      </section>
    </>
  );
}
