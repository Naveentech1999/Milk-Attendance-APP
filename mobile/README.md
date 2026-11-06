# Doodhwala Android app

This Android target packages the existing Doodhwala application with Capacitor. The original web app remains the source of the business rules and screens, preserving customer management, daily milk attendance, packet/quantity tracking, monthly billing, receipts, prices, backup and the existing Supabase account flow.

## Build locally

Requirements: Node.js 20+, Android Studio, Android SDK, and a JDK supported by the generated Gradle project.

```sh
npm install
npm run android:add       # first time only
npm run android:sync      # after web source changes
npm run android:open      # open in Android Studio
```

To build a debug APK from a machine with Android SDK configured:

```sh
npm run android:build
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Build using GitHub Actions

Push this branch and open **Actions → Build Doodhwala Android APK → Run workflow**. When the job succeeds, download the `doodhwala-android-debug-apk` artifact from that workflow run. This repository workflow produces a debug APK for testing; a Play Store release needs a separately configured signing key and release build.

## Supabase and existing data

The Android WebView uses the same Supabase project URL, publishable key, authentication and `milk_app_state` JSONB table already configured by the web app. Do not add a service-role key to the app. Run `supabase/schema.sql` in the existing Supabase project if it has not already been applied.

On the device that currently contains the authoritative customer and attendance data:
1. Open the current hosted Doodhwala app and download a JSON backup.
2. Sign in to the existing Supabase cloud section.
3. Use **Upload this device data** once to migrate the local data into the signed-in account.
4. Install the Android APK and sign in with that same account.

The existing app schedules cloud snapshot uploads after local edits once initial cloud sync has been enabled. The current schema is a per-user JSONB snapshot with RLS, not normalized customer/attendance tables. This Android wrapper preserves that design; it does not silently migrate or alter the database schema.

## Notes

- The APK is a hybrid Android app: the existing web UI runs in Android WebView, with Capacitor providing the native Android container.
- The app still requires network access for Supabase authentication and cloud sync. Existing local browser storage remains available on that installation.
- This workflow currently builds an unsigned debug APK for testing, not a signed production release.
- Verify the first cloud migration and the core flows on a real device before distributing the APK.
