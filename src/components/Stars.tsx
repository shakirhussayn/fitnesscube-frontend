import { Star } from "lucide-react";

export function Stars({ rating, reviews }: { rating?: number; reviews?: number }) {
  const numReviews = Number(reviews) || 0;
  const numRating = Number(rating) || 0;

  if (numReviews === 0) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span className="flex text-muted-foreground/30">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-3 w-3" />
          ))}
        </span>
        <span className="text-[11px] text-muted-foreground/70">No reviews yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <span className="flex" aria-label={`Rated ${numRating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={
              i <= Math.round(numRating)
                ? "h-3.5 w-3.5 fill-accent text-accent"
                : "h-3.5 w-3.5 text-muted-foreground/40"
            }
          />
        ))}
      </span>
      <span>{numRating.toFixed(1)}</span>
      <span>({numReviews})</span>
    </div>
  );
}
