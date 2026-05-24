---
title: Safety Rules
description: Operational safety rules, constraints, and guardrails for AI agents and automation systems working with CartBay.
---

AI agents can help operate CartBay, but recovery systems touch customer data, email outreach, coupons, order attribution, and destructive cleanup. Use strict guardrails.

## Default Rule

Use read-only access unless the store owner explicitly asks for a change and the required CartBay setting gate is enabled.

## Never Do These Without Explicit Approval

- Send or resend recovery emails.
- Cancel pending emails.
- Change campaign timing.
- Enable coupons on additional steps.
- Increase coupon amount.
- Enable sensitive data access.
- Enable destructive actions.
- Expire or delete sessions.
- Remove license keys.
- Enable uninstall data deletion.

## PII Rules

- Prefer masked session output.
- Do not print raw customer emails unless the task requires it.
- Do not export cart snapshots unless sensitive access was approved.
- Do not include raw tokens in logs, reports, prompts, or tickets.
- Do not send full license keys to third-party systems.

## Contact Rules

Recovery emails are customer contact. Agents must treat these actions as high impact.

Before any contact action, verify:

- The session is abandoned.
- The email is not suppressed.
- The requested step has not already been sent unless resending is intentional.
- The store owner approved the action.
- The action will be audited.

## Destructive Rules

Before expiring or deleting a session, verify:

- It is a CartBay-created WooCommerce order-backed session.
- The status and age match the cleanup reason.
- The session ID was explicitly approved.
- No active recovery investigation depends on the record.

## Coupon Rules

- Do not recommend percentage discounts without margin context.
- Do not apply coupons outside a matching restored recovery flow.
- Do not bypass CartBay coupon validation.
- Do not use recovery coupons on carts containing subscription products.

## License Rules

- License server outages should not be treated as runtime failures.
- Do not remove the license key unless the user asks.
- Do not change license metadata or updater behavior to satisfy WordPress.org-only checks.

## Developer-Agent Rules

When modifying CartBay code, agents must:

- Read project instructions before editing.
- Preserve namespace `WPAnchorBay\CartBay\`.
- Use WooCommerce CRUD for orders.
- Use Action Scheduler for jobs.
- Sanitize inputs and escape outputs.
- Run `composer phpcs` and `composer phpstan` before claiming code work complete.
- Run `bun run build` after JS changes.
- Update docs when behavior changes.

## Recommended Human Approval Prompt

```text
I found the following CartBay action candidates: [session IDs and reasons].
This will [send emails/change settings/delete records/access PII].
Required gate: [write/contact/sensitive/destructive].
Approve exactly these actions? Reply with the session IDs and action name.
```

Agents should stop if approval is ambiguous.
