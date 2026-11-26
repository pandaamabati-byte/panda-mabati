import type { Product } from "./productModel";

export type ProductVariant = {
  id: string;
  colour: string;
  gauge: string;
  finish: string;
  sourceUrl: string;
  unitPriceKes: number;
};
const source = "https://pandamabatifactory.co.ke/wp/";
type Row = [colour: string, finish: string, gauge: string, price: number];
const make = (id: string, rows: Row[]): ProductVariant[] => rows.map(([colour,finish,gauge,unitPriceKes],i)=>({
  id:id+"-"+i,colour,finish,gauge,unitPriceKes,sourceUrl:source
}));

// Exact colour/gauge/finish/price combinations transcribed from Panda Mabati Factory listings.
const variants: Record<string, ProductVariant[]> = {
  "box-profile": make("box",[
    ["Brick Red","Gloss","30G",500],["Tile Red","Gloss","30G",500],["Tile Red","Matt","30G",600],
    ["Dark Green","Gloss","30G",500],["Grey","Gloss","30G",500],["Grey","Matt","30G",600],
    ["Maroon","Gloss","30G",500],["Maroon","Matt","30G",600],["Sky Blue","Gloss","30G",500],
    ["Tile Red","Matt","28G",700],["Tile Red","Gloss","28G",700],["Sky Blue","Gloss","28G",700],["Maroon","Matt","28G",700]
  ]),
  corrugated:make("corrugated",[
    ["Red","Matt","30G",600],["Grey","Gloss","30G",500],["Green","Matt","30G",600],["Brick Red","Gloss","30G",500],
    ["Red","Gloss","28G",700],["Grey","Gloss","28G",700],["Green","Gloss","28G",700],["Brick Red","Gloss","28G",700]
  ]),
  startile:make("startile",[
    ["Tile Red","Matt","28G",720],["Sky Blue","Gloss","28G",720],["Maroon","Gloss","28G",720],["Dark Green","Matt","28G",720],
    ["Tile Red","Matt","30G",620],["Sky Blue","Gloss","30G",620]
  ]),
  "glazed-tile":make("glazed",[
    ["C/Brown","Matt","30G",620],["Brick Red","Matt","30G",620],["C/Grey","Matt","30G",620],["Chocolate","Gloss","30G",620],
    ["T/Red","Matt","28G",720],["T/Red","Gloss","28G",620],["Sky Blue","Gloss","28G",720],["Maroon","Gloss","28G",720]
  ]),
  elegantile:make("elegantile",[
    ["Wine Red","Matt","28G",720],["C/Gray","Matt","28G",720],["Green","Matt","30G",620]
  ]),
  decra:make("decra",[
    ["Shingle Tile Black","Stone-coated","26G",730],["Shingle Tile Brick Red","Stone-coated","26G",730],
    ["Classic Tile Coffee Brown","Stone-coated","26G",730],["Classic Tile Black","Stone-coated","26G",730]
  ]),
  "roll-tops":make("roll-top",[["Standard","Standard","28G",850],["Standard","Standard","30G",750]]),
  "ridge-caps":make("ridge",[["Normal Ridge / Kofia","Standard","—",600]]),
  "valley-trays":make("valley",[["Decra Valley Tray","Standard","—",750]]),
  "roofing-fasteners":make("fastener",[["Decra Touch-up Kit","Standard","—",800],["Decra Serrated Nails","Standard","—",800],["Decra Badge Board","Standard","—",750]])
};
const copy:Record<string,{overview:string;benefits:string[];notes:string[]}> = {
  "box-profile":{overview:"A geometric ribbed steel roofing profile for residential, commercial and industrial buildings. The factory lists 28G and 30G colour/finish combinations.",benefits:["Clean linear roof appearance","Published 28G and 30G options","The factory describes a 38mm rib depth and 914mm cover width once overlapped"],notes:["Catalogue prices are shown alongside each published product option","Specify required sheet length for the quotation","Anti-condensation backing and crimp-curving are listed factory options"]},
  corrugated:{overview:"Traditional wave-profile roofing sheets listed in selected 28G and 30G colours and finishes.",benefits:["Classic wave profile","Published colour and gauge combinations"],notes:["Catalogue prices are shown alongside each published product option","Specify required sheet length"]},
  startile:{overview:"A tile-effect roofing profile. The factory catalogue lists selected 28G and 30G colour/finish combinations.",benefits:["Tile-effect roof styling","Published colour and gauge options"],notes:["Catalogue prices are shown alongside each published product option","Specify required sheet length"]},
  "glazed-tile":{overview:"A tile-effect metal roofing profile listed in selected colours, gauges and matt/gloss finishes.",benefits:["Decorative tile-profile appearance","Published 28G and 30G options","Factory product pages state 950mm overall cover and 870mm effective cover"],notes:["Catalogue prices are shown alongside each published product option","Factory pages specify maximum purlin spacing of 600mm centres"]},
  elegantile:{overview:"A decorative tile-effect roofing option with factory-listed Wine Red 28G, Matte C/Gray 28G and Matte Green 30G options.",benefits:["Decorative roof finish","Published colour and gauge combinations"],notes:["Catalogue prices are shown alongside each published product option"]},
  decra:{overview:"Stone-coated style shingle and classic tile products listed in the factory catalogue.",benefits:["Stone-coated style appearance","Shingle and classic tile options"],notes:["Catalogue prices are shown alongside each listed product"]},
  "d-tile":{overview:"A D-Tile roofing profile in the Panda Mabati range.",benefits:["Distinctive tile-inspired roof appearance","Suitable for residential roofing projects"],notes:["No colour/gauge selector is shown because the supplied Panda Mabati catalogue does not publish a D-Tile variant schedule. The product can still be added to a project quotation."]},
  versatile:{overview:"A Versatile roofing profile in the Panda Mabati range.",benefits:["Distinctive roofing profile","Suitable for residential roofing projects"],notes:["No colour/gauge selector is shown because the supplied Panda Mabati catalogue does not publish a Versatile variant schedule. The product can still be added to a project quotation."]},
  "ridge-caps":{overview:"Ridge and roll-top accessories finish the roof apex and protect the ridge junction.",benefits:["Completes roof ridge detailing","Factory-listed Normal Ridge / Kofia"],notes:["Factory catalogue price is displayed for Normal Ridge / Kofia"]},
  flashings:{overview:"Formed components used to finish roof edges, junctions and transitions.",benefits:["Finishes roof junctions","Specified to suit the project"],notes:["Included in the Panda Mabati product range; add the required flashing to a project quotation"]},
  gutters:{overview:"Rainwater gutters collect and direct runoff from the roof edge.",benefits:["Supports controlled rainwater drainage","Coordinates with downpipes and fittings"],notes:["Included in the Panda Mabati product range; add the required guttering to a project quotation"]},
  "roll-tops":{overview:"Roll-top ridge accessories finish roof ridge lines.",benefits:["Finishes roof ridge lines","Factory lists 28G and 30G"],notes:["Factory catalogue prices are displayed for 28G and 30G roll tops"]},
  "valley-trays":{overview:"A Decra valley tray is listed in the factory accessories range.",benefits:["Roof valley junction accessory","For compatible Decra roofing systems"],notes:["Factory catalogue price is displayed for Decra Valley Tray"]},
  "roofing-fasteners":{overview:"Roofing nails and maintenance accessories for compatible roofing systems.",benefits:["Installation and maintenance accessories"],notes:["Factory catalogue prices are displayed for Decra nails, touch-up kits and badge board"]}
};
export const getProductVariants=(id:string)=>variants[id]??[];
export const getProductDetails=(product:Product)=>copy[product.id]??{overview:product.description,benefits:["Roofing product in the Panda Mabati range"],notes:["Select the product and required quantity for your quotation"]};
export const getVariantPriceLabel=(variant:ProductVariant)=>`KSh ${variant.unitPriceKes.toLocaleString("en-KE")} (catalogue price)`;
export type ProductPriceInfo={display:string;note:string;unitPriceKes:number;cartLabel:string};
export const getProductPriceInfo=(id:string):ProductPriceInfo|undefined=>{
  if(id==="d-tile") return {display:"From KSh 1,130 per 2m packet",note:"Market benchmark from a Panda Mabati D-Tile retail listing; length and seller price vary.",unitPriceKes:1130,cartLabel:"2m packet · market benchmark"};
  if(id==="versatile") return {display:"From KSh 630 per metre (G30)",note:"Panda Mabati Ltd publishes G30 and G28 length prices; G28 benchmark is KSh 730 per metre. No colour selector is shown.",unitPriceKes:630,cartLabel:"G30 · per metre"};
  return undefined;
};

export const getProductStartingPrice=(id:string):number|undefined=>{
 const values=getProductVariants(id).map((item)=>item.unitPriceKes);
 if(values.length) return Math.min(...values);
 return getProductPriceInfo(id)?.unitPriceKes;
};
