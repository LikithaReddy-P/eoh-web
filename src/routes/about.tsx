import { createFileRoute } from "@tanstack/react-router";
import aboutFallback from "@/assets/about.jpg";
import { useSettings } from "@/hooks/useSettings";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Echoes of Hope" },
      { name: "description", content: "Mission, vision and story of Echoes of Hope (EOH), a community-driven NGO." },
      { property: "og:title", content: "About Echoes of Hope" },
      { property: "og:description", content: "Mission, vision and story of EOH." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { settings } = useSettings();
  const aboutImg = settings.about.image_url || aboutFallback;
  const { ngo_name } = settings.branding;
  return (
    <div className="container-prose py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-fade-up">About</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl text-balance md:text-6xl animate-fade-up-delay-1">
        We are {ngo_name}.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-up-delay-2">
        A volunteer-led NGO connecting people, places and possibilities — one quiet act of kindness at a time.
      </p>

      <div className="mt-14 overflow-hidden rounded-3xl">
        <img src={aboutImg} alt="Community" loading="lazy" className="aspect-[21/9] w-full object-cover" />
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Our Mission</h2>
          <p className="mt-4 text-muted-foreground">
            To nurture compassionate communities by responding to local needs with consistent, dignified service — supporting elders, educating children, and protecting the environment we all share.
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl">Our Vision</h2>
          <p className="mt-4 text-muted-foreground">
            A world where no person feels invisible, no child is denied opportunity, and every community holds the resources and resolve to care for its own.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl">Objectives</h2>
        <ul className="mt-6 grid gap-4 text-muted-foreground md:grid-cols-2">
          {[
            "Run monthly outreach for under-served families.",
            "Provide free educational support for children.",
            "Organise quarterly environmental drives.",
            "Build a network of trained, committed volunteers.",
            "Foster transparency in every rupee we receive.",
            "Celebrate small wins — and the people behind them.",
          ].map((o) => (
            <li key={o} className="rounded-xl border border-border bg-card p-5 shadow-card">{o}</li>
          ))}
        </ul>
      </div>

      <div className="mt-20 rounded-3xl bg-secondary/40 p-10 md:p-16">
        <h2 className="font-display text-3xl">Our Story</h2>
        <div className="prose-styles mt-6 space-y-5 text-muted-foreground">
          <p>
            EOH was born around a kitchen table on a winter evening. A handful of friends had spent the day distributing blankets at a railway station and came home wondering how to keep the work going beyond a one-off afternoon.
          </p>
          <p>
            That conversation became a list. The list became a plan. The plan became a tiny WhatsApp group of twelve. Today, that group has grown into a registered NGO with hundreds of volunteers — but the spirit hasn't changed.
          </p>
          <p>
            We still believe the most powerful change happens slowly, locally, and with the people closest to the problem. We still measure success by the names we remember, not the numbers we report.
          </p>
        </div>
      </div>
    </div>
  );
}
