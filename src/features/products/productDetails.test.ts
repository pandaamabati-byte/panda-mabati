import { describe, expect, it } from "vitest";
import { getProductPriceOptions, getProductVariants } from "./productDetails";

describe("Panda Mabati published product options", () => {
  it("offers D-Tile colours but keeps Versatile free of colour variants", () => {
    expect([...new Set(getProductVariants("d-tile").map((option) => option.colour))]).toEqual(["Blue", "Charcoal Grey", "Dark Grey"]);
    expect(getProductVariants("versatile")).toHaveLength(0);
  });

  it("offers D-Tile colour/length packet prices from the Panda listing", () => {
    const options = getProductVariants("d-tile");
    expect(options.find((option) => option.id === "dtile-blue-2m")?.unitPriceKes).toBe(1165);
    expect(options.find((option) => option.id === "dtile-blue-25m")?.unitPriceKes).toBe(1456);
    expect(options.find((option) => option.id === "dtile-blue-3m")?.unitPriceKes).toBe(1747);
    expect(options.find((option) => option.id === "dtile-darkgrey-2m")?.unitPriceKes).toBe(1130);
    expect(options.every((option) => option.priceUnit === "packet" && option.gauge === "30G")).toBe(true);
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
