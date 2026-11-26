# Panda Mabati administrator setup

The admin console is available at `/admin`. It uses Firebase Authentication and Firestore/Storage security rules. The browser never decides who is an administrator: the Firebase ID token must contain the custom claim `admin: true`.

## 1. Create the staff account

1. Open Firebase Console → Authentication → Users.
2. Enable Email/Password sign-in if it is not already enabled.
3. Add the named staff account. Use an individual account for each administrator; do not share credentials.

## 2. Grant the administrator claim securely

Run this once in a trusted, access-controlled environment using the Firebase Admin SDK. Never put a service-account private key in this repository, browser code, Cloudflare Pages variables, or a public issue.

```js
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp({ credential: applicationDefault(), projectId: "panda-mabati" });
const user = await getAuth().getUserByEmail("ADMIN_EMAIL");
await getAuth().setCustomUserClaims(user.uid, { ...(user.customClaims || {}), admin: true });
console.log("Administrator claim assigned to", user.uid);
```

Use Application Default Credentials in a trusted Google Cloud environment with the minimum required IAM permissions. Replace ADMIN_EMAIL with the actual staff email. The administrator must sign out and back in (or refresh their ID token) before the claim appears.

To revoke access, use the Admin SDK to remove the `admin` claim while preserving any other claims, then revoke the user's refresh tokens.

## 3. Deploy security rules

Deploy the repository's `firestore.rules` and `storage.rules` to the Firebase project before using the console. Rules are intentionally deny-by-default for unauthenticated and ordinary users. Public visitors can read only published product documents and their published product images. Admin writes require the server-issued custom claim.

## 4. Configure the frontend

Set the existing `VITE_FIREBASE_*` variables in the Cloudflare Pages project to the Firebase web app configuration. These are public Firebase client configuration values, not service-account secrets. Confirm Firebase Authentication, Firestore and Storage are enabled in the same project.

## Product publishing policy

- New products default to unpublished and price pending.
- A price can be marked confirmed only when both a positive KES amount and an explicit unit (for example, per metre or per sheet) are recorded.
- Do not infer pricing units from a manufacturer's product listing.
- Store the manufacturer's product page in Source URL so the team can audit the record.
- Review product name, imagery, gauge, finish, coverage and specifications before publishing.
- The storefront should only show published records. Price display must respect the confirmed status and unit.

## Important

This admin console is a product-catalogue foundation. It does not yet implement order management, payment processing, customer records, staff roles beyond administrator, audit-log retention, or automated approval workflows. Those should be introduced as separate reviewed milestones.
