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
    expect(getVerifiedProductImage("d-tile")).toBeUndefined();
  });

  it("tracks pending image coverage for roofing and accessory products", () => {
    for (const id of [
      "d-tile",
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
