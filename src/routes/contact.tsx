import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock, ExternalLink, Navigation, Store } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Showroom Locations — FitnessCube Pakistan" },
      {
        name: "description",
        content:
          "Visit our 2 Karachi showrooms or talk to the FitnessCube team about equipment, delivery, installation or commercial gym packages anywhere in Pakistan.",
      },
      { property: "og:title", content: "Contact & Showrooms — FitnessCube" },
      {
        property: "og:description",
        content: "Visit our Karachi branches or get in touch for nationwide delivery and installation.",
      },
    ],
  }),
  component: Contact,
});

export const BRANCHES = [
  {
    id: "branch-1",
    tag: "Main Showroom",
    name: "FitnessCube — Branch 1 (Rashid Minhas Rd)",
    address:
      "Shop No. A-59, Rabia Palace, Main Rashid Minhas Road (Opposite Aladdin Park, Near Lasania Restaurant), Block 10-A, Gulshan-e-Iqbal, Karachi, 75300",
    mapsUrl: "https://maps.app.goo.gl/UityzpBo5hcYmqu4A",
    phone: "0337 2486635",
  },
  {
    id: "branch-2",
    tag: "Gulshan Branch",
    name: "FitnessCube — Branch 2 (Gulshan-e-Iqbal)",
    address:
      "Ground Floor, Al-Rehman, House No# 01, Co-Operative Housing Society, Block 10-A, Gulshan-e-Iqbal, Karachi, 75300",
    mapsUrl: "https://g.co/kgs/iXwiLB9",
    phone: "0337 2486635",
  },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", inquiry: "general", message: "" });
  const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thank you! We've received your message and will get back to you shortly.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Visit Our Showrooms or Get in Touch</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Come test our commercial & home fitness machines live at our 2 Karachi showroom locations, or reach out for
          nationwide delivery, custom gym setups, and wholesale inquiries.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        {/* Contact Form */}
        <div className="lg:col-span-6">
          <div className="border border-border bg-card p-6 md:p-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Send Us a Message</h2>
            <p className="text-xs text-muted-foreground mb-6">Our team usually replies within a few hours on business days.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Name *</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field}
                    placeholder="Your Full Name"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Phone *</span>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={field}
                    placeholder="03xx xxxxxxx"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Email *</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={field}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Inquiry Type</span>
                  <select
                    value={form.inquiry}
                    onChange={(e) => setForm({ ...form, inquiry: e.target.value })}
                    className={field}
                  >
                    <option value="general">General Inquiry / Pricing</option>
                    <option value="commercial">Gym / Commercial Wholesale</option>
                    <option value="installation">Delivery & Installation</option>
                    <option value="service">Warranty & Service Claim</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Message *</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what equipment you're looking for or your gym space dimensions..."
                  className="w-full border border-input bg-secondary/40 p-3 text-sm outline-none focus:border-primary resize-none"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-primary py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 transition-colors shadow-sm"
              >
                {sent ? "Message Sent ✓" : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Showrooms & Contact Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              Our Karachi Branches &amp; Google Maps
            </h2>

            {BRANCHES.map((b) => (
              <div key={b.id} className="border border-border bg-card p-5 transition-colors hover:border-primary/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider border border-primary/20">
                    {b.tag}
                  </span>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    Open in Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <h3 className="font-semibold text-base text-foreground mb-1.5">{b.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>{b.address}</span>
                </p>

                <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 bg-secondary px-3 py-1.5 border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Get Directions &amp; View GMB Profile
                  </a>
                  <a href={`tel:${b.phone}`} className="text-muted-foreground hover:text-primary">
                    Call: {b.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Info Grid */}
          <div className="grid gap-4 sm:grid-cols-3 border-t border-border pt-6">
            <div className="border border-border p-4 bg-card">
              <Phone className="h-4 w-4 text-primary mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone &amp; WhatsApp</h4>
              <a href="tel:+923372486635" className="mt-1 block text-sm font-semibold hover:text-primary">
                0337 2486635
              </a>
            </div>

            <div className="border border-border p-4 bg-card">
              <Mail className="h-4 w-4 text-primary mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</h4>
              <a href="mailto:hello@fitnesscube.pk" className="mt-1 block text-sm font-semibold hover:text-primary">
                hello@fitnesscube.pk
              </a>
            </div>

            <div className="border border-border p-4 bg-card">
              <Clock className="h-4 w-4 text-primary mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Showroom Hours</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Mon - Sat: 11am - 8pm<br />Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
