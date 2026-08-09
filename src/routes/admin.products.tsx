import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, EyeOff, Pencil, Plus, Trash2, CheckSquare, Square, Youtube, FileText, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatPKR } from "@/lib/format";
import { imageFor, imageKeys, productImagesList, type AdminProduct } from "@/lib/catalog";
import { useCategories } from "@/lib/categories";
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
  youtube_url: string;
  manual_url: string;
};

const emptyDraft: Draft = {
  slug: "",
  name: "",
  brand: "FitnessCube",
  price: "",
  old_price: "",
  category: "cardio-equipment",
  subcategory: "General",
  image_key: "treadmill",
  in_stock: true,
  is_active: true,
  tags: "",
  description: "",
  specs: "",
  sort_order: "0",
  youtube_url: "",
  manual_url: "",
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
    youtube_url: (p as any).youtubeUrl ?? "",
    manual_url: (p as any).manualUrl ?? "",
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
  const { data: categories = [] } = useCategories();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [term, setTerm] = useState("");

  // ── Bulk selection state ──────────────────────────────────────────────────
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkPrice, setBulkPrice] = useState("");
  const [bulkAction, setBulkAction] = useState<"price" | "stock-in" | "stock-out" | "activate" | "deactivate" | "delete" | null>(null);
  const [bulkSaving, setBulkSaving] = useState(false);

  const list = useMemo(() => {
    const rows = products.data ?? [];
    if (!term.trim()) return rows;
    const needle = term.trim().toLowerCase();
    return rows.filter((p) => [p.name, p.brand, p.category, p.subcategory].join(" ").toLowerCase().includes(needle));
  }, [products.data, term]);

  const allSelected = list.length > 0 && list.every((p) => selected.has(p.id));

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(list.map((p) => p.id)));
    }
  };

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    await queryClient.invalidateQueries({ queryKey: ["catalog"] });
  };

  const startNew = () => {
    setDraft(emptyDraft);
    setEditing("new");
    setSelected(new Set());
  };

  const startEdit = (p: AdminProduct) => {
    setDraft(toDraft(p));
    setEditing(p.id);
    setSelected(new Set());
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
      tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
      description: draft.description.trim(),
      specs: draft.specs.split("\n").map((s) => s.trim()).filter(Boolean),
      sort_order: Number(draft.sort_order) || 0,
      youtube_url: draft.youtube_url.trim() || null,
      manual_url: draft.manual_url.trim() || null,
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
    if (error) { toast.error(error.message); return; }
    await refresh();
  };

  // ── Bulk actions ──────────────────────────────────────────────────────────
  const executeBulk = async () => {
    if (selected.size === 0) return;
    const ids = Array.from(selected);

    if (bulkAction === "delete") {
      if (!confirm(`Delete ${ids.length} product(s)? This cannot be undone.`)) return;
    }
    if (bulkAction === "price" && (!bulkPrice || isNaN(Number(bulkPrice)))) {
      toast.error("Enter a valid price");
      return;
    }

    setBulkSaving(true);
    let error: any = null;

    if (bulkAction === "price") {
      for (const id of ids) {
        const res = await supabase.from("products").update({ price: Number(bulkPrice) }).eq("id", id);
        if (res.error) { error = res.error; break; }
      }
    } else if (bulkAction === "stock-in") {
      const res = await supabase.from("products").update({ in_stock: true }).in("id", ids);
      error = res.error;
    } else if (bulkAction === "stock-out") {
      const res = await supabase.from("products").update({ in_stock: false }).in("id", ids);
      error = res.error;
    } else if (bulkAction === "activate") {
      const res = await supabase.from("products").update({ is_active: true }).in("id", ids);
      error = res.error;
    } else if (bulkAction === "deactivate") {
      const res = await supabase.from("products").update({ is_active: false }).in("id", ids);
      error = res.error;
    } else if (bulkAction === "delete") {
      const res = await supabase.from("products").delete().in("id", ids);
      error = res.error;
    }

    setBulkSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`Done: ${ids.length} product(s) updated`);
    setSelected(new Set());
    setBulkAction(null);
    setBulkPrice("");
    await refresh();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    let loaded = 0;
    const newImages: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 800;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
            else { w = Math.round((w * maxDim) / h); h = maxDim; }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          newImages.push(compressed);
          loaded++;
          if (loaded === files.length) {
            setDraft((prev) => {
              const currentList = prev.image_key
                ? prev.image_key.split("\n").map((s) => s.trim()).filter(Boolean)
                : [];
              return { ...prev, image_key: [...currentList, ...newImages].join("\n") };
            });
            toast.success(`${newImages.length} photo(s) added!`);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const makePrimary = (index: number) => {
    const imgList = productImagesList(draft.image_key);
    if (index <= 0 || index >= imgList.length) return;
    const [selected] = imgList.splice(index, 1);
    imgList.unshift(selected);
    setDraft((prev) => ({ ...prev, image_key: imgList.join("\n") }));
    toast.success("Set as main cover photo!");
  };

  const remove = async (p: AdminProduct) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Product deleted");
    await refresh();
  };

  if (products.isLoading) return <p className="text-sm text-muted-foreground">Loading products…</p>;

  return (
    <div>
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
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

      {/* ── Bulk action bar ───────────────────────────────────────────────── */}
      {selected.size > 0 && !editing && (
        <div className="mb-4 flex flex-wrap items-center gap-3 border border-primary/40 bg-primary/5 px-4 py-3">
          <span className="text-sm font-semibold text-primary">{selected.size} selected</span>
          <button type="button" onClick={() => setSelected(new Set())} className="text-xs text-muted-foreground hover:text-foreground">
            <X className="inline h-3 w-3" /> Clear
          </button>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {bulkAction === "price" ? (
              <>
                <input
                  type="number"
                  placeholder="New price PKR"
                  value={bulkPrice}
                  onChange={(e) => setBulkPrice(e.target.value)}
                  className="h-8 w-36 border border-input bg-background px-2 text-sm outline-none focus:border-primary"
                />
                <button onClick={executeBulk} disabled={bulkSaving} className="h-8 bg-primary px-3 text-xs font-bold uppercase text-primary-foreground disabled:opacity-50">
                  {bulkSaving ? "…" : "Apply"}
                </button>
                <button onClick={() => setBulkAction(null)} className="h-8 border border-border px-3 text-xs">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => setBulkAction("price")} className="border border-border px-3 py-1.5 text-xs uppercase tracking-widest hover:border-primary">Set Price</button>
                <button onClick={() => { setBulkAction("stock-in"); setTimeout(executeBulk, 0); }} disabled={bulkSaving} className="border border-border px-3 py-1.5 text-xs uppercase tracking-widest hover:border-primary disabled:opacity-50">Mark In Stock</button>
                <button onClick={() => { setBulkAction("stock-out"); setTimeout(executeBulk, 0); }} disabled={bulkSaving} className="border border-border px-3 py-1.5 text-xs uppercase tracking-widest hover:border-primary disabled:opacity-50">Mark Out</button>
                <button onClick={() => { setBulkAction("activate"); setTimeout(executeBulk, 0); }} disabled={bulkSaving} className="border border-border px-3 py-1.5 text-xs uppercase tracking-widest hover:border-primary disabled:opacity-50">Activate</button>
                <button onClick={() => { setBulkAction("deactivate"); setTimeout(executeBulk, 0); }} disabled={bulkSaving} className="border border-border px-3 py-1.5 text-xs uppercase tracking-widest hover:border-primary disabled:opacity-50">Deactivate</button>
                <button onClick={() => { setBulkAction("delete"); setTimeout(executeBulk, 0); }} disabled={bulkSaving} className="border border-destructive/50 px-3 py-1.5 text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10 disabled:opacity-50">Delete</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Product edit form ─────────────────────────────────────────────── */}
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
            <Field label="Category (select or type new)">
              <div className="space-y-2">
                <input
                  className={inputCls}
                  value={draft.category}
                  placeholder="e.g. cardio-equipment, boxing, recovery"
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                />
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setDraft({ ...draft, category: c.slug })}
                      className={`border px-2 py-0.5 uppercase ${
                        draft.category === c.slug ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </Field>
            <Field label="Type (subcategory)">
              <input className={inputCls} value={draft.subcategory} onChange={(e) => setDraft({ ...draft, subcategory: e.target.value })} />
            </Field>
            <Field label="Product Photo(s)" wide>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    className="h-10 border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                    value={imageKeys.includes(draft.image_key) ? draft.image_key : "custom"}
                    onChange={(e) => { if (e.target.value !== "custom") setDraft({ ...draft, image_key: e.target.value }); }}
                  >
                    <option value="custom">Custom URLs / Multi-Photo Upload</option>
                    {imageKeys.map((k) => (<option key={k} value={k}>Preset: {k}</option>))}
                  </select>
                  <label className="cursor-pointer border border-border bg-secondary px-3 py-2 text-xs font-bold uppercase tracking-widest hover:border-primary">
                    Upload Photo(s)
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                  </label>
                  {draft.image_key && (
                    <button type="button" onClick={() => setDraft({ ...draft, image_key: "" })} className="border border-destructive/50 px-2 py-1 text-[10px] uppercase text-destructive hover:bg-destructive/10">
                      Clear Photos
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {productImagesList(draft.image_key).map((imgUrl, i) => (
                    <div key={i} className="group relative">
                      <img src={imgUrl} alt="Preview" className={`h-16 w-16 border-2 object-cover ${i === 0 ? "border-primary" : "border-border"}`} />
                      {i === 0 ? (
                        <span className="absolute bottom-0 left-0 right-0 bg-primary py-0.5 text-center text-[9px] font-bold uppercase text-primary-foreground">Main</span>
                      ) : (
                        <button type="button" onClick={() => makePrimary(i)} className="absolute inset-0 hidden items-center justify-center bg-black/75 p-1 text-center text-[9px] font-bold uppercase text-white group-hover:flex">
                          Set Main
                        </button>
                      )}
                    </div>
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
              <input type="number" className={inputCls} value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
            </Field>
            <Field label="Was price (optional)">
              <input type="number" className={inputCls} value={draft.old_price} onChange={(e) => setDraft({ ...draft, old_price: e.target.value })} />
            </Field>
            <Field label="Tags (featured, new, bestseller)">
              <input className={inputCls} value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
            </Field>
            <Field label="Display order">
              <input type="number" className={inputCls} value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: e.target.value })} />
            </Field>

            {/* ── Feature 5: YouTube + Manual ──────────────────────────── */}
            <Field label="YouTube Video URL (optional)">
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4 shrink-0 text-red-500" />
                <input
                  className={inputCls}
                  placeholder="https://youtube.com/watch?v=..."
                  value={draft.youtube_url}
                  onChange={(e) => setDraft({ ...draft, youtube_url: e.target.value })}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">Assembly / installation guide video shown on product page</p>
            </Field>
            <Field label="User Manual URL (optional)">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-blue-500" />
                <input
                  className={inputCls}
                  placeholder="https://drive.google.com/... (PDF link)"
                  value={draft.manual_url}
                  onChange={(e) => setDraft({ ...draft, manual_url: e.target.value })}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">PDF download button shown on product page</p>
            </Field>

            <Field label="Description" wide>
              <textarea rows={3} className={inputCls} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            </Field>
            <Field label="Specifications (one per line)" wide>
              <textarea rows={4} className={inputCls} value={draft.specs} onChange={(e) => setDraft({ ...draft, specs: e.target.value })} />
            </Field>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft.in_stock} onChange={(e) => setDraft({ ...draft, in_stock: e.target.checked })} />
              In stock
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft.is_active} onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })} />
              Visible on storefront
            </label>
            <div className="ml-auto flex gap-2">
              <button type="button" onClick={() => setEditing(null)} className="border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-widest">
                Cancel
              </button>
              <button type="button" disabled={saving} onClick={save} className="bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 disabled:opacity-50">
                {saving ? "Saving…" : "Save product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Product list ──────────────────────────────────────────────────── */}
      <div className="divide-y divide-border border border-border">
        {/* Select-all header */}
        {list.length > 0 && !editing && (
          <div className="flex items-center gap-3 bg-muted/30 px-3 py-2">
            <button type="button" onClick={toggleSelectAll} className="text-muted-foreground hover:text-foreground" aria-label="Select all">
              {allSelected ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
            </button>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {allSelected ? "Deselect all" : `Select all (${list.length})`}
            </span>
          </div>
        )}
        {list.map((p) => (
          <div key={p.id} className={`flex flex-wrap items-center gap-3 p-3 ${selected.has(p.id) ? "bg-primary/5" : ""}`}>
            {/* Checkbox */}
            {!editing && (
              <button type="button" onClick={() => toggleSelect(p.id)} className="shrink-0 text-muted-foreground hover:text-primary" aria-label="Select product">
                {selected.has(p.id) ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
              </button>
            )}
            <img src={p.image} alt="" className="h-12 w-12 shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {p.name}
                {!p.isActive && <span className="ml-2 text-xs text-muted-foreground">(hidden)</span>}
                {(p as any).youtubeUrl && <Youtube className="ml-2 inline h-3 w-3 text-red-500" title="Has video" />}
                {(p as any).manualUrl && <FileText className="ml-1 inline h-3 w-3 text-blue-500" title="Has manual" />}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {p.brand} · {p.subcategory} · {p.inStock ? "in stock" : "out of stock"}
              </p>
            </div>
            <span className="text-sm font-bold text-primary">{formatPKR(p.price)}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => toggle(p, "in_stock", !p.inStock)} className="border border-border px-2 py-1.5 text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary">
                {p.inStock ? "Mark out" : "Mark in"}
              </button>
              <button type="button" onClick={() => toggle(p, "is_active", !p.isActive)} className="grid h-8 w-8 place-items-center border border-border hover:border-primary hover:text-primary" aria-label={p.isActive ? "Hide product" : "Show product"}>
                {p.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button type="button" onClick={() => startEdit(p)} className="grid h-8 w-8 place-items-center border border-border hover:border-primary hover:text-primary" aria-label={`Edit ${p.name}`}>
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => remove(p)} className="grid h-8 w-8 place-items-center border border-border hover:border-destructive hover:text-destructive" aria-label={`Delete ${p.name}`}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="p-10 text-center text-sm text-muted-foreground">No products found.</p>
        )}
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
