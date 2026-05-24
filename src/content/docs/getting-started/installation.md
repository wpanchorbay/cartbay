---
title: Installation
description: Install and activate the private CartBay WooCommerce plugin safely on a WordPress site.
---

CartBay is distributed as a private premium plugin from WPAnchorBay. Install it like a normal WordPress plugin ZIP, then activate it from the WordPress admin.

## Before You Install

Confirm the store meets the [Requirements](/cartbay/getting-started/requirements/), especially WooCommerce, PHP, checkout, and email delivery requirements.

## Install from WordPress Admin

1. Download the CartBay plugin ZIP from WPAnchorBay.
2. In WordPress admin, go to `Plugins > Add New`.
3. Click `Upload Plugin`.
4. Choose the CartBay ZIP file.
5. Click `Install Now`.
6. Click `Activate Plugin`.

If WooCommerce is not active, CartBay shows an admin notice and does not initialize its recovery runtime.

## After Activation

After activation, CartBay creates its default options, registers recovery session statuses, seeds default recovery email content, and schedules recurring Action Scheduler jobs.

CartBay appears in:

- `WooCommerce > CartBay`
- `WooCommerce > Settings > Cart`

## First-Run Wizard

On first install, CartBay may redirect administrators to a setup wizard. The wizard helps configure license, consent, timing, email delivery awareness, and launch settings.

Wizard steps:

1. Welcome.
2. License.
3. Consent & Timing.
4. Email Delivery.
5. Launch.

## Verify Installation

After activation:

- Confirm `WooCommerce > CartBay` opens.
- Confirm the CartBay settings tab appears under `WooCommerce > Settings > Cart`.
- Confirm no WooCommerce-missing notice appears.
- Continue to [License Activation](/cartbay/getting-started/license-activation/).

## Updating CartBay

CartBay uses a private updater connected to the WPAnchorBay license server. Activate a valid license key to receive licensed update checks.

:::note
CartBay is not intended for WordPress.org hosting. The private updater and proprietary license metadata are intentional.
:::
