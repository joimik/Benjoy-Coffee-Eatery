import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Clock, Wifi, Plug, Sun, Star, Instagram, Phone, CreditCard, Smartphone, Coffee, ExternalLink, ChevronRight, Leaf, ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, animate } from 'motion/react';

const IG_URL = 'https://www.instagram.com/benjoy.coffeeatery?igsh=MTg5N2ZvendiMzcxNQ==';
const WA_URL = 'https://wa.me/6282118952552';

function AnimatedCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { duration: 1200, bounce: 0 });

  useEffect(() => {
    if (inView) animate(count, target, { duration: 1.2 });
  }, [inView, count, target]);

  useEffect(() => {
    return rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
    });
  }, [rounded, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

function useIsOpen() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const h = now.getHours() * 60 + now.getMinutes();
      setIsOpen(h >= 11 * 60 && h < 22 * 60);
    };
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);
  return isOpen;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState<'Coffee' | 'Non Coffee' | 'Meal' | 'Light Meal'>('Coffee');
  const isOpen = useIsOpen();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'The Vibe', href: '#vibe' },
    { label: 'Delivery', href: '#delivery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent selection:text-white">

      {/* Promo banner */}
      <div className="bg-accent text-white text-xs font-semibold text-center py-2 px-4 tracking-wide z-50 relative">
        ☕ Free Wi-Fi &nbsp;·&nbsp; Open 11:00–22:00 &nbsp;·&nbsp; Jl. Cibaduyut No.80, Bojongloa Kidul, Bandung
        <span className={`ml-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isOpen ? 'bg-green-400/30 text-green-100' : 'bg-red-400/30 text-red-100'}`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOpen ? 'bg-green-300' : 'bg-red-300'}`} />
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-sm py-4'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/images/logo.jpg"
              alt="Benjoy Coffee & Eatery"
              className="w-10 h-10 rounded-full object-cover shrink-0 transition-transform group-hover:scale-105"
            />
            <span
              className={`font-semibold text-lg tracking-tight transition-colors ${
                scrolled ? 'text-ink' : 'text-white'
              }`}
            >
              Benjoy Coffee &amp; Eatery
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  scrolled ? 'text-ink-muted' : 'text-white/85'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#delivery"
              className="bg-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-deep transition-colors shadow-sm"
            >
              Order Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 -mr-2 rounded-lg ${scrolled ? 'text-ink' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-1 px-6 pt-28 text-2xl font-serif">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="py-3 text-ink hover:text-accent transition-colors border-b border-surface"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#delivery"
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 bg-accent text-white px-6 py-4 rounded-full text-center font-semibold text-lg hover:bg-accent-deep transition-colors"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with gradient */}
        <div className="absolute inset-0">
          <img
            src="/images/vibe-outdoor.jpg"
            alt="Benjoy Coffee & Eatery cafe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-accent-deep/70 via-accent-deep/50 to-accent-deep/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Floating brand badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5 animate-bob"
          >
            ☕ Est. in Bandung
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-white/70 text-sm font-semibold uppercase tracking-[0.2em] mb-6"
          >
            Caf&#233; in Regol, Bandung
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-[4.5rem] font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight"
          >
            Your cozy corner for coffee&nbsp;&&nbsp;creativity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Crafted drinks, student-friendly prices, and a space that feels like home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#menu"
              className="bg-white text-accent-deep px-7 py-3.5 rounded-full font-semibold hover:bg-surface transition-colors w-full sm:w-auto shadow-lg"
            >
              View Menu
            </a>
            <a
              href="#delivery"
              className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-7 py-3.5 rounded-full font-semibold hover:bg-white/25 transition-colors w-full sm:w-auto shadow-lg"
            >
              Order Delivery
            </a>
          </motion.div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="relative z-20 -mt-14 mx-4 md:mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location */}
            <a href="https://www.google.com/maps/search/Benjoy+Coffee+Eatery+Jl+Cibaduyut+Bandung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-ink-muted font-semibold uppercase tracking-wider mb-0.5">Location</p>
                <p className="font-medium text-ink text-sm group-hover:text-accent transition-colors">Jl. Cibaduyut No.80, Bojongloa Kidul</p>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 bg-warm/20 rounded-xl flex items-center justify-center text-warm shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-ink-muted font-semibold uppercase tracking-wider mb-0.5">Hours</p>
                <p className="font-medium text-ink text-sm">Open daily, until 22:00</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-5 md:justify-center">
              <div className="flex items-center gap-2 text-ink-muted shrink-0">
                <Wifi size={18} className="text-accent" />
                <span className="text-xs font-semibold">Free Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted shrink-0">
                <Plug size={18} className="text-accent" />
                <span className="text-xs font-semibold">Outlets</span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted shrink-0">
                <Sun size={18} className="text-warm" />
                <span className="text-xs font-semibold">Outdoor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Benjoy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Kenapa Harus Kesini?</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3 mb-4">Why Benjoy?</h2>
            <div className="section-divider mx-auto mb-5" />
            <p className="text-ink-muted max-w-xl mx-auto leading-relaxed">
              Bukan sekadar kafe — Benjoy adalah tempat di mana kamu bisa kerja, santai, dan nongkrong tanpa khawatir.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '☕', title: 'Minuman yang Enak', desc: 'Dari kopi signature Eskosu hingga Alpukat Kocok — semua diracik dengan cinta buat kamu.' },
              { emoji: '💸', title: 'Harga Ramah Pelajar', desc: 'Mulai dari Rp 7.000 — kamu bisa duduk lama, pesan banyak, tanpa khawatir kantong bolong.' },
              { emoji: '📶', title: 'WiFi Gratis & Colokan', desc: 'Koneksi cepat dan banyak stop kontak. Cocok buat kerja, kuliah online, atau meeting virtual.' },
              { emoji: '🍛', title: 'Menu Makanan Lengkap', desc: 'Ada Ricebowl, Nasi Goreng, Indomie, hingga snack ringan. Lapar? Tenang, kami siap.' },
              { emoji: '📸', title: 'Aesthetic & Instagrammable', desc: 'Setiap sudut Benjoy photogenic. Temukan spot favorit kamu dan abadikan momennya.' },
              { emoji: '🎉', title: 'Bisa Nobar & Nongkrong', desc: 'Ada fasilitas nobar! Ajak teman-teman, pesan banyak, dan nikmati waktu bersama.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-surface rounded-2xl p-6 hover:shadow-md transition-shadow border border-border group"
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="font-serif font-bold text-ink text-lg mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-10 bg-cream border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">☕</span>
              <span className="text-xl font-bold font-serif text-ink"><AnimatedCounter target={30} suffix="+" /></span>
              <span className="text-xs text-ink-muted font-semibold uppercase tracking-wider">Drinks</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">⭐</span>
              <span className="text-xl font-bold font-serif text-ink"><AnimatedCounter target={4.8} suffix="" decimals={1} /></span>
              <span className="text-xs text-ink-muted font-semibold uppercase tracking-wider">Rating</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🕗</span>
              <span className="text-xl font-bold font-serif text-ink">11:00 — 22:00</span>
              <span className="text-xs text-ink-muted font-semibold uppercase tracking-wider">Open Daily</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🎓</span>
              <span className="text-xl font-bold font-serif text-ink"><AnimatedCounter target={100} suffix="%" /></span>
              <span className="text-xs text-ink-muted font-semibold uppercase tracking-wider">Student-Friendly</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu */}
      <section id="menu" className="py-28 md:py-32 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3 mb-4">Our Menu</h2>
            <div className="section-divider mx-auto mb-5" />
            <p className="text-ink-muted max-w-xl mx-auto leading-relaxed">
              Crafted with care, priced for students. Premium coffee, refreshing drinks, and delicious bites.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border shadow-xs">
              <Coffee size={16} className="text-warm" />
              <span className="text-sm text-ink-muted">Price Range</span>
              <span className="font-bold text-ink">Rp 7k — 29k</span>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {(['Coffee', 'Non Coffee', 'Meal', 'Light Meal'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMenuTab(tab)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeMenuTab === tab
                    ? 'bg-accent text-white shadow-md scale-105'
                    : 'bg-white text-ink-muted border border-border hover:border-accent hover:text-accent'
                }`}
              >
                {tab === 'Coffee' && '☕ '}
                {tab === 'Non Coffee' && '🧃 '}
                {tab === 'Meal' && '🍛 '}
                {tab === 'Light Meal' && '🍟 '}
                {tab}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 justify-center mb-10 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5"><Star size={12} className="text-yellow-400 fill-yellow-400" /> Best Seller</span>
            <span className="flex items-center gap-1.5">👍 Recommended</span>
            <span className="flex items-center gap-1.5"><span className="font-bold text-ink bg-white border border-border px-1.5 py-0.5 rounded text-[10px]">H</span> Hot &nbsp;/&nbsp; <span className="font-bold text-ink bg-white border border-border px-1.5 py-0.5 rounded text-[10px]">C</span> Cold</span>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">

            {/* ── COFFEE ── */}
            {activeMenuTab === 'Coffee' && (
              <motion.div key="coffee" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {/* Photo banner */}
                <div className="mb-10 rounded-2xl overflow-hidden shadow-lg relative group max-w-2xl mx-auto">
                  <img
                    src="/images/menu/coffee-drinks.jpg"
                    alt="Benjoy signature coffee drinks"
                    className="w-full h-60 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="text-white font-serif text-xl font-bold drop-shadow">☕ Signature Coffees</span>
                    <p className="text-white/80 text-xs mt-1">Espresso-based · From Rp 20k</p>
                  </div>
                </div>
                <div className="max-w-xl mx-auto">
                  <SectionBadge icon={<Coffee size={20} />} label="Coffee" color="accent" />
                  <p className="text-xs text-ink-muted italic mb-4 mt-1">Espresso-based drinks crafted to perfection</p>
                  <div className="divide-y divide-border">
                    <MenuRow name="Eskosu Benjoy" cold="20k" bestseller signature desc="Espresso, milk & palm sugar — sweet & creamy" />
                    <MenuRow name="Eskosu Bold" cold="25k" desc="Espresso, milk & palm sugar — sweet, creamy & strong" />
                    <MenuRow name="Eskosu Cheese" cold="25k" recommended desc="Espresso, milk, palm sugar and cream cheese" />
                    <MenuRow name="Butterscotch" cold="25k" bestseller desc="Espresso, milk & flavour butterscotch" />
                    <MenuRow name="Americano" hot="20k" cold="22k" desc="Espresso with water" />
                    <MenuRow name="Orange Americano" cold="22k" desc="Espresso, water & flavour orange" />
                    <MenuRow name="Lemon Americano" cold="22k" recommended desc="Espresso, water & flavour lemon" />
                    <MenuRow name="Triple Peach Americano" cold="23k" desc="Espresso, flavour peach & secret flavour" />
                    <MenuRow name="Moccacino" hot="22k" cold="24k" desc="Espresso, dark chocolate & milk" />
                    <MenuRow name="Caffe Latte" hot="22k" cold="24k" desc="Espresso with milk" />
                    <MenuRow name="Cappuccino" hot="22k" cold="24k" desc="Espresso, milk & milk foam" />
                    <MenuRow name="Magic" hot="22k" cold="24k" desc="Double ristretto with milk" />
                    <MenuRow name="Manual Brew" hot="25k" cold="25k" desc="Filter coffee" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── NON COFFEE ── */}
            {activeMenuTab === 'Non Coffee' && (
              <motion.div key="noncoffee" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {/* Photo scroll strip */}
                <div className="mb-10 -mx-2 px-2">
                  <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
                    {[
                      { src: '/images/menu/alpukat-kocok.jpg', label: 'Alpukat Kocok', sub: 'Fruit Based · from Rp 20k' },
                    ].map((p) => (
                      <div key={p.src} className="shrink-0 group relative rounded-2xl overflow-hidden shadow-md w-52 h-56 md:w-60 md:h-64">
                        <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <p className="text-white font-bold text-sm leading-tight">{p.label}</p>
                          <p className="text-white/70 text-[11px] mt-0.5">{p.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
                  <div>
                    <SectionBadge emoji="🥛" label="Milk Based" color="accent" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Chocolate" hot="20k" cold="22k" desc="Dark chocolate with milk" />
                      <MenuRow name="Chocolate Cheese" cold="25k" recommended desc="Dark chocolate, milk & cream cheese" />
                      <MenuRow name="Matcha Latte" hot="20k" cold="22k" bestseller desc="Pure matcha with milk, no sugar" />
                      <MenuRow name="Strawberry Matcha" cold="26k" desc="Matcha, milk & strawberry jam" />
                      <MenuRow name="Milo Dino" cold="22k" desc="Milo, milk and topping milo powder" />
                      <MenuRow name="Strawberry Milk" cold="23k" recommended desc="Strawberry jam with milk" />
                    </div>
                  </div>
                  <div>
                    <SectionBadge emoji="🍋" label="Refresher" color="green" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Lemon Mojito" price="20k" desc="Flavour lemon with soda" />
                      <MenuRow name="Peach Mojito" price="20k" desc="Flavour peach with soda" />
                      <MenuRow name="Lychee Mojito" price="23k" bestseller desc="Flavour lychee, soda & lychee fruit" />
                      <MenuRow name="Lemon Yakult" price="23k" recommended desc="Yakult with flavour lemon" />
                      <MenuRow name="Peach Yakult" price="23k" desc="Yakult with flavour peach" />
                      <MenuRow name="Lychee Yakult" price="23k" desc="Yakult with flavour lychee" />
                    </div>
                  </div>
                  <div>
                    <SectionBadge emoji="🍵" label="Tea Based" color="warm" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Black Tea" hot="12k" cold="12k" desc="Black tea with sugar" />
                      <MenuRow name="Lemon Tea" hot="18k" cold="18k" desc="Black tea with flavour lemon" />
                      <MenuRow name="Peach Tea" cold="18k" desc="Black tea with flavour peach" />
                      <MenuRow name="Lychee Tea" cold="20k" recommended desc="Black tea, flavour lychee & lychee fruit" />
                    </div>
                  </div>
                  <div>
                    <SectionBadge emoji="🍓" label="Fruit Based" color="orange" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Strawberry Smoothies" price="24k" bestseller desc="Strawberry, milk & yoghurt" />
                      <MenuRow name="Alpukat Kocok Original" price="20k" desc="Avocado with palm sugar" />
                      <MenuRow name="Alpukat Kocok Chocomil" price="22k" desc="Avocado, palm sugar & topping milo" />
                      <MenuRow name="Alpukat Kocok Crecheese" price="25k" recommended desc="Avocado with cream cheese" />
                    </div>
                  </div>
                </div>
                <div className="mt-10 max-w-xs">
                  <SectionBadge emoji="💧" label="Other" color="accent" />
                  <div className="divide-y divide-border mt-2">
                    <MenuRow name="Mineral Water" price="7k" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── MEAL ── */}
            {activeMenuTab === 'Meal' && (
              <motion.div key="meal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {/* Photo banner */}
                <div className="mb-10 rounded-2xl overflow-hidden shadow-lg relative group max-w-2xl mx-auto">
                  <img
                    src="/images/menu/ricebowl.jpg"
                    alt="Ricebowl Beef Spicy"
                    className="w-full h-60 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="inline-block bg-warm text-white text-xs font-bold px-3 py-1 rounded-full mb-2">🍛 Best Seller</span>
                    <p className="text-white font-serif text-xl font-bold drop-shadow">Ricebowl Beef Spicy</p>
                    <p className="text-white/80 text-xs mt-1">Rice, beef & egg · Bulgogi / Spicy · Rp 28k</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
                  <div>
                    <SectionBadge emoji="🍗" label="Ayam Penyet & Ricebowl" color="orange" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Ayam Penyet" price="25k" desc="Rice, ayam penyet, tahu, tempe & sambal bawang/ijo" />
                      <MenuRow name="Ricebowl Chicken" price="25k" desc="Rice, chicken & egg — barbeque / blackpepper / spicy" />
                      <MenuRow name="Ricebowl Sausage" price="25k" desc="Rice, sausage & egg — barbeque / blackpepper / spicy" />
                      <MenuRow name="Ricebowl Beef" price="28k" bestseller desc="Rice, beef & egg — bulgogi / spicy" />
                      <MenuRow name="Ricebowl Cumi Cabe Ijo" price="29k" recommended desc="Rice, cumi, egg & sambal cabe ijo" />
                    </div>
                  </div>
                  <div>
                    <SectionBadge emoji="🍳" label="Nasi Goreng" color="warm" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Nasi Goreng Original" price="25k" desc="Sweet taste (available req chili)" />
                      <MenuRow name="Nasi Goreng Kampung" price="25k" desc="Savory taste (available req chili)" />
                      <MenuRow name="Nasi Goreng Ijo" price="25k" spicy desc="Spicy with sambal ijo" />
                    </div>
                    <p className="text-xs text-ink-muted italic mt-3">*Include egg, sausage, meatball</p>
                  </div>
                  <div className="md:col-span-2 max-w-md">
                    <SectionBadge emoji="🍜" label="Indomie" color="accent" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Indomie Classic" price="18k" desc="Indomie, egg & vegetable (kuah / goreng)" />
                      <MenuRow name="Indomie Special" price="23k" desc="Indomie, egg, vegetable, meatball & cocktail sausage (kuah / goreng)" />
                      <MenuRow name="Indomie Beef Spicy" price="28k" spicy desc="Indomie with beef spicy (kuah / goreng)" />
                      <MenuRow name="Indomie Cumi Ijo" price="29k" desc="Indomie with cumi ijo (goreng)" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── LIGHT MEAL ── */}
            {activeMenuTab === 'Light Meal' && (
              <motion.div key="lightmeal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {/* Photo scroll strip */}
                <div className="mb-10 -mx-2 px-2">
                  <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
                    {[
                      { src: '/images/menu/mix-platter.jpg', label: 'Mix Platter', sub: 'Fries & More · Rp 29k', badge: '🔥 Best Seller' },
                      { src: '/images/menu/french-fries.jpg', label: 'French Fries', sub: 'Fries & More · from Rp 17k', badge: null },
                      { src: '/images/menu/cireng-rujak.jpg', label: 'Cireng Rujak', sub: 'Bites · Rp 19k · 10pcs', badge: null },
                    ].map((p) => (
                      <div key={p.src} className="shrink-0 group relative rounded-2xl overflow-hidden shadow-md w-52 h-60 md:w-60 md:h-64">
                        <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {p.badge && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-warm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">{p.badge}</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 p-4">
                          <p className="text-white font-bold text-sm leading-tight">{p.label}</p>
                          <p className="text-white/70 text-[11px] mt-0.5">{p.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
                  <div>
                    <SectionBadge emoji="🥟" label="Bites" color="warm" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Dimsum" price="17k" desc="Ayam / Udang / Nori / Kepiting / Lkt Udang · 3pcs" />
                      <MenuRow name="Enoki Crispy" price="19k" desc="Enoki mushrooms coated in flour" />
                      <MenuRow name="Bola Ayam Keju" price="20k" desc="6pcs" />
                      <MenuRow name="Tahu Cabe Garam" price="17k" bestseller recommended spicy desc="Recommended for sharing" />
                      <MenuRow name="Tempe Mendoan" price="17k" desc="4pcs" />
                      <MenuRow name="Cireng Rujak" price="19k" desc="10pcs" />
                    </div>
                  </div>
                  <div>
                    <SectionBadge emoji="🍟" label="Fries & More" color="orange" />
                    <div className="divide-y divide-border mt-2">
                      <MenuRow name="Churros" price="17k" recommended desc="6pcs" />
                      <MenuRow name="Pisang Goreng" price="18k" desc="6pcs" />
                      <MenuRow name="French Fries" price="17k" desc="French fries" />
                      <MenuRow name="French Fries with Sausage" price="19k" desc="French fries with 6pcs cocktail sausage" />
                      <MenuRow name="French Fries with Cheese" price="19k" desc="French fries with cheese sauce & grated cheese" />
                      <MenuRow name="Mixplatter" price="29k" bestseller desc="French fries with cocktail sausage & enoki crispy" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* Vibe */}
      <section id="vibe" className="py-28 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-ink-muted uppercase tracking-[0.2em]">The Vibe</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mt-3 mb-5 leading-[1.15]">
                Designed for focus <br className="hidden sm:block" /> and friendship
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-ink-muted text-lg leading-relaxed mb-10">
                Whether you're finishing a thesis or meeting the squad, we have the space and the caffeine to keep you going. Our cozy interior is the perfect backdrop for your day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FeatureCard
                  icon={<Plug size={20} />}
                  title="Laptop Friendly"
                  desc="Plentiful outlets and fast, free Wi-Fi for uninterrupted sessions."
                />
                <FeatureCard
                  icon={<Coffee size={20} />}
                  title="Group Tables"
                  desc="Spacious seating for study groups, meetings, and hangouts."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/images/vibe-interior.jpg"
                  alt="Benjoy cafe interior — blue wall with wave art"
                  className="w-full h-56 md:h-72 object-cover rounded-2xl"
                />
                <img
                  src="/images/vibe-outdoor.jpg"
                  alt="Benjoy cafe outdoor seating with green vines"
                  className="w-full h-56 md:h-72 object-cover rounded-2xl"
                />
              </div>
              <div className="pt-12">
                <img
                  src="/images/vibe-bar.jpg"
                  alt="Benjoy cafe bar and seating area"
                  className="w-full h-[calc(100%-3rem)] min-h-[340px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-20 md:py-24 bg-warm-light overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-9xl text-warm/20 font-serif leading-none select-none pointer-events-none">"</span>
          <motion.blockquote
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <p className="text-3xl md:text-4xl font-serif font-bold text-ink leading-relaxed mb-6">
              Every cup is a reason to stay a little longer.
            </p>
            <footer className="text-sm font-semibold text-warm uppercase tracking-[0.2em]">
              — Benjoy Coffee &amp; Eatery
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="py-28 md:py-32 bg-gradient-to-br from-accent-deep to-accent text-white relative overflow-hidden">
        {/* Subtle background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[60%] h-[80%] rounded-full bg-white/[0.03]" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[60%] rounded-full bg-white/[0.02]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-sm font-semibold text-white/50 uppercase tracking-[0.2em]">Contactless Delivery</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 mb-4">Enjoy Benjoy Anywhere</h2>
          <div className="w-12 h-1 bg-warm rounded-full mx-auto mb-6" />
          <p className="text-white/70 max-w-lg mx-auto mb-12 text-lg leading-relaxed">
            Craving our signature drinks but can't make it to the corner? Order through your favorite delivery app.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-14">
            <a
              href="https://gofood.link/a/QWcUL9G?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcARFu_hleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAad5tcDET31pMv9bMTYOG2VjyM4NrQE-O9wHm8kgbZZNtJqPhRK8j4BwOU6ntA_aem__tXm2PDMK3J8R-Li3y-fNw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 backdrop-blur-sm border border-white/25 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white/25 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Smartphone size={18} /> Order via GoFood
            </a>
            <a
              href="https://wa.me/6282118952552"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 backdrop-blur-sm border border-white/25 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white/25 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Phone size={18} /> WhatsApp Us
            </a>
          </div>

          {/* Reservation card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 max-w-xl mx-auto">
            <h3 className="text-2xl font-serif font-bold mb-3">Planning a meetup?</h3>
            <p className="text-white/70 mb-8">We accept reservations for groups and study sessions.</p>
            <a
              href="https://wa.me/6282118952552"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-warm text-white px-7 py-3.5 rounded-full font-semibold hover:bg-opacity-90 transition-colors shadow-lg"
            >
              <Phone size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-28 md:py-32 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="text-yellow-400 fill-yellow-400" size={28} />
              <span className="text-4xl font-bold text-ink">4.8</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-ink">Loved by the community</h2>
            <p className="text-ink-muted mt-1 text-sm">Based on Google Reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <ReviewCard
              text="Tempat coffee yang setiap sudutnya aesthetic, tempatnya nyaman. Ada buku dan beberapa mainan yang bisa dipake buat menemani waktu nongkrong. Harga makanan juga relatif murah, yang alpukat kocoknya enak, dimsumnya juga. Sangat recommended!"
              author="Nurlaeli Pratiwi"
              role="Local Guide · 39 ulasan"
              delay={0}
            />
            <ReviewCard
              text="Minumannya enak dan harga terjangkau. Cuma kebetulan pas lagi kesana, pegawainya lagi ada event di tempat lain, jadi makanannya ga ada."
              author="Nur Afifah Setianingsih"
              role="Local Guide · 33 ulasan"
              delay={0.1}
            />
            <ReviewCard
              text="Iseng nemu tempat ngopi yg pw banget, apalagi bisa sambil nobar. Makanannya juga enak-enak ❤️"
              author="Trhyu"
              role="Google Maps · 1 ulasan"
              delay={0.2}
            />
          </div>

          {/* Instagram */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Instagram className="text-accent" size={22} />
              <span className="text-xl font-serif font-bold text-ink">Follow our corner</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: '/images/screenshots/strawberry-matcha.jpg', label: 'Strawberry Matcha' },
                { src: '/images/screenshots/strawberry-smoothie.jpg', label: 'Strawberry Smoothie' },
                { src: '/images/screenshots/strawberry-milk.jpg', label: 'Strawberry Milk' },
                { src: '/images/screenshots/milo-dino.jpg', label: 'Milo Dino' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl bg-cream"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-accent-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="text-white" size={28} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white pt-20 pb-10 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/images/logo.jpg"
                  alt="Benjoy Coffee & Eatery"
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <span className="font-semibold text-xl text-ink tracking-tight">Benjoy Coffee &amp; Eatery</span>
              </div>
              <p className="text-ink-muted max-w-sm mb-6 leading-relaxed text-sm">
                Your cozy corner for coffee and creativity in Regol. Designed for focus and friendship.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-ink mb-5 text-sm">Visit Us</h4>
              <ul className="space-y-4 text-ink-muted text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                  <span>Jl. Otto Iskandar Dinata No.453<br />Regol, Bandung</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={16} className="text-accent shrink-0" />
                  <span>Open Daily: 11:00 — 22:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-ink mb-5 text-sm">Payment</h4>
              <div className="flex flex-wrap gap-2">
                {['QRIS', 'Debit'].map((method) => (
                  <span
                    key={method}
                    className="bg-surface px-3.5 py-2 rounded-lg border border-border text-xs font-semibold text-ink-muted flex items-center gap-1.5"
                  >
                    <CreditCard size={14} className="text-accent" />
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-ink-muted text-center md:text-left">
              &#169; {new Date().getFullYear()} Benjoy Coffee &amp; Eatery. All rights reserved.
            </p>
            <p className="text-xs text-ink-muted">Made with ☕ and love in Bandung</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-500 text-white pl-3 pr-4 py-3 rounded-full shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all duration-200 group"
        aria-label="WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-semibold">WhatsApp</span>
      </motion.a>

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:-translate-y-1 hover:bg-accent-deep transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------- Reusable components ----------------------- */

function SectionBadge({
  icon,
  emoji,
  label,
  color = 'accent',
}: {
  icon?: React.ReactNode;
  emoji?: string;
  label: string;
  color?: 'accent' | 'green' | 'warm' | 'orange';
}) {
  const bgClasses: Record<string, string> = {
    accent: 'bg-accent/10 text-accent',
    green: 'bg-green-500/10 text-green-600',
    warm: 'bg-warm/20 text-warm',
    orange: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <div className="flex items-center gap-2.5 mb-1">
      {icon && <div className={`w-8 h-8 ${bgClasses[color]} rounded-lg flex items-center justify-center`}>{icon}</div>}
      {emoji && <span className="text-xl">{emoji}</span>}
      <h3 className="text-xl font-serif font-bold text-ink">{label}</h3>
    </div>
  );
}

function DottedRow({ name, price, signature }: { name: string; price: string; signature?: boolean }) {
  return (
    <div className="group py-3 flex items-center">
      <span className="font-medium text-ink text-sm group-hover:text-accent transition-colors">{name}</span>
      {signature && (
        <span className="ml-2 shrink-0 inline-flex items-center gap-1 bg-warm/15 text-warm text-[10px] font-bold px-2 py-0.5 rounded-full border border-warm/30">
          ✦ Signature
        </span>
      )}
      <span className="flex-1 mx-3 border-dotted border-b-2 border-border opacity-60" />
      <span className="font-semibold text-ink text-sm shrink-0">{price}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-surface p-6 rounded-2xl border border-border hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white mb-4 shadow-xs">
        {icon}
      </div>
      <h4 className="font-semibold text-ink text-base mb-1.5">{title}</h4>
      <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ReviewCard({ text, author, role, delay }: { text: string; author: string; role: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: delay ?? 0 }}
      className="relative bg-gradient-to-br from-cream to-white p-7 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Decorative quote mark */}
      <span className="absolute top-4 right-5 text-6xl text-warm/20 font-serif leading-none select-none pointer-events-none">"</span>
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={14}
            className="text-yellow-400 fill-yellow-400 animate-star-pop"
            style={{ animationDelay: `${(delay ?? 0) * 1000 + i * 80}ms`, opacity: 0 }}
          />
        ))}
      </div>
      <p className="text-ink-muted mb-6 leading-relaxed italic text-sm relative z-10">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center font-bold text-accent text-sm">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-ink text-sm">{author}</p>
          <p className="text-xs text-ink-muted">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function MenuRow({
  name, hot, cold, price, desc, bestseller, recommended, signature, spicy,
}: {
  name: string; hot?: string; cold?: string; price?: string; desc?: string;
  bestseller?: boolean; recommended?: boolean; signature?: boolean; spicy?: boolean;
}) {
  const priceEl = hot && cold
    ? <span className="text-xs whitespace-nowrap"><span className="font-bold">H</span> {hot} / <span className="font-bold">C</span> {cold}</span>
    : cold
    ? <span>{cold}</span>
    : <span>{price ?? ''}</span>;

  return (
    <div className="group py-3">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-ink text-sm group-hover:text-accent transition-colors">{name}</span>
            {signature && <span className="inline-flex items-center gap-1 bg-warm/15 text-warm text-[10px] font-bold px-2 py-0.5 rounded-full border border-warm/30 shrink-0">✦ Signature</span>}
            {bestseller && <Star size={11} className="text-yellow-400 fill-yellow-400 shrink-0" />}
            {recommended && <span className="text-xs shrink-0">👍</span>}
            {spicy && <span className="text-xs shrink-0">🌶️</span>}
          </div>
          {desc && <p className="text-[11px] text-ink-muted mt-0.5 italic leading-relaxed">{desc}</p>}
        </div>
        <div className="shrink-0 font-semibold text-ink text-sm text-right pt-0.5">{priceEl}</div>
      </div>
    </div>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-ink-muted hover:bg-accent hover:text-white transition-all duration-300 border border-border hover:border-accent"
    >
      {icon}
    </a>
  );
}
