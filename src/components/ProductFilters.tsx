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
  bound,
  onChange,
}: {
  min: number;
  max: number;
  bound: number;
  onChange: (next: { min: number; max: number }) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 text-sm tracking-widest">Price range</h2>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={min}
          min={0}
          step={1000}
          aria-label="Minimum price"
          onChange={(e) => onChange({ min: Math.max(0, Number(e.target.value) || 0), max })}
          className="h-9 w-full border border-input bg-secondary/40 px-2 text-sm outline-none focus:border-primary"
        />
        <span className="text-xs text-muted-foreground">to</span>
        <input
          type="number"
          value={max}
          min={0}
          step={1000}
          aria-label="Maximum price"
          onChange={(e) => onChange({ min, max: Math.max(0, Number(e.target.value) || 0) })}
          className="h-9 w-full border border-input bg-secondary/40 px-2 text-sm outline-none focus:border-primary"
        />
      </div>
      <input
        type="range"
        min={0}
        max={bound}
        step={1000}
        value={Math.min(max, bound)}
        onChange={(e) => onChange({ min, max: Number(e.target.value) })}
        className="mt-3 w-full accent-primary"
        aria-label="Maximum price slider"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        {formatPKR(min)} — {formatPKR(max)}
      </p>
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
