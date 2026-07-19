---
title: Offers
description: Set the static recovery coupon code CartBay Free adds to recovery emails, and learn how CartBay Pro generates unique per-session coupons with validation and expiry.
---

The Offers section controls the coupon CartBay adds to recovery emails when a recovery step includes one. In CartBay Free, Offers holds a single **static coupon code** that references an existing WooCommerce coupon. CartBay Pro replaces it with unique, per-session generated coupons.

## Where to Find It

Open `WooCommerce > CartBay > Offers`.

<img src="/cartbay/assets/screenshots/cartbay-offers-page.png" alt="CartBay Offers page" data-lightbox="true" />

## Purpose

Offers defines the incentive used by coupon-enabled recovery emails. The [Recovery Sequence](/cartbay/user-guide/recovery-sequence/) decides which email steps include a coupon; Offers decides which coupon code those steps insert.

## Static Coupon Code

In CartBay Free, Offers is a single **static coupon code** field, stored in `cartbay_settings[static_coupon_code]`.

- Enter the code of an **existing WooCommerce coupon** you have already created under `Marketing > Coupons`.
- When a recovery step has `Include a recovery coupon` enabled, CartBay inserts this code into that email as plain text through the `{coupon_code}` placeholder.
- CartBay Free does **not** generate, modify, restrict, or expire the coupon. Its discount type, amount, usage limits, and expiry date are whatever you configured on the WooCommerce coupon itself.
- The same static code is used for every coupon-enabled step and every recovery session, and shoppers enter it manually at checkout.

:::tip
Create the WooCommerce coupon first (`Marketing > Coupons`), then paste its exact code into Offers. If the code does not match a real WooCommerce coupon, the email will show a code that applies no discount.
:::

## Dynamic Recovery Coupons <span class="cb-badge cb-badge--pro">Pro</span>

:::note[CartBay Pro]
Automatic, per-session coupon generation is part of [CartBay Pro](/cartbay/getting-started/license-activation/). CartBay Free uses the single static code described above; Pro replaces it with a unique coupon generated for each recovery session.
:::

With CartBay Pro, coupon-enabled recovery steps generate a unique coupon per session instead of inserting the static code.

Generated coupon behavior:

- Code prefix is `CARTBAY-` followed by 8 random alphanumeric characters, unique to the session.
- One coupon is generated per CartBay session.
- Coupons are single-use and individual-use.
- Coupons are restricted to the captured email address.
- Coupons carry an expiry date and are applied automatically when the shopper restores the cart from a recovery email.
- Session meta stores `_cartbay_coupon_code` and `_cartbay_coupon_expires_at`; the coupon stores its CartBay session and generated-coupon context.
- The `{coupon_code}` and `{coupon_expiry}` placeholders resolve to the generated coupon and its expiry.

The shipped version of CartBay Pro generates fixed-cart coupons worth `10` in store currency with a `7`-day expiry. These generation defaults are fixed — there is no coupon type, amount, or expiry configuration screen.

### Coupon Validation <span class="cb-badge cb-badge--pro">Pro</span>

CartBay Pro validates each generated coupon against the restored session identity and the restored/checkout email, so a recovery coupon cannot be used outside its matching recovery flow. CartBay Pro also avoids applying recovery coupons when the cart contains WooCommerce Subscription products or subscription variations.

### Coupon History <span class="cb-badge cb-badge--pro">Pro</span>

CartBay Pro adds a read-only Coupon History view, opened with the `View coupon history and details` button, showing generated coupons with recovery context.

Summary cards:

- Generated.
- Active.
- Used.
- Expired.

Table data:

- Masked coupon code.
- CartBay session.
- Discount.
- Usage.
- Expiry.
- Status.

The `More` action expands row-level details such as full code, generated email, email restrictions, restore click timestamp, recovered order, and session recovery events.

## Best Practices

- In CartBay Free, create the WooCommerce coupon first and keep its own usage limits and expiry conservative, since the same static code is shared across every recovery email.
- Use coupons later in the sequence unless the store has a proven first-email discount strategy.
- Avoid percentage or high-value discounts on low-margin products.
- With CartBay Pro, review Coupon History before changing your discount strategy.
