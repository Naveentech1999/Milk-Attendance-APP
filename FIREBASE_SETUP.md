# Firebase configuration for Doodhwala

## Required services
- Firebase Authentication: enable Email/Password provider.
- Cloud Firestore: create the default database.
- Firestore rules: publish `firestore.rules`.

## Web config
Register a Firebase Web App and copy its config into `firebase-config.js`, using `firebase-config.example.js` as the template. Keep `firebase-config.js` in the deployed site root, beside `index.html`.

## GitHub Pages
The current deployment workflow is retained. Add `firebase-config.js` to the branch before merging/deploying. Do not put service account JSON/private keys in the browser app.

## Data migration
Before switching your day-to-day use, download a JSON backup from the Supabase version. In the Firebase version, open the app on the device that has the source data, load the backup using the app's import/restore function, sign in to Firebase, and select **Upload device data**. The Firestore document keeps the same app state object so customers, product definitions, attendance, prices and monthly charge information retain their existing shape.

## Data ownership
Each user writes only to `milk_app_state/{their Firebase Auth UID}`. The Firestore rules enforce that ownership. Do not remove or loosen the rules to make client reads work.
