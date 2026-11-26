type Props = { productId: string; productName: string; tone?: string };
export default function ProductProfileVisual({ productId, productName, tone = "box" }: Props) {
  const id = productId.replace(/[^a-z0-9]/gi, "");
  const isTile = ["d-tile", "versatile", "startile", "glazed-tile", "elegantile", "decra"].includes(productId);
  const isWave = productId === "corrugated";
  const isAccessory = ["ridge-caps", "flashings", "gutters", "roll-tops", "valley-trays", "roofing-fasteners"].includes(productId);
  const ridgeLines = Array.from({ length: isWave ? 13 : isTile ? 9 : 11 }, (_, index) => {
    const x = 118 + index * (isWave ? 31 : isTile ? 43 : 35);
    let d = "M" + x + " 290 L" + (x + 9) + " 278 L" + (x + 9) + " 175 L" + (x + 18) + " 164 L" + (x + 18) + " 275";
    if (isWave) d = "M" + x + " 292 C" + (x + 8) + " 278 " + (x + 8) + " 244 " + (x + 15) + " 228 L" + (x + 15) + " 160";
    if (isTile) d = "M" + x + " 285 L" + (x + 16) + " 275 L" + (x + 16) + " 198 Q" + (x + 22) + " 180 " + (x + 32) + " 198 L" + (x + 32) + " 265";
    return <path key={index} d={d} fill="none" stroke="#e9eee9" strokeOpacity=".88" strokeWidth={isWave ? 5 : 3.5} />;
  });
  const panelFill = isAccessory ? "#82958b" : tone === "tile" ? "#9c7770" : tone === "star" ? "#7e8984" : tone === "versatile" ? "#8a9185" : "#899b91";
  const bgId = "bg-" + id, sheetId = "sheet-" + id, shadowId = "shadow-" + id;
  return (
    <svg className="product-profile-visual" viewBox="0 0 640 420" role="img" aria-label={productName + " product visual"} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4f5ef" /><stop offset="1" stopColor="#dce5dc" /></linearGradient>
        <linearGradient id={sheetId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c7d0c8" /><stop offset=".48" stopColor={panelFill} /><stop offset="1" stopColor="#53675e" /></linearGradient>
        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur stdDeviation="13" /></filter>
      </defs>
      <rect width="640" height="420" rx="22" fill={"url(#" + bgId + ")"} />
      <circle cx="510" cy="92" r="48" fill="#fff" opacity=".38" />
      <ellipse cx="340" cy="337" rx="230" ry="27" fill="#243c30" opacity=".18" filter={"url(#" + shadowId + ")"} />
      {isAccessory ? <g transform="translate(80 65)"><path d="M82 205 L430 205 L475 245 L126 245 Z" fill="#60746a" opacity=".35" /><path d="M100 170 L420 170 L470 212 L150 212 Z" fill={"url(#" + sheetId + ")"} stroke="#66796e" strokeWidth="3" /><path d="M100 170 L140 120 L180 170 L220 120 L260 170 L300 120 L340 170 L380 120 L420 170" fill="none" stroke="#e4ebe4" strokeWidth="12" strokeLinejoin="round" /><path d="M150 212 L470 212" stroke="#dce5dd" strokeWidth="4" /></g> : <g><path d="M88 288 L395 100 L570 185 L260 345 Z" fill="#263d31" opacity=".22" transform="translate(0 13)" /><path d="M82 270 L395 82 L570 166 L256 334 Z" fill={"url(#" + sheetId + ")"} stroke="#64786d" strokeWidth="3" />{ridgeLines}<path d="M82 270 L256 334 L570 166" fill="none" stroke="#e7eee8" strokeOpacity=".7" strokeWidth="5" /><path d="M395 82 L395 100 L570 185 L570 166 Z" fill="#53685d" opacity=".72" /><path d="M82 270 L395 82 L570 166 L256 334 Z" fill="none" stroke="#fff" strokeOpacity=".32" strokeWidth="2" /></g>}
      <g fill="#274435" opacity=".72"><rect x="42" y="34" width="7" height="7" rx="2" /><rect x="56" y="34" width="7" height="7" rx="2" /><rect x="70" y="34" width="7" height="7" rx="2" /></g>
      <text x="42" y="385" fill="#52665a" fontSize="14" fontWeight="700" letterSpacing="3">{productName.toUpperCase()}</text>
      <text x="598" y="385" textAnchor="end" fill="#75877b" fontSize="10" fontWeight="700" letterSpacing="2">PANDA / ROOFING</text>
    </svg>
  );
}