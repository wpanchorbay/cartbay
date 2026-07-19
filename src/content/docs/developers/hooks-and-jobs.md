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

Recurring jobs in group `cartbay` (free):

| Hook | Schedule | Purpose |
|---|---:|---|
| `cartbay_detect_abandonment` | Every 5 minutes | Fallback scanner for inactive captured sessions. |
| `cartbay_refresh_analytics` | Hourly | Refresh analytics cache. |
| `cartbay_prune_sessions` | Daily | Prune expired sessions. |

Pro adds one recurring job: <span class="cb-badge cb-badge--pro">Pro</span>

| Hook | Schedule | Purpose |
|---|---:|---|
| `cartbay_check_license` | Daily | Refresh license state against the WPAnchorBay license server. |

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

## Free/Pro Extension Seams

The free plugin exposes a set of stable filters and actions that add-ons — including CartBay Pro — hook to extend behavior without modifying core services. These are the seams Pro consumes.

Filters:

| Filter | Purpose |
|---|---|
| `cartbay_email_coupon` | Override the coupon code/context injected into a recovery email. |
| `cartbay_overview_metric_cards` | Add or modify Overview dashboard metric cards. |
| `cartbay_settings_section_pre_fields` | Inject fields before a settings section renders. |
| `cartbay_wizard_steps` | Add or reorder setup-wizard steps (e.g. Pro's License step). |

Actions:

| Action | Purpose |
|---|---|
| `cartbay_loaded` | Fires after the free plugin finishes bootstrapping; the primary attach point for add-ons. |
| `cartbay_session_event` | Fires on each session lifecycle event (`session_id`, `event`, `data`). |
| `cartbay_restore_apply_discounts` | Fires during cart restore so add-ons can apply discounts/coupons. |
| `cartbay_notification_state_changed` | Fires when a notification transitions state. |
| `cartbay_overview_after_table_actions` | Render extra actions after the Overview table. |
| `cartbay_notifications_after_summary` | Render extra content after the Notifications summary. |
| `cartbay_settings_section_saved` | Fires after a settings section is saved. |

## Extension Guidance

- Prefer adding hooks around service boundaries instead of bypassing services.
- Keep recovery job callbacks idempotent.
- Do not schedule duplicate Action Scheduler actions; check existing actions first.
- Keep all order access HPOS-safe through WooCommerce CRUD.
- Treat public REST input as untrusted.
