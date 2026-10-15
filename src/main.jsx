import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, ShoppingBag, Heart, Sparkles, Menu, X, ArrowRight,
  Star, SlidersHorizontal, Leaf, Droplets, Sun, Check, Minus, Plus
} from "lucide-react";
import "./styles.css";

const products = [
  { id: 1, name: "Gentle Cloud Cleanser", category: "Cleanser", price: 89000, rating: 4.9, tag: "Best Seller", color: "peach", icon: "☁️", desc: "Pembersih lembut untuk membersihkan kotoran tanpa membuat kulit terasa tertarik." },
  { id: 2, name: "Dew Drop Hydrating Serum", category: "Serum", price: 129000, rating: 4.8, tag: "Hydrating", color: "blue", icon: "💧", desc: "Serum hidrasi ringan untuk membantu menjaga kelembapan kulit." },
  { id: 3, name: "Daily Veil Sunscreen SPF 50", category: "Sunscreen", price: 115000, rating: 5.0, tag: "Daily Essential", color: "yellow", icon: "☀️", desc: "Perlindungan UV untuk pemakaian harian. Gunakan kembali sesuai kebutuhan." },
  { id: 4, name: "Calm Barrier Moisturizer", category: "Moisturizer", price: 109000, rating: 4.8, tag: "Barrier Care", color: "green", icon: "🌿", desc: "Pelembap nyaman untuk mendukung skin barrier dan mengunci hidrasi." },
  { id: 5, name: "Soft Reset Cleansing Balm", category: "Cleanser", price: 99000, rating: 4.7, tag: "New", color: "pink", icon: "🌸", desc: "Balm pembersih untuk membantu meluruhkan sunscreen dan makeup." },
  { id: 6, name: "Milky Glow Toner", category: "Toner", price: 95000, rating: 4.6, tag: "Gentle Care", color: "lilac", icon: "✨", desc: "Toner ringan untuk memberi rasa segar dan membantu hidrasi." },
];

const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const categories = ["Semua", "Cleanser", "Serum", "Moisturizer", "Sunscreen", "Toner"];
  const filteredProducts = useMemo(() => products.filter((p) =>
    (category === "Semua" || p.category === category) &&
    `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} ditambahkan ke keranjang`);
    setTimeout(() => setNotice(""), 2400);
  }

  function updateQty(id, delta) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }

  return (
    <div className="app-shell">
      <div className="announcement"><Sparkles size={14} /> Kulit sehat dimulai dari rutinitas sederhana <span>—</span> <a href="#products">Temukan favoritmu</a></div>
      <header className="site-header">
        <a className="brand" href="#" aria-label="GlowCare beranda">
          <span className="brand-mark"><Droplets size={22} /></span>
          <span>glow<span className="brand-light">care</span><small>SKINCARE STUDIO</small></span>
        </a>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#products" onClick={() => setMobileMenu(false)}>Produk</a>
          <a href="#routine" onClick={() => setMobileMenu(false)}>Rutinitas</a>
          <a href="#about" onClick={() => setMobileMenu(false)}>Tentang Kami</a>
        </nav>
        <div className="header-actions">
          <label className="header-search"><Search size={17} /><input aria-label="Cari produk" placeholder="Cari produk..." value={query} onChange={(e) => { setQuery(e.target.value); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }} /></label>
          <button className="icon-button favorite-head" title="Produk favorit" onClick={() => { setCategory("Semua"); setQuery(""); setNotice(favorites.length ? `Kamu punya ${favorites.length} produk favorit` : "Belum ada produk favorit"); setTimeout(() => setNotice(""), 2400); }}><Heart size={20} /><span className="tiny-count">{favorites.length}</span></button>
          <button className="icon-button bag-button" title="Buka keranjang" onClick={() => setShowCart(true)}><ShoppingBag size={20} /><span className="count">{cartCount}</span></button>
          <button className="icon-button mobile-toggle" aria-label="Buka menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> YOUR EVERYDAY SKINCARE</div>
            <h1>Rawat kulitmu,<br /><em>sayangi dirimu.</em></h1>
            <p>Temukan skincare yang terasa nyaman di kulit dan jadikan self-care sebagai bagian kecil yang menyenangkan dari harimu.</p>
            <div className="hero-buttons"><a className="primary-button" href="#products">Jelajahi Produk <ArrowRight size={17} /></a><a className="text-button" href="#routine">Lihat rutinitas <span>↗</span></a></div>
            <div className="hero-social"><div className="avatar-stack"><span>🌷</span><span>🫧</span><span>🌿</span></div><div><strong>Simple care, happy skin</strong><small>Mulai dari kebutuhan kulitmu</small></div></div>
          </div>
          <div className="hero-art">
            <div className="sun-disc"></div><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div>
            <div className="hero-plant plant-left">✿<br />╱╲</div>
            <div className="product-stage">
              <div className="hero-bottle bottle-large"><div className="bottle-cap"></div><div className="bottle-label"><span>glowcare</span><strong>DEW DROP</strong><small>HYDRATING SERUM</small><i>30 ml</i></div></div>
              <div className="hero-bottle bottle-small"><div className="bottle-cap"></div><div className="bottle-label"><span>glowcare</span><strong>SOFT CLOUD</strong><small>GENTLE CLEANSER</small><i>100 ml</i></div></div>
              <div className="hero-jar"><div className="jar-lid"></div><div className="jar-label">glowcare<br /><b>CALM BARRIER</b></div></div>
            </div>
            <div className="floating-note note-top"><Sparkles size={15} /><span>Gentle ingredients<br /><b>Everyday comfort</b></span></div>
            <div className="floating-note note-bottom"><span className="note-flower">✿</span><span>Little rituals,<br /><b>lovely results</b></span></div>
            <div className="art-sparkle sparkle-a">✦</div><div className="art-sparkle sparkle-b">✧</div>
          </div>
        </section>

        <section className="benefits" aria-label="Keunggulan GlowCare">
          <div><span className="benefit-icon"><Leaf size={21} /></span><span><b>Gentle by nature</b><small>Fokus pada kenyamanan kulit</small></span></div>
          <div><span className="benefit-icon"><Droplets size={21} /></span><span><b>Hydration first</b><small>Jaga kelembapan kulit</small></span></div>
          <div><span className="benefit-icon"><Sun size={21} /></span><span><b>Daily essentials</b><small>Perawatan untuk setiap hari</small></span></div>
          <div><span className="benefit-icon"><Heart size={21} /></span><span><b>Self-care moment</b><small>Waktu kecil untuk dirimu</small></span></div>
        </section>

        <section className="products-section section-wrap" id="products">
          <div className="section-heading"><div><div className="eyebrow"><span></span> THE GLOW EDIT</div><h2>Temukan <em>favoritmu.</em></h2><p>Perawatan sederhana untuk kebutuhan kulit sehari-hari.</p></div><div className="product-count">{filteredProducts.length} produk <SlidersHorizontal size={15} /></div></div>
          <div className="category-row">{categories.map((c) => <button key={c} className={category === c ? "category-chip active" : "category-chip"} onClick={() => setCategory(c)}>{c}</button>)}</div>
          {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((p) => <article className="product-card" key={p.id}>
            <div className={`product-art ${p.color}`}><span className="product-tag">{p.tag}</span><button className={favorites.includes(p.id) ? "heart-button selected" : "heart-button"} aria-label={`Favorit ${p.name}`} onClick={() => toggleFavorite(p.id)}><Heart size={18} fill={favorites.includes(p.id) ? "currentColor" : "none"} /></button><div className={`mini-product ${p.id === 4 || p.id === 6 ? "jar-product" : ""}`}><div className="mini-cap"></div><div className="mini-label"><span>glowcare</span><b>{p.id === 1 ? "GENTLE CLOUD" : p.id === 2 ? "DEW DROP" : p.id === 3 ? "DAILY VEIL" : p.id === 4 ? "CALM BARRIER" : p.id === 5 ? "SOFT RESET" : "MILKY GLOW"}</b><small>{p.category.toUpperCase()}</small></div></div><span className="decor decor-one">{p.icon}</span><span className="decor decor-two">✧</span></div>
            <div className="product-info"><div className="product-meta"><span>{p.category}</span><span className="rating"><Star size={13} fill="currentColor" /> {p.rating.toFixed(1)}</span></div><h3>{p.name}</h3><p>{p.desc}</p><div className="product-bottom"><strong>{formatPrice(p.price)}</strong><button className="add-button" aria-label={`Tambah ${p.name} ke keranjang`} onClick={() => addToCart(p)}><Plus size={18} /></button></div></div>
          </article>)}</div> : <div className="empty-state"><Search size={26} /><h3>Produk belum ditemukan</h3><p>Coba kata kunci atau kategori yang berbeda.</p><button className="text-button" onClick={() => { setQuery(""); setCategory("Semua"); }}>Reset pencarian</button></div>}
        </section>

        <section className="routine-section" id="routine"><div className="routine-art"><div className="routine-circle"><span>01</span><div className="routine-sun">☼</div><strong>less, but<br /><em>better.</em></strong><small>YOUR DAILY RITUAL</small></div><span className="routine-leaf leaf-a">❧</span><span className="routine-leaf leaf-b">❧</span></div><div className="routine-copy"><div className="eyebrow"><span></span> SKINCARE MADE SIMPLE</div><h2>Rutinitas kecil,<br /><em>rasa nyaman besar.</em></h2><p>Kamu tidak perlu memakai banyak produk sekaligus. Mulai dari langkah dasar dan sesuaikan dengan kebutuhan kulitmu.</p><div className="routine-steps"><div><span>01</span><section><b>Cleanse</b><small>Bersihkan wajah dengan lembut.</small></section><Droplets size={20} /></div><div><span>02</span><section><b>Moisturize</b><small>Bantu menjaga kelembapan kulit.</small></section><Sparkles size={20} /></div><div><span>03</span><section><b>Protect</b><small>Pakai sunscreen di pagi/siang hari.</small></section><Sun size={20} /></div></div><p className="routine-disclaimer">Tips: kenalkan produk baru satu per satu dan hentikan pemakaian jika terjadi iritasi.</p></div></section>

        <section className="newsletter" id="about"><div className="newsletter-flower">✿</div><div><div className="eyebrow">A LITTLE NOTE FOR YOU</div><h2>Kulitmu, ceritamu.</h2><p>Mulai perjalanan skincare-mu dengan langkah yang sederhana dan penuh perhatian.</p></div><a href="#products" className="newsletter-button">Cari skincare-ku <ArrowRight size={17} /></a></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><Droplets size={20} /></span><span>glow<span className="brand-light">care</span><small>SKINCARE STUDIO</small></span></a><span>© 2026 GlowCare. Made with care ♡</span><div><a href="#products">Produk</a><a href="#routine">Rutinitas</a><a href="#about">Tentang</a></div></footer>

      {notice && <div className="toast"><Check size={17} /> {notice}</div>}
      {showCart && <div className="overlay" onClick={() => setShowCart(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="cart-header"><div><small>YOUR BAG</small><h2>Keranjang <em>belanja</em></h2></div><button className="icon-button" onClick={() => setShowCart(false)} aria-label="Tutup keranjang"><X /></button></div>{cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div className={`cart-thumb ${item.color}`}>{item.icon}</div><div className="cart-item-info"><b>{item.name}</b><small>{formatPrice(item.price)}</small><div className="qty-control"><button onClick={() => updateQty(item.id, -1)} aria-label="Kurangi jumlah"><Minus size={13} /></button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)} aria-label="Tambah jumlah"><Plus size={13} /></button></div></div><strong>{formatPrice(item.price * item.qty)}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{formatPrice(cartTotal)}</b></div><small>Biaya pengiriman dihitung saat checkout.</small><button className="primary-button checkout-button" onClick={() => { setNotice("Demo: checkout belum terhubung ke pembayaran"); setShowCart(false); setTimeout(() => setNotice(""), 3000); }}>Lanjutkan checkout <ArrowRight size={17} /></button></div></> : <div className="cart-empty"><span>🛍️</span><h3>Keranjangmu masih kosong</h3><p>Temukan produk yang cocok untuk rutinitasmu.</p><button className="primary-button" onClick={() => setShowCart(false)}>Jelajahi produk <ArrowRight size={16} /></button></div>}</aside></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
