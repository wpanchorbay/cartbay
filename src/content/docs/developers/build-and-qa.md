---
title: Build & QA
description: Development setup, coding standards, build commands, static analysis, plugin check policy, i18n, and release verification for CartBay contributors.
---

CartBay is a private premium WooCommerce plugin. Contributions should preserve WooCommerce-native APIs, HPOS compatibility, Action Scheduler usage, and private licensing behavior.

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

`composer plugin-check` intentionally ignores WordPress.org-only findings for private updater and proprietary license metadata.

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
- Coupons and subscriptions.
- Order matching and recovered revenue.
- License enforcement.
- Agent write/contact/sensitive/destructive actions.
- Data deletion and uninstall behavior.

## Verification Checklist

- Classic checkout capture works.
- Block Checkout consent field renders and submits.
- Consent withdrawal deletes active capture and cancels pending work.
- Abandonment jobs mark inactive sessions abandoned.
- All three email steps send in order.
- Restore links rebuild cart and redirect to checkout.
- Coupons validate only in the matching recovery flow.
- Recovered orders are attributed correctly.
- Unsubscribe suppresses future capture/recovery for the email.
- Agent endpoints remain disabled by default.
- Logs do not expose raw tokens or full license keys.
