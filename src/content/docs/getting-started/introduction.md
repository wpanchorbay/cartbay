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
- Adds a recovery coupon to emails — a single static WooCommerce coupon code in the free plugin, or unique single-use coupons generated per cart with [CartBay Pro](/cartbay/getting-started/license-activation/) <span class="cb-badge cb-badge--pro">Pro</span>.
- Restores carts through secure hashed-token links.
- Tracks notification, recovery, and revenue analytics.

## Where CartBay Appears

- Main admin area: `WooCommerce > CartBay`.
- WooCommerce settings tab: `WooCommerce > Settings > Cart`.
- Recovery email editing: WooCommerce email settings, linked from `CartBay > Templates`.
- WooCommerce logs: source `cartbay`.
- CartBay logs: hidden Logs section linked from `CartBay > Settings`.

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
3. [Setup Wizard](../setup-wizard/)
4. [Quick Start](../quick-start/)

## Important Notes

- CartBay's core recovery workflow is free and installs from WordPress.org — no license key required. [CartBay Pro](/cartbay/getting-started/license-activation/) <span class="cb-badge cb-badge--pro">Pro</span> is a separate, licensed add-on that installs alongside the free plugin and unlocks advanced features such as generated single-use coupons and advanced analytics.
- A working email delivery service is strongly recommended before enabling recovery emails. See [Email Delivery Setup](../email-delivery-setup/) for setup steps.
- Store owners remain responsible for consent wording, privacy policy updates, and local compliance requirements.
