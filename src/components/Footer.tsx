import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useCategories } from "@/lib/categories";

export function Footer() {
  const { data: categories = [] } = useCategories();
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Pakistan's home for serious training gear. Treadmills, racks, plates and everything in between —
            delivered and installed nationwide.
          </p>
          <div className="flex gap-2">
            <a
              href="https://facebook.com/fitnesscubewarehouse/"
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center border border-border hover:border-primary hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/fitnesscubeshop/"
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center border border-border hover:border-primary hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm tracking-widest">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" search={{ q: undefined, category: undefined, min: undefined, max: undefined, sort: "featured" }} className="hover:text-primary">
                All products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm tracking-widest">Account</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/account" className="hover:text-primary">
                My account
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-primary">
                Order history
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-primary">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm tracking-widest">Our Showrooms</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-foreground text-xs uppercase tracking-wider">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                Branch 1 (Rashid Minhas Rd)
              </div>
              <p className="text-xs text-muted-foreground pl-5">
                Shop No. A-59, Rabia Palace, Main Rashid Minhas Rd, Gulshan-e-Iqbal, Karachi
              </p>
              <a
                href="https://maps.app.goo.gl/UityzpBo5hcYmqu4A"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block pl-5 text-[11px] font-semibold text-primary hover:underline"
              >
                View on Google Maps →
              </a>
            </li>

            <li className="space-y-1 pt-1">
              <div className="flex items-center gap-1.5 font-bold text-foreground text-xs uppercase tracking-wider">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                Branch 2 (Gulshan-e-Iqbal)
              </div>
              <p className="text-xs text-muted-foreground pl-5">
                Ground Floor, Al-Rehman, Block 10-A, Gulshan-e-Iqbal, Karachi
              </p>
              <a
                href="https://g.co/kgs/iXwiLB9"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block pl-5 text-[11px] font-semibold text-primary hover:underline"
              >
                View on Google Maps →
              </a>
            </li>

            <li className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+923372486635" className="hover:text-primary text-xs font-semibold">
                0337 2486635
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:hello@fitnesscube.pk" className="hover:text-primary text-xs">
                hello@fitnesscube.pk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FitnessCube. All rights reserved.</p>
          <p>Cash on delivery · Bank transfer · Installation available</p>
        </div>
      </div>
    </footer>
  );
}
