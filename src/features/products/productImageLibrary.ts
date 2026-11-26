import { SUPPLIED_PRODUCT_PHOTOS } from "./suppliedProductPhotos";

export type ProductImageAsset = {
  id: string; productId: string; variantId?: string; src: string; sourceUrl: string;
  sourceName: string; status: "verified" | "awaiting-verification";
  kind: "product-photo" | "variant-photo"; alt: string; verifiedAt?: string; notes?: string;
};

/** Genuine Panda Mabati imagery only. Unverified records never render as product photos. */
export const PRODUCT_IMAGE_LIBRARY: ProductImageAsset[] = [
  {
    id: "eurotile-burgundy-owner-photo", productId: "eurotile",
    src: SUPPLIED_PRODUCT_PHOTOS.eurotileBurgundy,
    sourceUrl: "https://pandamabati.com/", sourceName: "Panda Mabati · owner-supplied product catalogue",
    status: "verified", kind: "product-photo",
    alt: "Genuine burgundy Eurotile raised tile-profile metal roofing sheet",
    verifiedAt: "2026-11-27",
    notes: "Optimized crop from the owner-supplied Panda Mabati catalogue; approved for Eurotile family display. Burgundy is the only photo-confirmed colour.",
  },
  {
    id: "romantile-owner-supplied-production-photo", productId: "romantile",
    src: SUPPLIED_PRODUCT_PHOTOS.romantileCharcoal,
    sourceUrl: "https://pandamabati.com/", sourceName: "Panda Mabati · owner-supplied Romantile photograph",
    status: "verified", kind: "product-photo",
    alt: "Genuine charcoal Panda Romantile roofing profile on the production line",
    verifiedAt: "2026-11-27",
    notes: "Owner-supplied production photo cropped to the actual roof profile and optimized for the storefront.",
  },
  {
    id: "d-tile-panda-confirmed-primary", productId: "d-tile",
    src: "https://storage.googleapis.com/takeapp/media/clvebadzw00020fl9dehabkv3.jpg",
    sourceUrl: "https://pandamabatifactory.co.ke/wp/", sourceName: "Panda Mabati (owner-confirmed original image)",
    status: "verified", kind: "product-photo", alt: "Panda Mabati D-Tile roofing profile", verifiedAt: "2026-11-26",
  },
  {
    id: "box-profile-official-primary", productId: "box-profile",
    src: "https://pandamabati.com/wp-content/uploads/2026/06/download.jpg",
    sourceUrl: "https://pandamabati.com/", sourceName: "Panda Mabati",
    status: "verified", kind: "product-photo", alt: "Panda Mabati Box Profile roofing sheet", verifiedAt: "2026-11-26",
  },
  {
    id: "corrugated-official-primary", productId: "corrugated",
    src: "https://pandamabati.com/wp-content/uploads/2026/06/Corrugated-Roofing-Sheets.jpg",
    sourceUrl: "https://pandamabati.com/", sourceName: "Panda Mabati",
    status: "verified", kind: "product-photo", alt: "Panda Mabati Corrugated Roofing Sheets", verifiedAt: "2026-11-26",
  },
  {
    id: "startile-official-primary", productId: "startile",
    src: "https://pandamabati.com/wp-content/uploads/2026/06/download-1.jpg",
    sourceUrl: "https://pandamabati.com/", sourceName: "Panda Mabati",
    status: "verified", kind: "product-photo", alt: "Panda Mabati StarTile roofing sheets", verifiedAt: "2026-11-26",
  },
  ...[
    ["versatile", "Versatile"], ["glazed-tile", "Glazed Tile"], ["elegantile", "Elegantile"],
    ["decra", "Decra Roofing"], ["ridge-caps", "Ridge Caps"], ["flashings", "Roof Flashings"],
    ["gutters", "Rainwater Gutters"], ["roll-tops", "Roll Tops"], ["valley-trays", "Valley Trays"],
    ["roofing-fasteners", "Roofing Nails and Fasteners"],
  ].map(([productId, name]) => ({
    id: productId + "-primary-pending", productId, src: "",
    sourceUrl: "https://pandamabati.com/", sourceName: "Panda Mabati",
    status: "awaiting-verification" as const, kind: "product-photo" as const,
    alt: name + " product photograph",
    notes: "No verified matching photograph is registered yet; keep the product profile visual.",
  })),
];

export function getVerifiedProductImage(productId: string, variantId?: string): ProductImageAsset | undefined {
  return PRODUCT_IMAGE_LIBRARY.find((asset) =>
    asset.status === "verified" && asset.src.trim().length > 0 &&
    asset.sourceUrl.trim().length > 0 && asset.alt.trim().length > 0 &&
    asset.productId === productId && (variantId ? asset.variantId === variantId : !asset.variantId)
  );
}

export const PRODUCT_IMAGE_TARGETS = [
  "eurotile", "romantile", "d-tile", "versatile", "box-profile", "corrugated", "startile",
  "glazed-tile", "elegantile", "decra", "ridge-caps", "flashings", "gutters", "roll-tops",
  "valley-trays", "roofing-fasteners",
] as const;

export function getProductImageStatus(productId: string) {
  const assets = PRODUCT_IMAGE_LIBRARY.filter((asset) => asset.productId === productId);
  const verifiedCount = assets.filter((asset) => asset.status === "verified").length;
  const pendingCount = assets.filter((asset) => asset.status === "awaiting-verification").length;
  return { verifiedCount, pendingCount, hasGenuinePhoto: verifiedCount > 0, needsGenuinePhoto: verifiedCount === 0 };
}
