import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatPKR } from "@/lib/format";
import { imageFor, imageKeys, productImagesList, type AdminProduct } from "@/lib/catalog";
import { categories } from "@/data/products";
import { useAdminProducts } from "@/lib/admin";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

type Draft = {
  slug: string;
  name: string;
  brand: string;
  price: string;
  old_price: string;
  category: string;
  subcategory: string;
  image_key: string;
  in_stock: boolean;
  is_active: boolean;
  tags: string;
  description: string;
  specs: string;
  sort_order: string;
};

const emptyDraft: Draft = {
  slug: "",
  name: "",
  brand: "FitnessCube",
  price: "",
  old_price: "",
  category: categories[0]?.slug ?? "cardio-equipment",
  subcategory: "General",
  image_key: "treadmill",
  in_stock: true,
  is_active: true,
  tags: "",
  description: "",
  specs: "",
  sort_order: "0",
};

function toDraft(p: AdminProduct): Draft {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    price: String(p.price),
    old_price: p.oldPrice ? String(p.oldPrice) : "",
    category: p.category,
    subcategory: p.subcategory,
    image_key: p.imageKey,
    in_stock: p.inStock,
    is_active: p.isActive,
    tags: p.tags.join(", "),
    description: p.description,
    specs: p.specs.join("\n"),
    sort_order: String(p.sortOrder),
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function AdminProducts() {
  const products = useAdminProducts();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [term, setTerm] = useState("");

  const list = useMemo(() => {
    const rows = products.data ?? [];
    if (!term.trim()) return rows;
    const needle = term.trim().toLowerCase();
    return rows.filter((p) => [p.name, p.brand, p.category, p.subcategory].join(" ").toLowerCase().includes(needle));
  }, [products.data, term]);

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    await queryClient.invalidateQueries({ queryKey: ["catalog"] });
  };

  const startNew = () => {
    setDraft(emptyDraft);
    setEditing("new");
  };

  const startEdit = (p: AdminProduct) => {
    setDraft(toDraft(p));
    setEditing(p.id);
  };

  const save = async () => {
    if (!draft.name.trim() || !draft.price) {
      toast.error("Name and price are required");
      return;
    }
    setSaving(true);
    const payload = {
      slug: slugify(draft.slug || draft.name),
      name: draft.name.trim(),
      brand: draft.brand.trim() || "FitnessCube",
      price: Number(draft.price),
      old_price: draft.old_price ? Number(draft.old_price) : null,
      category: draft.category,
      subcategory: draft.subcategory.trim() || "General",
      image_key: draft.image_key,
      in_stock: draft.in_stock,
      is_active: draft.is_active,
      tags: draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      description: draft.description.trim(),
      specs: draft.specs
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      sort_order: Number(draft.sort_order) || 0,
    };

    const { error } =
      editing === "new"
        ? await supabase.from("products").insert(payload)
        : await supabase.from("products").update(payload).eq("id", editing!);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing === "new" ? "Product added" : "Product updated");
    setEditing(null);
    await refresh();
  };

  const toggle = async (p: AdminProduct, field: "is_active" | "in_stock", value: boolean) => {
    const patch = field === "is_active" ? { is_active: value } : { in_stock: value };
    const { error } = await supabase.from("products").update(patch).eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refresh();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    let loaded = 0;
    const newImages: string[] = [];

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 5MB limit`);
        loaded++;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          newImages.push(reader.result);
        }
        loaded++;
        if (loaded === files.length) {
          setDraft((prev) => {
            const currentList = prev.image_key
              ? prev.image_key.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean)
              : [];
            const combined = [...currentList, ...newImages].join("\n");
            return { ...prev, image_key: combined };
          });
          toast.success(`${newImages.length} photo(s) added!`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const remove = async (p: AdminProduct) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Product deleted");
    await refresh();
  };

  if (products.isLoading) return <p className="text-sm text-muted-foreground">Loading products…</p>;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="h-10 w-full max-w-xs border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={startNew}
          className="ml-auto flex items-center gap-2 bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
        >
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      {editing && (
        <div className="mb-8 border border-primary/50 bg-secondary/30 p-5">
          <h2 className="mb-4 text-xl">{editing === "new" ? "New product" : "Edit product"}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name">
              <input className={inputCls} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </Field>
            <Field label="URL slug (optional)">
              <input
                className={inputCls}
                value={draft.slug}
                placeholder={slugify(draft.name)}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              />
            </Field>
            <Field label="Brand">
              <input className={inputCls} value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} />
            </Field>
            <Field label="Category">
              <select
                className={inputCls}
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Type (subcategory)">
              <input
                className={inputCls}
                value={draft.subcategory}
                onChange={(e) => setDraft({ ...draft, subcategory: e.target.value })}
              />
            </Field>
            <Field label="Product Photo(s)" wide>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    className="h-10 border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                    value={imageKeys.includes(draft.image_key) ? draft.image_key : "custom"}
                    onChange={(e) => {
                      if (e.target.value !== "custom") {
                        setDraft({ ...draft, image_key: e.target.value });
                      }
                    }}
                  >
                    <option value="custom">Custom URLs / Multi-Photo Upload</option>
                    {imageKeys.map((k) => (
                      <option key={k} value={k}>
                        Preset: {k}
                      </option>
                    ))}
                  </select>
                  <label className="cursor-pointer border border-border bg-secondary px-3 py-2 text-xs font-bold uppercase tracking-widest hover:border-primary">
                    Upload Photo(s)
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                  </label>
                  {draft.image_key && (
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, image_key: "" })}
                      className="border border-destructive/50 px-2 py-1 text-[10px] uppercase text-destructive hover:bg-destructive/10"
                    >
                      Clear Photos
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {productImagesList(draft.image_key).map((imgUrl, i) => (
                    <img key={i} src={imgUrl} alt="Preview" className="h-12 w-12 border border-border object-cover" />
                  ))}
                </div>
                <textarea
                  rows={2}
                  className={inputCls}
                  placeholder="Paste Image URLs (one per line or separated by commas)"
                  value={draft.image_key}
                  onChange={(e) => setDraft({ ...draft, image_key: e.target.value })}
                />
              </div>
            </Field>
            <Field label="Price (PKR)">
              <input
                type="number"
                className={inputCls}
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
              />
            </Field>
            <Field label="Was price (optional)">
              <input
                type="number"
                className={inputCls}
                value={draft.old_price}
                onChange={(e) => setDraft({ ...draft, old_price: e.target.value })}
              />
            </Field>
            <Field label="Tags (featured, new, bestseller)">
              <input className={inputCls} value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
            </Field>
            <Field label="Display order">
              <input
                type="number"
                className={inputCls}
                value={draft.sort_order}
                onChange={(e) => setDraft({ ...draft, sort_order: e.target.value })}
              />
            </Field>
            <Field label="Description" wide>
              <textarea
                rows={3}
                className={inputCls}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </Field>
            <Field label="Specifications (one per line)" wide>
              <textarea
                rows={4}
                className={inputCls}
                value={draft.specs}
                onChange={(e) => setDraft({ ...draft, specs: e.target.value })}
              />
            </Field>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.in_stock}
                onChange={(e) => setDraft({ ...draft, in_stock: e.target.checked })}
              />
              In stock
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.is_active}
                onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })}
              />
              Visible on storefront
            </label>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save product"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="divide-y divide-border border border-border">
        {list.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 p-3">
            <img src={p.image} alt="" className="h-12 w-12 shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {p.name}
                {!p.isActive && <span className="ml-2 text-xs text-muted-foreground">(hidden)</span>}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {p.brand} · {p.subcategory} · {p.inStock ? "in stock" : "out of stock"}
              </p>
            </div>
            <span className="text-sm font-bold text-primary">{formatPKR(p.price)}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => toggle(p, "in_stock", !p.inStock)}
                className="border border-border px-2 py-1.5 text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary"
              >
                {p.inStock ? "Mark out" : "Mark in"}
              </button>
              <button
                type="button"
                onClick={() => toggle(p, "is_active", !p.isActive)}
                className="grid h-8 w-8 place-items-center border border-border hover:border-primary hover:text-primary"
                aria-label={p.isActive ? "Hide product" : "Show product"}
              >
                {p.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => startEdit(p)}
                className="grid h-8 w-8 place-items-center border border-border hover:border-primary hover:text-primary"
                aria-label={`Edit ${p.name}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(p)}
                className="grid h-8 w-8 place-items-center border border-border hover:border-destructive hover:text-destructive"
                aria-label={`Delete ${p.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls =
  "h-10 w-full border border-input bg-background px-3 text-sm outline-none focus:border-primary";

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`block text-xs uppercase tracking-widest text-muted-foreground ${wide ? "md:col-span-2" : ""}`}>
      {label}
      <div className="mt-1.5 normal-case tracking-normal text-foreground">{children}</div>
    </label>
  );
}
