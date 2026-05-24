---
title: Recovery Sequence
description: Configure CartBay's email sending, three-step recovery timing, per-step coupons, restore links, unsubscribe handling, and recovery matching behavior.
---

The Recovery Sequence section controls what happens after a captured cart becomes abandoned. It lets you turn recovery email sending on or off, decide when each of the three emails should send, and choose whether each email step includes a recovery coupon.

## Where to Find It

Open `WooCommerce > CartBay > Recovery Sequence`.

## Purpose

CartBay always detects abandoned sessions for reporting. The recovery sequence controls whether CartBay also sends recovery emails for those abandoned sessions.

Use this section to define the recovery cadence: an early reminder, a follow-up, and a final recovery email. Timing is counted after a cart becomes abandoned, not after the shopper first reaches checkout.

## Email Sending

`Send the 3-email recovery sequence` is the master sending toggle.

Default: enabled.

When enabled:

- Captured carts can become abandoned after the abandonment timeout.
- Abandoned sessions schedule recovery email actions.
- Each configured email step runs through Action Scheduler.
- Email jobs still check session state before sending.

When disabled:

- CartBay continues to capture carts.
- CartBay continues to mark inactive carts abandoned.
- No new recovery email sequence is scheduled for newly abandoned sessions.
- Overview analytics still show tracked and abandoned activity.

Use this toggle to pause recovery outreach without turning off checkout capture.

## Email 1: Initial Reminder

Default timing: `45 minutes` after abandonment.

Default coupon: off.

Purpose: remind the shopper while purchase intent is still fresh.

Recommended use:

- Keep the copy short.
- Make the restore button obvious.
- Avoid discounting unless the store intentionally discounts at the first touch.

## Email 2: Value Follow-Up

Default timing: `24 hours` after abandonment.

Default coupon: off.

Purpose: bring the cart back to mind after the shopper has had time to compare options or step away.

Recommended use:

- Reinforce product value.
- Answer common objections.
- Mention shipping, guarantees, support, or trust signals if relevant.
- Use a coupon only when price resistance is a common abandonment reason.

## Email 3: Final Recovery Email

Default timing: `72 hours` after abandonment.

Default coupon: on.

Purpose: make a final recovery attempt with the strongest conversion message.

Recommended use:

- Create a clear reason to return now.
- Use urgency carefully and truthfully.
- Include the recovery coupon when the store uses discounts.

## Timing Controls

Each email card includes a delay value and unit selector.

Units:

- Minutes.
- Hours.
- Days.

Rules:

- Minimum delay is 15 minutes.
- Maximum delay is 7 days (`10080` minutes).
- CartBay normalizes all timing into minutes internally.
- Later steps are automatically moved forward when needed so the sequence remains in order.
- CartBay keeps at least a 15-minute gap between sequence steps.

Example: if Email 2 is accidentally set earlier than Email 1, CartBay saves a safe ordered value instead of allowing the sequence to overlap.

## Include a Recovery Coupon

Each email step has an `Include a recovery coupon` toggle.

When enabled:

- CartBay creates a CartBay-generated coupon before sending that email step.
- The coupon uses the global [Offers](/cartbay/user-guide/offers/) settings for type, amount, and expiry.
- `{coupon_code}` and `{coupon_expiry}` placeholders resolve for that email.
- The coupon is linked to the CartBay session and captured email.
- Coupon use is validated against restored session identity and checkout email.

When disabled:

- No coupon is generated for that step.
- Coupon placeholders should not be used in that step's email copy.

:::tip
The default sequence keeps coupons off for Email 1 and Email 2, and uses a coupon only in Email 3. This avoids training shoppers to expect immediate discounts.
:::

## Background Processing

CartBay uses Action Scheduler for recovery jobs.

| Hook | Type | Purpose |
|---|---|---|
| `cartbay_detect_session_abandonment` | Single action | Checks one captured session at its exact timeout boundary. |
| `cartbay_detect_abandonment` | Recurring every 5 minutes | Fallback scanner for inactive captured sessions. |
| `cartbay_send_recovery_email` | Single action | Sends one recovery email step for one session. |

If the queue is delayed because cron, traffic, or the server is unavailable, pending actions are processed when Action Scheduler resumes. CartBay does not drop overdue pending recovery emails automatically.

## Send Guards

Before sending any recovery email, CartBay verifies:

- The session still exists.
- The session is still abandoned.
- The email is not suppressed.
- The same step has not already been sent.

Failed sends can be retried up to three attempts. Retry delay is `15 * attempts` minutes. These retries cover WordPress/WooCommerce mail failures, not downstream provider bounces unless an integration reports delivery or failure back to CartBay.

## Restore Links

Every recovery email includes a secure restore link. Restore links use the `cartbay_restore` query parameter and hashed token storage.

When clicked, CartBay validates the token, rebuilds the cart when possible, stores checkout attribution in the WooCommerce session, optionally applies the recovery coupon, and redirects the shopper to checkout.

## Unsubscribe Links

Recovery emails can include an unsubscribe link using the `cartbay_unsubscribe` query parameter.

When clicked, CartBay stores a hashed suppression record, marks the session suppressed, cancels pending recovery email work, and prevents future recovery messages for that email.

## Recovery Matching

CartBay marks a session recovered when a completed or processing WooCommerce order matches an abandoned CartBay session.

Attribution priority:

1. CartBay session ID.
2. Restore token hash.
3. CartBay coupon metadata.
4. Billing email hash fallback.

Orders completed before abandonment are recorded separately as `completed_before_abandonment` and are not counted as recovered abandoned revenue.

## Best Practices

- Start with the default three-step sequence.
- Adjust template content before changing timing or discounts.
- Avoid coupons in Email 1 unless the store already uses first-touch discounting.
- Monitor [Notifications](/cartbay/user-guide/notifications/) after changing timing.
- Review [Offers](/cartbay/user-guide/offers/) before enabling coupons on additional steps.
