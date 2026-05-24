---
title: Templates
description: Customize CartBay recovery email content through WooCommerce email settings, placeholders, test flow, and template behavior.
---

The Templates section connects each CartBay recovery email step to its WooCommerce-native email settings screen. It is the starting point for editing recovery email subject lines, headings, preheaders, body content, button labels, and placeholder usage.

## Where to Find It

Open `WooCommerce > CartBay > Templates`.

To edit a specific recovery email, click `Edit in WooCommerce` for that row.

## Purpose

CartBay recovery emails are WooCommerce email classes. This means they use WooCommerce email wrappers, global email styles, previews, and mail sending behavior while still receiving CartBay-specific restore links, unsubscribe links, coupon data, and session context.

Use Templates to review what each recovery email is, where to edit it, how it is timed, whether it includes a coupon, and which placeholders can be used safely.

## Recovery Email Rows

The Templates table lists all three recovery email steps.

| Row | WooCommerce email ID | Purpose |
|---|---|---|
| Recovery Email 1 | `cartbay_email_recovery_1` | Initial reminder. |
| Recovery Email 2 | `cartbay_email_recovery_2` | Value follow-up. |
| Recovery Email 3 | `cartbay_email_recovery_3` | Final recovery email. |

Each row shows the current subject, timing, coupon status, and an action button.

## Subject

The Subject column shows the subject configured in WooCommerce email settings. If no custom subject is saved, the row shows `Default`.

Changing a subject affects future sends for that email step. It does not rewrite emails that have already been sent.

## Timing

The Timing column shows the current delay for that email step from the [Recovery Sequence](/cartbay/user-guide/recovery-sequence/) section.

Use the small edit icon beside the timing value to jump back to Recovery Sequence. Timing is configured there, not directly on the Templates page.

## Coupon

The Coupon column shows whether that email step is configured to include a recovery coupon.

Use the edit icon beside the coupon value to review [Offers](/cartbay/user-guide/offers/). The per-step coupon on/off setting lives in Recovery Sequence, while coupon type, amount, and expiry live in Offers.

## Edit in WooCommerce

The `Edit in WooCommerce` button opens the WooCommerce email settings screen for that recovery email.

Depending on WooCommerce's email UI, editable fields can include:

- Subject.
- Heading.
- Preheader.
- Body content.
- Button text.
- Additional content.
- Email enablement and format controls.
- WooCommerce global email colors, header, footer, and styling.
- Preview and test-send tools.

CartBay sends each recovery email to the captured checkout email, so these customer recovery emails do not need a fixed recipient field.

## Trigger Test Flow

The `Trigger Test Flow` button creates a test abandoned session and schedules the first recovery email in about 30 seconds.

Requirements:

- Test Mode must be enabled in [Settings](/cartbay/user-guide/settings/).
- The current admin user must be allowed to manage WooCommerce.
- WordPress/WooCommerce mail delivery must be configured.

Use this flow to verify that templates render, placeholders resolve, Action Scheduler runs, and email delivery is accepted.

If Test Mode is disabled, the Templates section shows a warning with a link to enable it.

:::caution
Use test flows in staging or controlled QA. Avoid using test mode as a normal production workflow.
:::

## Available Placeholders

Use placeholders in subject, heading, preheader, body, and button label fields.

| Placeholder | Replaced with |
|---|---|
| `{site_title}` | Store/site title. |
| `{site_name}` | Store/site title alias. |
| `{store_name}` | Store/site title alias. |
| `{customer_email}` | Captured customer email address. |
| `{restore_url}` | Secure cart restore link. |
| `{coupon_code}` | Coupon code when coupons are enabled for that step. |
| `{coupon_expiry}` | Coupon expiry date when coupons are enabled for that step. |
| `{unsubscribe_url}` | One-click unsubscribe link. |

Coupon placeholders only resolve when coupons are enabled for that recovery step.

## Template Files

Developer template files live in the plugin at:

- `templates/emails/recovery-email-1.php`
- `templates/emails/recovery-email-2.php`
- `templates/emails/recovery-email-3.php`

Each template includes hidden preheader support, main body content, restore-cart button, plain restore-link fallback, optional coupon line, additional content, and optional unsubscribe link.

## Recommended Template Strategy

| Step | Recommended copy strategy |
|---|---|
| Email 1 | Friendly reminder, restore button, minimal friction. |
| Email 2 | Reinforce product value, trust, shipping, or support benefits. |
| Email 3 | Final reminder, urgency, and optional coupon. |

## Best Practices

- Keep the restore call to action prominent.
- Include an unsubscribe link in customer-facing recovery emails.
- Do not use coupon language in steps where coupons are disabled.
- Send a test flow after major template changes.
- Use WooCommerce global email styling for brand consistency.
