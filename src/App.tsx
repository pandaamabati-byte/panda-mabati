import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight, Check, ChevronDown, Download, Menu, ShieldCheck,
  Sparkles, X, Calculator, Layers3, Truck, BadgeCheck, Plus, Minus, Search,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { BUSINESS_CONTACT } from "./config/business";
import { BOX_PROFILE_VARIANTS } from "./features/products/boxProfileVariants";
import { FALLBACK_PRODUCTS, type Product } from "./features/products/productModel";
import { loadProducts } from "./services/products/catalogue";
import ProductDetailPage from "./features/products/ProductDetailPage";
import ProductProfileVisual from "./features/products/ProductProfileVisual";
import { getProductImageStatus, getVerifiedProductImage, PRODUCT_IMAGE_TARGETS } from "./features/products/productImageLibrary";
import { getProductStartingPrice, getProductStartingPriceUnit } from "./features/products/productDetails";
import "./App.css";

type QuoteLine = {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  sheetLengthM: number;
  unitPrice: string;
  variantLabel?: string;
  priceUnit?: "metre" | "piece" | "packet";
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
  priceUnit: productId === "box-profile" ? "metre" : undefined,
  quantity: 1,
  sheetLengthM: 2.5,
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

function ProductCardVisual({ product, index }: { product: Product; index: number }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const image = getVerifiedProductImage(product.id);
  const imageStatus = getProductImageStatus(product.id);
  const aiVisualIds = ["versatile", "glazed-tile", "elegantile", "decra", "ridge-caps", "flashings", "gutters", "roll-tops", "valley-trays", "roofing-fasteners"];
  const aiVisualSrc = aiVisualIds.includes(product.id) ? `/images/ai-product-visuals/${product.id}.svg` : "";
  const showPhoto = Boolean(image && !imageUnavailable);
  const showAiVisual = Boolean(aiVisualSrc && !imageUnavailable);

  return (
    <div className="product-card__image" data-product-id={product.id} data-image-status={showPhoto ? "verified-photo" : showAiVisual ? "product-visualisation" : "profile-visual"} data-photo-coverage={imageStatus.hasGenuinePhoto ? "verified" : "pending"}>
      {showPhoto && image ? (
        <img
          src={image.src}
          alt={image.alt}
          className="product-card__photo"
          loading="lazy"
          onError={() => setImageUnavailable(true)}
        />
      ) : showAiVisual ? (
        <img
          src={aiVisualSrc}
          alt={`Product visualisation of ${product.name}; confirm exact manufacturer profile and finish`}
          className="product-card__photo product-card__photo--visualisation"
          loading="lazy"
          onError={() => setImageUnavailable(true)}
        />
      ) : (
        <>
          <ProductProfileVisual productId={product.id} productName={product.name} tone={product.tone} />
          <span className="product-card__image-note">PROFILE VISUAL · PHOTO PENDING</span>
        </>
      )}
      {showPhoto && <span className="product-card__image-note product-card__image-note--photo">PANDA PRODUCT PHOTO</span>}
      {showAiVisual && <span className="product-card__image-note product-card__image-note--ai">PRODUCT VISUALISATION · CONFIRM SPEC</span>}
      <span className="product-card__number">0{index + 1}</span>
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroImageUnavailable, setHeroImageUnavailable] = useState(false);
  const [activeProductId, setActiveProductId] = useState(() => window.location.hash.startsWith("#product/") ? decodeURIComponent(window.location.hash.slice(9)) : "");
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [catalogueSource, setCatalogueSource] = useState<"fallback" | "firestore">("fallback");
  const [productSearch, setProductSearch] = useState("");
  const [productFilter, setProductFilter] = useState<"all" | "sheets" | "tiles" | "accessories">("all");

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
  useEffect(() => { const syncRoute=()=>setActiveProductId(window.location.hash.startsWith("#product/")?decodeURIComponent(window.location.hash.slice(9)):""); window.addEventListener("hashchange",syncRoute); return ()=>window.removeEventListener("hashchange",syncRoute); }, []);
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [customer, setCustomer] = useState("");
  const [project, setProject] = useState("");
  const [county, setCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const quote = useMemo(() => {
    const totalQuantity = lines.reduce((sum, line) => {
      const quantity = Math.max(0, Number(line.quantity) || 0);
      if (line.priceUnit !== "metre") return sum;
      const length = Math.max(0, Number(line.sheetLengthM) || 0);
      return sum + quantity * length;
    }, 0);

    const hasMissingPrice = lines.some((line) => {
      if (line.quantity <= 0) return false;
      if (line.productId === "box-profile" && line.variantId) {
        return !BOX_PROFILE_VARIANTS.find((item) => item.id === line.variantId);
      }
      const rate = Number(line.unitPrice);
      return line.unitPrice.trim() === "" || !Number.isFinite(rate) || rate < 0;
    });

    const pricedTotal = lines.reduce((sum, line) => {
      // Published factory rates are applied to selected Box Profile lengths.
      if (line.productId === "box-profile" && line.variantId) {
        const variant = BOX_PROFILE_VARIANTS.find((item) => item.id === line.variantId);
        return sum + (variant ? Math.max(0, Number(line.quantity) || 0) * Math.max(0, Number(line.sheetLengthM) || 0) * variant.ratePerM : 0);
      }

      const rate = Number(line.unitPrice);
      if (
        line.unitPrice.trim() === "" ||
        !Number.isFinite(rate) ||
        rate < 0
      ) return sum;

      const quantity = Math.max(0, Number(line.quantity) || 0);
      return sum + quantity * (line.priceUnit === "metre" ? Math.max(0, Number(line.sheetLengthM) || 0) : 1) * rate;
    }, 0);

    return { totalQuantity, hasMissingPrice, pricedTotal };
  }, [lines]);

  const updateLine = (id: string, patch: Partial<QuoteLine>) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  };

  const addLine = () => setLines((current) => [...current, makeLine("box-profile")]);
  const removeLine = (id: string) =>
    setLines((current) =>
      current.filter((line) => line.id !== id),
    );

  const downloadQuote = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const left = 14;
    const right = pageWidth - 14;
    const contentWidth = right - left;
    const quoteDate = new Date();
    const expiryDate = new Date(quoteDate);
    expiryDate.setDate(expiryDate.getDate() + 14);
    const dateLabel = (date: Date) => date.toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" });
    const quoteNumber = `PM-${quoteDate.getFullYear()}${String(quoteDate.getMonth()+1).padStart(2,"0")}-${String(quoteDate.getDate()).padStart(2,"0")}-${String(quoteDate.getTime()).slice(-5)}`;
    const green: [number, number, number] = [18, 53, 43];
    const lime: [number, number, number] = [194, 220, 77];
    let y = 12;

    // Branded quotation masthead, styled to follow the supplied Panda Mabati reference.
    doc.setFillColor(...green);
    doc.rect(0, 0, pageWidth, 39, "F");
    doc.setFillColor(...lime);
    doc.rect(0, 39, pageWidth, 2, "F");
    doc.setTextColor(255,255,255);
    doc.setFont("helvetica","bold");
    doc.setFontSize(20);
    doc.text("PANDA MABATI", left, 18);
    doc.setFont("helvetica","normal");
    doc.setFontSize(8);
    doc.text("ROOFING SOLUTIONS  |  WE REPRESENT QUALITY", left, 25);
    doc.text(BUSINESS_CONTACT.phoneDisplay, left, 31);
    doc.setFont("helvetica","bold");
    doc.setFontSize(18);
    doc.text("QUOTATION", right, 17, { align: "right" });
    doc.setFont("helvetica","normal");
    doc.setFontSize(8);
    doc.text(`Quote No: ${quoteNumber}`, right, 24, { align: "right" });
    doc.text(`Date: ${dateLabel(quoteDate)}`, right, 29, { align: "right" });
    doc.text(`Valid until: ${dateLabel(expiryDate)}`, right, 34, { align: "right" });

    y = 49;
    doc.setTextColor(...green);
    doc.setFont("helvetica","bold");
    doc.setFontSize(9);
    doc.text("CUSTOMER DETAILS", left, y);
    doc.text("PROJECT / DELIVERY DETAILS", 112, y);
    y += 3;
    doc.setDrawColor(205,215,207);
    doc.line(left,y,right,y);
    y += 7;
    doc.setTextColor(45,55,50);
    doc.setFont("helvetica","normal");
    doc.setFontSize(8);
    doc.text(`Customer: ${customer.trim() || "Not provided"}`, left, y);
    doc.text(`Project: ${project.trim() || "Not provided"}`, 112, y);
    y += 6;
    doc.text(`Phone: ${phone.trim() || "Not provided"}`, left, y);
    doc.text(`Location: ${county.trim() || "Not provided"}`, 112, y);
    y += 10;

    // Item table: product attributes and length-based pricing remain explicit.
    const columns = [
      { title: "No.", x: left + 2, w: 8 },
      { title: "TYPE / DESCRIPTION", x: left + 12, w: 48 },
      { title: "COLOUR / GAUGE", x: left + 62, w: 31 },
      { title: "LENGTH", x: left + 95, w: 16 },
      { title: "PCS", x: left + 113, w: 10 },
      { title: "PRICE", x: left + 125, w: 21 },
      { title: "AMOUNT (KSh)", x: right - 2, w: 27 },
    ];
    const drawTableHeader = () => {
      doc.setFillColor(...green);
      doc.rect(left,y,contentWidth,9,"F");
      doc.setTextColor(255,255,255);
      doc.setFont("helvetica","bold");
      doc.setFontSize(6.5);
      columns.forEach((col,index) => doc.text(col.title, index===6 ? col.x : col.x, y+5.8, { align: index>=4 ? "right" : "left" }));
      y += 9;
    };
    drawTableHeader();
    doc.setFont("helvetica","normal");
    doc.setFontSize(7.2);
    lines.forEach((line,index) => {
      const product = products.find((item) => item.id === line.productId);
      const qty = Math.max(0, Number(line.quantity)||0);
      const variant = line.productId === "box-profile" ? BOX_PROFILE_VARIANTS.find((item) => item.id === line.variantId) : undefined;
      const enteredRate = Number(line.unitPrice);
      const hasRate = Boolean(variant) || (line.unitPrice.trim() !== "" && Number.isFinite(enteredRate) && enteredRate >= 0);
      const rate = variant ? variant.ratePerM : hasRate ? enteredRate : null;
      const length = line.priceUnit === "metre" ? line.sheetLengthM : null;
      const amount = rate === null ? null : qty * (length ?? 1) * rate;
      const details = variant ? [variant.colour,variant.gauge].filter(Boolean).join(" / ") : (line.variantLabel || "To be confirmed");
      const rowHeight = 12;
      if (y + rowHeight > pageHeight - 48) { doc.addPage(); y=18; drawTableHeader(); }
      if(index%2===0){doc.setFillColor(246,248,244);doc.rect(left,y,contentWidth,rowHeight,"F");}
      doc.setTextColor(40,48,43);
      doc.text(String(index+1),columns[0].x,y+7);
      doc.text(doc.splitTextToSize(product?.name ?? "Roofing product",columns[1].w)[0],columns[1].x,y+7);
      doc.text(doc.splitTextToSize(details,columns[2].w)[0],columns[2].x,y+7);
      doc.text(length===null ? "—" : `${length}m`,columns[3].x+columns[3].w,y+7,{align:"right"});
      doc.text(String(qty),columns[4].x+columns[4].w,y+7,{align:"right"});
      doc.text(rate===null ? "Confirm" : `${money(rate)}${line.priceUnit==="metre" ? "/m" : ""}`,columns[5].x+columns[5].w,y+7,{align:"right"});
      doc.text(amount===null ? "Confirm" : money(amount).replace("Ksh","").trim(),columns[6].x,y+7,{align:"right"});
      doc.setDrawColor(220,226,219);
      doc.line(left,y+rowHeight,right,y+rowHeight);
      y += rowHeight;
    });

    y += 8;
    const totalLabel = quote.hasMissingPrice ? "PRICED ITEMS SUBTOTAL" : "SUBTOTAL";
    doc.setTextColor(...green);
    doc.setFont("helvetica","bold");
    doc.setFontSize(9);
    doc.text(totalLabel,right-55,y);
    doc.text(money(quote.pricedTotal),right,y,{align:"right"});
    y += 7;
    doc.setFont("helvetica","normal");
    doc.setFontSize(8);
    doc.setTextColor(65,75,68);
    doc.text("VAT / taxes: Not included — confirm applicable treatment with Panda Mabati.",right-95,y);
    y += 8;
    doc.setFillColor(239,244,232);
    doc.roundedRect(right-75,y-5,75,13,2,2,"F");
    doc.setFont("helvetica","bold");
    doc.setFontSize(10);
    doc.setTextColor(...green);
    doc.text("TOTAL (BEFORE TAX)",right-71,y+3);
    doc.text(money(quote.pricedTotal),right-3,y+3,{align:"right"});
    y += 18;

    doc.setFont("helvetica","bold");
    doc.setFontSize(8);
    doc.setTextColor(...green);
    doc.text("TERMS & CUSTOMER DECLARATION",left,y);
    y += 5;
    doc.setFont("helvetica","normal");
    doc.setFontSize(7.2);
    doc.setTextColor(65,75,68);
    const terms = quote.hasMissingPrice
      ? "This is a preliminary quotation: some selected products do not yet have a confirmed unit rate. Final pricing, stock, colour, gauge, delivery, taxes and specifications must be confirmed by Panda Mabati before an order is accepted."
      : "This quotation is based on the selected products, options, quantities and entered rates. Stock, final specifications, delivery charges, applicable taxes and the final order total are subject to confirmation by Panda Mabati.";
    const termLines = doc.splitTextToSize(terms,contentWidth);
    doc.text(termLines,left,y);
    y += termLines.length*4+7;
    if(notes.trim()){
      doc.setFont("helvetica","bold");doc.setTextColor(...green);doc.text("ADDITIONAL NOTES",left,y);y+=5;
      doc.setFont("helvetica","normal");doc.setTextColor(65,75,68);
      const noteLines=doc.splitTextToSize(notes.trim(),contentWidth);doc.text(noteLines,left,y);y+=noteLines.length*4+7;
    }
    doc.setDrawColor(190,202,192);
    doc.line(left,y,right,y);
    y+=7;
    doc.setFont("helvetica","bold");doc.setTextColor(...green);doc.setFontSize(7.5);
    doc.text("CUSTOMER ACCEPTANCE",left,y);
    doc.text("FOR PANDA MABATI",112,y);
    y+=13;
    doc.setDrawColor(130,145,135);
    doc.line(left,y,right-88,y);
    doc.line(112,y,right,y);
    y+=4;
    doc.setFont("helvetica","normal");doc.setTextColor(90,100,93);doc.setFontSize(6.5);
    doc.text("Name / Signature / Date",left,y);
    doc.text("Authorised signature / Date",112,y);

    // Repeated footer on every page; no unverified bank or M-Pesa details are invented.
    const pageCount=doc.getNumberOfPages();
    for(let page=1;page<=pageCount;page++){
      doc.setPage(page);
      doc.setDrawColor(190,202,192);
      doc.line(left,pageHeight-14,right,pageHeight-14);
      doc.setFont("helvetica","normal");doc.setFontSize(6.5);doc.setTextColor(105,115,108);
      doc.text(`Panda Mabati | ${BUSINESS_CONTACT.salesEmail} | ${BUSINESS_CONTACT.phoneDisplay}`,left,pageHeight-9);
      doc.text(`Page ${page} of ${pageCount}`,right,pageHeight-9,{align:"right"});
    }
    doc.save(`Panda-Mabati-Quotation-${quoteDate.toISOString().slice(0,10)}.pdf`);
  };

  const orderMessage = [
    "Hello Panda Mabati, I would like to proceed with an order request.",
    customer.trim() ? `Customer: ${customer.trim()}` : "",
    project.trim() ? `Project: ${project.trim()}` : "",
    county.trim() ? `Delivery / project location: ${county.trim()}` : "",
    phone.trim() ? `Customer phone: ${phone.trim()}` : "",
    "Selected products:",
    ...lines.map((line,index)=>{
      const product=products.find(item=>item.id===line.productId);
      const variant=line.productId==="box-profile"?BOX_PROFILE_VARIANTS.find(item=>item.id===line.variantId):undefined;
      const option=variant?[variant.colour,variant.finish,variant.gauge].join(" · "):line.variantLabel;
      return `${index+1}. ${product?.name??"Roofing product"}${option?` — ${option}`:""} | Quantity: ${line.quantity}${line.priceUnit==="metre"?` ${Number(line.quantity)===1?"sheet":"sheets"} × ${line.sheetLengthM}m`:""}`;
    }),
    notes.trim() ? `Project notes: ${notes.trim()}` : "",
    "Please confirm stock, final specifications, delivery cost and the official order total before payment."
  ].filter(Boolean).join("\n");
  const orderWhatsAppUrl=`https://wa.me/254705141152?text=${encodeURIComponent(orderMessage)}`;

  const navLinks = [
    ["Home", "#home"],
    ["Roofing", "#roofing"],
    ["Products", "#roofing"],
    ["Calculator", "#calculator"],
  ];

  const visibleProducts = useMemo(() => {
    const query = productSearch.trim().toLocaleLowerCase();
    return products.map((product, index) => ({ product, index })).filter(({ product }) => {
      const isAccessory = product.category === "Roofing accessories" || ["ridge-caps", "flashings", "gutters", "roll-tops", "valley-trays", "roofing-fasteners"].includes(product.id);
      const isTile = ["d-tile", "versatile", "startile", "glazed-tile", "elegantile", "decra"].includes(product.id);
      const categoryMatch = productFilter === "all" || (productFilter === "accessories" && isAccessory) || (productFilter === "tiles" && isTile && !isAccessory) || (productFilter === "sheets" && !isTile && !isAccessory);
      const searchMatch = !query || [product.name, product.short, product.description, product.use, product.category].filter(Boolean).join(" ").toLocaleLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [products, productSearch, productFilter]);
  const activeProduct = products.find((product) => product.id === activeProductId);
  if (activeProduct) return <ProductDetailPage key={activeProduct.id} product={activeProduct} onBack={() => { window.location.hash = "#roofing"; }} onAddToQuote={(productId, variantLabel, price, priceUnit, sheetLengthM) => { const baseLine = makeLine(productId); const boxVariant = productId === "box-profile" ? BOX_PROFILE_VARIANTS.find((item) => `${item.colour} · ${item.finish} · ${item.gauge}` === variantLabel) : undefined; setLines((current) => [...current, { ...baseLine, variantId: boxVariant?.id, priceUnit: priceUnit ?? (boxVariant ? "metre" : undefined), sheetLengthM: sheetLengthM ?? baseLine.sheetLengthM, variantLabel, unitPrice: price === undefined ? "" : String(price) }]); window.location.hash = "#calculator"; }} />;

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
              {heroImageUnavailable ? (
                <div className="hero__photo-fallback" role="img" aria-label="Illustrated contemporary home with a metal roof">
                  <RoofArtwork tone="versatile" />
                  <span>ROOFING INSPIRATION</span>
                </div>
              ) : (
                <img
                  className="hero__photo"
                  src="https://pandamabati.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-06-at-7.53.20-PM-1-1024x768.jpeg"
                  alt="Panda Mabati residential roofing project showing a completed multi-section tile-profile roof on a modern family home"
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setHeroImageUnavailable(true)}
                />
              )}
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
            <p>Start with the look you love. Select a profile to add it to your cart and quotation.</p>
          </div>
          <div className="catalogue-tools" aria-label="Find products">
            <label className="catalogue-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search roofing products</span>
              <input type="search" value={productSearch} onChange={(event) => setProductSearch(event.target.value)} placeholder="Search profiles, tiles and accessories" />
              {productSearch && <button type="button" onClick={() => setProductSearch("")} aria-label="Clear product search"><X size={16} /></button>}
            </label>
            <div className="catalogue-filters" role="group" aria-label="Filter product category">
              {[{id:"all",label:"All products"},{id:"sheets",label:"Roofing sheets"},{id:"tiles",label:"Tile profiles"},{id:"accessories",label:"Accessories"}].map((filter) => (
                <button type="button" key={filter.id} className={productFilter === filter.id ? "catalogue-filter catalogue-filter--active" : "catalogue-filter"} aria-pressed={productFilter === filter.id} onClick={() => setProductFilter(filter.id as "all" | "sheets" | "tiles" | "accessories")}>{filter.label}</button>
              ))}
            </div>
            <p className="catalogue-results" aria-live="polite">Showing {visibleProducts.length} of {products.length} products</p>
            <p className="catalogue-image-coverage">Genuine Panda photos: {PRODUCT_IMAGE_TARGETS.filter((id) => getProductImageStatus(id).hasGenuinePhoto).length} of {PRODUCT_IMAGE_TARGETS.length} product families. Other cards show product-specific profile visuals until approved photographs are available.</p>
          </div>
          <div className="product-grid">
            {visibleProducts.map(({ product, index }) => (
              <article className="product-card" key={product.id}>
                <ProductCardVisual product={product} index={index} />
                <div className="product-card__body">
                  <div className="product-card__topline"><span>{product.use}</span><BadgeCheck size={16} /></div>
                  <h3><button className="product-card__title-button" onClick={() => { window.location.hash = `#product/${product.id}`; }}>{product.name}</button></h3>
                  <p className="product-card__short">{product.short}</p>
                  {getProductStartingPrice(product.id)!==undefined&&<p className="product-card__price">From KSh {getProductStartingPrice(product.id)!.toLocaleString("en-KE")} / {getProductStartingPriceUnit(product.id)==="metre"?"m":"piece"} · published catalogue</p>}
                  {product.id==="d-tile"&&<p className="product-card__price">From KSh 1,130 · 2m packet</p>}
                  {product.id==="versatile"&&<p className="product-card__price">From KSh 630 / m · G30</p>}
                  {product.id==="gutters"&&<p className="product-card__price">KSh 400 · 4m PVC gutter</p>}
                  {product.id==="flashings"&&<p className="product-card__price">From KSh 500 / piece · market guide</p>}
                  <p className="product-card__description">{product.description}</p>
                  <button className="product-card__details" onClick={() => { window.location.hash = `#product/${product.id}`; }}>View product details <ArrowUpRight size={15} /></button>
                  <button
                    className="product-card__link"
                    onClick={() => { window.location.hash = `#product/${product.id}`; }}
                  >
                    Configure quotation <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <div className="catalogue-empty" role="status">
              <strong>No matching products found.</strong>
              <p>Try another search term or view all products.</p>
              <button type="button" onClick={() => { setProductSearch(""); setProductFilter("all"); }}>Clear filters</button>
            </div>
          )}
          <p className="catalogue-note">
            {catalogueSource === "firestore"
              ? "Live catalogue connected; Panda Mabati product groups are shown alongside live catalogue records. "
              : "Showing the local catalogue until the live catalogue is available. "}
            Products without verified photography use a dedicated product visual until an approved product photograph is added. Published catalogue prices are displayed on product pages; project totals include selected quantities and exclude delivery unless stated.
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
              {products.map((product) => (
                <a href={`#product/${product.id}`} className="product-feature__item" key={product.id}>
                  <span className="product-feature__icon"><Layers3 size={22} /></span>
                  <strong>{product.name}</strong>
                  <small>{product.short}</small>
                  <ArrowUpRight className="product-feature__arrow" size={17} />
                </a>
              ))}
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
                <div><span className="builder-step">01</span><div><h3>Your cart & quotation</h3><p>Add products, select options and set your required quantities.</p></div></div>
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
                  const hasRate = Boolean(variant) || (line.unitPrice.trim() !== "" &&
                    Number.isFinite(manualRate) &&
                    manualRate >= 0);
                  const rate = manualRate;
                  const effectiveRate = variant ? variant.ratePerM : rate;
                  const lineTotal = hasRate
                    ? Math.max(0, Number(line.quantity) || 0) * (line.priceUnit === "metre" ? line.sheetLengthM : 1) * effectiveRate
                    : null;
                  return (
                    <div className="quote-line" key={line.id}>
                      {(product?.imageUrl || variant?.image) && <img className="quote-line__thumbnail" src={variant?.image ?? product?.imageUrl} alt={product?.name ?? "Selected roofing product"} loading="lazy" />}
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
                                  priceUnit: productId === "box-profile" ? "metre" : undefined,
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
                        <label>{line.priceUnit === "metre" ? "Number of sheets" : "Quantity"}
                          <div className="quantity-control">
                            <button aria-label="Decrease quantity" onClick={() => updateLine(line.id, { quantity: Math.max(0, line.quantity - 1) })}><Minus size={14} /></button>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={line.quantity}
                              onChange={(e) => updateLine(line.id, {
                                quantity: Math.max(0, Number(e.target.value) || 0),
                              })}
                            />
                            <button aria-label="Increase quantity" onClick={() => updateLine(line.id, { quantity: line.quantity + 1 })}><Plus size={14} /></button>
                          </div>
                        </label>
                        {line.priceUnit === "metre" && (
                          <label>Length per sheet (metres)
                            <input
                              type="number"
                              min="0.5"
                              max="12"
                              step="0.1"
                              value={line.sheetLengthM}
                              onChange={(e) => updateLine(line.id, {
                                sheetLengthM: Math.min(12, Math.max(0.5, Number(e.target.value) || 0.5)),
                              })}
                            />
                            <div className="length-presets" aria-label="Common sheet lengths">
                              {[2, 2.5, 3].map((length) => (
                                <button key={length} type="button" className={line.sheetLengthM === length ? "length-preset length-preset--active" : "length-preset"} aria-pressed={line.sheetLengthM === length} onClick={() => updateLine(line.id, { sheetLengthM: length })}>{length}m</button>
                              ))}
                            </div>
                          </label>
                        )}
                        <label>{line.priceUnit === "metre" ? "Rate (KES / metre)" : "Unit rate (KES)"}
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={variant ? String(variant.ratePerM) : line.unitPrice}
                            onChange={(e) => updateLine(line.id, { unitPrice: e.target.value })}
                            placeholder={line.priceUnit === "metre" ? "Catalogue rate per metre" : "Enter unit rate"}
                            disabled={Boolean(variant)}
                          />
                        </label>
                      </div>
                      <div className="quote-line__bottom">
                        <span>
                          {variant
                            ? `${variant.colour} · ${variant.finish} · ${variant.gauge}`
                            : line.variantLabel || product?.short}
                        </span>
                        <strong>{lineTotal === null ? "Price to be confirmed" : money(lineTotal)}</strong>
                        {line.priceUnit === "metre" && hasRate && <small className="quote-line__calculation">{money(effectiveRate)} / m × {line.sheetLengthM} m × {line.quantity} {line.quantity === 1 ? "sheet" : "sheets"}</small>}
                        <button className="remove-line" onClick={() => removeLine(line.id)} aria-label={`Remove ${product?.name ?? "product"}`}><X size={15} /></button>
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
              <div className="summary-metric"><span>Total roofing sheet length</span><strong>{quote.totalQuantity.toLocaleString("en-KE")} m</strong><small>Across all selected per-metre roofing products</small></div>
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
              <a className="button button--dark button--full order-request-button" href={orderWhatsAppUrl} target="_blank" rel="noreferrer" aria-label="Proceed with an order request on WhatsApp"><ArrowUpRight size={17} /> Proceed to order request</a>
              <p className="order-request-note">This sends your selected cart to Panda Mabati on WhatsApp. Your order is confirmed only after our team verifies stock, specifications, delivery and final pricing.</p>
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
        <div className="site-footer__main">
          <section className="site-footer__brand">
            <a href="#home" className="brand brand--footer" aria-label="Panda Mabati home">
              <span className="brand__mark"><Layers3 size={22} /></span>
              <span className="brand__words"><strong>PANDA <em>MABATI</em></strong><small>ROOFING SOLUTIONS</small></span>
            </a>
            <p>Thoughtful roofing. Clearer decisions.</p>
            <p className="site-footer__description">Explore roofing options, compare finishes, and plan your project with confidence.</p>
          </section>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <h2>Explore</h2>
            <a href="#home">Home</a>
            <a href="#roofing">Roofing products</a>
            <a href="#calculator">Roof calculator</a>
            <a href="#about">About Panda Mabati</a>
          </nav>
          <section className="site-footer__contact">
            <h2>Talk to our team</h2>
            <p>Need help choosing roofing sheets for your project? Contact our sales team.</p>
            <a className="site-footer__contact-link" href={`mailto:${BUSINESS_CONTACT.salesEmail}`}>{BUSINESS_CONTACT.salesEmail}</a>
            <a className="site-footer__contact-link" href={`tel:${BUSINESS_CONTACT.phoneDial}`}>{BUSINESS_CONTACT.contactName} · {BUSINESS_CONTACT.phoneDisplay}</a>
            <a className="site-footer__contact-button" href="https://wa.me/254705141152" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </section>
          <section className="site-footer__social">
            <h2>Stay connected</h2>
            <p>Follow the platforms you use. Our official social accounts will be added when available.</p>
            <div className="site-footer__social-links">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f <span>Facebook</span></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">◎ <span>Instagram</span></a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok">♪ <span>TikTok</span></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">▶ <span>YouTube</span></a>
              <a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer" aria-label="WhatsApp">W <span>WhatsApp</span></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in <span>LinkedIn</span></a>
              <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">X <span>X</span></a>
            </div>
          </section>
        </div>
        <div className="site-footer__bottom">
          <small>© {new Date().getFullYear()} Panda Mabati. All rights reserved.</small>
          <small>Product availability and prices require confirmation.</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
