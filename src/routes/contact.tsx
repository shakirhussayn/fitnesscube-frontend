import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FitnessCube — Gym Equipment Support in Pakistan" },
      {
        name: "description",
        content:
          "Talk to the FitnessCube team about equipment, delivery, installation or commercial gym packages anywhere in Pakistan.",
      },
      { property: "og:title", content: "Contact FitnessCube" },
      {
        property: "og:description",
        content: "Questions about equipment, delivery or installation? Get in touch with FitnessCube.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "h-11 w-full border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl">Get in touch</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Need help choosing a machine, arranging delivery, or kitting out a commercial gym? Our team replies within
        one working day.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Thanks! We'll be in touch shortly.");
          }}
          className="space-y-4 border border-border p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Name</span>
              <input required className={field} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
              <input required className={field} />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Email</span>
            <input required type="email" className={field} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Message</span>
            <textarea
              required
              rows={5}
              className="w-full border border-input bg-secondary/40 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
          >
            {sent ? "Message sent" : "Send message"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="flex gap-3 border border-border p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Showroom</h2>
              <p className="text-sm text-muted-foreground">
                Ground Floor, al Rehman, House No# 01, Co-Operative Housing Society, Block 10-A, Gulshan-e-Iqbal,
                Karachi 75300
              </p>
            </div>
          </div>
          <div className="flex gap-3 border border-border p-5">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Phone & WhatsApp</h2>
              <a href="tel:+923372486635" className="text-sm text-muted-foreground hover:text-primary">
                0337 2486635
              </a>
            </div>
          </div>
          <div className="flex gap-3 border border-border p-5">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Email</h2>
              <a href="mailto:hello@fitnesscube.pk" className="text-sm text-muted-foreground hover:text-primary">
                hello@fitnesscube.pk
              </a>
            </div>
          </div>
          <div className="flex gap-3 border border-border p-5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg">Hours</h2>
              <p className="text-sm text-muted-foreground">Mon-Sat 11:00 - 20:00 · Sunday closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
