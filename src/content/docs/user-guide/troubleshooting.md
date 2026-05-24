---
title: Troubleshooting
description: Diagnose CartBay capture, recovery sequence, notifications, templates, offers, settings, restore, analytics, license, and AI-agent issues.
---

The Troubleshooting page helps administrators and support teams identify why CartBay is not capturing carts, not sending emails, not restoring carts, not applying coupons, or not showing expected analytics. Start with the section that matches the symptom, then use logs and session details to confirm the cause.

## Where to Find It

Open `WooCommerce > CartBay > Troubleshooting` in this documentation. In WordPress, use `WooCommerce > CartBay`, `WooCommerce > Status > Logs`, and the hidden CartBay Logs section linked from Settings.

## Purpose

Use this page when a CartBay workflow does not match expectations. It explains what to check before escalating to development or support.

## First Checks

Before diagnosing a specific feature, confirm:

- WooCommerce is installed and active.
- CartBay is active.
- Capture is enabled in [Capture](/cartbay/user-guide/capture/).
- The recovery sequence is enabled if emails should send.
- Action Scheduler is processing scheduled actions.
- WordPress mail is deliverable through SMTP or a transactional provider.
- WooCommerce logs include the `cartbay` source.
- CartBay Logs are enabled if deeper support diagnostics are needed.

## Capture Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Consent checkbox does not appear | Capture is disabled or the page is not checkout. | Enable Capture and test on the checkout page. |
| Block Checkout field is missing | WooCommerce additional field registration did not run. | Confirm WooCommerce Blocks checkout is active and check logs. |
| No sessions are created | Invalid email, unchecked consent, suppressed email, disabled capture, or rate limit. | Enter a valid email, check consent, inspect logs, and verify rate limits. |
| Session disappears after capture | Shopper withdrew consent. | Expected behavior; CartBay deletes the active session and pending jobs. |
| `429` capture responses | Public capture endpoint rate limit reached. | Wait for the transient window to expire or reduce repeated test requests. |

## Recovery Sequence Problems

| Problem | Likely cause | Fix |
|---|---|---|
| No email jobs are scheduled | Email sending is disabled in Recovery Sequence. | Enable `Send the 3-email recovery sequence`. |
| Email sends later than expected | Action Scheduler was delayed. | Check scheduled actions and server cron/traffic. |
| Email step is skipped | Session recovered, suppressed, expired, not abandoned, or step already sent. | Review session events and notification details. |
| Step timing seems reordered | CartBay normalized timing to keep steps in order. | Review saved sequence timing values. |

## Notification Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Many queued notifications | Action Scheduler is not running promptly. | Check WooCommerce scheduled actions. |
| Many failed notifications | WordPress mail is failing. | Configure SMTP or transactional mail. |
| Sent but no inbox delivery | WordPress accepted mail but provider or inbox delivery failed. | Check SMTP/ESP logs and spam placement. |
| Notifications canceled | Session recovered, shopper unsubscribed, or pending work was canceled. | Open the notification Details modal. |

## Template Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Placeholder is empty | Placeholder is unavailable for that email context. | Confirm coupons are enabled before using coupon placeholders. |
| Restore link missing | Template content removed or did not include restore placeholder/button. | Re-add `{restore_url}` or restore button text in WooCommerce email settings. |
| Test flow button disabled | Test Mode is off. | Enable Test Mode in Settings. |
| Email styling looks wrong | WooCommerce global email settings or template override issue. | Review WooCommerce email settings and template overrides. |

## Offer and Coupon Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Coupon not generated | Coupon is disabled for that recovery step. | Enable coupon on the step in Recovery Sequence. |
| Coupon placeholder empty | Email step does not include a coupon. | Use coupon placeholders only in coupon-enabled steps. |
| Coupon not applied on restore | Coupon expired, email/session mismatch, invalid identity, or subscription product in cart. | Check Coupon History and cart contents. |
| Discount too high | Percentage discount applied to full cart total. | Use fixed-cart discount or lower percentage amount. |

## Restore Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Restore link expired | Restore token TTL passed. | Send a newer recovery email or use a controlled test flow. |
| Cart restores partially | Product is deleted, unavailable, out of stock, or not purchasable. | Review product availability. |
| Restore fails before cart changes | Token or session validation failed. | Check CartBay logs and session status. |
| Redirect does not reach checkout | WooCommerce checkout page/session issue. | Verify WooCommerce checkout page configuration. |

## Settings and License Problems

| Problem | Likely cause | Fix |
|---|---|---|
| License shows Server Error | License server unreachable. | Runtime fails open; retry status check later. |
| License shows Dev Mode | Development-domain bypass is active. | Expected on local/staging domains. |
| Updates unavailable | No valid local license key. | Activate or check the license. |
| Data removed after uninstall | Delete Data on Uninstall was enabled. | Restore from backup if needed. |

## Analytics Problems

| Symptom | Explanation |
|---|---|
| Completed checkout is not counted recovered | The order completed before the cart became abandoned. |
| Recovery rate looks low | It is recovered carts divided by abandoned carts for the selected period. |
| Click-to-recovery rate differs from recovery rate | It only measures link-restored purchases divided by restore clicks. |
| Metrics lag briefly | Analytics are cached and invalidated by key events; hourly refresh also runs. |

## AI-Agent Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Agent endpoint is unauthorized | Agent access disabled, REST disabled, missing capability, or bad token scope. | Review [Agent Access](/cartbay/agents/agent-access/). |
| Sensitive fields are masked | Sensitive data gate is off or caller lacks scope/capability. | Enable only for trusted workflows. |
| Session action denied | Required write/contact/destructive gate is off. | Enable only the required gate after approval. |
| MCP tools missing | WordPress MCP Adapter not installed or MCP public exposure is off. | Install adapter and enable MCP exposure for a least-privilege user. |

## Logs to Collect for Support

- WooCommerce Status log entries with source `cartbay`.
- CartBay log entries from the hidden Logs section.
- Relevant Action Scheduler rows for `cartbay_*` hooks.
- Notification Details modal output for failed emails.
- Session ID and timeframe.

:::danger
Do not send raw restore tokens, unsubscribe tokens, full license keys, or unnecessary customer personal data in support tickets.
:::
