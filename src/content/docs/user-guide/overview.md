---
title: CartBay Overview
description: Understand the CartBay Overview admin section, including reporting cards, session table, filters, exports, status guide, and period selector.
---

The CartBay Overview section is the first reporting screen for abandoned cart recovery activity. It summarizes capture, abandonment, restore, recovery, revenue, and session status data so store administrators can quickly see whether CartBay is tracking carts and recovering orders.

## Where to Find It

Open `WooCommerce > CartBay > Overview` or `WooCommerce > Settings > Cart > Overview`.

## Purpose

Use CartBay Overview to monitor whether checkout capture is working, how many carts become abandoned, how many sessions recover, how much abandoned value exists, and which individual sessions need review. It is a reporting and inspection page; campaign settings are changed in the other CartBay sections.

## Filter by Days

The period selector changes the reporting window for the overview stat cards and the Sessions table.

| Filter | Use it for |
|---|---|
| 7 Days | Short-term QA, launch monitoring, and recent campaign changes. |
| 30 Days | Normal month-to-month performance review. This is the default view. |
| 90 Days | Longer trend review and recovery performance over a quarter. |

The selected period is passed through the `period` query parameter. If an unsupported value is supplied, CartBay falls back to 30 days.

:::note
Overview stat cards use the selected reporting period. The Status Guide counts current sessions by status, which may not match the selected reporting window exactly.
:::

## Stat Cards

CartBay shows the most important cards directly on the page and places additional cards behind a `More` card/modal.

#### Tracked Carts

Tracked Carts is the number of checkout sessions CartBay captured during the selected period.

Use this card to confirm that checkout capture is working. If the value is zero after real checkout traffic, check whether Capture is enabled, the consent checkbox appears, and shoppers are entering valid email addresses.

#### Abandoned Carts

Abandoned Carts is the number of tracked carts that passed the configured inactivity timeout during the selected period.

This value depends on the [Capture](/cartbay/user-guide/capture/) section's `Abandonment Timeout` setting. A cart must first be captured before it can become abandoned.

#### Recovered Carts

Recovered Carts is the number of abandoned CartBay sessions that matched a later WooCommerce order during the selected period.

CartBay can match recovered orders by restored session identity, restore token, CartBay coupon metadata, or billing email hash fallback.

#### Link-Restored and Purchased

Link-Restored and Purchased counts recovered carts where the shopper first clicked a CartBay restore link from a recovery email.

This helps separate recoveries that clearly came through a recovery email click from recoveries attributed by other matching signals.

#### Abandoned Cart Value

Abandoned Cart Value is the total cart value for sessions that became abandoned during the selected period.

This is potential recoverable value, not guaranteed lost revenue. It is useful for estimating opportunity size.

#### Recovered Revenue

Recovered Revenue is revenue from WooCommerce orders matched to recovered CartBay sessions during the selected period.

Use this card to evaluate the monetary impact of CartBay recovery activity.

#### Recovery Rate

Recovery Rate is recovered carts divided by abandoned carts for the selected period.

If this value is low, review recovery email delivery, template copy, offer strength, restore link behavior, and checkout friction.

#### Restore Clicks

Restore Clicks counts clicks on CartBay restore links recorded during the selected period.

This measures engagement with recovery emails. High restore clicks with low purchases can indicate checkout, product availability, coupon, shipping, or payment friction.

#### Click-to-Recovery Rate

Click-to-Recovery Rate is link-restored purchases divided by restore-link clicks for the selected period.

This is not the same as overall recovery rate. It only measures how often restore-link clicks become recovered purchases.

#### Failed Restores

Failed Restores counts restore attempts that failed token, session, or cart validation during the selected period.

Common causes include expired restore tokens, deleted sessions, unavailable products, invalid cart snapshots, or cart validation failures.

## Sessions Table

The Sessions table lists CartBay recovery sessions for the selected reporting period. It helps administrators inspect individual carts behind the summary numbers.

| Column | Meaning |
|---|---|
| Session | WooCommerce order-backed CartBay session ID. The ID links to a session detail URL. |
| Email | Captured checkout email address. |
| Status | Current CartBay lifecycle status for the session. |
| Cart Total | Stored cart total for the captured session. |
| Created | Local date/time when the CartBay session was created. |
| Last Activity | Local date/time of the latest captured cart activity. |
| Emails Sent | Count of successful recovery notifications for the session. `sent` and `delivered` notifications count here. |

### Sorting

Sortable columns include Session, Cart Total, Created, Last Activity, and Emails Sent. Click a sortable column header to change the sort order. Clicking the active sort column toggles between ascending and descending order.

### Status Filter

The status dropdown filters the Sessions table by lifecycle status.

| Filter | Shows |
|---|---|
| All statuses | Captured, abandoned, recovered, and suppressed sessions in the selected period. |
| Captured | Sessions still inside the abandonment timeout. |
| Abandoned | Sessions eligible for recovery emails. |
| Recovered | Sessions matched to later WooCommerce orders. |
| Suppressed | Sessions excluded from recovery messaging. |

Use the filter to focus on carts that need attention. For example, filter by `Abandoned` when reviewing carts currently eligible for recovery emails.

### Pagination

The table shows 20 sessions per page. Pagination controls appear when the selected period and filters return more than one page of sessions.

### Exports

The Overview section includes two export actions.

| Export | What it contains | Common use |
|---|---|---|
| Export Sessions CSV | Session rows matching the current period, status, and sort context. | Reporting, offline analysis, support review. |
| Export Emails | Email data for sessions matching the current period and status context. | Auditing captured/recovery email activity. |

:::caution
Exports can include customer email data. Share exported files only with trusted team members and delete them when they are no longer needed.
:::

## Status Guide

The Status Guide explains what each CartBay lifecycle status means and shows current session counts for each status.

| Status | Meaning |
|---|---|
| Captured | Shopper email and cart data were captured and the cart is still inside the abandonment timeout. |
| Abandoned | The cart passed the inactivity timeout and is eligible for recovery emails. |
| Recovered | A later WooCommerce order matched this CartBay session. |
| Suppressed | The shopper or email is excluded from recovery messaging. |

Use the Status Guide when the Sessions table filter results do not match expectations. Remember that the guide shows current counts, while the overview cards above use the selected reporting period.

## Best Practices

- Check the 7-day view after launch or configuration changes.
- Use the 30-day view for normal reporting.
- Use the 90-day view before making major campaign changes.
- Investigate zero Tracked Carts before adjusting recovery emails.
- Investigate high Failed Restores before increasing offers.
- Treat exports as sensitive files because they may contain customer email addresses.
