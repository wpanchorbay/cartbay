---
title: Quick Start
description: Understand how CartBay works and launch it with the recommended first-run setup, verification steps, and safe production checklist.
---
Understand how CartBay works and launch it with the recommended first-run setup, verification steps, and safe production checklist.

Before starting, review [Requirements](/cartbay/getting-started/requirements/) and complete [Installation](/cartbay/getting-started/installation/). The free plugin needs no license key. If you also run [CartBay Pro](/cartbay/getting-started/license-activation/) <span class="cb-badge cb-badge--pro">Pro</span>, keep its license active ([License Activation](/cartbay/getting-started/license-activation/)).


## 1. Configure Capture

Open [Capture](/cartbay/user-guide/capture/): **WooCommerce > CartBay > Capture** or **WooCommerce > Settings > Cart > Capture**

Recommended starting values:

| Setting | Recommended value |
|---|---|
| Enable Capture | Enabled |
| Consent Text | Short, explicit recovery consent copy |
| Consent Checkbox Default State | Match your legal/compliance policy |
| Abandonment Timeout | `30` minutes |

Example consent text:

```text
Save my email to recover my cart if I leave.
```

## 2. Configure the Recovery Sequence

Open [Recovery Sequence](/cartbay/user-guide/recovery-sequence/): **WooCommerce > CartBay > Recovery Sequence** or **WooCommerce > Settings > Cart > Recovery Sequence**

Default sequence:

| Step | Default timing | Default coupon |
|---|---:|---|
| Email 1 | 45 minutes after abandonment | Off |
| Email 2 | 24 hours after abandonment | Off |
| Email 3 | 72 hours after abandonment | Off |

Keep the default timing for a first launch unless you already have a tested recovery cadence.

## 3. Review Templates

Open [Templates](/cartbay/user-guide/templates/):  **WooCommerce > CartBay > Templates** or **WooCommerce > Settings > Cart > Templates**

1. Edit each recovery email in WooCommerce email settings.
2. Keep `{restore_url}` in the call to action or body.
3. Keep `{unsubscribe_url}` available unless your legal process provides an equivalent opt-out.
4. Use coupon placeholders only on steps where coupons are enabled.

## 4. Configure Offers

Open [Offers](/cartbay/user-guide/offers/):  **WooCommerce > CartBay > Offers** or **WooCommerce > Settings > Cart > Offers**

**Free:** the free plugin uses a **single static coupon code** that references an existing WooCommerce coupon. Create the coupon in **WooCommerce > Marketing > Coupons** first, then enter its code in Offers. CartBay inserts that code into recovery emails as plain text on steps where the coupon is enabled.

**Recommended coupon setup <span class="cb-badge cb-badge--pro">Pro</span>:** [CartBay Pro](/cartbay/getting-started/license-activation/) replaces the static code with a unique, single-use coupon generated per abandoned cart — email-restricted, with an expiry, and auto-applied when the shopper restores their cart. Generated coupons use fixed-cart defaults out of the box:

| Setting | Value |
|---|---|
| Coupon Type | Fixed Cart Discount |
| Coupon Amount | A margin-safe amount, such as `10` in store currency |
| Coupon Expiry | `7` days |

## 5. Verify Email Delivery

Open [Templates](/cartbay/user-guide/templates/) and use `Trigger Test Flow` after enabling Test Mode. The test flow creates a dummy abandoned session and schedules the first recovery email in about 30 seconds.

`Trigger Test Flow` only confirms that CartBay schedules and hands off the email. It does not confirm your site can actually deliver mail. Before launch, follow [Email Delivery Setup](/cartbay/getting-started/email-delivery-setup/) to configure an SMTP or ESP-native plugin, then use **Send Test Email** on the [Notifications](/cartbay/user-guide/notifications/) page.

:::caution
Use Test Mode on staging or during controlled QA. Disable it before normal production monitoring if you do not want shortened test behavior available.
:::

## 6. Monitor the First Week

- Review [CartBay Overview](/cartbay/user-guide/overview/) to monitor tracked, abandoned, recovered, abandoned value, revenue, and recovery rate.
- Review [Notifications](/cartbay/user-guide/notifications/) for failed or retry-queued emails.
- Review WooCommerce logs with source `cartbay` if capture or background jobs behave unexpectedly.
- Adjust email content before changing timing or discounts.
