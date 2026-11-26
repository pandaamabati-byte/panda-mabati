# Panda Mabati product image sourcing

## Rendering rule

The storefront may display an asset as a Panda Mabati product photograph only when its entry in `src/features/products/productImageLibrary.ts` has `status: "verified"`. A product-family photograph is not a colour-, gauge-, or finish-specific photograph. Do not use a family image to imply an exact variant match.

## Current official-site image register

The following image assets are currently registered as verified manufacturer-site product-family images:

| Product family | Asset ID | Source |
| --- | --- | --- |
| Box Profile | `box-profile-official-primary` | [Panda Mabati official website](https://pandamabati.com/) |
| Corrugated | `corrugated-official-primary` | [Panda Mabati official website](https://pandamabati.com/) |
| StarTile | `startile-official-primary` | [Panda Mabati official website](https://pandamabati.com/) |

The official Panda Mabati homepage currently presents these three product families with matching product sections. It also lists ridge caps, flashings, gutters, roofing nails and roofing fasteners as additional products. See [Panda Mabati](https://pandamabati.com/).

## Additional catalogue research

The [Panda Mabati Factory Kisumu catalogue](https://pandamabatifactory.co.ke/wp/) lists additional product families and variants, including Elegantile, Glazed Tile / H-Tiles, Decra-style shingle and classic tiles, corrugated sheets, Box Profile, Startile and roofing accessories.

Catalogue listings are useful for product-name and variant research. They are **not automatic permission** to copy or hotlink the catalogue's photography. Some product listings explicitly show no product image. Keep these assets in `awaiting-verification` until the exact photograph, manufacturer relationship, product match, and right to use the image on this storefront have been confirmed.

## Rights and sourcing policy

1. Prefer original photographs supplied by Panda Mabati or captured for Panda Mabati.
2. Use third-party photography only when the licence clearly covers the intended commercial website use. Record the photographer, source page, licence and any required attribution.
3. Use competitor websites for market and product research only. Do not copy their product photographs or present competitor products as Panda products without written permission.
4. AI-generated architectural imagery may be used for mood, lifestyle and campaign visuals, but must not be labelled as a real Panda installation or as a photograph of a specific product variant.
5. Do not mark a variant photograph verified unless its exact colour, finish, gauge and profile are confirmed.
6. Keep the existing illustrative fallback visible whenever a real image is unavailable or fails to load.

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
