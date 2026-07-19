---
title: Architecture
description: Developer overview of CartBay's runtime architecture, core modules, data flow, services, and implementation constraints.
---

CartBay is a namespaced WooCommerce plugin under `WPAnchorBay\CartBay\`. It uses WooCommerce order objects as recovery sessions, Action Scheduler for background work, WooCommerce email classes for recovery messages, and REST routes for checkout capture, admin analytics, and tests.

## Runtime Boundaries

| Boundary | Value |
|---|---|
| Plugin file | `cartbay-abandoned-cart-recovery-for-woocommerce.php` |
| Namespace root | `WPAnchorBay\CartBay\` |
| Source root | `app/` |
| REST namespace | `cartbay/v1` |
| Text domain | `cartbay-abandoned-cart-recovery-for-woocommerce` |
| Settings option | `cartbay_settings` |
| Campaign option | `cartbay_campaign_settings` |
| Woo status prefix | `wc-cartbay-` |

## Major Modules

These are the modules of the **free** plugin (`app/`).

| Module | Main files | Responsibility |
|---|---|---|
| Core | `Core/Plugin.php`, `Container.php`, `Installer.php`, `Settings.php`, `CheckoutFields.php` | Bootstrap, hooks, service container, settings normalization, checkout fields. |
| Admin | `Admin/Settings/*`, `Admin/Wizard/WizardController.php` | WooCommerce settings tab, wizard, fields, dashboards, logs, test UI. |
| API | `Api/Routes/*` | REST route registration and request handling. |
| Recovery | `Recovery/*` | Capture, abandonment, sequencing, restore, matching, notifications. |
| Email | `Email/*` | WooCommerce recovery email classes and shared email behavior. |
| Data | `Data/SessionRepository.php` | WooCommerce order-backed session CRUD. |
| Analytics | `Analytics/AnalyticsService.php` | Period metrics and cached reporting. |
| Utils | `Utils/TokenHelper.php`, `RateLimiter.php`, `Logger.php` | Token hashing, rate limiting, logging. |

## CartBay Pro (separate add-on) <span class="cb-badge cb-badge--pro">Pro</span>

CartBay Pro is a **separate plugin** (`cartbay-pro`, main file `cartbay-pro.php`), not an in-place unlock of the free plugin. It ships from wpanchorbay.com under license and is installed alongside the free plugin, which it declares via `Requires Plugins`.

| Boundary | Value |
|---|---|
| Plugin file | `cartbay-pro.php` |
| Namespace root | `WPAnchorBay\CartBayPro\` |
| Text domain | `cartbay` |
| Requires | Free plugin installed and active |

Pro attaches through the free plugin's hook seams (see [Hooks & Jobs](/cartbay/developers/hooks-and-jobs/)) and gates its features on license validity via `LicenseClient::is_valid()`. Gating is **fail-open**: an invalid, expired, or unreachable license never blocks the free plugin's core recovery flows. Pro's own modules include `License/*` (activation, status, checks), `Coupon/*` (dynamic per-session recovery coupons), and its own `Admin/*`, `Analytics/*`, and `Api/Routes/*` extensions.

## Bootstrap Flow

1. `cartbay-abandoned-cart-recovery-for-woocommerce.php` registers constants and Composer autoloading.
2. `plugins_loaded` checks WooCommerce availability.
3. `Plugin::instance()->init()` declares HPOS compatibility, registers container services, hooks runtime events, and fires `cartbay_loaded`.
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
- Store restore/unsubscribe tokens as hashes.
- Keep public REST endpoints rate-limited before database work.
- Keep checkout assets scoped to checkout pages.
- Keep Pro license-server failures from blocking capture, email, or restore flows (fail-open). <span class="cb-badge cb-badge--pro">Pro</span>

## Notable Implementation Details

- CartBay declares HPOS compatibility on `before_woocommerce_init`.
- Classic checkout and Block Checkout share the same capture REST endpoint.
- Restore and unsubscribe use query parameters, not REST routes.
- `wp_mail_succeeded` means WordPress accepted mail, not provider-confirmed delivery.
- The free plugin requires PHP 8.2+ (both the plugin header and Composer); 8.3+ is recommended for development.
