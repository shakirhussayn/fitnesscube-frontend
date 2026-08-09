import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Truck, Plus, Pencil, Trash2, Save, X, AlertTriangle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useShippingRules, type ShippingRule } from '@/lib/shipping';
import { formatPKR } from '@/lib/format';

export const Route = createFileRoute('/admin/shipping')({ component: AdminShipping });

const SQL_HINT = `CREATE TABLE shipping_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city_pattern TEXT NOT NULL,
  rate INTEGER NOT NULL DEFAULT 1500,
  free_above INTEGER DEFAULT 25000,
  is_remote BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE shipping_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read shipping rules" ON shipping_rules FOR SELECT USING (true);
CREATE POLICY "Admins manage shipping" ON shipping_rules FOR ALL USING (true);

-- Default rules
INSERT INTO shipping_rules (city_pattern, rate, free_above, is_remote, sort_order) VALUES
  ('karachi', 0, 0, false, 1),
  ('lahore', 0, 0, false, 2),
  ('islamabad', 500, 30000, false, 3),
  ('rawalpindi', 500, 30000, false, 4),
  ('default', 1500, 25000, false, 10),
  ('remote', 2500, 50000, true, 20);`;

type Draft = Partial<ShippingRule>;

function emptyDraft(): Draft {
  return { city_pattern: '', rate: 1500, free_above: 25000, is_remote: false, sort_order: 0 };
}

function AdminShipping() {
  const { data: rules = [], isLoading, error } = useShippingRules();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Draft>(emptyDraft());
  const [saving, setSaving] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['shipping-rules'] });
  const startAdd = () => { setIsAdding(true); setEditingId(null); setForm(emptyDraft()); };
  const startEdit = (r: ShippingRule) => { setEditingId(r.id); setIsAdding(false); setForm(r); };
  const cancel = () => { setEditingId(null); setIsAdding(false); };

  const save = async () => {
    if (!form.city_pattern?.trim()) { toast.error('City pattern is required'); return; }
    setSaving(true);
    const payload: any = {
      city_pattern: form.city_pattern.trim().toLowerCase(),
      rate: Number(form.rate ?? 1500),
      free_above: Number(form.free_above ?? 0),
      is_remote: form.is_remote ?? false,
      sort_order: Number(form.sort_order ?? 0),
    };
    if (editingId) payload.id = editingId;
    const { error } = await supabase.from('shipping_rules').upsert(payload, { onConflict: 'id' });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Shipping rule saved');
    cancel();
    invalidate();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this shipping rule?')) return;
    const { error } = await supabase.from('shipping_rules').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Rule deleted');
    invalidate();
  };

  const inp = 'w-full border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-primary';

  const FormRow = ({ r }: { r: Draft }) => (
    <tr className="border-b border-border bg-muted/20">
      <td className="px-3 py-3">
        <input className={inp} placeholder="e.g. karachi" value={r.sort_order ?? 0} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} type="number" />
      </td>
      <td className="px-3 py-3">
        <input className={inp} placeholder="e.g. karachi / default / remote" value={r.city_pattern ?? ''} onChange={e => setForm(f => ({ ...f, city_pattern: e.target.value }))} autoFocus />
      </td>
      <td className="px-3 py-3">
        <input type="number" className={inp} placeholder="0 = free" value={r.rate ?? 1500} onChange={e => setForm(f => ({ ...f, rate: Number(e.target.value) }))} />
      </td>
      <td className="px-3 py-3">
        <input type="number" className={inp} placeholder="0 = always charged" value={r.free_above ?? 0} onChange={e => setForm(f => ({ ...f, free_above: Number(e.target.value) }))} />
      </td>
      <td className="px-3 py-3 text-center">
        <input type="checkbox" checked={r.is_remote ?? false} onChange={e => setForm(f => ({ ...f, is_remote: e.target.checked }))} />
      </td>
      <td className="px-3 py-3 text-right">
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
          <h1 className="text-2xl font-semibold flex items-center gap-2"><Truck className="h-6 w-6" /> Shipping Rules</h1>
          <p className="text-sm text-muted-foreground mt-1">Rules are matched against the city the customer types. First match wins. Use <code className="text-xs bg-muted px-1">default</code> for all others, <code className="text-xs bg-muted px-1">remote</code> for premium zones.</p>
        </div>
        <button onClick={startAdd} disabled={isAdding || editingId !== null} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
          <Plus className="h-4 w-4" /> Add Rule
        </button>
      </div>

      {error && (
        <div className="mb-6 border border-yellow-500 bg-yellow-500/10 p-4 text-sm text-yellow-600">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">Database table missing — run this SQL in Supabase:</p>
                <button onClick={() => setShowSql(s => !s)} className="text-xs underline">{showSql ? 'Hide' : 'Show'} SQL</button>
              </div>
              {showSql && <pre className="mt-2 text-[11px] bg-yellow-500/10 p-3 overflow-x-auto font-mono whitespace-pre">{SQL_HINT}</pre>}
              <p className="mt-2 text-yellow-600/80 text-xs">Using hardcoded defaults until table is created.</p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-border bg-card mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2 w-24">Sort</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">City / Pattern</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Rate (PKR)</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Free Above (PKR)</th>
              <th className="text-center text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Remote Zone</th>
              <th className="text-right text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && <FormRow r={form} />}
            {isLoading && <tr><td colSpan={6} className="px-3 py-10 text-center text-muted-foreground">Loading…</td></tr>}
            {!isLoading && rules.map(r => (
              editingId === r.id ? (
                <FormRow key={r.id} r={form} />
              ) : (
                <tr key={r.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                  <td className="px-3 py-3 text-muted-foreground text-xs">{r.sort_order}</td>
                  <td className="px-3 py-3">
                    <code className="px-1.5 py-0.5 bg-muted text-xs">{r.city_pattern}</code>
                    {r.is_remote && <span className="ml-2 text-[10px] bg-orange-500/15 text-orange-600 px-1.5 py-0.5 uppercase tracking-widest">Remote</span>}
                  </td>
                  <td className="px-3 py-3 font-semibold">
                    {r.rate === 0 ? <span className="text-emerald-600 font-bold">Free</span> : formatPKR(r.rate)}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {r.free_above === 0 ? 'Always charged (or always free)' : `Free above ${formatPKR(r.free_above)}`}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {r.is_remote ? <span className="text-orange-600 text-xs">✓</span> : <span className="text-muted-foreground text-xs">—</span>}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => startEdit(r)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded" title="Edit"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => del(r.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-2 border border-blue-500/30 bg-blue-500/5 px-4 py-3 text-sm text-blue-600">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <span>Customers in <strong>Karachi</strong> and <strong>Lahore</strong> get free delivery. Remote areas (AJK, Gilgit, FATA) should use the <code className="text-xs">remote</code> pattern at PKR 2,500. Any city not matched falls to the <code className="text-xs">default</code> rule.</span>
      </div>
    </div>
  );
}
