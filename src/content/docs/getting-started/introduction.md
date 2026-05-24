---
title: Introduction
description: Start here to understand what CartBay does, where it appears in WooCommerce, and how the recovery workflow works.
---

CartBay is a WooCommerce abandoned cart recovery plugin. It captures consented checkout visitors, detects inactive carts, sends a three-email recovery sequence, restores carts through secure links, and attributes recovered orders back to the abandoned session.

## What CartBay Does

- Captures checkout email and cart data after shopper consent.
- Supports classic WooCommerce checkout and WooCommerce Block Checkout.
- Stores recovery sessions using WooCommerce order objects, not custom database tables.
- Detects abandonment through Action Scheduler.
- Sends three WooCommerce-native recovery emails.
- Generates optional single-use recovery coupons.
- Restores carts through secure hashed-token links.
- Tracks notification, restore, recovery, and revenue analytics.
- Provides optional protected REST and WordPress Abilities access for AI agents.

## Where CartBay Appears

- Main admin area: `WooCommerce > CartBay`.
- WooCommerce settings tab: `WooCommerce > Settings > Cart`.
- Recovery email editing: WooCommerce email settings, linked from `CartBay > Templates`.
- WooCommerce logs: source `cartbay`.
- CartBay file logs: hidden Logs section linked from `CartBay > Settings`.

## Recovery Workflow

1. A shopper reaches checkout.
2. CartBay shows the recovery consent checkbox.
3. When consent is checked and a valid email is available, CartBay captures the cart session.
4. After the configured inactivity timeout, CartBay marks the session abandoned.
5. If the recovery sequence is enabled, CartBay schedules up to three recovery emails.
6. Each email can include a restore link, unsubscribe link, and optional coupon.
7. Restore links rebuild the cart and redirect the shopper to checkout.
8. Completed or processing WooCommerce orders are matched back to abandoned sessions.
9. CartBay updates recovery analytics and cancels future emails for recovered sessions.

## Recommended Reading Order

1. [Requirements](../requirements/)
2. [Installation](../installation/)
3. [License Activation](../license-activation/)
4. [Quick Start](../quick-start/)

## Important Notes

- CartBay is privately distributed by WPAnchorBay and is not hosted on WordPress.org.
- A working email delivery service is strongly recommended before enabling recovery emails.
- Store owners remain responsible for consent wording, privacy policy updates, and local compliance requirements.
