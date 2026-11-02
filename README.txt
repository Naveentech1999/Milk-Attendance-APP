# Milk Attendance & Billing — Installable Web App

## Publish it
Upload the **contents** of this folder to a static HTTPS host, such as GitHub Pages. Keep `index.html`, `manifest.webmanifest`, `service-worker.js`, and the `icons` folder together at the same site path.

## Install on Android
1. Open the published HTTPS site in Chrome.
2. Wait for the page to load once.
3. Open Chrome's menu (⋮) and choose **Install app** or **Add to Home screen**.
4. Confirm. Launch it from the new home-screen icon.

## Offline and data
- The app shell is cached after the first successful online visit, so it can reopen offline.
- Attendance, monthly delivery charges, and prices are stored in that browser's local storage on that device.
- They are not automatically synced to another phone or cloud account.
- Use the app's Backup option regularly and keep the JSON backup somewhere safe.
- Do not clear the browser's site data unless you have a backup.

## Important
The app is an installable PWA, not an APK. It needs to be hosted over HTTPS (localhost is also accepted for development) before browser installation is available.
