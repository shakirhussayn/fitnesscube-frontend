import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useCategories, CategoryRow, slugify } from '@/lib/categories';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, FolderOpen, GripVertical, Eye, EyeOff, Save, X } from 'lucide-react';

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategories,
});

function AdminCategories() {
  const { data: categories, isLoading, error } = useCategories();
  const queryClient = useQueryClient();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<CategoryRow>>({});

  const handleEdit = (category: CategoryRow) => {
    setEditingId(category.id);
    setFormData(category);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      blurb: '',
      sort_order: (categories?.length || 0) * 10,
      is_active: true,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value };
      
      if (name === 'name' && (!prev.slug || prev.slug === slugify(prev.name || ''))) {
        newData.slug = slugify(value);
      }
      return newData;
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.slug) {
        toast.error('Name and slug are required');
        return;
      }

      const categoryToSave = {
        ...formData,
        blurb: formData.blurb || null,
      };
      
      const { error } = await supabase
        .from('categories')
        .upsert(categoryToSave, { onConflict: 'slug' });

      if (error) throw error;

      toast.success('Category saved successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
      handleCancel();
    } catch (error: any) {
      toast.error(`Error saving category: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
    } catch (error: any) {
      toast.error(`Error deleting category: ${error.message}`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <FolderOpen className="h-6 w-6" />
            Categories
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage product categories</p>
        </div>
        <button
          onClick={handleAddNew}
          disabled={isAdding || editingId !== null}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {error && (
        <div className="mb-6 border border-yellow-500 bg-yellow-500/10 p-4 text-sm text-yellow-500">
          Note: Ensure the 'categories' table exists in Supabase. Currently falling back to static data.
        </div>
      )}

      <div className="border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2 w-20">Order</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Name & Slug</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2">Description</th>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground px-3 py-2 w-24">Status</th>
              <th className="text-right text-xs uppercase tracking-widest text-muted-foreground px-3 py-2 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr className="border-b border-border bg-muted/20">
                <td className="px-3 py-3" colSpan={5}>
                  <CategoryForm 
                    formData={formData} 
                    onChange={handleChange} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                  />
                </td>
              </tr>
            )}

            {isLoading && !categories?.length && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">
                  Loading categories...
                </td>
              </tr>
            )}

            {categories?.map((category) => (
              editingId === category.id ? (
                <tr key={category.id} className="border-b border-border bg-muted/20">
                  <td className="px-3 py-3" colSpan={5}>
                    <CategoryForm 
                      formData={formData} 
                      onChange={handleChange} 
                      onSave={handleSave} 
                      onCancel={handleCancel} 
                    />
                  </td>
                </tr>
              ) : (
                <tr key={category.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                  <td className="px-3 py-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <GripVertical className="h-4 w-4 opacity-30" />
                      {category.sort_order}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{category.slug}</div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    <div className="line-clamp-2">{category.blurb || '-'}</div>
                  </td>
                  <td className="px-3 py-3">
                    {category.is_active ? (
                      <span className="flex items-center gap-1 text-green-500 text-xs">
                        <Eye className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground text-xs">
                        <EyeOff className="h-3 w-3" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
            
            {!isLoading && categories?.length === 0 && !isAdding && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">
                  No categories found. Click 'Add Category' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryForm({ 
  formData, 
  onChange, 
  onSave, 
  onCancel 
}: { 
  formData: Partial<CategoryRow>; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4 p-2">
      <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
        {formData.id ? 'Edit Category' : 'New Category'}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={onChange}
            className="w-full border border-border bg-background px-3 py-2 text-sm"
            placeholder="e.g. Strength Training"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug || ''}
            onChange={onChange}
            className="w-full border border-border bg-background px-3 py-2 text-sm font-mono"
            placeholder="e.g. strength-training"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Description (Blurb)</label>
        <textarea
          name="blurb"
          value={formData.blurb || ''}
          onChange={onChange}
          rows={2}
          className="w-full border border-border bg-background px-3 py-2 text-sm resize-none"
          placeholder="Brief description for category card..."
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="w-32">
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Sort Order</label>
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order || 0}
            onChange={onChange}
            className="w-full border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 mt-5">
          <input
            type="checkbox"
            name="is_active"
            id="is_active"
            checked={formData.is_active !== false}
            onChange={onChange}
            className="w-4 h-4 rounded border-border"
          />
          <label htmlFor="is_active" className="text-sm">Active (visible in store)</label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="flex items-center gap-1 border border-border px-3 py-1.5 text-sm hover:bg-muted/50"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:bg-primary/90"
        >
          <Save className="h-4 w-4" /> Save
        </button>
      </div>
    </div>
  );
}
