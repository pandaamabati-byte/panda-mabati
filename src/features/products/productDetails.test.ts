import { describe, expect, it } from "vitest";
import { getProductPriceOptions, getProductVariants } from "./productDetails";

describe("Panda Mabati published product options", () => {
  it("keeps D-Tile and Versatile free of colour variants", () => {
    expect(getProductVariants("d-tile")).toHaveLength(0);
    expect(getProductVariants("versatile")).toHaveLength(0);
  });

  it("offers D-Tile by published sheet length and packet price only", () => {
    const options = getProductPriceOptions("d-tile");
    expect(options.map((option) => option.sheetLengthM)).toEqual([2, 2.5, 3]);
    expect(options.map((option) => option.unitPriceKes)).toEqual([1130, 1420, 1700]);
    expect(options.every((option) => option.priceUnit === "packet")).toBe(true);
    expect(options.every((option) => !option.gauge)).toBe(true);
  });

  it("offers Versatile by gauge and sheet length, never by colour", () => {
    const options = getProductPriceOptions("versatile");
    expect([...new Set(options.map((option) => option.gauge))]).toEqual(["G30", "G28"]);
    expect([...new Set(options.map((option) => option.sheetLengthM))]).toEqual([1, 2, 2.5, 3]);
    expect(options.every((option) => option.priceUnit === "metre")).toBe(true);
    expect(options.every((option) => !("colour" in option))).toBe(true);
  });

  it("provides the factory-listed Box Profile variants", () => {
    const options = getProductVariants("box-profile");
    expect(options).toHaveLength(13);
    expect(options.some((option) => option.colour === "Grey" && option.finish === "Matt" && option.gauge === "30G")).toBe(true);
  });
});
