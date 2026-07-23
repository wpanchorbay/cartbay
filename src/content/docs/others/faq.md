---
title: FAQ
description: Frequently asked questions about CartBay setup, capture, recovery emails, coupons, licensing, privacy, troubleshooting, and automation.
---

## General

#### What is CartBay?

CartBay is a WooCommerce abandoned cart recovery plugin. It captures consented checkout visitors, detects abandoned carts, sends a three-email recovery sequence, restores carts through secure links, and tracks recovered revenue.

#### Is there a free version?

Yes. The free CartBay plugin on WordPress.org is a complete abandoned cart recovery workflow — consented capture, abandonment detection, the three-email recovery sequence, restore links, a static recovery coupon, and core analytics. CartBay Pro <span class="cb-badge cb-badge--pro">Pro</span> is a separate licensed add-on that adds measurement and optimization: advanced analytics, CSV export, and dynamic per-session coupons.

#### Where do I manage CartBay?

Open `WooCommerce > CartBay` or `WooCommerce > Settings > Cart` in WordPress admin.

#### Does CartBay use custom database tables?

No. CartBay stores recovery sessions as WooCommerce order-backed sessions and uses WooCommerce CRUD APIs.

#### Does CartBay support WooCommerce Block Checkout?

Yes. CartBay supports classic checkout and WooCommerce Block Checkout. Block Checkout uses a WooCommerce additional checkout field in the contact section.

## Capture

#### Why is the consent checkbox not showing?

Check that Capture is enabled, WooCommerce is active, and you are viewing the checkout page rather than the order-received page.

#### What happens if a shopper unchecks consent?

CartBay treats that as consent withdrawal. It deletes the active captured or abandoned session and cancels pending abandonment checks and recovery emails for that session.

#### Can one email have multiple active sessions?

Yes. CartBay identifies carts by session ID and cart fingerprint, not email alone. One shopper can have multiple active CartBay sessions if the carts are materially different.

## Recovery Emails

#### When does the first recovery email send?

By default, Email 1 sends 45 minutes after the cart becomes abandoned. If the abandonment timeout is 30 minutes, that means Email 1 sends about 75 minutes after the shopper's last captured activity.

#### What if Action Scheduler is delayed?

Pending recovery emails are not dropped. They run when Action Scheduler resumes, as long as CartBay's send guards still allow the email.

#### What does Sent mean in Notifications?

`Sent` means WordPress/WooCommerce accepted the email send. It does not guarantee inbox delivery unless a provider integration explicitly reports delivery.

## SMTP or Email Services

#### Do I need an SMTP plugin or email service?

CartBay can send through the normal WordPress/WooCommerce email system, but a dedicated SMTP plugin or transactional email service is strongly recommended for reliable inbox delivery.

#### Which email services can I use?

You can use any service that integrates with WordPress mail delivery, such as SMTP.com, Mailgun, Postmark, SendGrid, Amazon SES, Brevo, or your hosting provider's SMTP service.

#### Does CartBay send emails directly through SMTP?

No. CartBay hands recovery emails to WooCommerce and WordPress mail delivery. Your SMTP plugin or transactional email integration controls how those messages are sent.

#### Why do Notifications show Sent but customers do not receive emails?

`Sent` means WordPress accepted the send request. Inbox delivery can still fail because of SMTP configuration, domain authentication, spam filtering, bounces, or provider limits. Check your email provider logs and WooCommerce logs.

#### What DNS records should I configure?

Configure the records recommended by your email provider, usually SPF, DKIM, and DMARC. These records help receiving inboxes trust recovery emails sent from your store domain.

For a full step-by-step walkthrough of supported plugins, provider setup, and DNS authentication, see [Email Delivery Setup](/cartbay/getting-started/email-delivery-setup/).

## Templates

#### Where do I edit recovery emails?

Open `WooCommerce > CartBay > Templates`, then click `Edit in WooCommerce` for the recovery email you want to edit.

#### Which placeholders can I use?

Common placeholders include `{site_title}`, `{customer_email}`, `{restore_url}`, `{coupon_code}`, `{coupon_expiry}`, and `{unsubscribe_url}`. Coupon placeholders only resolve for coupon-enabled steps.

#### Why is my coupon placeholder empty?

Either the email step does not have coupons enabled — enable it in Recovery Sequence and set the coupon in Offers — or the code you configured is missing or unusable (no matching WooCommerce coupon, expired, or out of uses), in which case CartBay deliberately leaves it out of the email so shoppers do not get a code that fails. Check the Offers screen for a warning explaining which it is.

## Offers and Coupons

#### How do recovery coupons work?

The free plugin inserts one static coupon code — an existing WooCommerce coupon you set in Offers — into the recovery email steps you enable it for. CartBay Pro <span class="cb-badge cb-badge--pro">Pro</span> instead generates a unique, single-use coupon per session and applies it automatically when the cart is restored.

#### When are coupons generated? <span class="cb-badge cb-badge--pro">Pro</span>

Only in CartBay Pro. It generates a unique coupon per session for recovery email steps where `Include a recovery coupon` is enabled. The free plugin does not generate coupons; it reuses the static coupon you configure in Offers.

#### Can shoppers share recovery coupons? <span class="cb-badge cb-badge--pro">Pro</span>

CartBay Pro coupons are restricted to the recovery session and captured email, and CartBay validates coupon use against restored session identity.

#### Are coupons applied to subscription products? <span class="cb-badge cb-badge--pro">Pro</span>

CartBay Pro avoids applying its generated recovery coupons when the cart contains WooCommerce Subscription products or subscription variations.

## Licensing

#### Do I need a license to use CartBay?

No. The free CartBay plugin on WordPress.org is a complete recovery workflow and needs no license key. A WPAnchorBay license is required only for CartBay Pro <span class="cb-badge cb-badge--pro">Pro</span>, which adds advanced analytics, CSV export, dynamic per-session coupons, and private updates.

#### Where do I get my license key?

Your CartBay Pro <span class="cb-badge cb-badge--pro">Pro</span> license key is sent in the purchase confirmation email. You can also retrieve it by logging in to your WPAnchorBay account dashboard at `wpanchorbay.com`. The free plugin does not use a license key.

#### Who should I contact for license help?

Contact `support@wpanchorbay.com`.

#### Will CartBay stop working if the license server is temporarily unavailable?

No. CartBay Pro <span class="cb-badge cb-badge--pro">Pro</span> fails open for license server network failures, so capture, recovery emails, and restore flows keep running. The free plugin has no license check and is never affected.

## Data and Privacy

#### Does CartBay store raw restore tokens?

No. Restore and unsubscribe tokens are generated as opaque strings and stored as SHA-256 hashes.

#### What happens when a shopper unsubscribes?

CartBay creates a suppression record, marks the session suppressed, and cancels pending recovery email work.

#### Can I delete CartBay data on uninstall?

Yes. Enable `Delete Data on Uninstall` in Settings before deleting the plugin. Leave it disabled if you may reinstall CartBay later.

## Troubleshooting

#### Why are emails queued but not sending?

Action Scheduler may not be running promptly. Check WooCommerce scheduled actions and server cron behavior.

#### Why did restore fail?

Common causes include expired tokens, deleted sessions, unavailable products, invalid cart snapshots, or cart validation failures.

#### Where are logs?

WooCommerce logs are available in `WooCommerce > Status > Logs` with source `cartbay`. CartBay also has a hidden CartBay Logs section linked from Settings.
