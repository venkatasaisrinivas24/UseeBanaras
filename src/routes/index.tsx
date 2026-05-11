import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import heroImg from "@/assets/hero-saree.jpg";
import artisanImg from "@/assets/artisan-weaving.jpg";
import bridalImg from "@/assets/bridal-collection.jpg";
import festiveImg from "@/assets/festive-collection.jpg";
import limitedImg from "@/assets/limited-edition.jpg";
import saleImg from "@/assets/festive-sale.jpg";
import {
  MessageCircle, Video, Globe, Crown, Sparkles, Heart,
  Truck, ShieldCheck, Gift, Star, ChevronRight, Menu, ShoppingBag,
  Scissors, Award, MapPin,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Usee Banaras — Royal Handwoven Banarasi Silk Sarees" },
      {
        name: "description",
        content:
          "Step into the royal world of Usee Banaras. Handwoven silk sarees, pure zari craftsmanship, bridal & festive collections from the looms of Banaras.",
      },
      { property: "og:title", content: "Usee Banaras — Royal Handwoven Banarasi Silk Sarees" },
      { property: "og:description", content: "Pure silk. Hand-spun zari. Timeless heritage." },
    ],
  }),
  component: Home,
});

/* ---------- Reusable bits ---------- */

function Ornament({ label }: { label?: string }) {
  return (
    <div className="ornament-divider my-6">
      {label ? (
        <span className="font-display text-xs tracking-[0.4em] text-[color:var(--gold)] uppercase">
          {label}
        </span>
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-xs tracking-[0.45em] text-[color:var(--gold)] uppercase mb-4">
      {children}
    </p>
  );
}

function GoldButton({
  children, variant = "solid", className = "",
}: { children: React.ReactNode; variant?: "solid" | "outline"; className?: string }) {
  const base =
    "group inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-[0.25em] uppercase font-medium transition-all duration-500 rounded-sm";
  if (variant === "outline") {
    return (
      <button className={`${base} gold-border text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[color:var(--maroon-deep)] ${className}`}>
        {children}
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    );
  }
  return (
    <button className={`${base} bg-gradient-gold text-[color:var(--maroon-deep)] shadow-gold hover:shadow-royal ${className}`}>
      {children}
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

/* ---------- Scroll reveal ---------- */

function Reveal({
  children, as: Tag = "div", direction = "up", delay = 0, className = "",
}: {
  children: React.ReactNode;
  as?: any;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in-view");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const dir = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "";
  return (
    <Tag
      ref={ref}
      className={`reveal ${dir} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Embedded mini hotline ---------- */

function SectionHotline({
  icon: Icon, label, value, tag, dark = false,
}: {
  icon: any; label: string; value: string; tag: string; dark?: boolean;
}) {
  return (
    <Reveal>
      <div className="mt-14 flex justify-center">
        <div className="hotline-strip max-w-xl w-full">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Icon className="h-4 w-4 text-[color:var(--maroon-deep)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-serif text-base ${dark ? "text-[color:var(--ivory)]" : "text-[color:var(--maroon-deep)]"}`}>{label}</span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[color:var(--gold)] border border-[color:var(--gold)]/40 px-2 py-0.5 rounded-sm">{tag}</span>
            </div>
            <div className={`font-mono text-xs tracking-wider mt-1 ${dark ? "text-[color:var(--gold-soft)]" : "text-[color:var(--maroon)]"}`}>{value}</div>
          </div>
          <a href={`tel:${value.replace(/\s/g, "")}`} className="hidden sm:inline-flex items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold)] hover:translate-x-1 transition-transform">
            Call <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- Navigation ---------- */

function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between text-[color:var(--ivory)]">
        <div className="flex items-center gap-3">
          <Crown className="h-6 w-6 text-[color:var(--gold)]" />
          <div className="leading-tight">
            <div className="font-display text-lg tracking-[0.3em]">USEE</div>
            <div className="font-serif italic text-xs tracking-[0.4em] text-[color:var(--gold-soft)]">banaras</div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-10 text-[11px] tracking-[0.35em] uppercase">
          {["Collections","Bridal","Festive","Heritage","Atelier","Contact"].map(i => (
            <a key={i} href={`#${i.toLowerCase()}`} className="relative hover:text-[color:var(--gold)] transition-colors">
              {i}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Cart" className="hidden md:flex h-10 w-10 items-center justify-center rounded-full gold-border hover:bg-[color:var(--gold)]/10 transition">
            <ShoppingBag className="h-4 w-4 text-[color:var(--gold)]" />
          </button>
          <button aria-label="Menu" className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full gold-border">
            <Menu className="h-4 w-4 text-[color:var(--gold)]" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const particles = Array.from({ length: 18 });
  return (
    <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-[color:var(--maroon-deep)]">
      <img
        src={heroImg}
        alt="Bride in royal maroon and gold Banarasi silk saree by the Ganga"
        className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        width={1920} height={1080}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* glowing particles */}
      {particles.map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${5 + Math.random() * 6}s`,
          }}
        />
      ))}

      <Nav />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-4xl">
        <div className="animate-fade-up">
          <SectionLabel>Est. in the lanes of Banaras</SectionLabel>
          <h1 className="font-serif text-[color:var(--ivory)] text-5xl md:text-7xl lg:text-8xl leading-[1.02] font-light">
            Where every <em className="shimmer-gold not-italic font-medium">thread</em><br/>
            tells a <em className="font-serif italic text-[color:var(--gold-soft)]">royal story.</em>
          </h1>
          <p className="mt-8 max-w-xl text-[color:var(--champagne)]/90 text-base md:text-lg leading-relaxed font-light">
            Handwoven silk. Hand-spun zari. A legacy of master artisans bringing
            the soul of Banaras to your wardrobe — one timeless saree at a time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <GoldButton>Explore Collection</GoldButton>
            <GoldButton variant="outline">Book Consultation</GoldButton>
          </div>
        </div>
      </div>

      {/* bottom sale ribbon */}
      <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-royal/95 backdrop-blur border-t border-[color:var(--gold)]/30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-[11px] tracking-[0.35em] uppercase text-[color:var(--gold-soft)]">
          <span className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-[color:var(--gold)]" /> Exclusive Royal Sale Now Live</span>
          <span className="hidden md:flex items-center gap-2"><Heart className="h-3 w-3 text-[color:var(--gold)]" /> Limited Time Bridal Offers</span>
          <span className="hidden lg:flex items-center gap-2"><Crown className="h-3 w-3 text-[color:var(--gold)]" /> Luxury Assistance 24/7</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Legacy ---------- */

function Legacy() {
  return (
    <section id="heritage" className="relative py-28 lg:py-40 mandala-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left">
          <SectionLabel>The Legacy</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-[color:var(--maroon-deep)]">
            The legacy of <span className="italic text-gradient-gold">Usee Banaras</span>
          </h2>
          <Ornament />
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            For over four generations, our looms in the heart of Banaras have whispered
            stories of emperors and brides, temples and rivers. Each Usee Banaras saree
            is a quiet rebellion against the ordinary — a celebration of patience,
            heritage, and the divine artistry of the human hand.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { n: "120+", l: "Master Artisans" },
              { n: "75 Yrs", l: "Of Heritage" },
              { n: "40+", l: "Countries" },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="font-serif text-3xl md:text-4xl text-[color:var(--maroon)]">{s.n}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal direction="right" className="relative">
          <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-2xl rounded-full" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-royal gold-border">
            <img src={artisanImg} alt="Master artisan handweaving zari" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-8 -left-8 silk-card px-6 py-5 shadow-gold max-w-[240px] hidden md:block">
            <Award className="h-6 w-6 text-[color:var(--gold)] mb-2" />
            <p className="font-serif italic text-[color:var(--maroon-deep)]">"Crafted in 90 days. Worn for generations."</p>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHotline icon={Crown} label="Luxury Sales Hotline" value="+91 98765 11000" tag="24 / 7" />
      </div>
    </section>
  );
}

/* ---------- Collections ---------- */

const collections = [
  { id: "bridal", title: "Royal Bridal", subtitle: "Heirlooms for sacred vows", img: bridalImg, price: "From ₹85,000" },
  { id: "festive", title: "Festive Elegance", subtitle: "Celebrate in silk & gold", img: festiveImg, price: "From ₹42,000" },
  { id: "limited", title: "Limited Edition", subtitle: "Only twelve in the world", img: limitedImg, price: "From ₹1,20,000" },
  { id: "sale", title: "Grand Banaras Sale", subtitle: "Royal heritage, reimagined", img: saleImg, price: "Up to 30% off" },
];

function Collections() {
  return (
    <section id="collections" className="relative py-28 lg:py-40 bg-gradient-silk">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-20">
          <SectionLabel>Signature Collections</SectionLabel>
          <h2 className="font-serif text-4xl md:text-6xl text-[color:var(--maroon-deep)]">
            A wardrobe of <span className="italic text-gradient-gold">heirlooms</span>
          </h2>
          <Ornament />
          <p className="text-muted-foreground text-lg font-light">
            Each piece is a season in itself — woven slowly, lived deeply.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collections.map((c, i) => (
            <Reveal key={c.id} as="article" delay={i * 120} className="group relative overflow-hidden rounded-sm silk-card hover-lift">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--maroon-deep)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-[color:var(--ivory)]">
                <p className="font-display text-[10px] tracking-[0.4em] text-[color:var(--gold)] uppercase">{`No. 0${i+1}`}</p>
                <h3 className="font-serif text-2xl mt-2">{c.title}</h3>
                <p className="text-sm text-[color:var(--champagne)]/90 italic mt-1">{c.subtitle}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[color:var(--gold)]/30 pt-3">
                  <span className="text-xs tracking-widest">{c.price}</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <SectionHotline icon={Heart} label="Bridal Booking" value="+91 98765 22000" tag="By Appointment" />
      </div>
    </section>
  );
}

/* ---------- Craftsmanship ---------- */

const craftSteps = [
  { icon: Scissors, title: "Pure Mulberry Silk", text: "Sourced from the looms of Banaras, every thread is tested for the silk-mark certification." },
  { icon: Sparkles, title: "Hand-spun Zari", text: "Real gold and silver wires twisted around silk yarn — the soul of every Banarasi weave." },
  { icon: Crown, title: "Royal Motifs", text: "Mughal florals, paisleys, jhallar borders — drawn from temple frescoes & palace archives." },
  { icon: Award, title: "Master Signature", text: "Each saree carries the woven mark of its master karigar — your private heirloom." },
];

function Craftsmanship() {
  return (
    <section id="atelier" className="relative py-28 lg:py-40 bg-[color:var(--onyx)] text-[color:var(--ivory)] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={artisanImg} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--onyx)] via-[color:var(--onyx)]/85 to-[color:var(--onyx)]/40" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Handwoven by Master Artisans</SectionLabel>
          <h2 className="font-serif text-4xl md:text-6xl">
            Pure silk. <span className="italic text-gradient-gold">Pure devotion.</span>
          </h2>
          <Ornament />
          <p className="text-[color:var(--champagne)]/80 text-lg font-light">
            Sixteen weeks. Two artisans. Forty-thousand threads. One saree that
            will outlive trends — and us.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {craftSteps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120} className="relative p-8 rounded-sm border border-[color:var(--gold)]/25 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-500">
              <div className="font-display text-[10px] tracking-[0.4em] text-[color:var(--gold)]/70">{`0${i+1}`}</div>
              <Icon className="h-7 w-7 text-[color:var(--gold)] mt-4" />
              <h3 className="font-serif text-2xl mt-4">{title}</h3>
              <p className="text-sm text-[color:var(--champagne)]/70 mt-3 leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
        <SectionHotline dark icon={Video} label="Video Consultation" value="Book a slot" tag="Live Drape" />
      </div>
    </section>
  );
}

/* Hotlines & Gallery removed — replaced by inline SectionHotline strips in each section */

/* ---------- Testimonials ---------- */

const testimonials = [
  { q: "My Usee Banaras saree felt like wearing a poem. Forty years from now, my daughter will wear it.", n: "Aishwarya R.", c: "Hyderabad" },
  { q: "The video consultation was unreal — they draped a saree just for me.", n: "Priya D.", c: "Hyderabad" },
  { q: "Real zari. Real artisans. Real soul. This isn't fashion, it's heritage.", n: "Meera K.", c: "Hyderabad" },
];

function Testimonials() {
  return (
    <section className="py-28 lg:py-40 bg-gradient-silk">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Customer Love</SectionLabel>
          <h2 className="font-serif text-4xl md:text-6xl text-[color:var(--maroon-deep)]">
            Whispers from our <span className="italic text-gradient-gold">patrons</span>
          </h2>
          <Ornament />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.n} as="figure" delay={i * 150} className="silk-card p-8 rounded-sm shadow-soft hover-lift">
              <div className="flex gap-1 text-[color:var(--gold)] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="font-serif italic text-lg text-[color:var(--maroon-deep)] leading-relaxed">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-[color:var(--gold)]/30">
                <div className="font-serif text-[color:var(--maroon)]">{t.n}</div>
                <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-1">{t.c}</div>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <SectionHotline icon={Star} label="VIP Assistance" value="+91 98765 44000" tag="Members Only" />
      </div>
    </section>
  );
}

/* ---------- Shopping experience ---------- */

const benefits = [
  { icon: Truck, t: "International Shipping", d: "Hand-delivered to 40+ countries in silk-lined heirloom boxes." },
  { icon: Gift, t: "Premium Packaging", d: "Wrapped in muslin, sealed with a hand-stamped wax monogram." },
  { icon: ShieldCheck, t: "Lifetime Authenticity", d: "Every saree carries a silk-mark & artisan signature certificate." },
  { icon: Video, t: "Personal Consultation", d: "Live video drape sessions with our master stylists." },
];

function Experience() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>The Luxury Experience</SectionLabel>
          <h2 className="font-serif text-4xl md:text-6xl text-[color:var(--maroon-deep)]">
            Royal shopping, <span className="italic text-gradient-gold">redefined</span>
          </h2>
          <Ornament />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 120} className="text-center p-8 rounded-sm silk-card hover-lift">
              <div className="mx-auto h-14 w-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold mb-5">
                <Icon className="h-6 w-6 text-[color:var(--maroon-deep)]" />
              </div>
              <h3 className="font-serif text-xl text-[color:var(--maroon-deep)]">{t}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{d}</p>
            </Reveal>
          ))}
        </div>
        <SectionHotline icon={MessageCircle} label="WhatsApp Shopping" value="+91 98765 55000" tag="Chat Now" />
        <SectionHotline icon={Globe} label="International Support" value="+1 (212) 555 0199" tag="EN / FR / AR" />
      </div>
    </section>
  );
}

/* ---------- Sale CTA ---------- */

function SaleCTA() {
  return (
    <section className="relative py-28 lg:py-32 bg-[color:var(--maroon-deep)] text-[color:var(--ivory)] overflow-hidden">
      <div className="absolute inset-0">
        <img src={saleImg} alt="" className="h-full w-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--maroon-deep)] via-[color:var(--maroon-deep)]/80 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel>Grand Banaras Festival Sale</SectionLabel>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Reserve your <span className="italic text-gradient-gold">designer Banarasi</span> today
          </h2>
          <Ornament />
          <p className="text-[color:var(--champagne)]/80 text-lg font-light max-w-lg">
            Limited bridal pieces. Personal consultation included. Royal sale
            ends with the festival of lights.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <GoldButton>Shop The Sale</GoldButton>
            <GoldButton variant="outline">Talk To A Stylist</GoldButton>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["72", "12", "08"].map((n, i) => (
            <div key={i} className="aspect-square flex flex-col items-center justify-center gold-border rounded-sm bg-[color:var(--onyx)]/40 backdrop-blur">
              <div className="font-serif text-5xl md:text-6xl text-gradient-gold">{n}</div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--gold-soft)] mt-2">{["Hours","Mins","Secs"][i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHotline dark icon={Gift} label="Festive Sale Support" value="+91 98765 33000" tag="Live Now" />
        <SectionHotline dark icon={Truck} label="Bulk Wedding Orders" value="+91 98765 66000" tag="Dedicated Concierge" />
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-[color:var(--onyx)] text-[color:var(--champagne)]/80 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-[color:var(--gold)]/20">
          <div>
            <div className="flex items-center gap-3 text-[color:var(--ivory)]">
              <Crown className="h-6 w-6 text-[color:var(--gold)]" />
              <div className="leading-tight">
                <div className="font-display text-lg tracking-[0.3em]">USEE</div>
                <div className="font-serif italic text-xs tracking-[0.4em] text-[color:var(--gold-soft)]">banaras</div>
              </div>
            </div>
            <p className="text-sm mt-5 font-light leading-relaxed">
              Heritage handwoven Banarasi silk sarees, crafted slowly in the
              lanes of Varanasi.
            </p>
          </div>
          {[
            { h: "Atelier", l: ["Bridal", "Festive", "Limited Edition", "Sale"] },
            { h: "Experience", l: ["Consultation", "Video Drape", "Shipping", "Care Guide"] },
          { h: "Visit", l: ["Hyderabad Flagship", "Hyderabad Boutique", "Hyderabad Atelier", "Book Appointment"] },
          ].map(c => (
            <div key={c.h}>
              <h4 className="font-display tracking-[0.35em] text-xs uppercase text-[color:var(--gold)]">{c.h}</h4>
              <ul className="mt-5 space-y-3 text-sm font-light">
                {c.l.map(i => <li key={i}><a href="#" className="hover:text-[color:var(--gold)] transition-colors">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-xs tracking-[0.25em] uppercase">
        <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-[color:var(--gold)]" /> Hyderabad</span>
          <span>© {new Date().getFullYear()} Usee Banaras · Woven with devotion.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function Home() {
  return (
    <main>
      <Hero />
      <Legacy />
      <Collections />
      <Craftsmanship />
      <Testimonials />
      <Experience />
      <SaleCTA />
      <Footer />
    </main>
  );
}
