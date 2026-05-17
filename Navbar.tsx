import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, X, LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { isAdmin, user, signOut } = useAuth();
  const { settings } = useSettings();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { ngo_name, short_name, logo_url } = settings.branding;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-prose flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          {logo_url ? (
            <img src={logo_url} alt={ngo_name} className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-sm">
              {short_name}
            </span>
          )}
          <span className="hidden font-display text-lg sm:inline">{ngo_name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground ${
                path === l.to ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          {isAdmin && (
            <Link to="/admin" className="hidden md:block">
              <Button variant="outline" size="sm"><ShieldCheck className="mr-1 h-4 w-4" />Admin</Button>
            </Link>
          )}
          {user ? (
            <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out" className="hidden md:inline-flex">
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container-prose flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm ${path === l.to ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm text-muted-foreground">
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <button onClick={() => { setOpen(false); signOut(); }} className="rounded-md px-3 py-3 text-left text-sm text-muted-foreground">
                Sign out
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm text-muted-foreground">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
