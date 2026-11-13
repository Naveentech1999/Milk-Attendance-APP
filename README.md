# Doodhwala — Firebase migration branch

This branch retains the existing Doodhwala PWA interface and its GitHub Pages deployment workflow while replacing Supabase cloud authentication/storage with Firebase Authentication + Cloud Firestore.

## Firebase setup

1. In Firebase Console, create/select a Firebase project.
2. Register a Web App and copy its Firebase web configuration.
3. Enable **Authentication → Sign-in method → Email/Password**.
4. Create **Firestore Database** in production mode.
5. In Firestore Rules, publish the rules from `firestore.rules`.
6. Create a file named `firebase-config.js` from `firebase-config.example.js` and fill in the Web App config values.
7. Deploy the static site. Keep `firebase-config.js` next to `index.html`.

The Firebase Web API key in a browser config is not a server secret. Access control is enforced by Firebase Authentication and Firestore Security Rules. Never put service-account private keys in this repository.

## Data structure

Each authenticated user owns one Firestore document:

`milk_app_state/{uid}`

Its `payload` field stores the app's existing JSON snapshot (customers, products, daily attendance, prices and monthly charges). The app retains localStorage for offline/local operation and writes to Firestore after the first successful upload. Signing in to an account with existing data restores that account's snapshot.

## Moving existing Supabase/local data

Use the existing app while connected to Supabase to download a JSON backup (or export it from the browser using the app's backup function). Open this Firebase branch, configure Firebase, sign in/create the Firebase account, and import that JSON backup into the app before pressing **Upload device data**. The Firebase document shape intentionally uses the same `payload` schema, so the backup does not need field-by-field transformation.

## Deploy

The existing `.github/workflows/deploy-pages.yml` remains unchanged. It deploys the static PWA to GitHub Pages on pushes to `main`; to deploy this branch, merge it via PR or adjust the workflow trigger/deploy source to your intended branch. GitHub Pages must be enabled for the repository.

## Verification

The GitHub Pages workflow deployment and live Firebase operations must be tested after adding your project config and publishing Firestore rules. No Firebase project config has been supplied yet, so cloud login/sync cannot be live until those steps are completed.
