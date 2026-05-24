---
title: Architecture
description: Developer overview of CartBay's runtime architecture, core modules, data flow, services, and implementation constraints.
---

CartBay is a namespaced WooCommerce plugin under `WPAnchorBay\CartBay\`. It uses WooCommerce order objects as recovery sessions, Action Scheduler for background work, WooCommerce email classes for recovery messages, and REST routes for checkout capture, admin analytics, licensing, tests, and agent automation.

## Runtime Boundaries

| Boundary | Value |
|---|---|
| Plugin file | `cartbay.php` |
| Namespace root | `WPAnchorBay\CartBay\` |
| Source root | `app/` |
| REST namespace | `cartbay/v1` |
| Text domain | `cartbay` |
| Settings option | `cartbay_settings` |
| Campaign option | `cartbay_campaign_settings` |
| Woo status prefix | `wc-cartbay-` |

## Major Modules

| Module | Main files | Responsibility |
|---|---|---|
| Core | `Core/Plugin.php`, `Container.php`, `Installer.php`, `Settings.php`, `Updater.php`, `CheckoutFields.php` | Bootstrap, hooks, service container, settings normalization, updater, checkout fields. |
| Admin | `Admin/Settings/*`, `Admin/Wizard/WizardController.php` | WooCommerce settings tab, wizard, fields, dashboards, logs, test UI. |
| API | `Api/Routes/*` | REST route registration and request handling. |
| Recovery | `Recovery/*` | Capture, abandonment, sequencing, coupons, restore, matching, notifications. |
| Email | `Email/*` | WooCommerce recovery email classes and shared email behavior. |
| Data | `Data/SessionRepository.php` | WooCommerce order-backed session CRUD. |
| Analytics | `Analytics/AnalyticsService.php` | Period metrics and cached reporting. |
| License | `License/LicenseClient.php` | WPAnchorBay license activation/check/deactivation. |
| Agent | `Agent/*` | Agent auth, scopes, permissions, tokens, abilities, audit logging. |
| Utils | `Utils/TokenHelper.php`, `RateLimiter.php`, `Logger.php` | Token hashing, rate limiting, logging. |

## Bootstrap Flow

1. `cartbay.php` registers constants and Composer autoloading.
2. `plugins_loaded` checks WooCommerce availability.
3. `Plugin::instance()->init()` declares HPOS compatibility, registers container services, hooks runtime events, initializes updater, and fires `cartbay_loaded`.
4. Activation creates default options, seeds email templates, registers install-time statuses/CPTs, schedules recurring jobs, and flushes rewrites.
5. Deactivation unschedules recurring CartBay jobs and flushes rewrites.

## End-to-End Data Flow

```text
Checkout consent + email
  -> POST /wp-json/cartbay/v1/capture
  -> CaptureService
  -> SessionRepository creates/updates WooCommerce order session
  -> Action Scheduler marks abandoned
  -> EmailSequenceService sends recovery email
  -> RestoreService rebuilds cart from token link
  -> RecoveryMatcher attributes completed order
  -> AnalyticsService reports recovery metrics
```

## Design Constraints

- Use WooCommerce CRUD APIs for order/session data.
- Do not query WooCommerce order tables directly.
- Use Action Scheduler, not WordPress cron events.
- Store restore/unsubscribe/agent tokens as hashes.
- Keep public REST endpoints rate-limited before database work.
- Keep checkout assets scoped to checkout pages.
- Keep license-server failures from blocking capture, email, or restore flows.

## Notable Implementation Details

- CartBay declares HPOS compatibility on `before_woocommerce_init`.
- Classic checkout and Block Checkout share the same capture REST endpoint.
- Restore and unsubscribe use query parameters, not REST routes.
- `wp_mail_succeeded` means WordPress accepted mail, not provider-confirmed delivery.
- PHP requirement differs between plugin header (`8.2`) and Composer (`>=8.3`); use PHP 8.3+ for development.
