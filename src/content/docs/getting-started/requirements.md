---
title: Requirements
description: Review WordPress, WooCommerce, PHP, Action Scheduler, email delivery, licensing, and system requirements before installing CartBay.
---

Before installing CartBay, confirm the store meets the WordPress, WooCommerce, server, licensing, and email delivery requirements below.

## WordPress

CartBay requires a modern WordPress installation.

| Requirement | Recommendation |
|---|---|
| WordPress | WordPress version `6.9` or newer. |
| Admin access | Administrator or a user who can manage WooCommerce settings. |
| Permalinks | Normal WordPress permalink handling should be working for admin and frontend URLs. |

## WooCommerce

WooCommerce is required. CartBay does not initialize its recovery runtime when WooCommerce is inactive.

| Requirement | Recommendation |
|---|---|
| WooCommerce | WooCommerce version `10.7` or newer. |
| Checkout | Classic checkout or WooCommerce Block Checkout. |
| Orders | CartBay uses WooCommerce order CRUD APIs and declares HPOS compatibility. |
| Action Scheduler | Provided by WooCommerce and required for background jobs. |

## System and PHP

| Requirement | Recommendation |
|---|---|
| PHP | PHP `8.2` or newer. Use PHP `8.3+` when possible. |
| Server cron | Recommended so Action Scheduler can process jobs promptly. |
| HTTPS | Recommended for checkout, restore links, and admin security. |
| File permissions | WordPress uploads directory must be writable if CartBay file logs are enabled. |

## Email Service

CartBay sends recovery emails through WordPress and WooCommerce mail. A reliable email delivery service is strongly recommended because abandoned cart recovery depends on emails reaching shoppers.

**Recommended setup:**

- Use an SMTP plugin or transactional email service.
- Verify sender authentication such as SPF, DKIM, and DMARC where your email provider supports them.
- Send test emails before launching recovery emails.
- Monitor failed or retry-queued notifications after launch.

CartBay can detect some mail delivery and email logger plugins and may show an admin warning when no delivery plugin is detected. Detection is passive; it does not prove inbox delivery.

**Test your email delivery:**
- Go to WooCommerce → Settings → Cart → Notifications (bottom of the page)
- Identify "Email Delivery Test"
- Enter your email address in the "Send to" field
- Click "Send Test Email"

Related docs:

- [Notifications](/cartbay/user-guide/notifications/) explains sent, failed, retry-queued, and canceled recovery email records.
- [Templates](/cartbay/user-guide/templates/) explains recovery email editing and the test flow.
- [Settings](/cartbay/user-guide/settings/) explains mail environment warnings and log links.
- [Troubleshooting](/cartbay/user-guide/troubleshooting/) explains common delivery and queue problems.

## License

A WPAnchorBay license key is required for private updates and support checks. The key is provided after purchase and can also be found in the WPAnchorBay account dashboard.

Read [License Activation](/cartbay/getting-started/license-activation/).

## Browser and Checkout Compatibility

CartBay supports both classic checkout and WooCommerce Block Checkout. Test the checkout type used by your store before launch.

## Pre-Launch Checklist

- WooCommerce is active.
- Checkout page works for test orders.
- Email delivery service is configured.
- Store consent wording is approved.
- Action Scheduler is processing jobs.
- CartBay license key is available.
