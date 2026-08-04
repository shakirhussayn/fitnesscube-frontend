import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Account — FitnessCube" },
      { name: "description", content: "Manage your FitnessCube profile, delivery address and contact details." },
      { property: "og:title", content: "My Account — FitnessCube" },
      { property: "og:description", content: "Manage your FitnessCube profile." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

function Account() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ full_name: "", phone: "", address: "", city: "" });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, phone, address, city")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile({
            full_name: data.full_name ?? "",
            phone: data.phone ?? "",
            address: data.address ?? "",
            city: data.city ?? "",
          });
        }
      });
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...profile, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile saved");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  if (loading || !user) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-muted-foreground">Loading…</div>;
  }

  const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">My account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Signed in as {user.email}</p>

      <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest">
        <Link to="/orders" className="border border-border px-4 py-2 hover:border-primary hover:text-primary">
          Order history
        </Link>
        <Link to="/wishlist" className="border border-border px-4 py-2 hover:border-primary hover:text-primary">
          Wishlist
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="border border-border px-4 py-2 hover:border-destructive hover:text-destructive"
        >
          Sign out
        </button>
      </div>

      <form onSubmit={save} className="mt-10 space-y-4 border border-border p-6">
        <h2 className="text-xl">Delivery details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Full name</span>
            <input
              className={field}
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
            <input
              className={field}
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">City</span>
            <input
              className={field}
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Address</span>
            <input
              className={field}
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
