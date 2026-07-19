---
title: Agent Access
description: Configure and understand CartBay's protected AI-agent REST endpoints, WordPress Abilities, token scopes, MCP exposure, and audit logging.
---

CartBay includes an optional agent access layer for trusted automation systems. It is closed by default and becomes active only after a store administrator enables it.

## Surfaces

| Surface | Use case | Authentication |
|---|---|---|
| CartBay Agent REST | CartBay-specific automation endpoints. | WordPress auth or CartBay Bearer token. |
| WordPress Abilities | WordPress-native ability discovery and execution. | WordPress authentication, often Application Passwords. |
| MCP Adapter exposure | Expose CartBay Abilities to MCP clients through the official WordPress MCP Adapter. | Authenticated WordPress MCP user. |

CartBay Bearer tokens authenticate only CartBay agent REST endpoints. They are not accepted as general WordPress authentication.

## Settings Gates

Open `WooCommerce > CartBay > Settings > AI Agent Access`.

| Setting | Default | Meaning |
|---|---:|---|
| Enable Agent Access | Off | Master gate for all agent capabilities. |
| REST Access | On | Enables `/wp-json/cartbay/v1/agent` when master access is enabled. |
| Abilities Access | On | Registers CartBay WordPress Abilities for authenticated users. |
| MCP Public Exposure | Off | Marks abilities as MCP-public for the MCP Adapter. |
| Agent Write Actions | Off | Allows safe settings/campaign updates. |
| Agent Contact Actions | Off | Allows email-oriented session actions. |
| Agent Sensitive Data | Off | Allows raw PII and sensitive recovery details. |
| Agent Destructive Actions | Off | Allows expiring or deleting sessions. |

## Capabilities and Scopes

WordPress capabilities:

- `cartbay_agent_read`
- `cartbay_agent_write`
- `cartbay_agent_contact`
- `cartbay_agent_sensitive`
- `cartbay_agent_destructive`
- `cartbay_agent_manage_tokens`
- `cartbay_agent_manage_access`

Bearer token scopes:

- `read`
- `write`
- `contact`
- `sensitive`
- `destructive`
- `manage_tokens`
- `manage_access`

Administrators receive all agent capabilities. Shop managers receive read, write, and contact capabilities.

## Agent REST Endpoints

| Method | Path |
|---|---|
| `GET` | `/wp-json/cartbay/v1/agent/manifest` |
| `GET` | `/wp-json/cartbay/v1/agent/sessions` |
| `GET` | `/wp-json/cartbay/v1/agent/sessions/{id}` |
| `POST` | `/wp-json/cartbay/v1/agent/sessions/{id}/actions` |
| `GET` | `/wp-json/cartbay/v1/agent/analytics` |
| `GET`, `PATCH` | `/wp-json/cartbay/v1/agent/settings` |
| `GET`, `PATCH` | `/wp-json/cartbay/v1/agent/campaign` |
| `GET`, `POST` | `/wp-json/cartbay/v1/agent/tokens` |
| `DELETE` | `/wp-json/cartbay/v1/agent/tokens/{public_id}` |
| `GET` | `/wp-json/cartbay/v1/agent/audit-log` |

Session output masks PII by default. Raw customer email, cart snapshots, coupon data, and linked order details require sensitive access and the sensitive data gate.

## Session Actions

Supported actions:

- `mark_abandoned_now`
- `cancel_pending_emails`
- `send_email_step_now`
- `expire_session`
- `delete_session`

Contact and destructive actions require both a matching capability/scope and the corresponding settings gate.

## WordPress Abilities

When the WordPress Abilities API is available, CartBay registers the `cartbay-agent` category and abilities such as:

- `cartbay/get-agent-manifest`
- `cartbay/list-sessions`
- `cartbay/get-session`
- `cartbay/get-analytics`
- `cartbay/get-settings`
- `cartbay/update-settings`
- `cartbay/get-campaign`
- `cartbay/update-campaign`
- `cartbay/run-session-action`

CartBay does not bundle the MCP Adapter. Site owners can install the official WordPress MCP Adapter and expose CartBay abilities as MCP tools.

## Audit Logging

CartBay stores a redacted rolling audit log in `cartbay_agent_audit_log`. Reads and writes should be attributable to the resolved principal, whether that is a WordPress user or CartBay Bearer token.

## Safe Enablement Pattern

1. Create a dedicated least-privilege WordPress user or CartBay token.
2. Enable only `Enable Agent Access` and the surface needed for the workflow.
3. Start with read-only access.
4. Enable write/contact/sensitive/destructive gates only when required.
5. Review the audit log after the first automation run.

:::danger
Do not enable sensitive or destructive agent access for general-purpose agents, shared credentials, browser extensions, or untrusted automation runners.
:::
