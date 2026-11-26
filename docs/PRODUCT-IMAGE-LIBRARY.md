# Panda Mabati Product Image Library

## Purpose

One controlled register for genuine catalogue photographs and exact variant photographs. Customer discovery, product pages, quotations and orders remain inside Panda Mabati. Manufacturer sites and marketplaces are research/source references only; they are never customer catalogue destinations.

## Display rules

- A photograph is shown as a genuine product photo only when its record has `status: "verified"`, a source URL, and descriptive alt text.
- A generic product-family photograph must not be represented as a colour-specific variant photograph.
- Variant photographs must match the exact product, colour, finish and gauge.
- Colour swatches are indicative references, not photographs. They must never be labelled as live product photography.
- Where no suitable genuine image exists, keep the clearly labelled illustrative treatment; do not invent or recolour a product photo.
- Keep source provenance in the register, not as an external catalogue link in the storefront.
- Prefer locally hosted optimized copies for production. The currently sourced official homepage images are referenced from their original Panda Mabati URLs and should be copied into the repository before final production hardening.

## Verified official product-family photography

The following images are linked directly beside the matching product-family sections on the official Panda Mabati homepage:

| Product family | Image | Match type |
| --- | --- | --- |
| Box Profile | `/wp-content/uploads/2026/06/download.jpg` | Generic Box Profile family photo |
| Corrugated Roofing | `/wp-content/uploads/2026/06/Corrugated-Roofing-Sheets.jpg` | Generic Corrugated family photo |
| StarTile | `/wp-content/uploads/2026/06/download-1.jpg` | Generic StarTile family photo |

These are not colour-specific images. The product detail page may show the family image while the customer selects a catalogue-listed colour/gauge/finish; it must not imply that the photo itself changes to that exact colour.

## Product image coverage

The register tracks:

- D-Tile and Versatile
- Box Profile
- Corrugated, StarTile, Glazed Tile, Elegantile and Decra
- Rainwater gutters and roof flashings
- Ridge caps / normal ridge (Kofia), roll tops and valley trays
- Roofing nails and fasteners

D-Tile now exposes the Viwanda-listed Glossy 30G Blue, Charcoal Grey and Dark Grey options, with the published sheet-length packet prices and minimum order quantities. Versatile remains without a colour selector and offers only its published G28/G30 gauge and sheet-length choices.

## Price and catalogue source policy

- Panda Mabati Factory provides the detailed colour/gauge/finish product listings and factory-listed prices for Box Profile, Corrugated, StarTile, Glazed Tile, Elegantile, Decra and accessories.
- Panda Mabati Ltd's linked Take App product list provides length-based retail prices for Box Profile/coloured Corrugated, Versatile, Decra, Roll Tops/Valleys and PVC gutters.
- Where the two Panda sources differ, the customer-facing price schedule uses the Panda Mabati Ltd retail listing as the retail benchmark where it provides a comparable unit, while retaining factory-specific finish distinctions where the retail listing groups them together.
- D-Tile is not itemized on the supplied Panda Mabati websites. A clearly labelled marketplace benchmark is used for the 2m packet price; it is not presented as a factory-confirmed price.
- Flashings have no specific Panda price on the supplied sites. The storefront uses a clearly labelled Kenya market guide starting-price estimate (KSh 500–1,200 per piece depending on type and dimensions).
- Sheet products priced per metre use sheet count × length × rate in the quotation. Accessories and packet-priced products use their listed selling unit.
- Delivery, fittings, installation and project-specific extras are excluded unless explicitly included in the listed product.

## Current image status — 26 November 2026

Three generic official product-family images are now marked verified: Box Profile, Corrugated and StarTile. The three local Box Profile variant JPEGs remain pending because their original manufacturer provenance and exact colour/finish/gauge match have not been confirmed; they are not shown as variant photographs.

D-Tile, Versatile, Glazed Tile, Elegantile, Decra and accessories do not yet have a verified matching image in the current register. Their product pages remain usable with the clearly labelled illustrative treatment; no AI-generated or tinted image is presented as a real product photograph.

## Asset approval checklist

Before adding a variant photo:

1. Record the original source page and image URL or supplied file name.
2. Confirm that the image depicts the named Panda Mabati product.
3. For variant photos, confirm colour, gauge and finish against the exact product record.
4. Download and optimize a local copy without altering product appearance.
5. Record alt text, source name, source URL and verification date.
6. Test card and detail-page rendering at desktop and mobile sizes.
7. Only then set the exact asset record to `verified`.

## Deployment gate

The catalogue, pricing and image-library changes are on `feat/product-image-library` / PR #2. They must pass a fresh Cloudflare preview build and browser review before merge. Production `main` remains unchanged.


### D-Tile visual reference and colour preview
- The live preview uses a real tile-profile photograph from a Take App roofing-supplier listing as a shape reference; it is explicitly labelled as not a Panda Mabati D-Tile photograph.
- The selected colour is applied as an on-screen colour overlay. This is a visual guide, not an exact paint-chip or factory colour proof.
- D-Tile's published Blue, Charcoal Grey and Dark Grey 30G packet prices and minimum order quantities are transcribed from the Viwanda Panda brand listing: https://viwanda.ke/brands/panda/.
- A matching Panda Mabati D-Tile photograph is still required to replace the reference image before the page can claim a verified Panda product photograph.
