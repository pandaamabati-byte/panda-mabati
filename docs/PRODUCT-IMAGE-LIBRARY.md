# Panda Mabati Product Image Library

## Purpose

One controlled register for every catalogue photograph and variant photograph. The storefront must never imply that a decorative placeholder, generic roof illustration, tinted base photo, or unverified local file is a genuine manufacturer product photo.

## Display rules

- A photograph is eligible for storefront display only when its record has `status: "verified"`, a non-empty local `src`, a source page, and descriptive alt text.
- Variant photography must match the exact product, colour, finish, and gauge. A generic product photograph must not be represented as an exact variant photograph.
- Colour swatches are indicative references, not photographs. They must never be labelled as live product photography.
- If no verified photograph exists, show the labelled illustration/placeholder and state that the product photograph is awaiting verification.
- Preserve the manufacturer's source URL and attribution on each asset record.
- Prefer locally hosted optimized assets after source and usage rights are confirmed; do not hotlink unstable source-site image URLs in production.

## Catalogue coverage

The register currently tracks these product groups:

- D-Tile and Versatile
- Box Profile (including the three existing local variant files)
- Corrugated, StarTile, Glazed Tile, Elegantile and Decra
- Rainwater gutters and roof flashings
- Ridge caps / normal ridge (Kofia), roll tops and valley trays
- Roofing nails and fasteners

## Current verification status — 26 November 2026

No image is currently marked verified. The three existing Box Profile JPEGs are present in the repository, but their original manufacturer provenance and exact colour/finish/gauge match have not yet been independently confirmed. They therefore remain pending and are not displayed as genuine product photographs.

The two manufacturer sites are the source-of-truth research targets:

- [Panda Mabati Factory](https://pandamabatifactory.co.ke/wp/)
- [Panda Mabati](https://pandamabati.com/)

The factory site lists product variants and accessories, including Box Profile 28G/30G, corrugated sheets, tile profiles, Decra Valley Tray, roll tops and Normal Ridge/Kofia. Some individual product pages explicitly show that a product image is still awaiting upload. Catalogue presence is not proof that a usable photograph exists.

D-Tile must be checked with the manufacturer for its exact catalogue name/SKU; it is not currently established as an independently photographed factory product in the researched catalogue.

## Asset approval checklist

Before setting any record to `verified`:

1. Confirm that the image is hosted by or supplied directly by Panda Mabati / its factory.
2. Record the original product page URL and the image's original URL or supplied file name.
3. Confirm that the image depicts the named product, not a similar profile.
4. For variant photos, confirm colour, gauge and finish against the product page or a manufacturer-approved schedule.
5. Download and optimize a local copy without changing the product appearance.
6. Record a concise alt description, source name, source URL, and verification date.
7. Test the product card and detail page at desktop and mobile sizes.
8. Only then set status to `verified`.

## Remaining work

- Obtain and locally store genuine manufacturer product photos for every available profile and accessory.
- Verify each image-to-product and image-to-variant match.
- Obtain the missing D-Tile / Versatile naming and variant schedule from Panda Mabati.
- Confirm whether gutters, flashings, valleys and ridge accessories have product-specific photos or only catalogue text.
- Build a complete, approved variant photo set so changing a colour/gauge/finish selects the matching photograph. If a matching photograph does not exist, retain the honest swatch-only state.
- Confirm all product prices, units and technical dimensions separately before exposing them as confirmed storefront data.

## Deployment gate

The first Cloudflare attempt for this branch failed on an earlier intermediate commit while the code was still being updated. The subsequent source changes removed the unused import and completed the pending catalogue records. The current branch head must receive a fresh successful Cloudflare build before its preview is reviewed. No change from this branch is deployed to production.
