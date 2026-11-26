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
      "A tile-inspired roofing profile. Confirm the available finish and technical specifications with Panda Mabati.",
    use: "Residential homes",
    tone: "tile",
    published: true,
  },
  {
    id: "versatile",
    name: "Versatile",
    short: "A distinctive tiled finish",
    description:
      "A decorative roofing profile for traditional and contemporary homes. Confirm the exact profile and specifications with Panda Mabati.",
    use: "Signature homes",
    tone: "versatile",
    published: true,
  },
  {
    id: "box-profile",
    name: "Box Profile",
    short: "Clean, modern lines",
    description:
      "A geometric ribbed roofing profile for residential and commercial projects. Confirm the specifications with Panda Mabati.",
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
      "A tile-effect roofing option. Confirm the available finish, gauge and coverage with Panda Mabati.",
    use: "Design-led homes",
    tone: "star",
    published: true,
    sourceName: "Panda Mabati", sourceUrl: "https://pandamabati.com/",
  },
  {
    id: "corrugated", name: "Corrugated Roofing", short: "Classic wave profile",
    description: "Traditional corrugated roofing sheets. Confirm gauge, sheet length, effective cover and current selling unit before ordering.",
    use: "Residential & utility buildings", tone: "tile", published: true,
    category: "Roofing sheets", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "glazed-tile", name: "Glazed Tile", short: "Tile-effect metal roofing",
    description: "Tile-profile roofing listed in multiple colours, finishes and gauges. Published source prices are pending unit and current-price verification.",
    use: "Residential homes", tone: "star", published: true,
    category: "Tile-effect roofing", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "elegantile", name: "Elegantile", short: "Decorative tile profile",
    description: "A decorative tile-effect roofing option. Confirm colour, gauge, coverage and current price with the sales team.",
    use: "Design-led homes", tone: "versatile", published: true,
    category: "Tile-effect roofing", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "decra", name: "Decra Roofing", short: "Stone-coated style",
    description: "Decra roofing is included in the factory catalogue. Confirm the exact system, accessories, coverage and current quotation before purchase.",
    use: "Premium residential projects", tone: "box", published: true,
    category: "Specialty roofing", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "ridge-caps", name: "Ridge Caps", short: "Roof ridge finishing",
    description: "Ridge-cap and roll-top accessories are listed by the supplied Panda Mabati catalogue. Confirm profile compatibility, dimensions and price.",
    use: "Roof finishing", tone: "versatile", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati",
    sourceUrl: "https://pandamabati.com/", priceStatus: "pending",
  },
  {
    id: "flashings", name: "Roof Flashings", short: "Weatherproof roof junctions",
    description: "Roof flashing options are listed in the supplied Panda Mabati range. Confirm flashing type, dimensions, material and price.",
    use: "Roof junctions & edges", tone: "box", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati",
    sourceUrl: "https://pandamabati.com/", priceStatus: "pending",
  },
  {
    id: "gutters", name: "Rainwater Gutters", short: "Roof drainage accessories",
    description: "Gutters are listed in the supplied Panda Mabati range. Confirm material, section size, lengths, fittings and current price.",
    use: "Rainwater management", tone: "tile", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati",
    sourceUrl: "https://pandamabati.com/", priceStatus: "pending",
  },
  {
    id: "roll-tops", name: "Roll Tops", short: "Roof ridge finishing",
    description: "Roll-top ridge accessories are listed in 28G and 30G options. Confirm dimensions, material, finish and compatibility before ordering.",
    use: "Roof ridge finishing", tone: "versatile", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "valley-trays", name: "Valley Trays", short: "Roof valley drainage",
    description: "A Decra valley tray is listed in the factory accessories range. Confirm dimensions, material, profile compatibility and current price.",
    use: "Roof valleys & junctions", tone: "box", published: true,
    category: "Roofing accessories", sourceName: "Panda Mabati Factory",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", priceStatus: "pending",
  },
  {
    id: "roofing-fasteners", name: "Roofing Nails & Fasteners", short: "Fixings for roofing projects",
    description: "Roofing nails and fasteners are listed as accessories. Confirm fixing type, pack size, compatibility and price.",
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
