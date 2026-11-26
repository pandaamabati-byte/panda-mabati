export type BoxProfileVariant = {
  id: string;
  name: string;
  colour: string;
  finish: string;
  gauge: string;
  ratePerM: number;
  image?: string;
};

// Combined Panda listings: G30 gloss benchmark KSh 520/m, G30 matt factory price KSh 600/m,
// and G28 benchmark KSh 680/m. Exact colour/finish names remain from the factory catalogue.
export const BOX_PROFILE_VARIANTS: BoxProfileVariant[] = [
  {id:"box-profile-brick-red-gloss-30g",name:"Box Profile",colour:"Brick Red",finish:"Gloss",gauge:"30G",ratePerM:520},
  {id:"box-profile-tile-red-gloss-30g",name:"Box Profile",colour:"Tile Red",finish:"Gloss",gauge:"30G",ratePerM:500,image:"/images/products/box-profile-tile-red-gloss-30g.jpg"},
  {id:"box-profile-tile-red-matt-30g",name:"Box Profile",colour:"Tile Red",finish:"Matt",gauge:"30G",ratePerM:600},
  {id:"box-profile-dark-green-gloss-30g",name:"Box Profile",colour:"Dark Green",finish:"Gloss",gauge:"30G",ratePerM:500},
  {id:"box-profile-grey-gloss-30g",name:"Box Profile",colour:"Grey",finish:"Gloss",gauge:"30G",ratePerM:500},
  {id:"box-profile-grey-matt-30g",name:"Box Profile",colour:"Grey",finish:"Matt",gauge:"30G",ratePerM:600,image:"/images/products/box-profile-grey-matt-30g.jpg"},
  {id:"box-profile-maroon-gloss-30g",name:"Box Profile",colour:"Maroon",finish:"Gloss",gauge:"30G",ratePerM:500},
  {id:"box-profile-maroon-matt-30g",name:"Box Profile",colour:"Maroon",finish:"Matt",gauge:"30G",ratePerM:600},
  {id:"box-profile-sky-blue-gloss-30g",name:"Box Profile",colour:"Sky Blue",finish:"Gloss",gauge:"30G",ratePerM:500,image:"/images/products/box-profile-sky-blue-gloss-30g.jpg"},
  {id:"box-profile-tile-red-matt-28g",name:"Box Profile",colour:"Tile Red",finish:"Matt",gauge:"28G",ratePerM:680},
  {id:"box-profile-tile-red-gloss-28g",name:"Box Profile",colour:"Tile Red",finish:"Gloss",gauge:"28G",ratePerM:700},
  {id:"box-profile-sky-blue-gloss-28g",name:"Box Profile",colour:"Sky Blue",finish:"Gloss",gauge:"28G",ratePerM:700},
  {id:"box-profile-maroon-matt-28g",name:"Box Profile",colour:"Maroon",finish:"Matt",gauge:"28G",ratePerM:700},
];
