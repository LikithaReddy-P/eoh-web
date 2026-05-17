import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Echoes of Hope" },
      { name: "description", content: "Sweet moments from EOH events and outreach." },
      { property: "og:title", content: "EOH Gallery" },
      { property: "og:description", content: "Sweet moments captured during EOH initiatives." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<string | null>(null);
  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container-prose py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Gallery</p>
      <h1 className="mt-3 font-display text-5xl text-balance md:text-6xl">Sweet moments.</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">A small archive of the smiles, hands and hearts that keep us going.</p>

      <div className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full break-inside-avoid rounded-xl" />
            ))
          : (images ?? []).map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g.image_url)}
                className="block w-full break-inside-avoid overflow-hidden rounded-xl bg-muted text-left"
              >
                <img
                  src={g.image_url}
                  alt={g.caption ?? "Moment"}
                  loading="lazy"
                  className="w-full transition-transform duration-700 hover:scale-105"
                />
                {g.caption && <p className="p-3 text-xs text-muted-foreground">{g.caption}</p>}
              </button>
            ))}
        {!isLoading && images?.length === 0 && (
          <p className="text-muted-foreground">No images yet.</p>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button className="absolute right-6 top-6 rounded-full bg-secondary p-2"><X className="h-5 w-5" /></button>
          <img src={active} alt="" className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-soft" />
        </div>
      )}
    </div>
  );
}
