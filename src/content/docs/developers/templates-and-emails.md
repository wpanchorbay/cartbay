---
title: Templates & Emails
description: Developer reference for CartBay WooCommerce email classes, templates, placeholders, notification lifecycle, and delivery integrations.
---

CartBay recovery emails are WooCommerce email classes. This lets CartBay use WooCommerce email settings, wrappers, preview behavior, and mail infrastructure.

## Classes

| Class | Purpose |
|---|---|
| `AbstractCartBayRecoveryEmail` | Shared WooCommerce email behavior, placeholders, URLs, headers, template rendering. |
| `CartBay_Email_Recovery_1` | Step 1 email class. |
| `CartBay_Email_Recovery_2` | Step 2 email class. |
| `CartBay_Email_Recovery_3` | Step 3 email class. |

WooCommerce email IDs:

- `cartbay_recovery_1`
- `cartbay_recovery_2`
- `cartbay_recovery_3`

## Template Files

| File | Step |
|---|---|
| `templates/emails/recovery-email-1.php` | Email 1. |
| `templates/emails/recovery-email-2.php` | Email 2. |
| `templates/emails/recovery-email-3.php` | Email 3. |

Templates include hidden preheader support, body content, restore button, plain restore link fallback, optional coupon text, additional content, and unsubscribe link.

## Placeholder Pipeline

`AbstractCartBayRecoveryEmail` replaces:

- `{site_title}`
- `{site_name}`
- `{store_name}`
- `{customer_email}`
- `{restore_url}`
- `{coupon_code}`
- `{coupon_expiry}`
- `{unsubscribe_url}`

Restore and unsubscribe URLs are generated per send using hashed token storage. Coupon placeholders depend on per-step coupon settings and coupon state: in CartBay Free `{coupon_expiry}` is empty (the static coupon has no CartBay-managed expiry), and the email omits the expiry line when it is empty. If the configured static code is missing or unusable at send time, CartBay suppresses it and `{coupon_code}` resolves to empty, so no coupon block is rendered.

## Notification Lifecycle

Notification records are stored on the session in `_cartbay_notifications`.

Lifecycle states:

- `queued`
- `attempted`
- `sent`
- `failed`
- `retry_queued`
- `canceled`
- `delivered` for explicit provider integrations

Transient context keys use `cartbay_notification_ctx_{notification_id}` so mail hooks can resolve session and notification data.

## Provider Delivery Integration

WordPress `wp_mail_succeeded` only confirms WordPress accepted the send. `cartbay_mark_notification_delivered` is a **reserved, optional** integration point — CartBay does not fire it itself. An ESP integration that can confirm true delivery may fire it to advance a notification to the `delivered` state:

```php
do_action( 'cartbay_mark_notification_delivered', $notification_id );
```

Integrations should avoid logging raw emails, raw tokens, or full license keys.

## Template Override Guidance

- Preserve WooCommerce email wrappers unless intentionally changing email structure.
- Keep the restore URL visible as both button and fallback text.
- Keep unsubscribe behavior available in customer-facing recovery emails.
- Escape all output by context.
- Do not directly read order tables for session data.
