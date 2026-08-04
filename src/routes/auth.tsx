import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";

function safeNext(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.startsWith("/") && !value.startsWith("//") ? value : undefined;
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => {
    const next = safeNext(s['next']);
    return next ? { next } : {};
  },
  head: () => ({
    meta: [
      { title: "Sign In or Create an Account — FitnessCube" },
      {
        name: "description",
        content: "Sign in to your FitnessCube account to track orders, save your wishlist and check out faster.",
      },
      { property: "og:title", content: "Sign In — FitnessCube" },
      { property: "og:description", content: "Access your FitnessCube account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch() as { next?: string };
  const next = safeNext(search.next);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "" });

  useEffect(() => {
    if (!user) return;
    if (next) {
      window.location.href = next;
      return;
    }
    navigate({ to: "/account", replace: true });
  }, [user, navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: next ? window.location.origin + next : window.location.origin,
          data: { full_name: form.full_name },
        },
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      if (!data.session) {
        toast.success("Check your email to confirm your account.");
        return;
      }
      toast.success("Welcome to FitnessCube!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Signed in");
    }
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: next ? window.location.origin + next : window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
  };

  const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl">{mode === "signin" ? "Sign in" : "Create account"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {mode === "signin"
          ? "Access your orders, wishlist and saved addresses."
          : "Save your details and track every order in one place."}
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        {mode === "signup" && (
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Full name</span>
            <input
              required
              className={field}
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </label>
        )}
        <label className="block text-sm">
          <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Email</span>
          <input
            required
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Password</span>
          <input
            required
            type="password"
            minLength={6}
            className={field}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={google}
        className="w-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
      >
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {mode === "signin" ? "New to FitnessCube?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="font-bold text-primary hover:underline"
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
