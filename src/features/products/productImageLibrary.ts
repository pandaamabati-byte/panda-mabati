import type { Product } from "./productModel";

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
  ...[
    ["d-tile", "D-Tile", "https://pandamabatifactory.co.ke/wp/"],
    ["versatile", "Versatile", "https://pandamabati.com/"],
    ["box-profile", "Box Profile", "https://pandamabatifactory.co.ke/wp/product-category/box-profile-30g/"],
    ["corrugated", "Corrugated Roofing", "https://pandamabatifactory.co.ke/wp/"],
    ["startile", "StarTile", "https://pandamabatifactory.co.ke/wp/"],
    ["glazed-tile", "Glazed Tile", "https://pandamabatifactory.co.ke/wp/"],
    ["elegantile", "Elegantile", "https://pandamabatifactory.co.ke/wp/"],
    ["decra", "Decra Roofing", "https://pandamabatifactory.co.ke/wp/"],
    ["ridge-caps", "Ridge Caps and Roll Tops", "https://pandamabatifactory.co.ke/wp/"],
    ["flashings", "Roof Flashings", "https://pandamabati.com/"],
    ["gutters", "Rainwater Gutters", "https://pandamabati.com/"],
    ["roll-tops", "Roll Tops", "https://pandamabatifactory.co.ke/wp/"],
    ["valley-trays", "Valley Trays", "https://pandamabatifactory.co.ke/wp/"],
    ["roofing-fasteners", "Roofing Nails and Fasteners", "https://pandamabati.com/"],
  ].map(([productId, name, sourceUrl]) => ({
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
    notes: "Manufacturer source identified; a genuine image has not yet been verified and approved for this product.",
  })),
];

export function getVerifiedProductImage(
  productId: string,
  variantId?: string,
): ProductImageAsset | undefined {
  return PRODUCT_IMAGE_LIBRARY.find(
    (asset) =>
      asset.status === "verified" &&
      asset.productId === productId &&
      (variantId ? asset.variantId === variantId : !asset.variantId),
  );
}

export function getProductImageStatus(productId: string) {
  const assets = PRODUCT_IMAGE_LIBRARY.filter((asset) => asset.productId === productId);
  return {
    verifiedCount: assets.filter((asset) => asset.status === "verified").length,
    pendingCount: assets.filter((asset) => asset.status === "awaiting-verification").length,
  };
}
