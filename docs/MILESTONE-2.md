# Panda Mabati — Milestone 2

## Included
- Responsive premium storefront with mobile navigation.
- Roofing profile cards for D-Tile, Versatile, Box Profile and StarTile.
- Multi-line quotation builder with customer and project details.
- Live quantity chart and live totals for lines with entered rates.
- Client-side PDF quotation download using jsPDF.
- Explicit price-confirmation labels for lines without a unit rate.
- Responsive layout, keyboard focus states and reduced-motion support.

## Important current limitations
- Roofing illustrations are temporary CSS artwork, not actual product photography.
- Product descriptions are general profile descriptions; confirm the exact supplier product name and technical specification.
- Prices must be entered from verified Panda Mabati rates. Do not publish invented prices.
- The current PDF is generated in the browser. It does not save leads to Firestore, send email, or contact WhatsApp.
- The live chart visualizes requested quantities by profile; it is not yet a roof-area estimator.
- Product catalogue, stock, delivery fees, tax treatment, accessories, and staff-managed prices will be connected in later milestones.
- Firebase security rules must remain restrictive until the authenticated admin workflow is implemented and tested.
