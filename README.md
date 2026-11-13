# Doodhwala – Milk Delivery Attendance & Billing Management

Doodhwala is an installable, mobile-friendly web application (Progressive Web App) built to help milk vendors and milk delivery businesses manage customer-wise milk delivery attendance, daily milk quantities, product prices, and customer billing.

Instead of maintaining daily delivery records manually, a milk vendor can use Doodhwala to mark whether each customer received milk, record morning and evening quantities, review daily delivery totals, and calculate customer charges over a month.

## What is the app used for?

Doodhwala is intended for the day-to-day operations of a local milk delivery business. Its main purpose is to keep customer delivery and billing records organised in one place.

Typical users include:
- Individual milk vendors and milkmen.
- Small milk delivery businesses.
- Milk suppliers who manage recurring household customers.
- Delivery operators who need daily attendance and monthly customer accounts.

## Features

### 1. Customer and delivery records
- Maintain a list of milk customers.
- Store customer details such as name and delivery location.
- Configure the milk products and quantities associated with customers.
- Search and filter the customer list.

### 2. Daily delivery attendance
- Select a date and record customer-wise delivery attendance.
- Mark a customer as **Present** or **Absent**.
- Keep attendance records date-wise.
- Use the attendance record as the basis for delivery and billing calculations.

### 3. Morning and evening milk quantity tracking
- Record morning and evening quantities for configured milk products.
- Enter the quantity delivered to each customer.
- Calculate line totals from quantities and configured product prices.
- Review the total amount for an individual customer.

### 4. Product pricing and billing
- Configure product prices used in delivery calculations.
- Calculate customer charges from recorded quantities and prices.
- Review daily delivery amounts and month-wise customer charges.
- Maintain monthly charge records.

### 5. Daily and monthly summaries
- View daily attendance and delivery summaries.
- Review daily milk quantities and calculated totals.
- Review monthly customer billing information.

### 6. Reports, downloads, and backup
- Download a backup of the app's stored data.
- Generate and share a daily report image.
- Keep a backup before moving data between devices or restoring a cloud copy.

### 7. Optional Supabase cloud account and sync
- Create an account or sign in using an email address and password.
- Upload the current device data to the configured Supabase database.
- Download the saved cloud data on another device.
- After the initial successful upload, automatic cloud sync can be enabled for subsequent changes on that device.
- The database uses Supabase Row Level Security so authenticated users can access only their own app-state row.

Cloud sync is optional and requires the Supabase project and database setup to be available. The first migration to the cloud is a manual upload.

### 8. Installable Progressive Web App
- Install the app from a supported mobile browser.
- Use a home-screen app experience without needing a separately packaged Android APK.
- The service worker caches the application shell so it can reopen offline after the required assets have been cached.

**Offline note:** The cached app shell can open offline, but cloud authentication and cloud sync require an internet connection. Data stored locally belongs to that browser/device unless it is backed up or synced.

## How to use

1. Open the deployed Doodhwala website.
2. Add or review the customer list and each customer's milk product configuration.
3. Set the applicable product prices.
4. Open the daily attendance/registration screen and select the date.
5. Mark each customer Present or Absent.
6. Enter the morning and evening quantities as applicable.
7. Review daily totals and customer charges.
8. Open the daily or monthly sections to review summaries and billing.
9. Download a data backup regularly. To use cloud sync, configure Supabase, sign in, and upload the device data first.

The exact labels and available actions are those implemented in the current `index.html`.

## Technology

- **HTML5** – application structure.
- **CSS3** – responsive, mobile-first interface.
- **JavaScript** – attendance, quantity, pricing, calculations, reports, and application behaviour.
- **Browser Local Storage** – saves the app data on the current device/browser.
- **Supabase** – optional email/password authentication and cloud storage of the app-state JSON data.
- **Progressive Web App (PWA)** – web app manifest, installable experience, and service-worker caching.

The main application interface and most application logic are contained in `index.html`.

## Run locally

Because this is a browser-based application, you can serve the repository with any simple local HTTP server.

For example, with Python installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening the HTML file directly may limit service-worker and PWA functionality. Use localhost or an HTTPS host for those features.

## Deploy

This project can be hosted on a static web host that supports HTTPS, such as GitHub Pages.

Keep the following files and folders together at the deployed site path:

- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `assets/`
- `icons/`

After deployment, open the HTTPS URL in a supported browser and use its **Install app** or **Add to Home screen** option.

## Supabase cloud setup

The repository includes Supabase setup files:

- `supabase/SETUP.md` – setup and migration instructions.
- `supabase/schema.sql` – database table, Row Level Security policies, and private Storage bucket setup.

Follow `supabase/SETUP.md` to prepare the configured Supabase project and create an app account.

**Important data behaviour:**
- Local records are saved in the current browser's Local Storage.
- Signing in does not by itself migrate existing local records to the cloud; perform the initial **Upload this device data** action.
- Upload replaces the cloud snapshot for the signed-in account.
- Download cloud data replaces the local app data on that device.
- Keep a JSON backup before uploading or downloading data.

## Current limitations and scope

- The application is a PWA, not a native Android APK.
- Cloud sync depends on Supabase configuration, connectivity, and a successful initial upload.
- Offline support caches the app shell; it does not make online cloud services available offline.
- The repository's Supabase setup documentation states that automatic monthly PNG bill generation is not implemented yet. The private Storage bucket is prepared for future bill images, but the month-end image generation and scheduled automation still need to be developed and deployed.
- The app should not be described as having automated monthly bill delivery unless that functionality is implemented separately.

## Repository

[Milk-Attendance-APP](https://github.com/Naveentech1999/Milk-Attendance-APP)

---

**Doodhwala helps milk delivery businesses manage daily customer attendance, track milk quantities, and organise customer billing through a simple installable web app.**
