import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Navigation,
  MessageSquare,
  ShieldCheck,
  Truck,
  HelpCircle,
  ChevronDown,
  Building,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Showroom Locations — FitnessCube" },
      {
        name: "description",
        content:
          "Ask us about an order, a product, or what you need to build your dream home or commercial gym! Visit our 2 Karachi showrooms or contact our support team.",
      },
      { property: "og:title", content: "Contact Us — FitnessCube" },
      {
        property: "og:description",
        content: "Visit our Karachi showrooms or get in touch for nationwide gym equipment delivery and installation.",
      },
    ],
  }),
  component: Contact,
});

export const BRANCHES = [
  {
    id: "branch-1",
    shortName: "Branch 1 — Rashid Minhas Rd",
    tag: "Main Showroom",
    name: "FitnessCube Main Showroom (Rashid Minhas Rd)",
    address:
      "Shop No. A-59, Rabia Palace, Main Rashid Minhas Road (Opposite Aladdin Park, Near Lasania Restaurant), Block 10-A, Gulshan-e-Iqbal, Karachi, 75300",
    mapsUrl: "https://maps.app.goo.gl/UityzpBo5hcYmqu4A",
    embedMapUrl:
      "https://maps.google.com/maps?q=Fitness+Cube+Shop+no+A59+rabia+palace+main+rashid+minhas+road+Gulshan+e+Iqbal+Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    phone: "0337 2486635",
    whatsapp: "https://wa.me/923372486635?text=Hi%20FitnessCube!%20I%20want%20to%20visit%20Branch%201%20(Rashid%20Minhas%20Rd).",
    hours: [
      { day: "Monday", time: "11:00am - 8:00pm" },
      { day: "Tuesday", time: "11:00am - 8:00pm" },
      { day: "Wednesday", time: "11:00am - 8:00pm" },
      { day: "Thursday", time: "11:00am - 8:00pm" },
      { day: "Friday", time: "11:00am - 8:00pm" },
      { day: "Saturday", time: "11:00am - 8:00pm" },
      { day: "Sunday", time: "CLOSED (Online Orders Active)" },
    ],
    note: "Please get in touch with our sales team prior to your visit if you would like a live demonstration of a specific commercial treadmill or multi-gym station.",
  },
  {
    id: "branch-2",
    shortName: "Branch 2 — Gulshan-e-Iqbal",
    tag: "Showroom & Warehouse",
    name: "FitnessCube Gulshan Branch (Al-Rehman)",
    address:
      "Ground Floor, Al-Rehman, House No# 01, Co-Operative Housing Society, Block 10-A, Gulshan-e-Iqbal, Karachi, 75300",
    mapsUrl: "https://g.co/kgs/iXwiLB9",
    embedMapUrl:
      "https://maps.google.com/maps?q=Fitness+Cube+al+Rehman+Block+10-A+Gulshan-e-Iqbal+Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    phone: "0337 2486635",
    whatsapp: "https://wa.me/923372486635?text=Hi%20FitnessCube!%20I%20want%20to%20visit%20Branch%202%20(Gulshan%20Branch).",
    hours: [
      { day: "Monday", time: "11:00am - 8:00pm" },
      { day: "Tuesday", time: "11:00am - 8:00pm" },
      { day: "Wednesday", time: "11:00am - 8:00pm" },
      { day: "Thursday", time: "11:00am - 8:00pm" },
      { day: "Friday", time: "11:00am - 8:00pm" },
      { day: "Saturday", time: "11:00am - 8:00pm" },
      { day: "Sunday", time: "CLOSED (Online Orders Active)" },
    ],
    note: "Direct self-collection available for dumbbells, barbells, weight plates, and accessories during open hours. Nationwide heavy courier dispatched daily.",
  },
];

const FAQS = [
  {
    q: "Do you deliver and install heavy equipment across Pakistan?",
    a: "Yes! We provide doorstep heavy courier delivery across all cities in Pakistan. For Karachi, Lahore, and Islamabad/Rawalpindi, we also offer professional on-site assembly and technician installation.",
  },
  {
    q: "Can I test treadmills and home gyms before buying?",
    a: "Absolutely. Both of our Karachi showrooms have demo units available for you to test motor power, cushioning, and build quality. You can also request a live WhatsApp video walkthrough if you are outside Karachi.",
  },
  {
    q: "What warranty comes with the machines?",
    a: "All our cardio equipment (Sole, Spirit, FitnessCube) comes with up to 1-year motor and frame warranty along with access to our dedicated service team.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept Cash on Delivery (COD) for eligible items, direct online bank transfers, and credit card payments. For large commercial gym setups, partial milestone invoicing is available.",
  },
];

function Contact() {
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    enquiryType: "",
    detail: "",
  });

  const fieldClass =
    "h-11 w-full border border-border bg-secondary/50 px-3 text-sm outline-none transition-colors focus:border-primary focus:bg-background";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thank you! Your enquiry has been submitted. Our team will contact you shortly.");
  };

  const branch = BRANCHES[selectedBranch];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      {/* Breadcrumb & Header */}
      <nav className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="px-2">/</span>
        <span>Contact Us</span>
      </nav>

      <div className="border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Contact Us</h1>
        <p className="mt-3 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          Ask us about an order, a product, or what you need to start smashing your fitness goals! Don't be shy — our
          team of fitness equipment experts is available six days a week through email, live WhatsApp chat, phone, or in
          person at our showrooms.
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div className="mt-10 grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Showroom Branch Info & Google Maps Embed */}
        <div className="lg:col-span-6 space-y-6">
          {/* Branch Switcher Tabs */}
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Select Showroom Location
            </span>
            <div className="grid grid-cols-2 gap-2 bg-secondary/40 p-1 border border-border">
              {BRANCHES.map((b, idx) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranch(idx)}
                  className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all text-center ${
                    selectedBranch === idx
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {b.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Branch Details Card */}
          <div className="border border-border bg-card p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest border border-primary/20 mb-1.5">
                  {branch.tag}
                </span>
                <h2 className="text-xl font-bold text-foreground">{branch.name}</h2>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <p className="leading-relaxed">{branch.address}</p>
            </div>

            {/* Contact quick actions */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-border/60">
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/85 transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                Get Directions
                <ExternalLink className="h-3 w-3" />
              </a>

              <a
                href={branch.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-500 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                WhatsApp Showroom
              </a>

              <a
                href={`tel:${branch.phone}`}
                className="inline-flex items-center gap-1.5 border border-border bg-secondary/60 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                Call: {branch.phone}
              </a>
            </div>

            {/* Opening Hours Schedule */}
            <div className="pt-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Showroom Operating Hours
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs bg-secondary/30 p-3.5 border border-border/50">
                {branch.hours.map((h, i) => (
                  <div key={i} className="flex justify-between py-0.5 border-b border-border/30 last:border-b-0">
                    <span className="text-muted-foreground font-medium">{h.day}:</span>
                    <span className={h.time.includes("CLOSED") ? "text-amber-500 font-bold" : "text-foreground font-semibold"}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection / Transport Note (GymAndFitness style) */}
            <div className="bg-secondary/40 border-l-2 border-primary p-3.5 text-xs text-muted-foreground leading-relaxed italic">
              *{branch.note}
            </div>

            {/* Interactive Embedded Google Map */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Interactive Map &amp; Navigation
                </span>
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  View on Google Maps <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-secondary/20">
                <iframe
                  title={`${branch.name} Map`}
                  src={branch.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Enquiry Form + Support Info */}
        <div className="lg:col-span-6 space-y-8">
          {/* Enquiry Form */}
          <div className="border border-border bg-card p-6 md:p-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-1">Send Us An Enquiry</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Fill in your details below and our team will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">First Name *</span>
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className={fieldClass}
                    placeholder="First Name"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Last Name</span>
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className={fieldClass}
                    placeholder="Last Name"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Phone Number *</span>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={fieldClass}
                    placeholder="03xx xxxxxxx"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Email Address *</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Type of Enquiry *</span>
                <select
                  required
                  value={form.enquiryType}
                  onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
                  className={fieldClass}
                >
                  <option value="">Please Select...</option>
                  <option value="product">Equipment Inquiry &amp; Best Price</option>
                  <option value="commercial">Commercial Gym Setup / Wholesale Package</option>
                  <option value="delivery">Delivery, Shipping &amp; Assembly</option>
                  <option value="warranty">Warranty &amp; Service Request</option>
                  <option value="other">General Question</option>
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Detail of Enquiry *</span>
                <textarea
                  required
                  rows={4}
                  value={form.detail}
                  onChange={(e) => setForm({ ...form, detail: e.target.value })}
                  placeholder="Provide any details such as room dimensions, machine models, or city of delivery..."
                  className="w-full border border-border bg-secondary/50 p-3 text-sm outline-none transition-colors focus:border-primary focus:bg-background resize-none"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-primary py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85 transition-colors shadow-sm"
              >
                {sent ? "Enquiry Submitted ✓" : "SUBMIT"}
              </button>
            </form>
          </div>

          {/* Phone & Live Chat Hours (GymAndFitness style) */}
          <div className="border border-border bg-card p-6 space-y-6">
            <h3 className="text-center text-base font-bold uppercase tracking-widest text-foreground pb-3 border-b border-border">
              Phone, WhatsApp and Live Support Hours (PKT)
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 text-center sm:text-left">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Sales &amp; Showroom Support</h4>
                <p className="text-sm font-semibold text-foreground">Mon – Sat: 11:00am – 8:00pm</p>
                <p className="text-xs text-muted-foreground">Sunday: Online Orders &amp; WhatsApp</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Customer Service &amp; Warranty</h4>
                <p className="text-sm font-semibold text-foreground">Mon – Sat: 11:00am – 6:00pm</p>
                <p className="text-xs text-muted-foreground">Direct technician helpline</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Helpline:</span>
                <a href="tel:+923372486635" className="font-bold text-foreground hover:text-primary">
                  0337 2486635
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Email:</span>
                <a href="mailto:hello@fitnesscube.pk" className="font-bold text-foreground hover:text-primary">
                  hello@fitnesscube.pk
                </a>
              </div>
            </div>
          </div>

          {/* "Hungry for answers?" FAQ Section (GymAndFitness style) */}
          <div className="border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                Hungry for answers? Quick FAQs
              </h3>
            </div>

            <div className="divide-y divide-border/60">
              {FAQS.map((faq, i) => (
                <div key={i} className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-2 text-left text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-primary" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed animate-in fade-in-50 duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
