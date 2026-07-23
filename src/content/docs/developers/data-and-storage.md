---
title: Data & Storage
description: Reference for CartBay options, WooCommerce order-backed sessions, statuses, meta keys, transients, suppression records, coupons, and retention.
---

CartBay stores recovery sessions as WooCommerce orders. There are no custom recovery-session database tables in v1.

## Session Entity

A CartBay session is a WooCommerce order with:

- `created_via` set to `cartbay`.
- Billing email set to the captured checkout email.
- A CartBay lifecycle status.
- CartBay metadata prefixed with `_cartbay_`.

## Statuses

| Status | Meaning |
|---|---|
| `wc-cartbay-captured` | Shopper consented and the cart was captured. |
| `wc-cartbay-abandoned` | Captured session exceeded the inactivity timeout. |
| `wc-cartbay-recovered` | A later order matched the abandoned session. |
| `wc-cartbay-suppressed` | Shopper unsubscribed or was suppressed. |

:::note
`wc-cartbay-expired` is a **reserved** status. It is registered at install time but is not currently assigned to any session in v1 — do not rely on it as a live status. Retention deletes pruned sessions rather than moving them to `expired`.
:::

## Important Meta Keys

Free session meta keys:

| Meta key | Purpose |
|---|---|
| `_cartbay_session_id` | CartBay session identity. |
| `_cartbay_email` | Captured email. Use carefully; this is PII. |
| `_cartbay_consent`, `_cartbay_consent_text`, `_cartbay_consent_at` | Consent state and context. |
| `_cartbay_source` | `classic` or `block`. |
| `_cartbay_cart_hash`, `_cartbay_cart_fingerprint` | Cart identity and dedupe/update inputs. |
| `_cartbay_cart_total`, `_cartbay_currency`, `_cartbay_cart_item_count` | Cart value summary. |
| `_cartbay_cart_snapshot` | Restore-ready cart snapshot. |
| `_cartbay_captured_at`, `_cartbay_last_activity_at`, `_cartbay_abandoned_at` | Lifecycle timestamps. |
| `_cartbay_recovered_at`, `_cartbay_recovered_order_id`, `_cartbay_recovered_revenue` | Recovery attribution. |
| `_cartbay_notifications` | Notification lifecycle records. |
| `_cartbay_token_hash`, `_cartbay_token_hashes`, `_cartbay_token_expires_at` | Restore token hashes and expiry. |
| `_cartbay_unsub_token_hash` | Unsubscribe token hash. |

### Pro session and coupon meta <span class="cb-badge cb-badge--pro">Pro</span>

CartBay Pro adds its own persisted event/analytics data and dynamic coupon context. These keys exist only when the Pro add-on is active.

| Meta key | Stored on | Purpose |
|---|---|---|
| `_cartbay_pro_events` | Session order | Persisted session event history for Pro analytics. |
| `_cartbay_pro_notifications` | Session order | Persisted per-notification reporting data. |
| `_cartbay_coupon_code`, `_cartbay_coupon_expires_at` | Session order | Generated recovery coupon code and expiry for the session. |
| `_cartbay_generated`, `_cartbay_session_id` | Generated coupon | Marks a coupon as CartBay-generated and links it to its session. |

## Event Names

Session lifecycle events include `captured`, `updated`, `abandoned`, `email_sent`, `email_failed`, `coupon_suppressed`, `restore_clicked`, `cart_restore_started`, `cart_restored`, `cart_restore_partial`, `cart_restore_failed`, `completed_before_abandonment`, `recovered`, and `unsubscribed`.

The **free** plugin fires each event through the `cartbay_session_event` action (see [Hooks & Jobs](/cartbay/developers/hooks-and-jobs/)) but does **not** persist an event history. The stored, queryable event log (`_cartbay_pro_events`) is a Pro feature. <span class="cb-badge cb-badge--pro">Pro</span>

## Options

Free options:

| Option | Purpose |
|---|---|
| `cartbay_settings` | Capture, consent, timeout, offers, retention, logs, test mode, and admin navigation. |
| `cartbay_campaign_settings` | Recovery sequence enabled state, delay settings, and per-step coupon controls. |
| `cartbay_wizard_complete` | First-run wizard completion flag. |
| `cartbay_sequence_defaults_version` | Sequence default migration marker. |
| `cartbay_db_version` | Schema/migration version marker. |
| `cartbay_log_entries` | Bounded (~500) in-database CartBay log buffer (non-autoloaded). |

Pro options: <span class="cb-badge cb-badge--pro">Pro</span>

| Option | Purpose |
|---|---|
| `cartbay_license_data` | Stored license key and license status data. |
| `cartbay_pro_coupon_settings` | Dynamic recovery coupon defaults. |

## Transients

Free transients:

| Transient | Purpose |
|---|---|
| `cartbay_analytics_cache` | Cached analytics metrics. |
| `cartbay_rl_{endpoint}_{md5(REMOTE_ADDR)}` | Public endpoint rate-limit counters. |
| `cartbay_notification_ctx_{notification_id}` | Notification context for mail success/failure hooks. |
| `cartbay_wizard_redirect` | Short-lived first-run redirect flag. |

Pro transients: <span class="cb-badge cb-badge--pro">Pro</span>

| Transient | Purpose |
|---|---|
| `cartbay_license_valid` | Cached license validity for 12 hours. |
| `cartbay_pro_analytics_cache` | Cached Pro (advanced) analytics metrics. |

## Suppression Records

Suppression entries use a private `cartbay_suppressed` post type. The post slug/title is the SHA-256 hash of the normalized email. This allows suppression lookup without storing a plain email in the suppression identifier.

## Coupon Storage <span class="cb-badge cb-badge--pro">Pro</span>

Dynamic recovery coupons are a Pro feature. The **free** plugin does not generate coupons — its offer is a single static WooCommerce coupon code referenced from settings (`cartbay_settings['static_coupon_code']`) and inserted into emails as plain text.

When Pro is active, it creates a unique per-session `WC_Coupon` (`CARTBAY-<8 alnum>`, single-use, email-restricted, with an expiry). The generated coupon carries `_cartbay_generated` and `_cartbay_session_id` meta, and the session order stores `_cartbay_coupon_code` and `_cartbay_coupon_expires_at`.

## Retention

Retention is controlled by `cartbay_settings['data_retention_days']`. The daily `cartbay_prune_sessions` action delegates cleanup to `SessionRepository::prune_expired()`.

:::caution
Use WooCommerce CRUD APIs and CartBay services when extending storage. Do not query `wp_posts`, `wp_postmeta`, or HPOS tables directly.
:::
