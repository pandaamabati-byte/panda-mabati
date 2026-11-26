import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Layers3, MessageCircle, ShieldCheck } from "lucide-react";
import type { Product } from "./productModel";
import {
  getProductDetails,
  getProductPriceInfo,
  getProductPriceOptions,
  getProductVariants,
  getVariantPriceLabel,
} from "./productDetails";
import { getVerifiedProductImage } from "./productImageLibrary";
import ProductProfileVisual from "./ProductProfileVisual";

type Props = {
  product: Product;
  onBack: () => void;
  onAddToQuote: (
    id: string,
    label?: string,
    price?: number,
    priceUnit?: "metre" | "piece" | "packet",
    sheetLengthM?: number,
  ) => void;
};

export default function ProductDetailPage({ product, onBack, onAddToQuote }: Props) {
  const variants = getProductVariants(product.id);
  const priceOptions = getProductPriceOptions(product.id);
  const details = getProductDetails(product);
  const priceInfo = getProductPriceInfo(product.id);

  const [colour, setColour] = useState(variants[0]?.colour ?? "");
  const [gauge, setGauge] = useState(variants[0]?.gauge ?? "G30");
  const [finish, setFinish] = useState(variants[0]?.finish ?? "");
  const [specialGauge, setSpecialGauge] = useState("G30");
  const [specialLength, setSpecialLength] = useState(product.id === "d-tile" ? 2 : 1);
  const [variantLength, setVariantLength] = useState(variants[0]?.sheetLengthM ?? 0);
  const [imageUnavailable, setImageUnavailable] = useState(false);

  const colours = [...new Set(variants.map((v) => v.colour))];
  const variantLengths = [...new Set(variants.filter((v) => v.colour === colour && v.sheetLengthM).map((v) => v.sheetLengthM as number))].sort((a,b)=>a-b);

  const gauges = [...new Set(variants.map((v) => v.gauge))];
  const finishes = [...new Set(variants.map((v) => v.finish))];
  const specialGauges = [...new Set(priceOptions.map((option) => option.gauge).filter(Boolean))] as string[];
  const specialLengths = [...new Set(
    priceOptions
      .filter((option) => !option.gauge || option.gauge === specialGauge)
      .map((option) => option.sheetLengthM),
  )].sort((a, b) => a - b);

  const selected =
    variants.find((v) => v.colour === colour && v.gauge === gauge && v.finish === finish && (v.sheetLengthM === undefined || v.sheetLengthM === variantLength)) ??
    variants.find((v) => v.colour === colour && v.gauge === gauge && v.finish === finish) ??
    variants[0];

  const selectedPriceOption =
    priceOptions.find((option) => option.sheetLengthM === specialLength && (!option.gauge || option.gauge === specialGauge)) ??
    priceOptions[0];

  const label = selected ? [selected.colour, selected.finish, selected.gauge, selected.sheetLengthM ? `${selected.sheetLengthM}m` : ""].filter(Boolean).join(" · ") : undefined;
  const optionLabel = variants.length ? label : selectedPriceOption?.label ?? priceInfo?.cartLabel;
  const selectedPrice = selected?.unitPriceKes ?? selectedPriceOption?.unitPriceKes ?? priceInfo?.unitPriceKes;
  const selectedPriceUnit = selected?.priceUnit ?? selectedPriceOption?.priceUnit ?? priceInfo?.priceUnit;
  const selectedLength = selected?.sheetLengthM ?? selectedPriceOption?.sheetLengthM;
  const priceDisplay = selected ? `${getVariantPriceLabel(selected)} · ${selected.sheetLengthM ? `${selected.sheetLengthM}m sheet` : ""}` : selectedPriceOption?.display ?? priceInfo?.display;
  const priceNote = selected?.minimumOrder ? `Viwanda listing minimum order: ${selected.minimumOrder}.` : selectedPriceOption?.minimumOrder ? `Marketplace minimum order: ${selectedPriceOption.minimumOrder}.` : priceInfo?.note;

  const verifiedImage = getVerifiedProductImage(product.id, selected?.id) ?? getVerifiedProductImage(product.id);
  const previewImage = verifiedImage?.src;
  const swatchColour = colour.toLowerCase().includes("red") ? "#a83228"
    : colour.toLowerCase().includes("blue") ? "#2778b9"
    : colour.toLowerCase().includes("green") ? "#39734a"
    : colour.toLowerCase().includes("brown") || colour.toLowerCase().includes("coffee") ? "#65432d"
    : colour.toLowerCase().includes("black") ? "#252525"
    : colour.toLowerCase().includes("grey") || colour.toLowerCase().includes("gray") || colour.toLowerCase().includes("silver") ? "#aeb7b3"
    : "#c3b7a4";

  const addSelectedProduct = () => onAddToQuote(
    product.id,
    optionLabel,
    selectedPrice,
    selectedPriceUnit,
    selectedLength,
  );

  return (
    <div className="site-shell product-detail-shell">
      <div className="announcement"><span className="announcement__dot" /> Panda Mabati · Product guide</div>
      <header className="site-header product-detail-header">
        <a href="#home" className="brand" onClick={onBack}>
          <span className="brand__mark"><Layers3 size={23} /></span>
          <span className="brand__words"><strong>PANDA <em>MABATI</em></strong><small>ROOFING SOLUTIONS</small></span>
        </a>
        <button className="button button--dark button--small" onClick={onBack}><ArrowLeft size={15} /> Back to products</button>
      </header>

      <main className="product-detail-main">
        <div className="product-detail-breadcrumb"><button onClick={onBack}>Products</button><span>/</span><strong>{product.name}</strong></div>

        <section className="product-detail-hero">
          <div className="product-detail-visual">
            {previewImage && !imageUnavailable ? (
              <div className="product-detail-photo-stage"><img src={previewImage} alt={verifiedImage?.alt ?? `${product.name} product visual`} key={previewImage} onError={() => setImageUnavailable(true)} /></div>
            ) : (
              <div className="product-detail-placeholder">
                <ProductProfileVisual productId={product.id} productName={product.name} tone={product.tone} />
                <small className="product-detail-colour-label">
                  {selected ? `Selected colour: ${colour}` : selectedPriceOption?.label ?? (variants.length ? "Select a product option" : "No colour variants")}
                </small>
              </div>
            )}
            <span className="product-detail-photo-note">
              {verifiedImage?.kind === "variant-photo" ? "VERIFIED VARIANT PHOTOGRAPH" : previewImage && !imageUnavailable ? "PANDA MABATI PRODUCT PHOTOGRAPH" : "PRODUCT VISUAL"}
            </span>
          </div>

          <div className="product-detail-copy">
            <span className="eyebrow">{product.category ?? "Roofing solutions"}</span>
            <h1>{product.name}</h1>
            <p className="product-detail-lead">{details.overview}</p>
            <div className="product-detail-pills">
              <span><ShieldCheck size={15} /> Specification-led selection</span>
              <span><Check size={15} />{priceInfo || variants.length ? "Published catalogue pricing" : "Quotation pricing"}</span>
            </div>
            {(priceDisplay || priceInfo) && (
              <div className="product-detail-price">
                <strong>{priceDisplay}</strong>
                {priceNote && <small>{priceNote}</small>}
              </div>
            )}
            <div className="product-detail-actions">
              <button className="button button--lime" onClick={addSelectedProduct}>
                {variants.length ? "Add selected option to cart / quotation" : priceOptions.length ? "Add selected length to quotation" : "Add product to quotation"}
                <ArrowUpRight size={16} />
              </button>
              <a className="button button--outline" href="https://wa.me/254705141152" target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Ask sales
              </a>
            </div>
          </div>
        </section>

        <section className="product-detail-section">
          <div className="product-detail-section-heading">
            <div>
              <span className="eyebrow">{variants.length ? "Choose your finish" : priceOptions.length ? "Select selling option" : priceInfo ? "Pricing & order" : "Product options"}</span>
              <h2>{variants.length ? "Explore available variants." : priceOptions.length ? "Choose gauge and sheet length." : priceInfo ? "Product pricing & order details" : "Add this product to your quotation."}</h2>
            </div>
            <p>
              {variants.length
                ? "Select a published colour, gauge and finish combination. A matching variant photograph is shown only when an exact manufacturer image is available."
                : priceOptions.length
                  ? "Choose the published gauge and sheet length where offered. These products do not have a colour selector; the quotation uses the selected selling unit and price."
                  : priceInfo
                    ? "This product is priced by its published selling unit, not by a colour selector. Set your quantity in the quotation builder."
                    : "Select this product and enter the required quantity in your quotation."}
            </p>
          </div>

          {variants.length ? (
            <div className="variant-panel">
              <div className="variant-controls">
                <label>Colour
                  <select value={colour} onChange={(e) => {
                    const v = variants.find((item) => item.colour === e.target.value);
                    if (v) { setColour(v.colour); setGauge(v.gauge); setFinish(v.finish); if (v.sheetLengthM) setVariantLength(v.sheetLengthM); }
                  }}>
                    {colours.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </label>
                <label>Gauge
                  <select value={gauge} onChange={(e) => {
                    const v = variants.find((item) => item.gauge === e.target.value);
                    if (v) { setColour(v.colour); setGauge(v.gauge); setFinish(v.finish); if (v.sheetLengthM) setVariantLength(v.sheetLengthM); }
                  }}>
                    {gauges.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </label>
                <label>Finish
                  <select value={finish} onChange={(e) => {
                    const v = variants.find((item) => item.finish === e.target.value);
                    if (v) { setColour(v.colour); setGauge(v.gauge); setFinish(v.finish); }
                  }}>
                    {finishes.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </label>
                {variantLengths.length > 0 && <label>Sheet length
                  <select value={String(variantLength)} onChange={(e) => setVariantLength(Number(e.target.value))}>{variantLengths.map((v)=><option key={v} value={v}>{v}m</option>)}</select>
                </label>}
              </div>
              <div className="variant-selection">
                <div className="variant-swatch" data-finish={finish.toLowerCase()} title={`Indicative colour swatch: ${colour}`} style={{ backgroundColor: swatchColour }}>
                  <span style={{ backgroundColor: swatchColour }} />
                </div>
                <div>
                  <span className="eyebrow">Selected option</span>
                  <h3>{label}</h3>
                  <p>{"Colour swatch is a visual guide. The displayed price is the published catalogue rate for this option."}</p>
                </div>
                <span className="variant-pending">{selected ? getVariantPriceLabel(selected) : "Catalogue price"}</span>
              </div>
              <div className="variant-list">
                {variants.map((v) => (
                  <button key={v.id} className={selected?.id === v.id ? "variant-chip variant-chip--active" : "variant-chip"} onClick={() => {
                    setColour(v.colour); setGauge(v.gauge); setFinish(v.finish); if (v.sheetLengthM) setVariantLength(v.sheetLengthM);
                  }}>
                    <span>{v.colour}</span><small>{v.finish} · {v.gauge}{v.sheetLengthM ? ` · ${v.sheetLengthM}m` : ""}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : priceOptions.length ? (
            <div className="variant-panel">
              <div className="variant-controls">
                {specialGauges.length > 0 && (
                  <label>Gauge
                    <select value={specialGauge} onChange={(e) => {
                      setSpecialGauge(e.target.value);
                      const nextLength = priceOptions.find((option) => option.gauge === e.target.value)?.sheetLengthM;
                      if (nextLength !== undefined) setSpecialLength(nextLength);
                    }}>
                      {specialGauges.map((v) => <option key={v}>{v}</option>)}
                    </select>
                  </label>
                )}
                <label>Sheet length
                  <select value={String(specialLength)} onChange={(e) => setSpecialLength(Number(e.target.value))}>
                    {specialLengths.map((v) => <option key={v} value={v}>{v}m</option>)}
                  </select>
                </label>
              </div>
              <div className="variant-selection">
                <div>
                  <span className="eyebrow">Selected selling option</span>
                  <h3>{selectedPriceOption?.label}</h3>
                  <p>{selectedPriceOption?.minimumOrder ? `Marketplace minimum order: ${selectedPriceOption.minimumOrder}.` : "No colour selector is shown for this product."}</p>
                </div>
                <span className="variant-pending">{selectedPriceOption?.display}</span>
              </div>
            </div>
          ) : (
            <div className="variant-empty">
              <Layers3 size={25} />
              <div>
                <strong>{priceInfo ? "Standard product selection" : "Product quotation"}</strong>
                <p>{priceInfo ? "No colour selector is used for this product. Its published price and selling unit are shown above; set your quantity in the quotation builder." : "Add this product to your quotation and specify the quantity required."}</p>
              </div>
            </div>
          )}
        </section>

        <section className="product-detail-lower">
          <article className="product-detail-info">
            <span className="eyebrow">Product overview</span>
            <h2>Made for your project.</h2>
            <p>{details.overview}</p>
            <ul>{details.benefits.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
          </article>
          <aside className="product-detail-info product-detail-specs">
            <span className="eyebrow">Before you order</span>
            <h2>Product specifications.</h2>
            <ul>{details.notes.map((item) => <li key={item}><ShieldCheck size={16} />{item}</li>)}</ul>
            <p className="product-detail-disclaimer">Catalogue and market prices are shown with their selling units. Delivery, installation and project-specific extras are calculated separately where applicable.</p>
          </aside>
        </section>
      </main>

      <footer className="product-detail-footer">
        <span>PANDA MABATI · ROOFING SOLUTIONS</span>
        <button onClick={onBack}>Explore more products <ArrowUpRight size={15} /></button>
      </footer>
    </div>
  );
}
