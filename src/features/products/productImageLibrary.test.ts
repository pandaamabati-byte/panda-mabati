import { describe, expect, it } from "vitest";
import {
  getProductImageStatus,
  getVerifiedProductImage,
  PRODUCT_IMAGE_LIBRARY,
} from "./productImageLibrary";

describe("product image library", () => {
  it("does not expose unverified assets as product photographs", () => {
    expect(PRODUCT_IMAGE_LIBRARY.length).toBeGreaterThan(0);
    expect(getVerifiedProductImage("box-profile")).toBeUndefined();
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
