export type ProductImageAsset = {
  id: string;
  productId: string;
  variantId?: string;
  src: string;
  sourceUrl: string;
  sourceName: string;
  status: "verified" | "awaiting-verification";
  kind: "product-photo" | "variant-photo";
  alt: string;
  verifiedAt?: string;
  notes?: string;
};

/**
 * Central register for genuine Panda Mabati product photography.
 *
 * Only assets marked "verified" may be rendered as product photographs.
 * A source page existing is not proof that an image is genuine, current,
 * or matched to a particular colour/gauge/finish.
 */
export const PRODUCT_IMAGE_LIBRARY: ProductImageAsset[] = [
  {
    id: "box-profile-grey-matt-30g",
    productId: "box-profile",
    variantId: "box-5",
    src: "/images/products/box-profile-grey-matt-30g.jpg",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/product-category/box-profile-30g/",
    sourceName: "Panda Mabati Factory",
    status: "awaiting-verification",
    kind: "variant-photo",
    alt: "Box Profile Grey Matt 30G",
    notes: "Local file exists; original manufacturer provenance and exact variant match have not yet been verified.",
  },
  {
    id: "box-profile-sky-blue-gloss-30g",
    productId: "box-profile",
    variantId: "box-8",
    src: "/images/products/box-profile-sky-blue-gloss-30g.jpg",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/product-category/box-profile-30g/",
    sourceName: "Panda Mabati Factory",
    status: "awaiting-verification",
    kind: "variant-photo",
    alt: "Box Profile Sky Blue Gloss 30G",
    notes: "Local file exists; original manufacturer provenance and exact variant match have not yet been verified.",
  },
  {
    id: "box-profile-tile-red-gloss-30g",
    productId: "box-profile",
    variantId: "box-1",
    src: "/images/products/box-profile-tile-red-gloss-30g.jpg",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/product-category/box-profile-30g/",
    sourceName: "Panda Mabati Factory",
    status: "awaiting-verification",
    kind: "variant-photo",
    alt: "Box Profile Tile Red Gloss 30G",
    notes: "Local file exists; original manufacturer provenance and exact variant match have not yet been verified.",
  },
  {
    id: "d-tile-panda-confirmed-primary",
    productId: "d-tile",
    src: "https://storage.googleapis.com/takeapp/media/clvebadzw00020fl9dehabkv3.jpg",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/",
    sourceName: "Panda Mabati (owner-confirmed original image)",
    status: "verified",
    kind: "product-photo",
    alt: "Panda Mabati D-Tile roofing profile",
    verifiedAt: "2026-11-26",
    notes: "The site owner confirmed this is the original D-Tile product image; approved for product cards and product detail pages.",
  },
  {
    id: "box-profile-official-primary",
    productId: "box-profile",
    src: "https://pandamabati.com/wp-content/uploads/2026/06/download.jpg",
    sourceUrl: "https://pandamabati.com/",
    sourceName: "Panda Mabati",
    status: "verified",
    kind: "product-photo",
    alt: "Panda Mabati Box Profile roofing sheet",
    verifiedAt: "2026-11-26",
    notes: "Official homepage image linked beside the Box Profile Sheet product family; generic profile photo, not a colour-specific variant image.",
  },
  {
    id: "corrugated-official-primary",
    productId: "corrugated",
    src: "https://pandamabati.com/wp-content/uploads/2026/06/Corrugated-Roofing-Sheets.jpg",
    sourceUrl: "https://pandamabati.com/",
    sourceName: "Panda Mabati",
    status: "verified",
    kind: "product-photo",
    alt: "Panda Mabati Corrugated Roofing Sheets",
    verifiedAt: "2026-11-26",
    notes: "Official homepage image linked beside the Corrugated Roofing Sheets product family.",
  },
  {
    id: "startile-official-primary",
    productId: "startile",
    src: "https://pandamabati.com/wp-content/uploads/2026/06/download-1.jpg",
    sourceUrl: "https://pandamabati.com/",
    sourceName: "Panda Mabati",
    status: "verified",
    kind: "product-photo",
    alt: "Panda Mabati Startile Roofing Sheets",
    verifiedAt: "2026-11-26",
    notes: "Official homepage image linked beside the Startile Roofing Sheets product family.",
  },
  ...[
    ["d-tile", "D-Tile", "https://pandamabatifactory.co.ke/wp/"],
    ["versatile", "Versatile", "https://take.app/pandamabatiltd/c/cm7cwmwkb000ww4xpqnpb8of1"],
    ["box-profile", "Box Profile", "https://pandamabatifactory.co.ke/wp/product-category/box-profile-30g/"],
    ["corrugated", "Corrugated Roofing", "https://pandamabatifactory.co.ke/wp/"],
    ["startile", "StarTile", "https://pandamabatifactory.co.ke/wp/"],
    ["glazed-tile", "Glazed Tile", "https://pandamabatifactory.co.ke/wp/product/glazed-tile-c-grey-30g-matt/"],
    ["elegantile", "Elegantile", "https://pandamabatifactory.co.ke/wp/"],
    ["decra", "Decra Roofing", "https://pandamabatifactory.co.ke/wp/"],
    ["ridge-caps", "Ridge Caps", "https://pandamabatifactory.co.ke/wp/"],
    ["flashings", "Roof Flashings", "https://pandamabati.com/"],
    ["gutters", "Rainwater Gutters", "https://pandamabati.com/"],
    ["roll-tops", "Roll Tops", "https://pandamabatifactory.co.ke/wp/"],
    ["valley-trays", "Valley Trays", "https://pandamabatifactory.co.ke/wp/"],
    ["roofing-fasteners", "Roofing Nails and Fasteners", "https://pandamabatifactory.co.ke/wp/"],
  ].filter(([productId]) => !["box-profile", "corrugated", "startile"].includes(productId)).map(([productId, name, sourceUrl]) => ({
    id: productId + "-primary-pending",
    productId,
    src: "",
    sourceUrl,
    sourceName: productId === "flashings" || productId === "gutters" || productId === "roofing-fasteners" || productId === "versatile"
      ? "Panda Mabati"
      : "Panda Mabati Factory",
    status: "awaiting-verification" as const,
    kind: "product-photo" as const,
    alt: name + " product photograph",
    notes: "Product family is listed by the manufacturer or Panda sales catalogue, but no usable, rights-cleared product photograph has been verified for this storefront. Keep the product-specific profile visual until Panda supplies or approves an image.",
  })),
];

export function getVerifiedProductImage(
  productId: string,
  variantId?: string,
): ProductImageAsset | undefined {
  return PRODUCT_IMAGE_LIBRARY.find(
    (asset) =>
      asset.status === "verified" &&
      asset.src.trim().length > 0 &&
      asset.sourceUrl.trim().length > 0 &&
      asset.alt.trim().length > 0 &&
      asset.productId === productId &&
      (variantId ? asset.variantId === variantId : !asset.variantId),
  );
}

export const PRODUCT_IMAGE_TARGETS = [
  "d-tile", "versatile", "box-profile", "corrugated", "startile", "glazed-tile",
  "elegantile", "decra", "ridge-caps", "flashings", "gutters", "roll-tops",
  "valley-trays", "roofing-fasteners",
] as const;

export function getProductImageStatus(productId: string) {
  const assets = PRODUCT_IMAGE_LIBRARY.filter((asset) => asset.productId === productId);
  const verifiedCount = assets.filter((asset) => asset.status === "verified").length;
  const pendingCount = assets.filter((asset) => asset.status === "awaiting-verification").length;
  return { verifiedCount, pendingCount, hasGenuinePhoto: verifiedCount > 0, needsGenuinePhoto: verifiedCount === 0 };
}
