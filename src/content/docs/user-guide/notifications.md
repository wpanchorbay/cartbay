---
title: Notifications
description: Monitor CartBay recovery email queueing, attempts, sends, retries, failures, cancellations, details, and period-based email metrics.
---

The Notifications section shows the lifecycle of CartBay recovery emails. It helps administrators confirm that emails were queued, attempted, accepted by WordPress/WooCommerce mail, retried after failures, canceled when no longer needed, and connected to restore or recovery activity.

## Where to Find It

Open `WooCommerce > CartBay > Notifications`.

## Purpose

CartBay creates one notification record for each scheduled recovery email. These records are stored on the CartBay session and updated as the email moves through the queue, send attempt, success, failure, retry, cancellation, restore click, and recovery lifecycle.

Use this page when verifying email delivery, diagnosing failed recovery emails, or understanding why future emails were canceled.

## Filter by Days

The period selector changes the notification reporting window.

| Filter | Use it for |
|---|---|
| 7 Days | Recent launch checks, template tests, or delivery debugging. |
| 30 Days | Standard email performance review. |
| 90 Days | Longer-term sequence and delivery trend review. |

The selected period affects the metric cards and notification rows shown on the page.

## Stat Cards

### Pending Queue

Pending Queue shows current recovery emails waiting to send, including first-time queued notifications and retry-queued notifications.

If this number stays high, check whether Action Scheduler is processing jobs.

### Emails Sent

Emails Sent shows recovery emails accepted by WordPress/WooCommerce mail or marked delivered by an integration.

`Sent` does not necessarily mean the shopper's inbox accepted the email. It means WordPress/WooCommerce accepted the send.

### Emails Failed

Emails Failed shows recovery emails tied to sessions in the selected period that ended in failed status.

Review failed rows with the Details action to find the last recorded error.

### Acceptance Rate

Acceptance Rate compares sent or delivered emails against attempted sends.

A low acceptance rate usually points to WordPress mail configuration, SMTP, or provider issues.

### Best Email Step

Best Email Step identifies the sequence step with the strongest tracked recovery performance in the selected period.

Use it to understand whether Email 1, Email 2, or Email 3 is driving the most recovery value.

### More

The `More` card opens a modal with additional status-level counts for queued, attempted, sent, delivered, failed, retry-queued, and canceled notifications.

## Status Filter

The status dropdown filters notification rows by lifecycle status.

| Status | Meaning |
|---|---|
| Queued | A notification record exists and is waiting for its send job. |
| Attempted | CartBay began a send attempt. |
| Sent | WordPress/WooCommerce accepted the message for sending. |
| Delivered | Reserved for explicit provider-confirmed delivery integrations. |
| Retry queued | A failed attempt will be retried. |
| Failed | CartBay could not send after the allowed attempts or a failure was recorded. |
| Canceled | The notification was canceled because it was no longer needed. |

## Search

The search box can match notification rows by recipient, session ID, notification ID, email type, or trigger source.

Use search when a customer or support ticket references a specific email, session, or notification ID.

## Notifications Table

The table shows:

| Column | Meaning |
|---|---|
| Session | CartBay session ID tied to the notification. |
| Status | Current notification lifecycle state. |
| Recipient Email | Captured email address for the recovery message. |
| Email | Recovery email type and notification ID. |
| Scheduled | Scheduled send time. |
| Actions | Opens the notification Details modal. |

## Details Modal

The Details action opens a modal with deeper lifecycle data.

It includes:

- Status.
- Recipient.
- Session ID.
- Email type.
- Notification ID.
- Trigger source.
- Scheduled time.
- Lifecycle timestamps.
- Attempt and retry counts.
- Restore click and recovered order linkage.
- Last recorded error.

## How Notifications Interact With Recovery

- Abandonment schedules recovery email jobs.
- Each recovery job creates or updates notification tracking.
- `wp_mail_succeeded` marks mail as sent when WordPress accepts it.
- `wp_mail_failed` records failure details and can trigger retry behavior.
- Restore clicks can link back to the related notification.
- Recovered sessions cancel future pending notifications.
- Unsubscribed sessions cancel pending notifications.

## Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| Many queued notifications | Action Scheduler is not running promptly. | Check WooCommerce scheduled actions and server cron. |
| Many failed notifications | WordPress mail is failing. | Configure SMTP or transactional email and check WooCommerce logs. |
| Sent but no inbox delivery | WordPress accepted the email, but the provider may have rejected, delayed, or spam-foldered it. | Check SMTP or ESP logs. |
| Notifications canceled | Session recovered, shopper unsubscribed, or pending work was canceled. | Open Details to confirm context. |
| No notifications after abandonment | Recovery sequence may be disabled. | Check [Recovery Sequence](/cartbay/user-guide/recovery-sequence/). |

## Email Delivery Test

The Email Delivery Test section at the bottom of the Notifications page lets you verify that your WordPress email system can send mail before relying on recovery email delivery.

### Delivery Service Detection

CartBay automatically detects which SMTP or transactional email plugin is active by scanning installed plugins and registered mail hooks. Known delivery plugins are identified with high confidence; any plugin hooking `phpmailer_init` or `pre_wp_mail` is detected with medium confidence.

| Detection | Detail column shows |
|---|---|
| High confidence | Known plugin name (e.g. WP Mail SMTP, FluentSMTP, Brevo, Mailgun, Post SMTP) |
| Medium confidence | Callback class or function name hooked to `phpmailer_init` / `pre_wp_mail` |
| Low confidence | Callback on `wp_mail` that contains delivery keywords |

### Mail Configuration Details

A table below the status notice shows the resolved mail configuration:

| Field | Source |
|---|---|
| **From email** | Resolved through the `wp_mail_from` filter — reflects whatever your SMTP plugin or custom code sets. |
| **From name** | Resolved through the `wp_mail_from_name` filter. |
| **Delivery service** | The detected plugin or integration name. Only shown when a service is found. |

These values represent what WordPress would use when sending a recovery email. If your SMTP plugin overrides the from address, the overridden value appears here.

### Sending a Test Email

1. Enter the recipient email address (defaults to your admin email).
2. Click **Send Test Email**.
3. A status message appears next to the button. Check the recipient inbox within a few minutes.

The test email uses `wp_mail()` — the standard WordPress mail function. This means it works with **any** SMTP plugin (WP Mail SMTP, Post SMTP, FluentSMTP, Brevo, Mailgun, SendGrid, etc.). If `wp_mail` fails, the result message includes the error.

### When the Test Fails

| Symptom | Likely cause | Action |
|---|---|---|
| "Failed to send test email" | `wp_mail()` returned `false`. | Check that your SMTP plugin is configured with valid credentials and the WordPress site can reach the SMTP server. |
| Email not received | The SMTP provider may have rejected, spam-foldered, or delayed the message. | Check the SMTP plugin's log, your provider's dashboard, or the recipient spam folder. |

---

## Best Practices

- Check Notifications after changing sequence timing.
- Investigate failed and retry-queued emails before changing templates.
- Use provider logs for bounce, spam, and inbox placement analysis.
- Treat provider-confirmed `delivered` as unavailable unless a delivery integration explicitly marks it.
