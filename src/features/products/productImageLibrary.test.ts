import { describe, expect, it } from "vitest";
import {
  getProductImageStatus,
  getVerifiedProductImage,
  PRODUCT_IMAGE_LIBRARY,
} from "./productImageLibrary";

describe("product image library", () => {
  it("exposes only sourced generic product photos and keeps unverified variants hidden", () => {
    expect(PRODUCT_IMAGE_LIBRARY.length).toBeGreaterThan(0);
    expect(getVerifiedProductImage("box-profile")?.src).toContain("pandamabati.com/wp-content/uploads");
    expect(getVerifiedProductImage("corrugated")?.src).toContain("Corrugated-Roofing-Sheets.jpg");
    expect(getVerifiedProductImage("startile")?.src).toContain("download-1.jpg");
    expect(getVerifiedProductImage("box-profile", "box-5")).toBeUndefined();
    expect(getVerifiedProductImage("d-tile")?.src).toContain("storage.googleapis.com/takeapp/media/");
  });

  it("requires complete provenance for every image exposed as verified", () => {
    const verifiedAssets = PRODUCT_IMAGE_LIBRARY.filter((asset) => asset.status === "verified");

    expect(verifiedAssets.length).toBeGreaterThan(0);
    for (const asset of verifiedAssets) {
      expect(asset.src.trim()).not.toBe("");
      expect(asset.sourceUrl.trim()).not.toBe("");
      expect(asset.sourceName.trim()).not.toBe("");
      expect(asset.alt.trim()).not.toBe("");
      expect(asset.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(asset.kind).toBe("product-photo");
      expect(asset.variantId).toBeUndefined();
    }
  });

  it("keeps unverified local variant files out of the storefront image lookup", () => {
    for (const asset of PRODUCT_IMAGE_LIBRARY.filter((item) => item.status === "awaiting-verification")) {
      expect(getVerifiedProductImage(asset.productId, asset.variantId)).not.toBe(asset);
    }
  });

  it("tracks pending image coverage for roofing and accessory products", () => {
    for (const id of [
      "versatile",
      "gutters",
      "ridge-caps",
      "roll-tops",
      "valley-trays",
      "flashings",
    ]) {
      expect(getProductImageStatus(id).pendingCount).toBeGreaterThan(0);
    }
  });

});
