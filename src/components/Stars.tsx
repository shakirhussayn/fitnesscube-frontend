import { Star } from "lucide-react";

export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <span className="flex" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={
              i <= Math.round(rating)
                ? "h-3.5 w-3.5 fill-accent text-accent"
                : "h-3.5 w-3.5 text-muted-foreground/40"
            }
          />
        ))}
      </span>
      <span>{rating.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
    </div>
  );
}
