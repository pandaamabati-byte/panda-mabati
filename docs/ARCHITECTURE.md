# Panda Mabati architecture

## Application layers

- `src/app`: routing and application-level configuration.
- `src/components`: reusable UI, layout, forms and feedback components.
- `src/features`: product, calculator, quote, admin and contact domains.
- `src/pages`: route-level pages.
- `src/services/firebase`: Firebase client initialization.
- `src/lib`: shared utilities.
- `src/types`: shared TypeScript types.
- `src/styles`: shared styling resources.
- `firebase`: Firebase-related local configuration and documentation.

## Important integration boundaries

- Firebase client exports are nullable until all required environment values exist.
- Never commit `.env` or private credentials.
- Product prices must come from verified data, not hardcoded UI examples.
- Calculator logic must be independently tested before estimates are presented as authoritative.
- Firestore and Storage rules default to deny until collection-specific authorization is reviewed and tested.
- Public quote submission must be paired with appropriate abuse prevention and server-side validation before production.

## Local commands

- `npm run dev`: start the local development server.
- `npm run lint`: run ESLint.
- `npm run test`: run automated tests.
- `npm run build`: build for production.
- `npm run check`: run lint, tests and production build.
