# Panda Mabati product image sourcing

## Rendering rule

The storefront may display an asset as a Panda Mabati product photograph only when its entry in `src/features/products/productImageLibrary.ts` has `status: "verified"`. A product-family photograph is not a colour-, gauge-, or finish-specific photograph. Do not use a family image to imply an exact variant match.

## Current official-site image register

The following image assets are currently registered as verified manufacturer-site product-family images:

| Product family | Asset ID | Source |
| --- | --- | --- |
| D-Tile | `d-tile-panda-confirmed-primary` | Owner-confirmed original Panda D-Tile image |
| Box Profile | `box-profile-official-primary` | [Panda Mabati official website](https://pandamabati.com/) |
| Corrugated | `corrugated-official-primary` | [Panda Mabati official website](https://pandamabati.com/) |
| StarTile | `startile-official-primary` | [Panda Mabati official website](https://pandamabati.com/) |

The official Panda Mabati homepage currently presents Box Profile, Corrugated and StarTile with matching product sections. The D-Tile photograph is separately confirmed by the site owner. It also lists ridge caps, flashings, gutters, roofing nails and roofing fasteners as additional products. See [Panda Mabati](https://pandamabati.com/).

## Coverage status

The 14-product image register is now complete as an inventory. Four product families have an accepted genuine Panda photograph: D-Tile, Box Profile, Corrugated and StarTile. The other ten families remain explicitly marked as awaiting genuine, rights-cleared photography: Versatile, Glazed Tile, Elegantile, Decra, Ridge Caps, Flashings, Gutters, Roll Tops, Valley Trays and Roofing Fasteners. The current Panda Factory catalogue confirms these product families, but its indexed Glazed Tile C/Brown 30G Matt listing explicitly says “Image: Awaiting product image”. Do not fill these slots with competitor photos or unrelated profile imagery. Keep the product-specific designed profile visual on the homepage search results and detail pages until Panda supplies or approves a genuine image. See [Panda Factory catalogue](https://pandamabatifactory.co.ke/wp/) and [Glazed Tile listing](https://pandamabatifactory.co.ke/wp/product/glazed-tile-c-brown-30g-matt/).

Where a generic manufacturer photograph is displayed with a selected colour overlay, the image is still a family photograph; the colour treatment is only a customer-facing preview, not proof of a colour-specific photo. Exact variant photographs take priority whenever verified assets are added.

## Additional catalogue research

The [Panda Mabati Factory Kisumu catalogue](https://pandamabatifactory.co.ke/wp/) lists additional product families and variants, including Elegantile, Glazed Tile / H-Tiles, Decra-style shingle and classic tiles, corrugated sheets, Box Profile, Startile and roofing accessories.

Catalogue listings are useful for product-name and variant research. They are **not automatic permission** to copy or hotlink the catalogue's photography. Some product listings explicitly show no product image. Keep these assets in `awaiting-verification` until the exact photograph, manufacturer relationship, product match, and right to use the image on this storefront have been confirmed.

## Rights and sourcing policy

1. Prefer original photographs supplied by Panda Mabati or captured for Panda Mabati.
2. Use third-party photography only when the licence clearly covers the intended commercial website use. Record the photographer, source page, licence and any required attribution.
3. Use competitor websites for market and product research only. Do not copy their product photographs or present competitor products as Panda products without written permission.
4. AI-generated architectural imagery may be used for mood, lifestyle and campaign visuals, but must not be labelled as a real Panda installation or as a photograph of a specific product variant.
5. Do not mark a variant photograph verified unless its exact colour, finish, gauge and profile are confirmed.
6. Keep the designed product visual visible whenever a real image is unavailable or fails to load. On the homepage catalogue, label this “PROFILE VISUAL · PHOTO PENDING”; never label it as a real product photograph.

## Verification checklist for each new asset

- [ ] Source page and image URL recorded.
- [ ] Image is supplied by Panda Mabati or has documented commercial-use permission.
- [ ] Product family and exact variant match confirmed.
- [ ] Alt text describes only what the image actually shows.
- [ ] Image loads successfully at the deployed storefront URL.
- [ ] Mobile crop, dimensions and file size checked.
- [ ] Entry added to the central image library and covered by a test where appropriate.

## Important distinction

`verified` in the code currently means the asset has been accepted as a genuine product-family image for storefront display. It does not establish that every colour or gauge shown in the catalogue is represented. Variant-specific assets must be separately verified.
