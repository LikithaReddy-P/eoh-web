import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { uploadImage } from "@/lib/upload";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/members")({ component: ManageMembers });

type Member = Tables<"members">;

function ManageMembers() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);

  const { data: members, isLoading } = useQuery({
    queryKey: ["admin-members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("members").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const photo = fd.get("photo") as File | null;
    let photo_url = editing?.photo_url ?? null;
    try {
      if (photo && photo.size > 0) photo_url = await uploadImage("members", photo);
      const payload = {
        name: String(fd.get("name")),
        position: String(fd.get("position")),
        description: String(fd.get("description") ?? ""),
        display_order: Number(fd.get("display_order") ?? 0),
        is_alumni: fd.get("is_alumni") === "on",
        photo_url,
      };
      if (editing) {
        const { error } = await supabase.from("members").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Member updated");
      } else {
        const { error } = await supabase.from("members").insert(payload);
        if (error) throw error;
        toast.success("Member added");
      }
      setOpen(false); setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin-members"] });
      qc.invalidateQueries({ queryKey: ["members"] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-members"] });
    qc.invalidateQueries({ queryKey: ["members"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Members</h1>
          <p className="mt-2 text-muted-foreground">Executive board roster.</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)} className="rounded-full"><Plus className="mr-1 h-4 w-4" />Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit member" : "Add member"}</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div><Label>Name</Label><Input name="name" required defaultValue={editing?.name} className="mt-2" /></div>
              <div><Label>Position</Label><Input name="position" required defaultValue={editing?.position} className="mt-2" /></div>
              <div><Label>Description</Label><Textarea name="description" rows={3} defaultValue={editing?.description ?? ""} className="mt-2" /></div>
              <div><Label>Display order</Label><Input name="display_order" type="number" defaultValue={editing?.display_order ?? 0} className="mt-2" /></div>
              <div><Label>Photo</Label><Input name="photo" type="file" accept="image/*" className="mt-2" />
                {editing?.photo_url && <img src={editing.photo_url} alt="" className="mt-3 h-20 w-20 rounded-full object-cover" />}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_alumni" defaultChecked={editing?.is_alumni ?? false} className="h-4 w-4 rounded border-border" />
                Mark as ex-member (alumni)
              </label>
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {(() => {
        const all = members ?? [];
        const current = all.filter((m) => !m.is_alumni);
        const alumni = all.filter((m) => m.is_alumni);
        const row = (m: Member) => (
          <div key={m.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-secondary">
              {m.photo_url ? <img src={m.photo_url} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="flex-1">
              <p className="font-medium">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.position}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { setEditing(m); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        );
        return (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Current</h2>
              {isLoading && <p className="text-muted-foreground">Loading…</p>}
              <div className="space-y-3">
                {current.map(row)}
                {!isLoading && current.length === 0 && <p className="text-sm text-muted-foreground">No current members.</p>}
              </div>
            </section>
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ex-members (Alumni)</h2>
              <div className="space-y-3">
                {alumni.map(row)}
                {!isLoading && alumni.length === 0 && <p className="text-sm text-muted-foreground">No alumni yet.</p>}
              </div>
            </section>
          </div>
        );
      })()}
    </div>
  );
}
