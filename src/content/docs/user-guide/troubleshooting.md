---
title: Troubleshooting
description: Diagnose CartBay capture, recovery sequence, email delivery, templates, offers, restore, analytics, license, and agent issues.
---

Use this page when CartBay is not capturing carts, sending recovery emails, restoring carts, applying coupons, or showing the expected analytics.

CartBay does not include a standalone Troubleshooting screen. Troubleshooting tools are built into the WooCommerce settings sections listed below.

## Where to Find Troubleshooting Tools

| Tool | Location | Use it for |
|---|---|---|
| CartBay Logs | **WooCommerce > Settings > Cart > Settings > CartBay Logs** > **Open CartBay Logs** | CartBay-owned sanitized log history and log configuration. |
| WooCommerce Logs | **WooCommerce > Settings > Cart > Settings > WooCommerce Logs** > **View Logs** | WooCommerce log entries filtered to the `cartbay` source. |
| Test Mode | **WooCommerce > Settings > Cart > Settings > Test Mode** | Short-cycle QA with shortened recovery email delays and dummy sessions. |
| Coupon History | **WooCommerce > Settings > Cart > Offers** > **View coupon history and details** | Generated coupon status, coupon/session relationships, and coupon usage details. |
| Trigger Test Flow | **WooCommerce > Settings > Cart > Templates > Trigger Test Flow** | Create a test abandoned session and schedule the first recovery email quickly. Requires Test Mode. |
| Email Delivery Test | **WooCommerce > Settings > Cart > Notifications > Email Delivery Test** | Send a test email and inspect detected mail delivery configuration. |

## First Checks

Before diagnosing a specific feature, confirm:

- WooCommerce is installed and active.
- CartBay is active.
- Capture is enabled in [Capture](/cartbay/user-guide/capture/).
- The recovery sequence is enabled if emails should send.
- Action Scheduler is processing scheduled actions.
- WordPress mail is deliverable through SMTP or a transactional provider.
- WooCommerce logs include the `cartbay` source.
- CartBay Logs are enabled if support asks for deeper diagnostics.

## Capture Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Consent checkbox does not appear | Capture is disabled or the page is not checkout. | Enable Capture and test on the checkout page. |
| Block Checkout field is missing | WooCommerce additional field registration did not run. | Confirm WooCommerce Blocks checkout is active and check CartBay logs. |
| No sessions are created | Invalid email, unchecked consent, suppressed email, disabled capture, or rate limit. | Enter a valid email, check consent, inspect CartBay and WooCommerce logs, and reduce repeated test requests. |
| Session disappears after capture | Shopper withdrew consent. | Expected behavior; CartBay deletes the active session and pending jobs. |
| `429` capture responses | Public capture endpoint rate limit reached. | Wait for the transient window to expire before testing again. |

## Recovery Sequence Problems

| Problem | Likely cause | Fix |
|---|---|---|
| No email jobs are scheduled | Email sending is disabled in Recovery Sequence. | Enable the recovery sequence and save the section. |
| Email sends later than expected | Action Scheduler was delayed by server cron or traffic. | Check scheduled actions and WooCommerce logs with source `cartbay`. |
| Email step is skipped | Session recovered, suppressed, expired, not abandoned, or step already sent. | Review the Notifications section and the relevant log entries. |
| Step timing seems reordered | CartBay normalized timing to keep steps in order. | Review the saved Recovery Sequence timing values. |

## Notification and Email Delivery Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Many queued notifications | Action Scheduler is not running promptly. | Check WooCommerce scheduled actions and server cron. |
| Many failed notifications | WordPress mail is failing. | Configure SMTP or a transactional email provider, then use **Email Delivery Test**. |
| Sent but no inbox delivery | WordPress accepted the message, but provider or inbox delivery failed. | Check SMTP/ESP logs, spam placement, and the Notifications section. |
| Test email fails | Mail delivery configuration is missing or blocked. | Use **WooCommerce > Settings > Cart > Notifications > Email Delivery Test** and review the detected delivery status. |

## Template Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Test flow button disabled | Test Mode is off. | Enable **WooCommerce > Settings > Cart > Settings > Test Mode**, then return to **Templates > Trigger Test Flow**. |
| Placeholder is empty | Placeholder is unavailable for that email context. | Confirm coupons are enabled before using coupon placeholders. |
| Restore link missing | Template content removed or did not include the restore placeholder/button. | Re-add `{restore_url}` or restore button text in WooCommerce email settings. |
| Email styling looks wrong | WooCommerce global email settings or a template override changed the layout. | Review WooCommerce email settings and theme/plugin template overrides. |

## Offer and Coupon Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Coupon not generated | Coupon is disabled for that recovery step. | Enable coupon use on the step in Recovery Sequence. |
| Coupon placeholder empty | Email step does not include a coupon. | Use coupon placeholders only in coupon-enabled steps. |
| Coupon not applied on restore | Coupon expired, email/session identity did not match, or the cart includes a subscription product. | Open **WooCommerce > Settings > Cart > Offers > View coupon history and details** and review the cart contents. |
| Discount too high | Percentage discount applied to the full cart total. | Use a fixed-cart discount or lower the percentage amount. |

## Restore Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Restore link expired | Restore token TTL passed. | Send a newer recovery email or use **Trigger Test Flow** during controlled QA. |
| Cart restores partially | Product is deleted, unavailable, out of stock, or not purchasable. | Review product availability. |
| Restore fails before cart changes | Token or session validation failed. | Check CartBay Logs and WooCommerce logs with source `cartbay`. |
| Redirect does not reach checkout | WooCommerce checkout page or session configuration issue. | Verify WooCommerce checkout page settings and session behavior. |

## Settings and License Problems

| Problem | Likely cause | Fix |
|---|---|---|
| License shows Server Error | License server unreachable. | Runtime recovery flows continue; retry status check later. |
| License shows Dev Mode | Development-domain bypass is active. | Expected on local, staging, and development domains. |
| Updates unavailable | No valid local license key. | Activate or check the license in **WooCommerce > Settings > Cart > Settings**. |
| Data removed after uninstall | Delete Data on Uninstall was enabled. | Restore from backup if needed. |

## Analytics Problems

| Symptom | Explanation |
|---|---|
| Completed checkout is not counted as recovered | The order completed before the cart became abandoned. |
| Recovery rate looks low | Recovery rate is recovered carts divided by abandoned carts for the selected period. |
| Click-to-recovery rate differs from recovery rate | It only measures link-restored purchases divided by restore clicks. |
| Metrics lag briefly | Analytics are cached and refreshed after key events and scheduled refreshes. |

## AI-Agent Problems

| Problem | Likely cause | Fix |
|---|---|---|
| Agent endpoint is unauthorized | Agent access disabled, REST disabled, missing capability, or bad token scope. | Review [Agent Access](/cartbay/agents/agent-access/). |
| Sensitive fields are masked | Sensitive data gate is off or caller lacks scope/capability. | Enable sensitive access only for trusted workflows. |
| Session action denied | Required write/contact/destructive gate is off. | Enable only the required gate after approval. |
| MCP tools missing | WordPress MCP Adapter is not installed or MCP public exposure is off. | Install the adapter and enable MCP exposure for a least-privilege user. |

## Logs to Collect for Support

When contacting support, include:

- WooCommerce log entries from **WooCommerce > Settings > Cart > Settings > WooCommerce Logs**.
- CartBay log entries from **WooCommerce > Settings > Cart > Settings > CartBay Logs**.
- Relevant Action Scheduler rows for `cartbay_*` hooks.
- Notification details for failed or delayed recovery emails.
- Coupon history details when the issue involves discounts.
- Session ID, approximate timeframe, and the affected workflow.

:::danger
Do not send raw restore tokens, unsubscribe tokens, full license keys, or unnecessary customer personal data in support tickets.
:::

## Support

For help with licensing, setup, email delivery, recovery behavior, or account questions, contact [support@wpanchorbay.com](mailto:support@wpanchorbay.com).
