import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ShoppingBag, Plus, Pencil, Trash2, Save, X, Package, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAdminBundles, type ProductBundle } from '@/lib/bundles';

export const Route = createFileRoute('/admin/bundles')({ component: AdminBundles });

const SQL_HINT = `CREATE TABLE product_bundles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  main_product_slug TEXT NOT NULL,
  companion_slugs TEXT[] NOT NULL DEFAULT '{}',
  bundle_name TEXT,
  discount_pct INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE product_bundles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read bundles" ON product_bundles FOR SELECT USING (true);
CREATE POLICY "Admins manage bundles" ON product_bundles FOR ALL USING (true);`;

type Draft = {
  main_product_slug: string;
  bundle_name: string;
  companion_slugs_text: string;
  discount_pct: number;
  is_active: boolean;
};

function emptyDraft(): Draft {
  return { main_product_slug: '', bundle_name: '', companion_slugs_text: '', discount_pct: 0, is_active: true };
}

function bundleToDraft(b: ProductBundle): Draft {
  return {
    main_product_slug: b.main_product_slug,
    bundle_name: b.bundle_name ?? '',
    companion_slugs_text: b.companion_slugs.join('\n'),
    discount_pct: b.discount_pct,
    is_active: b.is_active,
  };
}

const inp = 'w-full border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-primary';

function AdminBundles() {
  const { data: bundles = [], isLoading, error } = useAdminBundles();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Draft>(emptyDraft());
  const [saving, setSaving] = useState(false);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'bundles'] });
    queryClient.invalidateQueries({ queryKey: ['bundles'] });
  };

  const startAdd = () => { setIsAdding(true); setEditingId(null); setForm(emptyDraft()); };
  const startEdit = (b: ProductBundle) => { setEditingId(b.id); setIsAdding(false); setForm(bundleToDraft(b)); };
  const cancel = () => { setEditingId(null); setIsAdding(false); };

  const save = async () => {
    if (!form.main_product_slug.trim()) { toast.error('Main product slug is required'); return; }
    setSaving(true);
    const companion_slugs = form.companion_slugs_text
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
    const payload: any = {
      main_product_slug: form.main_product_slug.trim().toLowerCase(),
      companion_slugs,
      bundle_name: form.bundle_name.trim() || null,
      discount_pct: Number(form.discount_pct ?? 0),
      is_active: form.is_active,
    };
    if (editingId) payload.id = editingId;
    const { error } = await supabase.from('product_bundles').upsert(payload, { onConflict: 'id' });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Bundle saved');
    cancel();
    invalidate();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this bundle?')) return;
    const { error } = await supabase.from('product_bundles').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Bundle deleted');
    invalidate();
  };

  const FormRow = ({ id }: { id: string | null }) => (
    <tr className={`border-b border-border ${id ? 'bg-muted/20' : 'bg-primary/5'}`}>
      <td className="px-3 py-3 align-top">
        <input className={inp} placeholder="e.g. sole-f63-treadmill *" value={form.main_product_slug} onChange={e => setForm(f => ({ ...f, main_product_slug: e.target.value }))} autoFocus />
      </td>
      <td className="px-3 py-3 align-top">
        <input className={inp} placeholder="e.g. Treadmill Starter Pack" value={form.bundle_name} onChange={e => setForm(f => ({ ...f, bundle_name: e.target.value }))} />
      </td>
      <td className="px-3 py-3 align-top">
        <textarea rows={4} className={`${inp} resize-none`} placeholder={"One slug per line:\nfloor-mat-pro\ntreadmill-lubricant\nresistance-bands"} value={form.companion_slugs_text} onChange={e => setForm(f => ({ ...f, companion_slugs_text: e.target.value }))} />
      </td>
      <td className="px-3 py-3 align-top">
        <input type="number" min={0} max={50} className={inp} value={form.discount_pct} onChange={e => setForm(f => ({ ...f, discount_pct: Number(e.target.value) }))} />
        <p className="text-[10px] text-muted-foreground mt-1">0 = no discount</p>
      </td>
      <td className="px-3 py-3 align-top text-center pt-4">
        <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} />
      </td>
      <td className="px-3 py-3 align-top text-right pt-4">
        <div className="flex justify-end gap-1">
          <button onClick={save} disabled={saving} className="p-1.5 text-emerald-600 hover:bg-emerald-500/10 rounded" title="Save"><Save className="h-4 w-4" /></button>
          <button onClick={cancel} className="p-1.5 text-muted-foreground hover:bg-muted rounded" title="Cancel"><X className="h-4 w-4" /></button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2"><ShoppingBag className="h-6 w-6" /> Bundle Tools</h1>
          <p className="text-sm text-muted-foreground mt-1">Create "Frequently Bought Together" bundles — shown on product pages to boost average order value</p>
        </div>
        <button onClick={startAdd} disabled={isAdding || editingId !== null} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
          <Plus className="h-4 w-4" /> Create Bundle
        </button>
      </div>

      {error && (
        <div className="mb-6 border border-yellow-500 bg-yellow-500/10 p-4 text-sm text-yellow-600">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Database table missing — run this SQL in Supabase first:</p>
              <pre className="mt-2 text-[11px] bg-yellow-500/10 p-3 overflow-x-auto font-mono whitespace-pre">{SQL_HINT}</pre>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Main Product Slug</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Bundle Name</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Companion Products</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Discount %</th>
              <th className="text-center text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Active</th>
              <th className="text-right text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && <FormRow id={null} />}
            {isLoading && <tr><td colSpan={6} className="px-3 py-10 text-center text-muted-foreground">Loading…</td></tr>}
            {!isLoading && bundles.length === 0 && !isAdding && (
              <tr>
                <td colSpan={6} className="px-3 py-10 text-center text-muted-foreground">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No bundles yet.</p>
                  <p className="text-xs mt-1">Example: Pair a treadmill with a floor mat and lubricant to boost average order value.</p>
                </td>
              </tr>
            )}
            {bundles.map(b => (
              editingId === b.id ? (
                <FormRow key={b.id} id={b.id} />
              ) : (
                <tr key={b.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                  <td className="px-3 py-3"><code className="text-xs bg-muted px-1.5 py-0.5">{b.main_product_slug}</code></td>
                  <td className="px-3 py-3">{b.bundle_name ?? <span className="text-muted-foreground">—</span>}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {b.companion_slugs.map(s => (
                        <span key={s} className="text-[10px] bg-muted px-1.5 py-0.5 border border-border">{s}</span>
                      ))}
                      {b.companion_slugs.length === 0 && <span className="text-muted-foreground">—</span>}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {b.discount_pct > 0
                      ? <span className="text-emerald-600 font-semibold">{b.discount_pct}%</span>
                      : <span className="text-muted-foreground">None</span>}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${b.is_active ? 'bg-emerald-500/15 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                      {b.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => startEdit(b)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded" title="Edit"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => del(b.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
