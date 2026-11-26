import type { Product } from "./productModel";

export type ProductVariant = {
  id: string;
  colour: string;
  gauge: string;
  finish: string;
  sourceUrl: string;
  unitPriceKes?: number;
  priceUnit?: "metre" | "piece";
};

const source = "https://pandamabatifactory.co.ke/wp/";
type Row = [colour: string, finish: string, gauge: string, price?: number, unit?: "metre" | "piece"];
const make = (id: string, rows: Row[]): ProductVariant[] => rows.map(([colour, finish, gauge, unitPriceKes, priceUnit], i) => ({
  id: id + "-" + i, colour, finish, gauge, sourceUrl: source,
  ...(unitPriceKes ? { unitPriceKes, priceUnit: priceUnit ?? "metre" as const } : {}),
}));

// Rates transcribed from the supplied Panda Mabati Factory WooCommerce catalogue.
// Roofing sheet rates are listed per metre on the Box Profile 30G category page.
const variants: Record<string, ProductVariant[]> = {
  "box-profile": make("box", [
    ["Brick Red","Gloss","30G",500],["Tile Red","Gloss","30G",500],["Tile Red","Matt","30G",600],
    ["Dark Green","Gloss","30G",500],["Grey","Gloss","30G",500],["Grey","Matt","30G",600],
    ["Maroon","Gloss","30G",500],["Maroon","Matt","30G",600],["Sky Blue","Gloss","30G",500],
    ["Tile Red","Matt","28G",700],["Tile Red","Gloss","28G",700],["Sky Blue","Gloss","28G",700],["Maroon","Matt","28G",700],
  ]),
  corrugated: make("corrugated", [
    ["Red","Matt","30G",600],["Grey","Gloss","30G",500],["Green","Matt","30G",600],["Brick Red","Gloss","30G",500],
    ["Red","Gloss","28G",700],["Grey","Gloss","28G",700],["Green","Gloss","28G",700],["Brick Red","Gloss","28G",700],
  ]),
  startile: make("startile", [
    ["Tile Red","Matt","28G",720],["Sky Blue","Gloss","28G",720],["Maroon","Gloss","28G",720],["Dark Green","Matt","28G",720],
    ["Tile Red","Matt","30G",620],["Sky Blue","Gloss","30G",620],
  ]),
  "glazed-tile": make("glazed", [
    ["C/Brown","Matt","30G",620],["Brick Red","Matt","30G",620],["C/Grey","Matt","30G",620],["Chocolate","Gloss","30G",620],
    ["T/Red","Matt","28G",720],["T/Red","Gloss","28G",620],["Sky Blue","Gloss","28G",720],["Maroon","Gloss","28G",720],
  ]),
  elegantile: make("elegantile", [
    ["Wine Red","Matt","28G",720],["C/Gray","Matt","28G",720],["Green","Matt","30G",620],
  ]),
  decra: make("decra", [
    ["Black","Stone-coated","26G",730,"piece"],["Brick Red","Stone-coated","26G",730,"piece"],
    ["Coffee Brown","Stone-coated","26G",730,"piece"],["Black","Stone-coated","26G",730,"piece"],
  ]),
  "roll-tops": make("roll-top", [
    ["Standard","Standard","28G",850,"piece"],["Standard","Standard","30G",750,"piece"],
  ]),
  "ridge-caps": make("ridge", [
    ["Normal Ridge / Kofia","Standard","—",600,"piece"],
  ]),
  "valley-trays": make("valley", [
    ["Decra Valley Tray","Standard","—",750,"piece"],
  ]),
  "roofing-fasteners": make("fastener", [
    ["Decra Serrated Nails","Standard","—",800,"piece"],["Decra Touch-up Kits","Standard","—",800,"piece"],
    ["Decra Badge Board","Standard","—",750,"piece"],
  ]),
};

const copy: Record<string, { overview: string; benefits: string[]; notes: string[] }> = {
  "box-profile": { overview:"A geometric ribbed steel roofing profile for residential, commercial and industrial buildings. The factory catalogue lists 28G and 30G colour/finish combinations.", benefits:["Clean linear roof appearance","Colour and finish choices listed by the factory","A factory 28G listing describes 38mm rib depth and 914mm cover width once overlapped"], notes:["Factory-listed prices are shown per metre for 30G; confirm exact profile cover and sheet length in the quotation","Anti-condensation backing and crimp-curving are listed options"] },
  corrugated: { overview:"Traditional wave-profile roofing sheets listed in selected 28G and 30G colours and finishes.", benefits:["Classic wave profile","Colour and gauge choices listed"], notes:["Published catalogue rates are applied per metre","Specify sheet length and effective cover in your quotation"] },
  startile: { overview:"A tile-effect roofing profile. The factory catalogue publishes selected 28G and 30G colour/finish combinations.", benefits:["Tile-effect roof styling","Published colour and gauge options"], notes:["Published catalogue rates are applied per metre","Specify sheet length and effective cover"] },
  "glazed-tile": { overview:"A tile-effect metal roofing profile listed in selected colours, gauges and matt/gloss finishes.", benefits:["Decorative tile-profile appearance","Selected 28G and 30G variants"], notes:["A factory product page states 950mm overall cover, 870mm effective cover and maximum purlin spacing of 600mm centres","Published catalogue rates are applied per metre"] },
  elegantile: { overview:"A decorative tile-effect roofing option with factory-listed Wine Red 28G, Matte C/Gray 28G and Matte Green 30G options.", benefits:["Decorative roof finish","Published colour and gauge combinations"], notes:["Published catalogue rates are applied per metre"] },
  decra: { overview:"Stone-coated style shingle and classic tile products listed in the factory catalogue.", benefits:["Stone-coated style appearance","Shingle and classic tile styles"], notes:["Catalogue price shown per listed product; confirm pack/coverage requirements for the roof take-off"] },
  "d-tile": { overview:"A tile-inspired roofing profile for a traditional roof appearance.", benefits:["Tile-inspired appearance","Residential roof design"], notes:["No D-Tile-specific price or colour schedule is published in the supplied catalogues; request a project quote"] },
  versatile: { overview:"A distinctive roofing profile for traditional and contemporary homes.", benefits:["Distinctive roof appearance","Residential and project applications"], notes:["No Versatile-specific price or colour schedule is published in the supplied catalogues; request a project quote"] },
  "ridge-caps": { overview:"Ridge and roll-top accessories finish the roof apex and protect the ridge junction.", benefits:["Completes roof ridge detailing","Factory-listed normal ridge / Kofia option"], notes:["Published Normal Ridge / Kofia catalogue price is KSh 600 per piece"] },
  flashings: { overview:"Formed components used to finish roof edges, junctions and transitions.", benefits:["Finishes roof junctions","Specified to suit the project"], notes:["The supplied corporate site lists flashings as a product family; project pricing is handled by quotation"] },
  gutters: { overview:"Rainwater gutters collect and direct runoff from the roof edge.", benefits:["Supports controlled rainwater drainage","Coordinates with downpipes and fittings"], notes:["The supplied corporate site lists gutters as a product family; project pricing is handled by quotation"] },
  "roll-tops": { overview:"Roll-top ridge accessories finish roof ridge lines.", benefits:["Finishes roof ridge lines","Factory catalogue lists 28G and 30G"], notes:["Published catalogue prices: 28G KSh 850 and 30G KSh 750 per piece"] },
  "valley-trays": { overview:"A Decra valley tray is listed in the factory accessories range.", benefits:["Roof valley junction accessory","For compatible Decra roofing systems"], notes:["Published Decra Valley Tray catalogue price is KSh 750 per piece"] },
  "roofing-fasteners": { overview:"Roofing nails and accessories secure compatible roofing sheets and components.", benefits:["Fixings and maintenance accessories"], notes:["Published catalogue prices include Decra serrated nails KSh 800, touch-up kit KSh 800 and badge board KSh 750 per item"] },
};

export const getProductVariants = (id: string) => variants[id] ?? [];
export const getProductDetails = (product: Product) => copy[product.id] ?? {
  overview: product.description,
  benefits: ["Ask Panda Mabati for project-specific selection"],
  notes: ["Choose the profile and required sheet length"],
};
export const getVariantPriceLabel = (variant: ProductVariant) =>
  variant.unitPriceKes ? `KSh ${variant.unitPriceKes.toLocaleString("en-KE")} / ${variant.priceUnit === "piece" ? "piece" : "m"}` : "Request a quote";
export const getProductStartingPrice = (id: string) => {
  const prices = getProductVariants(id).map((variant) => variant.unitPriceKes).filter((price): price is number => Boolean(price));
  return prices.length ? Math.min(...prices) : undefined;
};
