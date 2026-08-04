import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/fitnesscube-logo-trimmed.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center rounded-sm bg-foreground/95 px-2 py-1 dark:bg-transparent dark:px-0 dark:py-0 ${className}`} aria-label="FitnessCube home">
      <img
        src={logoUrl}
        alt="FitnessCube — complete exercise & gym solutions"
        width={777}
        height={219}
        className="h-9 w-auto object-contain sm:h-11"
      />
    </Link>
  );
}
