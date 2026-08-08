import { formatPKR } from "@/lib/format";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Sort: featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      aria-label="Sort products"
      className="h-10 border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function PriceRange({
  min,
  max,
  bound = 1000000,
  onChange,
}: {
  min?: number;
  max?: number;
  bound?: number;
  onChange: (next: { min?: number; max?: number }) => void;
}) {
  const currentMin = min ?? 0;
  const currentMax = max ?? bound;
  const isFiltering = min !== undefined || max !== undefined;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm tracking-widest">Price range</h2>
        {isFiltering && (
          <button
            type="button"
            onClick={() => onChange({ min: undefined, max: undefined })}
            className="text-[11px] text-primary hover:underline"
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={min !== undefined ? min : ""}
          min={0}
          step={5000}
          aria-label="Minimum price"
          onChange={(e) => {
            const val = e.target.value === "" ? undefined : Math.max(0, Number(e.target.value) || 0);
            onChange({ min: val, max });
          }}
          className="h-9 w-full border border-input bg-secondary/40 px-2 text-xs outline-none focus:border-primary"
        />
        <span className="text-xs text-muted-foreground">to</span>
        <input
          type="number"
          placeholder="Max (₨)"
          value={max !== undefined ? max : ""}
          min={0}
          step={5000}
          aria-label="Maximum price"
          onChange={(e) => {
            const val = e.target.value === "" ? undefined : Math.max(0, Number(e.target.value) || 0);
            onChange({ min, max: val });
          }}
          className="h-9 w-full border border-input bg-secondary/40 px-2 text-xs outline-none focus:border-primary"
        />
      </div>
      {isFiltering && (
        <p className="mt-2 text-xs text-muted-foreground">
          Showing: {formatPKR(currentMin)} — {formatPKR(currentMax)}
        </p>
      )}
    </div>
  );
}

export function sortProducts<T extends { price: number; rating: number }>(list: T[], sort: SortOption) {
  const next = list.slice();
  if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
  if (sort === "rating") next.sort((a, b) => b.rating - a.rating);
  return next;
}
