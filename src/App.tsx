import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight, Check, ChevronDown, Download, Menu, ShieldCheck,
  Sparkles, X, Calculator, Layers3, Truck, BadgeCheck, Plus, Minus,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { BUSINESS_CONTACT } from "./config/business";
import { BOX_PROFILE_VARIANTS } from "./features/products/boxProfileVariants";
import { FALLBACK_PRODUCTS, type Product } from "./features/products/productModel";
import { loadProducts } from "./services/products/catalogue";
import "./App.css";

type QuoteLine = {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: string;
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(amount);

const makeLine = (productId = "box-profile"): QuoteLine => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  productId,
  variantId: productId === "box-profile" ? BOX_PROFILE_VARIANTS[0]?.id : undefined,
  quantity: 1,
  unitPrice: "",
});

function RoofArtwork({ tone }: { tone: string }) {
  return (
    <div className={`roof-art roof-art--${tone}`} aria-hidden="true">
      <div className="roof-art__sun" />
      <div className="roof-art__house">
        <div className="roof-art__roof" />
        <div className="roof-art__wall">
          <span />
          <span />
          <i />
        </div>
      </div>
      <div className="roof-art__ground" />
      <span className="roof-art__label">PANDA / ROOFING</span>
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [catalogueSource, setCatalogueSource] = useState<"fallback" | "firestore">("fallback");

  useEffect(() => {
    let active = true;

    void loadProducts().then((result) => {
      if (!active) return;
      setProducts(result.products);
      setCatalogueSource(result.source);
    });

    return () => {
      active = false;
    };
  }, []);
  const [lines, setLines] = useState<QuoteLine[]>([makeLine()]);
  const [customer, setCustomer] = useState("");
  const [project, setProject] = useState("");
  const [county, setCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const quote = useMemo(() => {
    const totalQuantity = lines.reduce(
      (sum, line) => sum + Math.max(0, Number(line.quantity) || 0), 0,
    );

    const hasMissingPrice = lines.some((line) => {
      if (line.quantity <= 0) return false;
      if (line.productId === "box-profile") {
        return !BOX_PROFILE_VARIANTS.some((variant) => variant.id === line.variantId);
      }
      const rate = Number(line.unitPrice);
      return line.unitPrice.trim() === "" || !Number.isFinite(rate) || rate < 0;
    });

    const pricedTotal = lines.reduce((sum, line) => {
      const variant = line.productId === "box-profile"
        ? BOX_PROFILE_VARIANTS.find((item) => item.id === line.variantId)
        : undefined;
      const rate = variant ? variant.ratePerM : Number(line.unitPrice);
      if (!variant && (
        line.unitPrice.trim() === "" ||
        !Number.isFinite(rate) ||
        rate < 0
      )) return sum;
      return sum + Math.max(0, Number(line.quantity) || 0) * rate;
    }, 0);

    return { totalQuantity, hasMissingPrice, pricedTotal };
  }, [lines]);

  const updateLine = (id: string, patch: Partial<QuoteLine>) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  };

  const addLine = () => setLines((current) => [...current, makeLine()]);
  const removeLine = (id: string) =>
    setLines((current) =>
      current.length > 1 ? current.filter((line) => line.id !== id) : current,
    );

  const downloadQuote = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const left = 18;
    const right = pageWidth - 18;
    let y = 20;

    doc.setFillColor(18, 53, 43);
    doc.rect(0, 0, pageWidth, 43, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("PANDA MABATI", left, y + 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("ROOFING SOLUTIONS  /  KENYA", left, y + 11);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("QUOTATION", right, y + 3, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Date: ${new Date().toLocaleDateString("en-KE")}`, right, y + 11, {
      align: "right",
    });

    y = 56;
    doc.setTextColor(30, 41, 38);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("CUSTOMER & PROJECT", left, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Customer: ${customer.trim() || "Not provided"}`, left, y);
    y += 6;
    doc.text(`Project: ${project.trim() || "Not provided"}`, left, y);
    y += 6;
    doc.text(`County / location: ${county.trim() || "Not provided"}`, left, y);
    y += 6;
    doc.text(`Phone: ${phone.trim() || "Not provided"}`, left, y);

    y += 13;
    doc.setFillColor(240, 242, 235);
    doc.rect(left, y - 5, right - left, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("ROOFING PRODUCT", left + 2, y + 1);
    doc.text("QTY / LENGTH", 112, y + 1, { align: "right" });
    doc.text("UNIT RATE", 151, y + 1, { align: "right" });
    doc.text("AMOUNT", right - 2, y + 1, { align: "right" });
    y += 10;

    doc.setFont("helvetica", "normal");
    lines.forEach((line) => {
      const product = products.find((item) => item.id === line.productId);
      const quantity = Math.max(0, Number(line.quantity) || 0);
      const variant = line.productId === "box-profile"
        ? BOX_PROFILE_VARIANTS.find((item) => item.id === line.variantId)
        : undefined;
      const manualRate = Number(line.unitPrice);
      const hasRate = variant !== undefined || (
        line.unitPrice.trim() !== "" &&
        Number.isFinite(manualRate) &&
        manualRate >= 0
      );
      const rate = hasRate ? (variant ? variant.ratePerM : manualRate) : null;
      const amount = rate === null ? null : quantity * rate;
      const productLabel = variant
        ? `${product?.name ?? "Box Profile"} — ${variant.colour} ${variant.finish} ${variant.gauge}`
        : product?.name ?? "Roofing product";
      const nameLines = doc.splitTextToSize(productLabel, 68);
      doc.text(nameLines, left + 2, y);
      doc.text(variant ? `${quantity} m` : String(quantity), 112, y, { align: "right" });
      doc.text(
        rate === null ? "To confirm" : `${money(rate)}${variant ? " / m" : ""}`,
        151,
        y,
        {
        align: "right",
      });
      doc.text(amount === null ? "To confirm" : money(amount), right - 2, y, {
        align: "right",
      });
      y += Math.max(9, nameLines.length * 5 + 3);
      doc.setDrawColor(225, 229, 222);
      doc.line(left, y - 3, right, y - 3);
      if (y > 255) {
        doc.addPage();
        y = 22;
      }
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(
      quote.hasMissingPrice
        ? "Priced items subtotal (excludes unpriced items):"
        : "Items subtotal:",
      left,
      y,
    );
    doc.text(money(quote.pricedTotal), right, y, { align: "right" });
    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const disclaimer = quote.hasMissingPrice
      ? "IMPORTANT: This is a preliminary product and quantity quotation. Some unit prices have not been provided, so the displayed subtotal is not the full project total. Delivery, accessories, installation, taxes and final specifications are not included unless separately confirmed."
      : "IMPORTANT: This document reflects the quantities and unit rates entered by the user. Delivery, accessories, installation, taxes and final specifications are not included unless separately confirmed.";
    const wrappedDisclaimer = doc.splitTextToSize(disclaimer, right - left);
    doc.text(wrappedDisclaimer, left, y);
    y += wrappedDisclaimer.length * 5 + 7;

    if (notes.trim()) {
      doc.setFont("helvetica", "bold");
      doc.text("Additional notes", left, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(notes.trim(), right - left), left, y);
    }

    doc.setFontSize(8);
    doc.setTextColor(95, 105, 98);
    doc.text(
      "Panda Mabati | Roofing solutions made clearer.",
      left,
      285,
    );
    doc.save(`Panda-Mabati-Quotation-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const navLinks = [
    ["Home", "#home"],
    ["Roofing", "#roofing"],
    ["Products", "#roofing"],
    ["Calculator", "#calculator"],
  ];

  return (
    <div className="site-shell">
      <div className="announcement">
        <span className="announcement__dot" />
        Built around your next roof — from first idea to quotation.
        <a href="#calculator">Try the calculator <ArrowUpRight size={14} /></a>
      </div>

      <header className="site-header">
        <a href="#home" className="brand" aria-label="Panda Mabati home">
          <span className="brand__mark"><Layers3 size={23} strokeWidth={2.2} /></span>
          <span className="brand__words">
            <strong>PANDA <em>MABATI</em></strong>
            <small>ROOFING SOLUTIONS</small>
          </span>
        </a>

        <nav aria-label="Main navigation" className={`desktop-nav ${mobileOpen ? "desktop-nav--open" : ""}`}>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#about" onClick={() => setMobileOpen(false)}>About us</a>
          <a className="nav-mobile-cta" href="#calculator" onClick={() => setMobileOpen(false)}>
            Build a quotation
          </a>
        </nav>

        <div className="header-actions">
          <a href="#calculator" className="button button--dark button--small">
            Get a quotation <ArrowUpRight size={16} />
          </a>
          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero__copy">
            <div className="eyebrow"><Sparkles size={14} /> A smarter way to roof</div>
            <h1>Good roofs begin with <span>better choices.</span></h1>
            <p className="hero__lead">
              Discover roofing that fits your vision. Compare profiles, plan your
              quantities and create your quotation — all in one place.
            </p>
            <div className="hero__actions">
              <a className="button button--lime" href="#calculator">
                Calculate my roofing <ArrowUpRight size={17} />
              </a>
              <a className="text-link" href="#roofing">Explore roofing <span>↗</span></a>
            </div>
            <div className="hero__proof">
              <div className="proof-icon"><ShieldCheck size={19} /></div>
              <div><strong>Clear choices. Clear quantities.</strong><small>Start planning before you place an order.</small></div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-frame">
              <img
                className="hero__photo"
                src="/images/hero/modern-roof-house.jpg"
                alt="Contemporary home with a prominent metal roof and landscaped garden"
                fetchPriority="high"
              />
              <div className="hero__photo-shade" />
              <div className="hero__image-note"><span /> ROOFS WITH PURPOSE</div>
            </div>
            <div className="hero-stat hero-stat--top">
              <span className="hero-stat__icon"><Check size={15} /></span>
              <span><strong>Made for your project</strong><small>Choose your profile</small></span>
            </div>
            <div className="hero-stat hero-stat--bottom">
              <div className="stat-bars"><i /><i /><i /><i /><i /></div>
              <span><strong>Instant quote builder</strong><small>Download when you're ready</small></span>
            </div>
            <span className="hero__orb hero__orb--one" />
            <span className="hero__orb hero__orb--two" />
          </div>
        </section>

        <section className="trust-strip">
          <div><ShieldCheck size={20} /><span><strong>Thoughtful choices</strong><small>Profiles for different styles</small></span></div>
          <div><Calculator size={20} /><span><strong>Instant calculations</strong><small>See quantities update live</small></span></div>
          <div><Download size={20} /><span><strong>PDF quotation</strong><small>Save a copy in seconds</small></span></div>
          <div><Truck size={20} /><span><strong>Kenya-focused</strong><small>Plan with your project in mind</small></span></div>
        </section>

        <section className="roofing-section section-wrap" id="roofing">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Find your finish</div>
              <h2>Roofing for your kind of home.</h2>
            </div>
            <p>Start with the look you love. Select a profile to add it to your quotation.</p>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-card__image">
                  {product.id === "box-profile" ? (
                    <img
                      src={BOX_PROFILE_VARIANTS[2].image}
                      alt="Box Profile Tile Red Gloss 30G roofing sheet"
                      className="product-card__photo"
                      loading="lazy"
                    />
                  ) : (
                    <RoofArtwork tone={product.tone} />
                  )}
                  <span className="product-card__number">0{index + 1}</span>
                </div>
                <div className="product-card__body">
                  <div className="product-card__topline"><span>{product.use}</span><BadgeCheck size={16} /></div>
                  <h3>{product.name}</h3>
                  <p className="product-card__short">{product.short}</p>
                  <p className="product-card__description">{product.description}</p>
                  <button
                    className="product-card__link"
                    onClick={() => {
                      setLines((current) => [...current, makeLine(product.id)]);
                      document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Add to quotation <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="catalogue-note">
            {catalogueSource === "firestore"
              ? "Live published catalogue loaded. "
              : "Showing the local catalogue until the live catalogue is available. "}
            Product illustrations are temporary design placeholders. Actual product photographs,
            colours, gauges, coverage and technical specifications will be confirmed against Panda
            Mabati's product catalogue.
          </p>
        </section>

        <section className="feature-band" id="product-range">
          <div className="feature-band__inner product-feature__inner">
            <div className="product-feature__intro">
              <div className="eyebrow eyebrow--light">Explore the range</div>
              <h2>Find the right roof <span>for your project.</span></h2>
              <p>
                Compare our main roofing profiles and add your selection to a
                quotation. Variant pricing and specifications are shown only
                where confirmed.
              </p>
              <a href="#roofing" className="button button--lime">
                Explore products <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="product-feature__grid">
              <a href="#roofing" className="product-feature__item">
                <span className="product-feature__icon"><ShieldCheck size={22} /></span>
                <strong>D-Tile</strong>
                <small>Tile-inspired character</small>
                <ArrowUpRight className="product-feature__arrow" size={17} />
              </a>
              <a href="#roofing" className="product-feature__item">
                <span className="product-feature__icon"><Layers3 size={22} /></span>
                <strong>Versatile</strong>
                <small>A distinctive profile</small>
                <ArrowUpRight className="product-feature__arrow" size={17} />
              </a>
              <a href="#roofing" className="product-feature__item">
                <span className="product-feature__icon"><Sparkles size={22} /></span>
                <strong>StarTile</strong>
                <small>Tile-effect styling</small>
                <ArrowUpRight className="product-feature__arrow" size={17} />
              </a>
              <a href="#roofing" className="product-feature__item">
                <span className="product-feature__icon"><Truck size={22} /></span>
                <strong>Box Profile</strong>
                <small>Modern ribbed lines</small>
                <ArrowUpRight className="product-feature__arrow" size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="calculator-section section-wrap" id="calculator">
          <div className="calculator-intro">
            <div className="eyebrow">Your project, in numbers</div>
            <h2>Build your roofing quotation.</h2>
            <p>Choose products and quantities. Your summary updates as you work, and your PDF is ready whenever you are.</p>
            <div className="calculator-assurances">
              <span><Check size={15} /> No account needed</span>
              <span><Check size={15} /> Download instantly</span>
              <span><Check size={15} /> KES currency</span>
            </div>
          </div>

          <div className="quote-builder">
            <div className="quote-builder__main">
              <div className="builder-title">
                <div><span className="builder-step">01</span><div><h3>Your roofing list</h3><p>Add each profile and required quantity.</p></div></div>
                <span className="item-count">{lines.length} {lines.length === 1 ? "item" : "items"}</span>
              </div>

              <div className="quote-fields">
                <label>Customer name<input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Your name or business" /></label>
                <label>Project name<input value={project} onChange={(e) => setProject(e.target.value)} placeholder="e.g. Family home" /></label>
                <label>County / location<input value={county} onChange={(e) => setCounty(e.target.value)} placeholder="e.g. Kiambu County" /></label>
                <label>Phone number<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 ..." inputMode="tel" /></label>
              </div>

              <div className="line-list">
                {lines.map((line, index) => {
                  const product = products.find((item) => item.id === line.productId);
                  const variant = line.productId === "box-profile"
                    ? BOX_PROFILE_VARIANTS.find((item) => item.id === line.variantId)
                    : undefined;
                  const manualRate = Number(line.unitPrice);
                  const hasRate = variant !== undefined || (
                    line.unitPrice.trim() !== "" &&
                    Number.isFinite(manualRate) &&
                    manualRate >= 0
                  );
                  const rate = variant ? variant.ratePerM : manualRate;
                  const lineTotal = hasRate
                    ? Math.max(0, Number(line.quantity) || 0) * rate
                    : null;
                  return (
                    <div className="quote-line" key={line.id}>
                      <div className="quote-line__index">{String(index + 1).padStart(2, "0")}</div>
                      <div className="quote-line__fields">
                        <label className="field-wide">Roofing profile
                          <span className="select-wrap">
                            <select
                              value={line.productId}
                              onChange={(e) => {
                                const productId = e.target.value;
                                updateLine(line.id, {
                                  productId,
                                  variantId: productId === "box-profile"
                                    ? BOX_PROFILE_VARIANTS[0]?.id
                                    : undefined,
                                  unitPrice: "",
                                });
                              }}
                            >
                              {products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                            <ChevronDown size={15} />
                          </span>
                        </label>
                        {line.productId === "box-profile" && (
                          <label className="field-wide">Colour / finish / gauge
                            <span className="select-wrap">
                              <select
                                value={line.variantId ?? ""}
                                onChange={(e) => updateLine(line.id, { variantId: e.target.value })}
                              >
                                {BOX_PROFILE_VARIANTS.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.colour} — {item.finish} — {item.gauge}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown size={15} />
                            </span>
                          </label>
                        )}
                        <label>{variant ? "Length (metres)" : "Quantity"}
                          <div className="quantity-control">
                            <button aria-label="Decrease quantity" onClick={() => updateLine(line.id, { quantity: Math.max(0, line.quantity - 1) })}><Minus size={14} /></button>
                            <input
                              type="number"
                              min="0"
                              step={variant ? "0.1" : "1"}
                              value={line.quantity}
                              onChange={(e) => updateLine(line.id, {
                                quantity: Math.max(0, Number(e.target.value) || 0),
                              })}
                            />
                            <button aria-label="Increase quantity" onClick={() => updateLine(line.id, { quantity: line.quantity + 1 })}><Plus size={14} /></button>
                          </div>
                        </label>
                        <label>{variant ? "Rate (KES / metre)" : "Unit rate (KES)"}
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={variant ? String(variant.ratePerM) : line.unitPrice}
                            onChange={(e) => updateLine(line.id, { unitPrice: e.target.value })}
                            placeholder="Confirm price"
                            disabled={Boolean(variant)}
                          />
                        </label>
                      </div>
                      <div className="quote-line__bottom">
                        <span>
                          {variant
                            ? `${variant.colour} · ${variant.finish} · ${variant.gauge}`
                            : product?.short}
                        </span>
                        <strong>{lineTotal === null ? "Price to be confirmed" : money(lineTotal)}</strong>
                        <button className="remove-line" onClick={() => removeLine(line.id)} disabled={lines.length === 1} aria-label={`Remove ${product?.name ?? "product"}`}><X size={15} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="add-line-button" onClick={addLine}><Plus size={16} /> Add another roofing type</button>
              <label className="notes-field">Project notes (optional)
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Colour preference, delivery location, gauge or other details..." rows={3} />
              </label>
            </div>

            <aside className="quote-summary">
              <div className="summary-kicker"><span className="summary-pulse" /> LIVE SUMMARY</div>
              <h3>Your project<br />at a glance.</h3>
              <p>Quantities and totals update automatically.</p>
              <div className="summary-metric"><span>Total quantity</span><strong>{quote.totalQuantity.toLocaleString("en-KE")}</strong><small>Box Profile in metres; other profiles in units</small></div>
              <div className="summary-total"><span>Priced items subtotal</span><strong>{money(quote.pricedTotal)}</strong><small>{quote.hasMissingPrice ? "Excludes products without a confirmed rate" : "Based on the unit rates entered"}</small></div>
              <div className="chart-card">
                <div className="chart-card__heading"><span>Quantity by profile</span><Layers3 size={16} /></div>
                <div className="quantity-chart" role="img" aria-label="Bar chart showing quantities by roofing profile">
                  {products.map((product) => {
                    const amount = lines.filter((line) => line.productId === product.id).reduce((sum, line) => sum + Math.max(0, Number(line.quantity) || 0), 0);
                    const max = Math.max(1, ...products.map((p) => lines.filter((line) => line.productId === p.id).reduce((sum, line) => sum + Math.max(0, Number(line.quantity) || 0), 0)));
                    return (
                      <div className="chart-row" key={product.id}>
                        <div className="chart-row__label"><span>{product.name}</span><strong>{amount}</strong></div>
                        <div className="chart-track"><div className="chart-bar" style={{ width: `${(amount / max) * 100}%` }} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {quote.hasMissingPrice && <div className="price-notice"><ShieldCheck size={16} /><span>Some prices are missing. Your PDF will flag these lines and will not present the subtotal as a final project price.</span></div>}
              <button className="button button--lime button--full" onClick={downloadQuote}><Download size={17} /> Download quotation PDF</button>
              <p className="summary-privacy">Your PDF is generated on this device. This prototype does not submit your personal details to a server.</p>
            </aside>
          </div>
        </section>

        <section className="closing-cta" id="about">
          <div className="closing-cta__content">
            <div className="eyebrow eyebrow--light">Panda Mabati</div>
            <h2>Build with confidence.<br /><span>Roof with purpose.</span></h2>
            <p>A clearer way to explore roofing options and plan your next project.</p>
            <a className="button button--lime" href="#calculator">Create my quotation <ArrowUpRight size={17} /></a>
          </div>
          <div className="closing-cta__mark"><Layers3 size={140} strokeWidth={0.8} /></div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="brand brand--footer">
          <span className="brand__mark"><Layers3 size={21} /></span>
          <span className="brand__words"><strong>PANDA <em>MABATI</em></strong><small>ROOFING SOLUTIONS</small></span>
        </a>
        <span>Thoughtful roofing. Clearer decisions.</span>
        <a href="mailto:pandaamabati@gmail.com">Contact Panda Mabati <ArrowUpRight size={14} /></a>
        <small>© {new Date().getFullYear()} Panda Mabati. Product availability and prices require confirmation.</small>
        <small>Sales: <a href={`mailto:${BUSINESS_CONTACT.salesEmail}`}>{BUSINESS_CONTACT.salesEmail}</a> · {BUSINESS_CONTACT.contactName} · <a href={`tel:${BUSINESS_CONTACT.phoneDial}`}>{BUSINESS_CONTACT.phoneDisplay}</a></small>
      </footer>
    </div>
  );
}

export default App;
