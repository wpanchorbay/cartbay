---
title: Installation
description: Install and activate CartBay from WordPress.org, and optionally add the licensed CartBay Pro add-on.
---

CartBay ships as two pieces: the **free CartBay plugin** on WordPress.org, which is the complete recovery workflow and needs no license key, and the optional **CartBay Pro** <span class="cb-badge cb-badge--pro">Pro</span> add-on, a separate licensed plugin from WPAnchorBay that installs alongside the free plugin.

Install the free plugin first. Add CartBay Pro afterwards only if you want the Pro features.

## Before You Install

Confirm the store meets the [Requirements](/cartbay/getting-started/requirements/), especially WooCommerce, PHP, checkout, and email delivery requirements.

## Install CartBay (Free)

The fastest way is to search for CartBay directly in your WordPress admin: go to **Plugins > Add New**, search for **CartBay**, then click **Install Now** and **Activate**. No license key is required.

You can also install by uploading the ZIP downloaded from the [WordPress.org plugin page](https://wordpress.org/plugins/cartbay-abandoned-cart-recovery-for-woocommerce/). To install by upload, follow these steps:

<img src="/cartbay/assets/screenshots/install/1-install-plugin-page.png" alt="Install Plugin Page - CartBay" data-lightbox="true" />

1. In WordPress admin, go to **Plugins**.
2. Make sure you have already installed [WooCommerce](/cartbay/getting-started/requirements/#woocommerce) and activated it.
3. Click **Add New**.

<img src="/cartbay/assets/screenshots/install/2-add-plugin-page.png" alt="Add New Plugin Page - CartBay" data-lightbox="true" />

4. Click **Upload Plugin**.

<img src="/cartbay/assets/screenshots/install/3-upload-plugin-page.png" alt="Upload Plugin Page - CartBay" data-lightbox="true" />

5. Choose the CartBay ZIP you downloaded from WordPress.org.

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
- Continue to [Setup Wizard](/cartbay/getting-started/setup-wizard/).


## Install CartBay Pro <span class="cb-badge cb-badge--pro">Pro</span>

CartBay Pro is an optional, separately licensed add-on. It does **not** replace or unlock the free plugin in place — it installs alongside it and requires the free CartBay plugin to be installed and active first.

1. Purchase CartBay Pro from [WPAnchorBay](https://wpanchorbay.com/plugins/cartbay-abandoned-cart-recovery-for-woocommerce/).
2. Download the **CartBay Pro** add-on ZIP from your WPAnchorBay account dashboard (this is a different file from the free WordPress.org plugin).
3. In WordPress admin, go to **Plugins > Add New > Upload Plugin**, choose the Pro ZIP, click **Install Now**, then **Activate Plugin**.
4. Activate your license key to enable private updates and Pro features. See [License Activation](/cartbay/getting-started/license-activation/).

## Updating CartBay

The free CartBay plugin updates through WordPress like any other WordPress.org plugin — no license key is required.

[CartBay Pro](/cartbay/getting-started/license-activation/) <span class="cb-badge cb-badge--pro">Pro</span> receives private updates through the WPAnchorBay license server. Activate a valid Pro license key to receive continuous Pro updates.
