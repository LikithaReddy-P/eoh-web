import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Echoes of Hope" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent<HTMLFormElement>, mode: "in" | "up") => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const fn = mode === "in" ? signIn : signUp;
    const { error } = await fn(email, password);
    setLoading(false);
    if (error) return toast.error(error.message);
    if (mode === "up") toast.success("Account created. You can sign in now.");
    else {
      toast.success("Welcome back!");
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="container-prose flex min-h-[80vh] items-center justify-center py-20">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link to="/" className="font-display text-2xl">Echoes of Hope</Link>
          <p className="mt-2 text-sm text-muted-foreground">Admin access</p>
        </div>
        <Tabs defaultValue="in" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="in">Sign in</TabsTrigger>
            <TabsTrigger value="up">Create account</TabsTrigger>
          </TabsList>
          <TabsContent value="in">
            <form onSubmit={(e) => handle(e, "in")} className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-8 shadow-card">
              <div>
                <Label htmlFor="lemail">Email</Label>
                <Input id="lemail" name="email" type="email" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="lpw">Password</Label>
                <Input id="lpw" name="password" type="password" required minLength={6} className="mt-2" />
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full">{loading ? "…" : "Sign in"}</Button>
            </form>
          </TabsContent>
          <TabsContent value="up">
            <form onSubmit={(e) => handle(e, "up")} className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-8 shadow-card">
              <div>
                <Label htmlFor="semail">Email</Label>
                <Input id="semail" name="email" type="email" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="spw">Password</Label>
                <Input id="spw" name="password" type="password" required minLength={6} className="mt-2" />
              </div>
              <p className="text-xs text-muted-foreground">New accounts have no admin rights until granted by an existing admin.</p>
              <Button type="submit" disabled={loading} className="w-full rounded-full">{loading ? "…" : "Create account"}</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
