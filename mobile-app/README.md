# Doodhwala React Native + Web

Separate Expo project for Android and web. The existing root HTML/CSS/JavaScript PWA is kept in place.

## Included in this initial build
- Firebase email/password sign-in and account creation
- User-scoped Firestore records
- Customer records: name, phone, address, assigned milk products
- Product catalogue: brand, type/size, unit and price
- Date-wise morning/evening attendance and quantities
- Monthly running total by customer
- Business name and commission setting

## Firebase configuration
1. In Firebase Console, open project `doodhdelight-6897a`.
2. Authentication → Sign-in method → enable **Email/Password**.
3. Firestore → Rules → publish:
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
4. Copy `.env.example` to `.env` and add the Firebase Web App config values. Do not use a service-account private key in this client app.

Firestore paths: `users/{uid}/customers`, `products`, `attendance`, and `settings/business`. Each signed-in account can read/write only its own subtree under the rules above.

No old data is imported automatically. Add customers and products manually, then record attendance.

## Local development
Use Node.js 22.13 or newer.
```bash
npm install
npx expo install --fix
npx expo start
```
Press `w` for web, or use the QR code for a device preview.

## Android APK
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```
Before building, add the six `EXPO_PUBLIC_FIREBASE_*` values to the EAS environment used by the preview profile. The preview profile generates an installable APK.

## Known first-build limitations
This is a functional starting build, not yet a complete feature-for-feature port of every old PWA tool. Monthly totals use current product prices. Historical price snapshots, final invoices/PDF/PNG exports, daily report image sharing, data backup/restore, and automated monthly bills are not implemented in this first version. Validate calculations before using totals as final customer invoices.
