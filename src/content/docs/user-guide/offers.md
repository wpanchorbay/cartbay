---
title: Offers
description: Configure CartBay recovery coupon type, amount, expiry, coupon history, validation behavior, and discount best practices.
---

The Offers section controls the coupon settings CartBay uses when a recovery email step includes a coupon. In the current version, Offers focuses on CartBay-generated discount coupons; broader incentive types are reserved for future expansion.

## Where to Find It

Open `WooCommerce > CartBay > Offers`.

Coupon history is available through the `View coupon history and details` button.

## Purpose

Offers define the incentive used by coupon-enabled recovery emails. The Recovery Sequence decides which email steps include coupons. The Offers section decides what those coupons look like.

## Coupon Type

`Coupon Type` controls how the CartBay-generated discount is calculated.

Default: Fixed Cart Discount.

Options:

| Type | Meaning | Use when |
|---|---|---|
| Fixed Cart Discount | Applies a fixed store-currency amount to the cart. | You want predictable margin impact. |
| Percentage | Applies a percentage discount to the full cart total. | You intentionally want the discount to scale with cart value. |

When Percentage is selected, the UI shows a warning because the discount applies to the full cart total, regardless of which products the buyer adds or the final cart value.

:::caution
Use percentage discounts carefully on stores with high-value carts or low-margin products.
:::

## Coupon Amount

`Coupon Amount` controls the numeric discount amount.

Default: `10`.

For fixed-cart coupons, enter the store-currency amount. For percentage coupons, enter the percentage number, such as `10` for 10% off.

The Offers section shows a live discount summary so administrators can confirm what future coupon-enabled emails will include.

## Coupon Expiry

`Coupon Expiry` controls how long CartBay-generated coupons remain valid after they are created.

Default: `7` days.

Allowed range: `1` to `365` days.

Shorter expiry windows create urgency. Longer expiry windows reduce friction but can leave incentives available after the shopper's purchase intent has cooled.

## Discount Summary

The Discount Summary explains the current coupon configuration in plain language. It updates when the coupon type, amount, or expiry fields change.

Example:

```text
Recovery emails with coupons enabled will include a $10 off discount coupon. Expires 7 days after generation.
```

Use the summary to verify the merchant-facing meaning of the settings before saving.

## When Coupons Are Generated

CartBay generates coupons only for recovery sequence steps where `Include a recovery coupon` is enabled.

Default behavior:

- Email 1: coupon disabled.
- Email 2: coupon disabled.
- Email 3: coupon enabled.

Generated coupon behavior:

- Code prefix is `CARTBAY-`.
- One active coupon is generated per CartBay session.
- Coupons are single-use.
- Coupons are individual-use.
- Coupons are restricted to the captured email.
- Session meta stores `_cartbay_coupon_code` and `_cartbay_coupon_expires_at`.
- Coupon meta stores CartBay session and generated-coupon context.

## Coupon Validation

CartBay validates generated coupons against restored session identity and restored/checkout email. This prevents a recovery coupon from being used outside the matching recovery flow.

CartBay also avoids applying recovery coupons when the cart contains WooCommerce Subscription products or subscription variations.

## Coupon History

Coupon History is read-only and shows CartBay-generated coupons with recovery context.

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

- Start with a fixed-cart discount that protects margin.
- Use coupons later in the sequence unless the store has a proven first-email discount strategy.
- Keep expiry short enough to encourage action.
- Review Coupon History before increasing discount amounts.
- Avoid percentage offers for high-value carts unless margins support them.
