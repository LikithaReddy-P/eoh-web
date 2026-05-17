import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Branding = { ngo_name: string; short_name: string; tagline: string; logo_url: string | null; favicon_url: string | null };
export type Hero = { image_url: string | null; title: string; subtitle: string; primary_cta_text: string; primary_cta_link: string; secondary_cta_text: string; secondary_cta_link: string };
export type AboutSettings = { image_url: string | null; heading: string; body: string };
export type ContactSettings = { email: string; phone: string; address: string };
export type Social = { facebook: string; instagram: string; twitter: string; youtube: string };
export type FooterSettings = { description: string; copyright: string };

export interface SettingsMap {
  branding: Branding;
  hero: Hero;
  about: AboutSettings;
  contact: ContactSettings;
  social: Social;
  footer: FooterSettings;
}

const DEFAULTS: SettingsMap = {
  branding: { ngo_name: "Echoes of Hope", short_name: "EOH", tagline: "One Connection At a Time", logo_url: null, favicon_url: null },
  hero: {
    image_url: null,
    title: "One connection at a time.",
    subtitle: "We are a community of volunteers stitching small acts of kindness into a larger story of hope.",
    primary_cta_text: "Join the movement", primary_cta_link: "/contact",
    secondary_cta_text: "Our story", secondary_cta_link: "/about",
  },
  about: { image_url: null, heading: "A quiet movement, an honest mission.", body: "" },
  contact: { email: "hello@echoesofhope.org", phone: "", address: "" },
  social: { facebook: "", instagram: "", twitter: "", youtube: "" },
  footer: { description: "", copyright: "" },
};

export function useSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) throw error;
      const map: Partial<Record<keyof SettingsMap, unknown>> = {};
      for (const row of data ?? []) map[row.key as keyof SettingsMap] = row.value;
      return {
        branding: { ...DEFAULTS.branding, ...(map.branding as object ?? {}) } as Branding,
        hero: { ...DEFAULTS.hero, ...(map.hero as object ?? {}) } as Hero,
        about: { ...DEFAULTS.about, ...(map.about as object ?? {}) } as AboutSettings,
        contact: { ...DEFAULTS.contact, ...(map.contact as object ?? {}) } as ContactSettings,
        social: { ...DEFAULTS.social, ...(map.social as object ?? {}) } as Social,
        footer: { ...DEFAULTS.footer, ...(map.footer as object ?? {}) } as FooterSettings,
      } satisfies SettingsMap;
    },
    staleTime: 60_000,
  });
  return { settings: data ?? DEFAULTS, isLoading };
}
