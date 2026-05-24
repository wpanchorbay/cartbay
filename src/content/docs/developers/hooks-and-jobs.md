---
title: Hooks & Jobs
description: WordPress hooks, WooCommerce hooks, Action Scheduler jobs, filters, and extension points used by CartBay.
---

CartBay is event-driven. Most behavior is registered from `Core/Plugin.php` and executed through WordPress, WooCommerce, and Action Scheduler hooks.

## Core Hooks

| Hook | Purpose |
|---|---|
| `before_woocommerce_init` | Declare HPOS compatibility. |
| `init` | Register custom statuses, private CPTs, restore/unsubscribe handlers. |
| `woocommerce_register_shop_order_statuses` | Register CartBay statuses with WooCommerce. |
| `wc_order_statuses` | Add CartBay statuses to status lists. |
| `rest_api_init` | Register REST routes. |
| `admin_menu` | Register WooCommerce menu shortcut and hidden wizard page. |
| `admin_init` | Handle wizard redirect. |

## Frontend Hooks

| Hook | Purpose |
|---|---|
| `wp_enqueue_scripts` | Enqueue classic checkout capture asset when eligible. |
| `woocommerce_blocks_enqueue_checkout_block_scripts_after` | Enqueue Block Checkout capture asset. |
| `woocommerce_init` | Register Block Checkout additional consent field. |
| `woocommerce_get_default_value_for_cartbay/marketing-consent` | Return configured default checkbox state. |
| `woocommerce_checkout_get_value` | Prefill restored checkout email. |
| `wp` | Display frontend notices after restore. |

## Recovery Hooks

| Hook | Purpose |
|---|---|
| `woocommerce_payment_complete` | Attempt recovery matching after payment completion. |
| `woocommerce_order_status_changed` | Attempt matching when order becomes processing/completed. |
| `woocommerce_checkout_create_order` | Attach CartBay attribution identity to the new order. |
| `woocommerce_coupon_is_valid` | Validate CartBay-generated coupons against restored identity. |

## Email Hooks

| Hook | Purpose |
|---|---|
| `woocommerce_email_classes` | Register CartBay recovery email classes. |
| `wp_mail_failed` | Mark notification failures and retry when applicable. |
| `wp_mail_succeeded` | Mark notifications sent when WordPress accepts mail. |
| `cartbay_mark_notification_delivered` | Optional provider integration hook for confirmed delivery. |

## Action Scheduler Jobs

Recurring jobs in group `cartbay`:

| Hook | Schedule | Purpose |
|---|---:|---|
| `cartbay_detect_abandonment` | Every 5 minutes | Fallback scanner for inactive captured sessions. |
| `cartbay_refresh_analytics` | Hourly | Refresh analytics cache. |
| `cartbay_prune_sessions` | Daily | Prune expired sessions. |
| `cartbay_check_license` | Daily | Refresh license state. |

Single jobs in group `cartbay`:

| Hook | Args | Purpose |
|---|---|---|
| `cartbay_detect_session_abandonment` | `[session_id]` | Exact abandonment boundary check. |
| `cartbay_send_recovery_email` | `[session_id, step_index]` | Send one recovery email step. |

## Filters

Known extension filters include:

| Filter | Purpose |
|---|---|
| `cartbay_mail_delivery_plugins` | Extend known mail delivery plugin detection. |
| `cartbay_email_logger_plugins` | Extend known email logger detection. |
| `cartbay_mail_environment_status` | Override or enrich detected mail environment status. |
| `cartbay_license_dev_domain_bypass` | Control development-domain license bypass behavior. |

## Extension Guidance

- Prefer adding hooks around service boundaries instead of bypassing services.
- Keep recovery job callbacks idempotent.
- Do not schedule duplicate Action Scheduler actions; check existing actions first.
- Keep all order access HPOS-safe through WooCommerce CRUD.
- Treat public REST and agent input as untrusted.
