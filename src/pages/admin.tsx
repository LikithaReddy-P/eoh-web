import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Users, CalendarDays, Image as ImgIcon, ArrowLeft, Settings } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — EOH" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="container-prose py-32 text-center text-muted-foreground">Checking access…</div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="container-prose py-32 text-center">
        <h1 className="font-display text-3xl">Not an admin</h1>
        <p className="mt-3 text-muted-foreground">
          Your account is signed in but doesn't have admin access. Ask an existing admin to grant your account the <code>admin</code> role.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">User ID: <code>{user.id}</code></p>
        <Link to="/" className="mt-8 inline-flex items-center text-sm text-primary"><ArrowLeft className="mr-1 h-4 w-4"/>Back to site</Link>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/settings", label: "Website Settings", icon: Settings },
    { to: "/admin/members", label: "Members", icon: Users },
    { to: "/admin/events", label: "Events", icon: CalendarDays },
    { to: "/admin/gallery", label: "Gallery", icon: ImgIcon },
  ] as const;

  return (
    <div className="container-prose py-10">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-20 md:self-start">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admin</p>
          <h2 className="mt-1 font-display text-2xl">Dashboard</h2>
          <nav className="mt-6 flex flex-row gap-2 overflow-x-auto md:flex-col">
            {nav.map((n) => {
              const active = path === n.to;
              return (
                <Link key={n.to} to={n.to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section><Outlet /></section>
      </div>
    </div>
  );
}
