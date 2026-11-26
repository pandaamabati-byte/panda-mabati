export type Product = {
  id: string;
  name: string;
  short: string;
  description: string;
  use: string;
  tone: string;
  published: boolean;
  priceStatus?: "confirmed" | "pending";
  unitPriceKes?: number;
  priceUnit?: string;
  imageUrl?: string;
  sourceUrl?: string;
  effectiveCoverageM?: number;
  colours?: string[];
  gaugesMm?: number[];
  category?: string;
  sourceName?: string;
};

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "d-tile",
    name: "D-Tile",
    short: "Timeless roof character",
    description:
      "A tile-inspired roofing profile. Published market pricing is shown on the product page; add the required quantity to your Panda Mabati quotation.",
    use: "Residential homes",
    tone: "tile",
    published: true,
  },
  {
    id: "versatile",
    name: "Versatile",
    short: "A distinctive tiled finish",
    description:
      "A distinctive roofing profile for traditional and contemporary homes. Published G30 and G28 metre rates are shown on the product page.",
    use: "Signature homes",
    tone: "versatile",
    published: true,
  },
  {
    id: "box-profile",
    name: "Box Profile",
    short: "Clean, modern lines",
    description:
      "A geometric ribbed roofing profile with published 28G and 30G colour/finish options and metre-based catalogue rates. Select the required sheet length in your quotation.",
    use: "Modern homes & commercial",
    tone: "box",
    published: true,
    sourceName: "Panda Mabati", sourceUrl: "https://pandamabati.com/",
  },
  {
    id: "startile",
    name: "StarTile",
    short: "A statement roof finish",
    description:
      "A tile-effect roofing profile with factory-listed 28G and 30G colour/finish options and published metre rates.",
    use: "Design-led homes",
    tone: "star",
    published: true,
    sourceName: "Panda Mabati", sourceUrl: "https://pandamabati.com/",
  },
  {
    id: "corrugated", name: "Corrugated Roofing", short: "Classic wave profile",
    description: "Traditional corrugated roofing sheets with published 28G and 30G colour/finish options and metre-based pricing. Set sheet length in your quotation.",
    use: "Residential & utility buildings", tone: "tile", published: true,
    category: "Roofing sheets", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "glazed-tile", name: "Glazed Tile", short: "Tile-effect metal roofing",
    description: "Tile-profile roofing with factory-listed colours, finishes and gauges. Published rates are applied per metre in the quotation.",
    use: "Residential homes", tone: "star", published: true,
    category: "Tile-effect roofing", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "elegantile", name: "Elegantile", short: "Decorative tile profile",
    description: "A decorative tile-effect roofing option with factory-listed colour/gauge/finish combinations and published metre rates.",
    use: "Design-led homes", tone: "versatile", published: true,
    category: "Tile-effect roofing", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "decra", name: "Decra Roofing", short: "Stone-coated style",
    description: "Stone-coated style roofing with factory-listed Shingle Tile and Classic Tile options. Published catalogue pricing is shown on the product page.",
    use: "Premium residential projects", tone: "box", published: true,
    category: "Specialty roofing", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "ridge-caps", name: "Ridge Caps", short: "Roof ridge finishing",
    description: "Ridge-cap and Normal Ridge/Kofia accessories for roof ridge finishing. The published Normal Ridge/Kofia price is shown on the product page.",
    use: "Roof finishing", tone: "versatile", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati",
    sourceUrl: "https://pandamabati.com/", priceStatus: "pending",
  },
  {
    id: "flashings", name: "Roof Flashings", short: "Weatherproof roof junctions",
    description: "Roof flashing options for eaves, wall junctions and roof transitions. A Kenya market starting-price benchmark is shown; final price depends on flashing type and dimensions.",
    use: "Roof junctions & edges", tone: "box", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati",
    sourceUrl: "https://pandamabati.com/", priceStatus: "pending",
  },
  {
    id: "gutters", name: "Rainwater Gutters", short: "Roof drainage accessories",
    description: "PVC rainwater guttering is listed at KSh 400 per 4m length. Compatible fittings are priced separately.",
    use: "Rainwater management", tone: "tile", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati",
    sourceUrl: "https://pandamabati.com/", priceStatus: "pending",
  },
  {
    id: "roll-tops", name: "Roll Tops", short: "Roof ridge finishing",
    description: "Roll-top ridge accessories are listed in 28G and 30G options with published Panda Mabati Ltd retail prices.",
    use: "Roof ridge finishing", tone: "versatile", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "valley-trays", name: "Valley Trays", short: "Roof valley drainage",
    description: "A Decra valley tray is listed in the factory accessories range with its published catalogue price.",
    use: "Roof valleys & junctions", tone: "box", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "roofing-fasteners", name: "Roofing Nails & Fasteners", short: "Fixings for roofing projects",
    description: "Roofing nails and Decra maintenance accessories are listed with published catalogue prices. Select the appropriate fixing or maintenance item.",
    use: "Roof installation", tone: "star", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati",
    sourceUrl: "https://pandamabati.com/", priceStatus: "pending",
  },
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function normalizeProduct(
  id: string,
  data: Record<string, unknown>,
): Product | null {
  if (
    data.published !== true ||
    !isNonEmptyString(data.name) ||
    !isNonEmptyString(data.short) ||
    !isNonEmptyString(data.description) ||
    !isNonEmptyString(data.use) ||
    !isNonEmptyString(data.tone)
  ) {
    return null;
  }

  const product: Product = {
    id,
    name: data.name.trim(),
    short: data.short.trim(),
    description: data.description.trim(),
    use: data.use.trim(),
    tone: data.tone.trim(),
    published: true,
  };

  if (data.priceStatus === "confirmed" || data.priceStatus === "pending") {
    product.priceStatus = data.priceStatus;
  }

  if (
    data.priceStatus === "confirmed" &&
    isPositiveNumber(data.unitPriceKes)
  ) {
    product.unitPriceKes = data.unitPriceKes;
    if (isNonEmptyString(data.priceUnit)) product.priceUnit = data.priceUnit.trim();
  }

  if (isNonEmptyString(data.imageUrl)) product.imageUrl = data.imageUrl.trim();
  if (isNonEmptyString(data.sourceUrl)) product.sourceUrl = data.sourceUrl.trim();
  if (isNonEmptyString(data.category)) product.category = data.category.trim();
  if (isNonEmptyString(data.sourceName)) product.sourceName = data.sourceName.trim();

  if (isPositiveNumber(data.effectiveCoverageM)) {
    product.effectiveCoverageM = data.effectiveCoverageM;
  }

  if (
    Array.isArray(data.colours) &&
    data.colours.every(isNonEmptyString)
  ) {
    product.colours = data.colours;
  }

  if (
    Array.isArray(data.gaugesMm) &&
    data.gaugesMm.every(isPositiveNumber)
  ) {
    product.gaugesMm = data.gaugesMm;
  }

  return product;
}
