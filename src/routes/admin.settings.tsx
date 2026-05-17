import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSettings, type SettingsMap } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageDropzone } from "@/components/ImageDropzone";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  const { settings, isLoading } = useSettings();
  const qc = useQueryClient();
  const [draft, setDraft] = useState<SettingsMap | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!draft && !isLoading) setDraft(settings); }, [settings, isLoading, draft]);

  if (!draft) return <p className="text-muted-foreground">Loading…</p>;

  function update<K extends keyof SettingsMap>(key: K, patch: Partial<SettingsMap[K]>) {
    setDraft((d) => (d ? { ...d, [key]: { ...d[key], ...patch } } : d));
  }

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const rows = (Object.keys(draft) as (keyof SettingsMap)[]).map((key) => ({
        key,
        value: draft[key] as never,
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) throw error;
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (e: any) {
      toast.error(e.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Website Settings</h1>
          <p className="mt-2 text-muted-foreground">Edit branding, hero, contact, social and footer content.</p>
        </div>
        <Button onClick={save} disabled={saving} className="rounded-full"><Save className="mr-1 h-4 w-4" />{saving ? "Saving…" : "Save changes"}</Button>
      </div>

      <Tabs defaultValue="branding" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* BRANDING */}
        <TabsContent value="branding" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="NGO name"><Input value={draft.branding.ngo_name} onChange={(e) => update("branding", { ngo_name: e.target.value })} /></Field>
            <Field label="Short name / abbreviation"><Input value={draft.branding.short_name} onChange={(e) => update("branding", { short_name: e.target.value })} /></Field>
          </div>
          <Field label="Tagline"><Input value={draft.branding.tagline} onChange={(e) => update("branding", { tagline: e.target.value })} /></Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Logo (square recommended, 256×256+)">
              <ImageDropzone value={draft.branding.logo_url} onChange={(url) => update("branding", { logo_url: url })} bucket="branding" aspect="aspect-square" />
            </Field>
            <Field label="Favicon (32×32 or larger)">
              <ImageDropzone value={draft.branding.favicon_url} onChange={(url) => update("branding", { favicon_url: url })} bucket="branding" aspect="aspect-square" />
            </Field>
          </div>
        </TabsContent>

        {/* HERO */}
        <TabsContent value="hero" className="mt-6 space-y-6">
          <Field label="Hero background image (1920×1080 recommended)">
            <ImageDropzone value={draft.hero.image_url} onChange={(url) => update("hero", { image_url: url })} bucket="branding" aspect="aspect-video" />
          </Field>
          <Field label="Hero title"><Input value={draft.hero.title} onChange={(e) => update("hero", { title: e.target.value })} /></Field>
          <Field label="Hero subtitle"><Textarea rows={3} value={draft.hero.subtitle} onChange={(e) => update("hero", { subtitle: e.target.value })} /></Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Primary button text"><Input value={draft.hero.primary_cta_text} onChange={(e) => update("hero", { primary_cta_text: e.target.value })} /></Field>
            <Field label="Primary button link"><Input value={draft.hero.primary_cta_link} onChange={(e) => update("hero", { primary_cta_link: e.target.value })} /></Field>
            <Field label="Secondary button text"><Input value={draft.hero.secondary_cta_text} onChange={(e) => update("hero", { secondary_cta_text: e.target.value })} /></Field>
            <Field label="Secondary button link"><Input value={draft.hero.secondary_cta_link} onChange={(e) => update("hero", { secondary_cta_link: e.target.value })} /></Field>
          </div>
        </TabsContent>

        {/* ABOUT */}
        <TabsContent value="about" className="mt-6 space-y-6">
          <Field label="About image">
            <ImageDropzone value={draft.about.image_url} onChange={(url) => update("about", { image_url: url })} bucket="branding" aspect="aspect-square" />
          </Field>
          <Field label="About heading"><Input value={draft.about.heading} onChange={(e) => update("about", { heading: e.target.value })} /></Field>
          <Field label="About body"><Textarea rows={6} value={draft.about.body} onChange={(e) => update("about", { body: e.target.value })} /></Field>
        </TabsContent>

        {/* CONTACT */}
        <TabsContent value="contact" className="mt-6 space-y-6">
          <Field label="Email"><Input type="email" value={draft.contact.email} onChange={(e) => update("contact", { email: e.target.value })} /></Field>
          <Field label="Phone"><Input value={draft.contact.phone} onChange={(e) => update("contact", { phone: e.target.value })} /></Field>
          <Field label="Address"><Textarea rows={3} value={draft.contact.address} onChange={(e) => update("contact", { address: e.target.value })} /></Field>
        </TabsContent>

        {/* SOCIAL */}
        <TabsContent value="social" className="mt-6 space-y-6">
          <Field label="Facebook URL"><Input value={draft.social.facebook} onChange={(e) => update("social", { facebook: e.target.value })} /></Field>
          <Field label="Instagram URL"><Input value={draft.social.instagram} onChange={(e) => update("social", { instagram: e.target.value })} /></Field>
          <Field label="Twitter / X URL"><Input value={draft.social.twitter} onChange={(e) => update("social", { twitter: e.target.value })} /></Field>
          <Field label="YouTube URL"><Input value={draft.social.youtube} onChange={(e) => update("social", { youtube: e.target.value })} /></Field>
        </TabsContent>

        {/* FOOTER */}
        <TabsContent value="footer" className="mt-6 space-y-6">
          <Field label="Footer description"><Textarea rows={3} value={draft.footer.description} onChange={(e) => update("footer", { description: e.target.value })} /></Field>
          <Field label="Footer tagline / signature"><Input value={draft.footer.copyright} onChange={(e) => update("footer", { copyright: e.target.value })} /></Field>
        </TabsContent>
      </Tabs>

      <div className="mt-10 flex justify-end">
        <Button onClick={save} disabled={saving} className="rounded-full"><Save className="mr-1 h-4 w-4" />{saving ? "Saving…" : "Save changes"}</Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
