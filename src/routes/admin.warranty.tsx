import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ShieldCheck, Plus, Pencil, Trash2, Save, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWarrantyRecords, type WarrantyRecord } from '@/lib/warranty';

export const Route = createFileRoute('/admin/warranty')({ component: AdminWarranty });

function getDaysLeft(expiry: string | null) {
  if (!expiry) return null;
  return Math.ceil((new Date(expiry).getTime() - Date.now()) / 86_400_000);
}

function DaysLeftBadge({ expiry, status }: { expiry: string | null; status: string }) {
  if (status === 'expired') return <span className="text-destructive font-semibold text-xs">Expired</span>;
  if (!expiry) return <span className="text-muted-foreground text-xs">—</span>;
  const days = getDaysLeft(expiry);
  if (days === null) return null;
  if (days <= 0) return <span className="text-destructive font-semibold text-xs">Expired</span>;
  if (days <= 30) return <span className="text-amber-500 font-semibold text-xs">⚠ {days}d left</span>;
  return <span className="text-emerald-600 font-semibold text-xs">{days}d left</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active:  'bg-emerald-500/15 text-emerald-600',
    claimed: 'bg-yellow-500/15 text-yellow-600',
    expired: 'bg-destructive/15 text-destructive',
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${map[status] ?? 'bg-muted text-muted-foreground'}`}>
      {status}
    </span>
  );
}

const SQL_HINT = `CREATE TABLE warranty_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  product_name TEXT NOT NULL,
  serial_number TEXT,
  purchase_date DATE NOT NULL,
  warranty_months INTEGER NOT NULL DEFAULT 12,
  warranty_expiry DATE,
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE warranty_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage warranty" ON warranty_records FOR ALL USING (true);`;

type Draft = Partial<WarrantyRecord>;

function emptyDraft(): Draft {
  return {
    customer_name: '',
    customer_phone: '',
    product_name: '',
    serial_number: '',
    order_id: '',
    purchase_date: new Date().toISOString().slice(0, 10),
    warranty_months: 12,
    status: 'active',
    notes: '',
  };
}

function AdminWarranty() {
  const { data: records = [], isLoading, error } = useWarrantyRecords();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Draft>(emptyDraft());
  const [saving, setSaving] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'warranty'] });

  const startAdd = () => { setIsAdding(true); setEditingId(null); setForm(emptyDraft()); };
  const startEdit = (r: WarrantyRecord) => { setEditingId(r.id); setIsAdding(false); setForm(r); };
  const cancel = () => { setEditingId(null); setIsAdding(false); };

  const save = async () => {
    if (!form.customer_name?.trim() || !form.product_name?.trim() || !form.purchase_date) {
      toast.error('Customer name, product name, and purchase date are required');
      return;
    }
    setSaving(true);
    const d = new Date(form.purchase_date);
    d.setMonth(d.getMonth() + (form.warranty_months ?? 12));
    const expiry = d.toISOString().slice(0, 10);

    const payload: any = {
      customer_name: form.customer_name.trim(),
      customer_phone: form.customer_phone?.trim() || null,
      product_name: form.product_name.trim(),
      serial_number: form.serial_number?.trim() || null,
      order_id: form.order_id?.trim() || null,
      purchase_date: form.purchase_date,
      warranty_months: form.warranty_months ?? 12,
      warranty_expiry: expiry,
      status: form.status ?? 'active',
      notes: form.notes?.trim() || null,
    };
    if (editingId) payload.id = editingId;

    const { error } = await supabase.from('warranty_records').upsert(payload, { onConflict: 'id' });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Warranty record saved');
    cancel();
    invalidate();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this warranty record?')) return;
    const { error } = await supabase.from('warranty_records').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Deleted');
    invalidate();
  };

  const inp = 'w-full border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-primary';
  const FormRow = ({ r }: { r: Draft }) => (
    <tr className="border-b border-border bg-muted/20">
      <td className="px-3 py-3 align-top space-y-1.5">
        <input className={inp} placeholder="Customer name *" value={r.customer_name ?? ''} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))} autoFocus />
        <input className={inp} placeholder="Phone" value={r.customer_phone ?? ''} onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))} />
      </td>
      <td className="px-3 py-3 align-top space-y-1.5">
        <input className={inp} placeholder="Product name *" value={r.product_name ?? ''} onChange={e => setForm(f => ({ ...f, product_name: e.target.value }))} />
        <input className={inp} placeholder="Order ID (optional)" value={r.order_id ?? ''} onChange={e => setForm(f => ({ ...f, order_id: e.target.value }))} />
      </td>
      <td className="px-3 py-3 align-top">
        <input className={inp} placeholder="Serial number" value={r.serial_number ?? ''} onChange={e => setForm(f => ({ ...f, serial_number: e.target.value }))} />
      </td>
      <td className="px-3 py-3 align-top space-y-1.5">
        <input type="date" className={inp} value={r.purchase_date?.slice(0, 10) ?? ''} onChange={e => setForm(f => ({ ...f, purchase_date: e.target.value }))} />
        <div className="flex items-center gap-2">
          <input type="number" min={1} max={120} className={`${inp} w-16`} value={r.warranty_months ?? 12} onChange={e => setForm(f => ({ ...f, warranty_months: Number(e.target.value) }))} />
          <span className="text-xs text-muted-foreground">months</span>
        </div>
      </td>
      <td className="px-3 py-3 align-top text-xs text-muted-foreground italic pt-4">Auto-calc</td>
      <td className="px-3 py-3 align-top">
        <select className={inp} value={r.status ?? 'active'} onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}>
          <option value="active">Active</option>
          <option value="claimed">Claimed</option>
          <option value="expired">Expired</option>
        </select>
      </td>
      <td className="px-3 py-3 align-top">
        <textarea rows={3} className={`${inp} resize-none`} placeholder="Notes…" value={r.notes ?? ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
      </td>
      <td className="px-3 py-3 align-top">
        <div className="flex justify-end gap-1 pt-1">
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
          <h1 className="text-2xl font-semibold flex items-center gap-2"><ShieldCheck className="h-6 w-6" /> Warranty &amp; Service CRM</h1>
          <p className="text-sm text-muted-foreground mt-1">Track serial numbers, purchase dates, and warranty expirations</p>
        </div>
        <button onClick={startAdd} disabled={isAdding || editingId !== null} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
          <Plus className="h-4 w-4" /> Add Record
        </button>
      </div>

      {error && (
        <div className="mb-6 border border-yellow-500 bg-yellow-500/10 p-4 text-sm text-yellow-600">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Database table missing — run this SQL in Supabase:</p>
              <pre className="mt-2 text-[11px] bg-yellow-500/10 p-3 overflow-x-auto font-mono whitespace-pre">{SQL_HINT}</pre>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Customer</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Product</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Serial No.</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Purchase / Duration</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Expiry</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Status</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Days Left / Notes</th>
              <th className="text-right text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && <FormRow r={form} />}
            {isLoading && (
              <tr><td colSpan={8} className="px-3 py-10 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!isLoading && records.length === 0 && !isAdding && (
              <tr><td colSpan={8} className="px-3 py-10 text-center text-muted-foreground">No warranty records yet. Click "Add Record" to create one.</td></tr>
            )}
            {records.map(r => (
              editingId === r.id ? (
                <FormRow key={r.id} r={form} />
              ) : (
                <tr key={r.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                  <td className="px-3 py-3">
                    <div className="font-medium">{r.customer_name}</div>
                    <div className="text-xs text-muted-foreground">{r.customer_phone ?? '—'}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div>{r.product_name}</div>
                    {r.order_id && <div className="text-xs text-muted-foreground">#{r.order_id.slice(0, 8)}</div>}
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{r.serial_number ?? '—'}</td>
                  <td className="px-3 py-3">
                    <div>{new Date(r.purchase_date).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">{r.warranty_months} months</div>
                  </td>
                  <td className="px-3 py-3 text-sm">{r.warranty_expiry ? new Date(r.warranty_expiry).toLocaleDateString() : '—'}</td>
                  <td className="px-3 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-3 py-3">
                    <DaysLeftBadge expiry={r.warranty_expiry} status={r.status} />
                    {r.notes && <div className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-[180px]">{r.notes}</div>}
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
    </div>
  );
}
