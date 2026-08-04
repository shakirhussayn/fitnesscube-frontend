import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Wrench, CreditCard } from "lucide-react";
import heroTreadmill from "@/assets/hero-treadmill.jpg";
import heroWeights from "@/assets/hero-weights.jpg";
import heroHomegym from "@/assets/hero-homegym.jpg";
import { categories } from "@/data/products";
import { useCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitnessCube — Buy Gym & Fitness Equipment Online in Pakistan" },
      {
        name: "description",
        content:
          "Shop treadmills, ellipticals, exercise bikes, benches, dumbbells and supplements at FitnessCube. Nationwide delivery and installation across Pakistan.",
      },
      { property: "og:title", content: "FitnessCube — Gym & Fitness Equipment in Pakistan" },
      {
        property: "og:description",
        content: "Treadmills, racks, plates and supplements delivered across Pakistan.",
      },
    ],
  }),
  component: Home,
});

const perks = [
  { icon: Truck, title: "Nationwide delivery", copy: "Lahore, Karachi, Islamabad and beyond" },
  { icon: Wrench, title: "Free installation", copy: "On all large cardio & strength machines" },
  { icon: ShieldCheck, title: "1 year warranty", copy: "Parts and service on every machine" },
  { icon: CreditCard, title: "Cash on delivery", copy: "Pay when your order arrives" },
];

function Home() {
  const catalog = useCatalog();
  const featured = catalog.filter((p) => p.tags.includes("featured")).slice(0, 8);
  const bestsellers = catalog.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
  const onSale = catalog.filter((p) => p.oldPrice).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={heroTreadmill}
          alt="Athlete running on a treadmill in a dark home gym"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 md:py-36">
          <p className="mb-4 inline-flex w-fit bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-primary-foreground">
            New season drop
          </p>
          <h1 className="max-w-2xl text-5xl leading-[0.95] md:text-7xl">
            Build your gym <span className="text-primary">at home</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
            Commercial-grade treadmills, racks and free weights — delivered and installed anywhere in Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              search={{ q: undefined, category: undefined, min: 0, max: 250000, sort: "featured" }}
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/category/$slug"
              params={{ slug: "cardio-equipment" }}
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
            >
              Cardio machines
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <p.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-bold uppercase tracking-wide">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl">Shop by category</h2>
          <Link
            to="/shop"
            search={{ q: undefined, category: undefined, min: 0, max: 250000, sort: "featured" }}
            className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative isolate overflow-hidden border border-border"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-xl">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-8 text-3xl md:text-4xl">Featured equipment</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="relative isolate overflow-hidden border-y border-border">
        <img
          src={heroWeights}
          alt="Rack of dumbbells and weight plates"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-20">
          <h2 className="max-w-xl text-4xl md:text-5xl">
            Up to <span className="text-primary">15% off</span> free weights
          </h2>
          <p className="max-w-md text-muted-foreground">
            Rubber hex dumbbells, Olympic plates and kettlebells — stock up while the sale lasts.
          </p>
          <Link
            to="/category/$slug"
            params={{ slug: "weight-training" }}
            className="mt-2 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
          >
            Shop weights <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Bestsellers + sale */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl md:text-4xl">Bestsellers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <h2 className="mb-8 mt-16 text-3xl md:text-4xl">On sale</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {onSale.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <img
            src={heroHomegym}
            alt="Fully equipped home gym setup"
            loading="lazy"
            className="aspect-[4/3] w-full border border-border object-cover"
          />
          <div>
            <h2 className="text-3xl md:text-4xl">Kit out your space, properly</h2>
            <p className="mt-4 text-muted-foreground">
              Whether it's a corner of the bedroom or a full commercial floor, our team helps you pick the right
              machines for your space and budget — then delivers and installs them for you.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>· Free layout consultation over WhatsApp</li>
              <li>· Commercial packages for gyms and hotels</li>
              <li>· After-sales service in all major cities</li>
            </ul>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
