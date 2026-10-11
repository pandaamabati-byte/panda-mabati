export type Product = {
  id: string;
  name: string;
  short: string;
  description: string;
  use: string;
  tone: string;
  published: boolean;
  unitPriceKes?: number;
  effectiveCoverageM?: number;
  colours?: string[];
  gaugesMm?: number[];
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

  if (isPositiveNumber(data.unitPriceKes)) {
    product.unitPriceKes = data.unitPriceKes;
  }

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
