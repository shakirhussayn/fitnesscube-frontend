import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, X, Phone, Heart, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/Logo";
import { categories } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useIsAdmin } from "@/lib/admin";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const cart = useCart();
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q || undefined, category: undefined, min: 0, max: 250000, sort: "featured" } });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="border-b border-border bg-secondary/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
          <p>Free delivery on orders over ₨ 25,000 across Pakistan</p>
          <a href="tel:+923372486635" className="hidden items-center gap-1.5 hover:text-foreground sm:flex">
            <Phone className="h-3 w-3" /> 0337 2486635
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <Menu className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Logo />

        <form onSubmit={submit} className="ml-auto hidden max-w-md flex-1 items-center lg:flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search treadmills, dumbbells, protein..."
            className="h-10 w-full border border-input bg-secondary/40 px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="grid h-10 w-11 place-items-center bg-primary text-primary-foreground hover:bg-primary/85"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <ThemeToggle />
          <Link
            to="/wishlist"
            className="hidden h-10 w-10 place-items-center hover:text-primary sm:grid"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden h-10 w-10 place-items-center hover:text-primary sm:grid"
              aria-label="Store admin"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          )}
          <Link
            to={user ? "/account" : "/auth"}
            className="grid h-10 w-10 place-items-center hover:text-primary"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center hover:text-primary" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cart.count > 0 && (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cart.count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="hidden border-t border-border lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 text-xs font-bold uppercase tracking-widest">
          <Link to="/" className="py-3 hover:text-primary" activeProps={{ className: "py-3 text-primary" }}>
            Home
          </Link>
          <Link
            to="/shop"
            search={{ q: undefined, category: undefined, min: 0, max: 250000, sort: "featured" }}
            className="py-3 hover:text-primary"
          >
            Shop all
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="py-3 hover:text-primary"
              activeProps={{ className: "py-3 text-primary" }}
            >
              {c.name}
            </Link>
          ))}
          <Link to="/contact" className="ml-auto py-3 hover:text-primary">
            Contact
          </Link>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border lg:hidden">
          <div className="space-y-1 px-4 py-4">
            <form onSubmit={submit} className="mb-3 flex">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products"
                className="h-10 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="grid h-10 w-11 place-items-center bg-primary text-primary-foreground"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link
              to="/shop"
              search={{ q: undefined, category: undefined, min: 0, max: 250000, sort: "featured" }}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-bold uppercase tracking-widest"
            >
              Shop all
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-bold uppercase tracking-widest"
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-bold uppercase tracking-widest"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground"
            >
              <X className="h-3 w-3" /> Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
