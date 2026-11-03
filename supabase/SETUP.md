# Supabase setup for Milk Attendance

The app is configured for this Supabase project:

- Project URL: https://dneqxnxmcxkvaqnzxvrr.supabase.co
- Browser key: publishable key only (safe for public client use when Row Level Security is enabled)

## 1. Create the database table and private bill bucket

1. Open https://supabase.com/dashboard and select project `dneqxnxmcxkvaqnzxvrr`.
2. Open **SQL Editor** and create a new query.
3. Copy and run the complete contents of [schema.sql](./schema.sql).
4. Confirm that `public.milk_app_state` exists and that the `customer-bills` Storage bucket is private.

The table stores one JSONB snapshot per authenticated app user. Row Level Security policies restrict reads and writes to that user's own row. The Storage bucket and its policies are prepared for private bill images.

## 2. Create your app login

1. Open the deployed Milk Attendance app.
2. Go to **Prices & backup → Supabase cloud database**.
3. Enter your email and a password of at least 8 characters, then select **Create account**.
4. If Supabase asks for email confirmation, confirm the email, return to the app, and sign in.

## 3. Migrate the existing data from this device

1. First select **Download backup** in the existing Backup card. Keep the JSON file somewhere safe.
2. Sign in to the cloud database section.
3. Select **Upload this device data**. This uploads the current customers, product settings, prices, commission, monthly charges, and all date-wise attendance from this browser to your private database row.
4. Wait for the successful upload message. Automatic cloud sync is then enabled for later changes made on this device.
5. On another device, sign in with the same account and select **Download cloud data**. This replaces that device's local app data with the cloud copy.

**Important:** Upload overwrites the cloud snapshot for the signed-in account. Download replaces the current device's local app data. Keep the JSON backup before either operation. The first upload should be done from the device that contains the most complete attendance history.

## Current scope

This release adds Supabase email/password authentication, a user-isolated PostgreSQL JSONB store, manual first migration, and automatic cloud sync after the first successful upload. It does not yet generate monthly PNG bills automatically. The private Storage bucket is prepared, but month-end image generation and its scheduled Edge Function still need to be implemented and deployed separately. Do not treat monthly bill automation as active until that is completed and tested.
