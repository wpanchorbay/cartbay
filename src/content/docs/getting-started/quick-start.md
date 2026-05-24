---
title: Quick Start
description: Launch CartBay with the recommended first-run setup, verification steps, and safe production checklist.
---

Use this checklist to launch CartBay without changing code.

Before starting, review [Requirements](/cartbay/getting-started/requirements/), complete [Installation](/cartbay/getting-started/installation/), and keep your license key ready from [License Activation](/cartbay/getting-started/license-activation/).

## 1. Install and Activate

1. Install CartBay as a private premium WordPress plugin.
2. Confirm WooCommerce is active.
3. Activate CartBay.
4. Open the first-run wizard if redirected, or go to `WooCommerce > CartBay`.

If WooCommerce is missing, CartBay shows an admin notice and does not initialize its recovery runtime.

## 2. Activate the License

Open `WooCommerce > CartBay > Settings`.

1. Paste the WPAnchorBay license key into `Activate New Key`.
2. Save or activate the key.
3. Confirm the status badge is `Active` or `Dev Mode` on local/staging domains.

:::note
If the license server is temporarily unreachable, CartBay does not stop capture, recovery, or restore flows. License checks fail open for continuity.
:::

## 3. Configure Capture

Open [Capture](/cartbay/user-guide/capture/).

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

## 4. Configure the Recovery Sequence

Open [Recovery Sequence](/cartbay/user-guide/recovery-sequence/).

Default sequence:

| Step | Default timing | Default coupon |
|---|---:|---|
| Email 1 | 45 minutes after abandonment | Off |
| Email 2 | 24 hours after abandonment | Off |
| Email 3 | 72 hours after abandonment | On |

Keep the default timing for a first launch unless you already have a tested recovery cadence.

## 5. Review Templates

Open [Templates](/cartbay/user-guide/templates/).

1. Edit each recovery email in WooCommerce email settings.
2. Keep `{restore_url}` in the call to action or body.
3. Keep `{unsubscribe_url}` available unless your legal process provides an equivalent opt-out.
4. Use coupon placeholders only on steps where coupons are enabled.

## 6. Configure Offers

Open [Offers](/cartbay/user-guide/offers/).

Recommended first launch:

| Setting | Recommended value |
|---|---|
| Coupon Type | Fixed Cart Discount |
| Coupon Amount | A margin-safe amount, such as `10` in store currency |
| Coupon Expiry | `7` days |

## 7. Verify Email Delivery

Open [Settings](/cartbay/user-guide/settings/) and confirm SMTP or transactional mail delivery is configured.

Open [Templates](/cartbay/user-guide/templates/) and use `Trigger Test Flow` after enabling Test Mode. The test flow creates a dummy abandoned session and schedules the first recovery email in about 30 seconds.

:::caution
Use Test Mode on staging or during controlled QA. Disable it before normal production monitoring if you do not want shortened test behavior available.
:::

## 8. Monitor the First Week

- Review [CartBay Overview](/cartbay/user-guide/overview/) to monitor tracked, abandoned, recovered, abandoned value, revenue, and recovery rate.
- Review [Notifications](/cartbay/user-guide/notifications/) for failed or retry-queued emails.
- Review WooCommerce logs with source `cartbay` if capture or background jobs behave unexpectedly.
- Adjust email content before changing timing or discounts.
