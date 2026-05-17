import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSettings } from "@/hooks/useSettings";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Echoes of Hope" },
      { name: "description", content: "Reach Echoes of Hope to volunteer, partner or donate." },
      { property: "og:title", content: "Contact EOH" },
      { property: "og:description", content: "Get in touch with Echoes of Hope." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Tell us a bit more").max(1000),
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { settings } = useSettings();
  const { email, phone, address } = settings.contact;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    // Build mailto so user reaches inbox without backend setup.
    const subject = encodeURIComponent(`Contact from ${parsed.data.name}`);
    const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      toast.success("Opening your email app — thank you!");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 400);
  };

  return (
    <div className="container-prose py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
      <h1 className="mt-3 font-display text-5xl text-balance md:text-6xl">Say hello.</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Want to volunteer, partner or donate? Drop us a line — we read every message.
      </p>

      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="space-y-5">
            {email && (
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${email}`} className="font-medium">{email}</a>
                </div>
              </div>
            )}
            {phone && (
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="font-medium">{phone}</a>
                </div>
              </div>
            )}
            {address && (
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium whitespace-pre-line">{address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7 space-y-5 rounded-2xl border border-border bg-card p-8 shadow-card">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required className="mt-2" maxLength={100} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="mt-2" maxLength={255} />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={5} className="mt-2" maxLength={1000} />
          </div>
          <Button type="submit" disabled={loading} className="rounded-full">
            {loading ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
