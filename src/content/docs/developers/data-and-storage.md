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
| `wc-cartbay-expired` | Session passed retention or was expired. |
| `wc-cartbay-suppressed` | Shopper unsubscribed or was suppressed. |

## Important Meta Keys

| Meta key | Purpose |
|---|---|
| `_cartbay_session_id` | CartBay session identity. |
| `_cartbay_email_hash` | Normalized email hash for grouping and fallback attribution. |
| `_cartbay_email` | Captured email. Use carefully; this is PII. |
| `_cartbay_consent`, `_cartbay_consent_text`, `_cartbay_consent_at` | Consent state and context. |
| `_cartbay_source` | `classic` or `block`. |
| `_cartbay_cart_hash`, `_cartbay_cart_fingerprint` | Cart identity and dedupe/update inputs. |
| `_cartbay_cart_total`, `_cartbay_currency`, `_cartbay_cart_item_count` | Cart value summary. |
| `_cartbay_cart_snapshot` | Restore-ready cart snapshot. |
| `_cartbay_captured_at`, `_cartbay_last_activity_at`, `_cartbay_abandoned_at` | Lifecycle timestamps. |
| `_cartbay_recovered_at`, `_cartbay_recovered_order_id`, `_cartbay_recovered_revenue` | Recovery attribution. |
| `_cartbay_events` | Structured session event log. |
| `_cartbay_notifications` | Notification lifecycle records. |
| `_cartbay_token_hash`, `_cartbay_token_hashes`, `_cartbay_token_expires_at` | Restore token hashes and expiry. |
| `_cartbay_unsub_token_hash` | Unsubscribe token hash. |
| `_cartbay_coupon_code`, `_cartbay_coupon_expires_at` | Generated recovery coupon context. |

## Event Names

Implemented session events include `captured`, `updated`, `abandoned`, `email_sent`, `email_failed`, `restore_clicked`, `cart_restore_started`, `cart_restored`, `cart_restore_partial`, `cart_restore_failed`, `completed_before_abandonment`, `recovered`, and `unsubscribed`.

## Options

| Option | Purpose |
|---|---|
| `cartbay_settings` | Capture, consent, timeout, offers, retention, logs, test mode, admin navigation, and agent gates. |
| `cartbay_campaign_settings` | Recovery sequence enabled state, delay settings, and per-step coupon controls. |
| `cartbay_license_data` | Stored license key and license status data. |
| `cartbay_wizard_complete` | First-run wizard completion flag. |
| `cartbay_sequence_defaults_version` | Sequence default migration marker. |

## Transients

| Transient | Purpose |
|---|---|
| `cartbay_license_valid` | Cached license validity for 12 hours. |
| `cartbay_analytics_cache` | Cached analytics metrics. |
| `cartbay_rl_{endpoint}_{md5(REMOTE_ADDR)}` | Public endpoint rate-limit counters. |
| `cartbay_notification_ctx_{notification_id}` | Notification context for mail success/failure hooks. |
| `cartbay_wizard_redirect` | Short-lived first-run redirect flag. |

## Suppression Records

Suppression entries use a private `cartbay_suppressed` post type. The post slug/title is the SHA-256 hash of the normalized email. This allows suppression lookup without storing a plain email in the suppression identifier.

## Coupon Storage

CartBay creates recovery coupons with `WC_Coupon`. Coupon metadata includes `_cartbay_session_id`, `_cartbay_email`, `_cartbay_generated`, and `_cartbay_offer_note`.

## Retention

Retention is controlled by `cartbay_settings['data_retention_days']`. The daily `cartbay_prune_sessions` action delegates cleanup to `SessionRepository::prune_expired()`.

:::caution
Use WooCommerce CRUD APIs and CartBay services when extending storage. Do not query `wp_posts`, `wp_postmeta`, or HPOS tables directly.
:::
