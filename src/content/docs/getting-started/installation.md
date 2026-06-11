---
title: Installation
description: Install and activate the private CartBay WooCommerce plugin safely on a WordPress site.
---

CartBay is distributed as a private premium plugin from WPAnchorBay. Install it like a normal WordPress plugin ZIP, then activate it from the WordPress admin.

## Before You Install

Confirm the store meets the [Requirements](/cartbay/getting-started/requirements/), especially WooCommerce, PHP, checkout, and email delivery requirements.

## Install from WordPress Admin

Get the CartBay plugin ZIP (`cartbay.zip`) file from WPAnchorBay site, or from your purchase email or the marketplace you purchased from. Then follow these steps:

<img src="/cartbay/assets/screenshots/install/1-install-plugin-page.png" alt="Install Plugin Page - CartBay" data-lightbox="true" />

1. In WordPress admin, go to **Plugins**.
2. Make sure you have already installed [WooCommerce](/cartbay/getting-started/requirements/#woocommerce) and activated it.
3. Click **Add New**.

<img src="/cartbay/assets/screenshots/install/2-add-plugin-page.png" alt="Add New Plugin Page - CartBay" data-lightbox="true" />

4. Click **Upload Plugin**.

<img src="/cartbay/assets/screenshots/install/3-upload-plugin-page.png" alt="Upload Plugin Page - CartBay" data-lightbox="true" />

5. Choose the CartBay ZIP (`cartbay.zip`) file.

6. Click **Install Now**.

<img src="/cartbay/assets/screenshots/install/4-activate-plugin-page.png" alt="Activate Plugin Page - CartBay" data-lightbox="true" />

7. Click **Activate Plugin**.

:::note
If WooCommerce is not active, CartBay shows an admin notice and does not initialize its recovery runtime.
:::

## After Activation

After plugin activation, CartBay creates its default options, registers recovery session statuses, seeds default recovery email content, and schedules recurring Action Scheduler jobs.

You can go to the CartBay dashboard by clicking on the **Overview** link on the CartBay row of the plugins list.

<img src="/cartbay/assets/screenshots/install/5-installed-plugin-page.png" alt="Installed Plugin Page - CartBay" data-lightbox="true" />

**CartBay appears in:**

There  are several ways to access CartBay:

- **WordPress Admin Settings:** `WooCommerce > Settings > Cart`
- **WordPress Admin Direct:** `WooCommerce > CartBay`
- **From Plugins  Page:** `Plugins > CartBay > Overview`

<img src="/cartbay/assets/screenshots/install/6-access-plugin-page.png" alt="CartBay Access Guide - CartBay" data-lightbox="true" />

<img src="/cartbay/assets/screenshots/install/cartbay-homepage.png" alt="CartBay Plugin Homepage - CartBay" data-lightbox="true" />

**Verify Installation:**

- Confirm `WooCommerce > CartBay` and/or `WooCommerce > Settings > Cart` opens.
- Confirm the CartBay settings tab appears under `WooCommerce > Settings > Cart`.
- Confirm no WooCommerce-missing notice appears.
- Continue to [License Activation](/cartbay/getting-started/license-activation/).


## First-Run Wizard

On first install, CartBay may redirect administrators to a setup wizard. The wizard helps configure license, consent, timing, email delivery awareness, and launch settings.

Wizard steps:

1. Welcome.
2. License.
3. Consent & Timing.
4. Email Delivery.
5. Launch.


## Updating CartBay

CartBay uses a private updater connected to the WPAnchorBay license server. Activate a valid license key to receive continuous updates.

:::note
CartBay is not intended for WordPress.org hosting. The private updater and proprietary license metadata are intentional.
:::
