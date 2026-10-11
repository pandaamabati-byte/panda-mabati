import { describe, expect, it } from "vitest";
import {
  FALLBACK_PRODUCTS,
  normalizeProduct,
} from "./productModel";

describe("product catalogue model", () => {
  it("provides the four supported fallback roofing profiles", () => {
    expect(FALLBACK_PRODUCTS.map((product) => product.id)).toEqual([
      "d-tile",
      "versatile",
      "box-profile",
      "startile",
    ]);
  });

  it("does not invent prices or coverage in fallback data", () => {
    for (const product of FALLBACK_PRODUCTS) {
      expect(product.unitPriceKes).toBeUndefined();
      expect(product.effectiveCoverageM).toBeUndefined();
    }
  });

  it("accepts a complete published product", () => {
    const product = normalizeProduct("custom-profile", {
      published: true,
      name: "Custom Profile",
      short: "A sample profile",
      description: "A verified description",
      use: "Residential",
      tone: "box",
      unitPriceKes: 1250,
      effectiveCoverageM: 0.9,
      colours: ["Charcoal"],
      gaugesMm: [0.4],
    });

    expect(product).toMatchObject({
      id: "custom-profile",
      published: true,
      unitPriceKes: 1250,
      effectiveCoverageM: 0.9,
      colours: ["Charcoal"],
      gaugesMm: [0.4],
    });
  });

  it("rejects unpublished or incomplete products", () => {
    expect(
      normalizeProduct("hidden", {
        published: false,
        name: "Hidden",
      }),
    ).toBeNull();

    expect(
      normalizeProduct("incomplete", {
        published: true,
        name: "Incomplete",
      }),
    ).toBeNull();
  });

  it("ignores invalid optional price and coverage values", () => {
    const product = normalizeProduct("profile", {
      published: true,
      name: "Profile",
      short: "Short description",
      description: "Full description",
      use: "Residential",
      tone: "box",
      unitPriceKes: -50,
      effectiveCoverageM: 0,
    });

    expect(product).not.toBeNull();
    expect(product?.unitPriceKes).toBeUndefined();
    expect(product?.effectiveCoverageM).toBeUndefined();
  });
});
