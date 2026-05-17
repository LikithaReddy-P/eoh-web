import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export function Footer() {
  const { settings } = useSettings();
  const { ngo_name, short_name, logo_url } = settings.branding;
  const { description, copyright } = settings.footer;
  const { email } = settings.contact;
  const { facebook, instagram, twitter, youtube } = settings.social;

  const socials = [
    { url: facebook, icon: Facebook, label: "Facebook" },
    { url: instagram, icon: Instagram, label: "Instagram" },
    { url: twitter, icon: Twitter, label: "Twitter" },
    { url: youtube, icon: Youtube, label: "YouTube" },
  ].filter((s) => s.url);

  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            {logo_url ? (
              <img src={logo_url} alt={ngo_name} className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-sm">{short_name}</span>
            )}
            <span className="font-display text-lg">{ngo_name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{description}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground">About</Link></li>
            <li><Link to="/team" className="hover:text-foreground text-muted-foreground">Executive Board</Link></li>
            <li><Link to="/events" className="hover:text-foreground text-muted-foreground">Events</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground text-muted-foreground">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-foreground text-muted-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Connect</h4>
          {email && <p className="mt-4 text-sm text-muted-foreground">{email}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="rounded-full border border-border p-2 hover:bg-secondary">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
            {email && (
              <a href={`mailto:${email}`} aria-label="Email" className="rounded-full border border-border p-2 hover:bg-secondary">
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-prose flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {ngo_name}. All rights reserved.</p>
          {copyright && <p>{copyright}</p>}
        </div>
      </div>
    </footer>
  );
}
