export type BoxProfileVariant = {
  id: string;
  name: string;
  colour: string;
  finish: string;
  gauge: string;
  ratePerM: number;
  image: string;
};

// Preliminary rates supplied for Panda Mabati; confirm before final sale.
export const BOX_PROFILE_VARIANTS: BoxProfileVariant[] = [
  {
    id: "box-profile-grey-matt-30g",
    name: "Box Profile",
    colour: "Grey",
    finish: "Matt",
    gauge: "30G",
    ratePerM: 600,
    image: "/images/products/box-profile-grey-matt-30g.jpg",
  },
  {
    id: "box-profile-sky-blue-gloss-30g",
    name: "Box Profile",
    colour: "Sky Blue",
    finish: "Gloss",
    gauge: "30G",
    ratePerM: 500,
    image: "/images/products/box-profile-sky-blue-gloss-30g.jpg",
  },
  {
    id: "box-profile-tile-red-gloss-30g",
    name: "Box Profile",
    colour: "Tile Red",
    finish: "Gloss",
    gauge: "30G",
    ratePerM: 500,
    image: "/images/products/box-profile-tile-red-gloss-30g.jpg",
  },
];
