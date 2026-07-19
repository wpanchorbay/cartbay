---
title: Build & QA
description: Development setup, coding standards, build commands, static analysis, plugin check policy, i18n, and release verification for CartBay contributors.
---

CartBay is a free WooCommerce plugin distributed on WordPress.org, with an optional CartBay Pro add-on. Contributions should preserve WooCommerce-native APIs, HPOS compatibility, and Action Scheduler usage, and must keep the free plugin passing `wp plugin check` cleanly for WordPress.org.

## Requirements

- PHP 8.2 (recommended 8.3+) for Composer development alignment.
- [WordPress](https://wordpress.org/) and [WooCommerce](https://wordpress.org/plugins/woocommerce/) matching the plugin support matrix.
- [Composer](https://getcomposer.org/).
- [Bun](https://bun.com/) (only needed for dev) or Node tooling for WordPress scripts, depending on the local environment.

## PHP Commands

```sh
composer install
composer phpcs
composer phpstan
composer test
composer plugin-check
```

The **free** plugin ships on WordPress.org and must pass `composer plugin-check` (`wp plugin check`) cleanly, with no ignored findings.

The private updater and proprietary license metadata that plugin-check flags for WordPress.org apply only to the **CartBay Pro** add-on, which is distributed off-directory; those findings are scoped to Pro and do not apply to the free plugin. <span class="cb-badge cb-badge--pro">Pro</span>

## JavaScript Commands

```sh
bun install
bun run build
bun run i18n:make-pot
bun run i18n:make-json
```

Run `bun run build` when changing JS source. Run `bun run i18n:make-pot` after adding or changing translatable strings.

## Coding Standards

- Namespace PHP under `WPAnchorBay\CartBay\`.
- Use tabs for PHP indentation.
- Sanitize input immediately and escape output late.
- Use `manage_woocommerce` for admin actions.
- Use WooCommerce CRUD APIs for order data.
- Use Action Scheduler for jobs.
- Store tokens as hashes.
- Keep frontend assets scoped to their pages.

## High-Risk Areas

Treat these as high-risk changes:

- Checkout capture.
- Restore/cart mutation.
- Coupons and subscriptions. <span class="cb-badge cb-badge--pro">Pro</span>
- Order matching and recovered revenue.
- License enforcement. <span class="cb-badge cb-badge--pro">Pro</span>
- Data deletion and uninstall behavior.

## Verification Checklist

- Classic checkout capture works.
- Block Checkout consent field renders and submits.
- Consent withdrawal deletes active capture and cancels pending work.
- Abandonment jobs mark inactive sessions abandoned.
- All three email steps send in order.
- Restore links rebuild cart and redirect to checkout.
- Generated coupons validate only in the matching recovery flow. <span class="cb-badge cb-badge--pro">Pro</span>
- Recovered orders are attributed correctly.
- Unsubscribe suppresses future capture/recovery for the email.
- Logs do not expose raw tokens or full license keys.
