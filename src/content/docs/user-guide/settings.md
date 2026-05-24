---
title: Settings
description: Manage CartBay licensing, retention, uninstall cleanup, admin navigation, AI-agent access, logs, test mode, and mail environment warnings.
---

The Settings section contains CartBay's operational controls. It is where administrators manage licensing and updates, retention, uninstall behavior, admin menu placement, optional AI-agent access, logs, test mode, and mail-delivery warnings.

## Where to Find It

Open `WooCommerce > CartBay > Settings`.

## Purpose

Use Settings after the recovery workflow is configured to manage site-level behavior: update access, data lifecycle, admin convenience, troubleshooting, and safe automation.

## License Status

`Status` shows the most recent local license state returned by CartBay licensing.

Common statuses:

| Status | Meaning |
|---|---|
| Active | The license server accepted the key. |
| Inactive | No active license state is stored locally. |
| Expired | The license server reported an expired license. |
| Invalid | The stored key was rejected. |
| Dev Mode | Development-domain bypass is active. |
| Server Error | The license server was unreachable. CartBay fails open for runtime continuity. |

License checks do not interrupt checkout capture, recovery emails, or restore behavior if the license server is temporarily unavailable.

## Current Key

`Current Key` shows only a masked version of the stored license key.

CartBay stores the full key only in `cartbay_license_data`. The settings UI does not display the full key after activation.

## Expires and Plan

When the license server returns expiry or plan data, CartBay shows:

- `Expires`: the current license term end date.
- `Plan`: the product plan associated with the license.

These fields are informational and depend on license server response data.

## Activate New Key

`Activate New Key` lets an administrator activate or replace the stored WPAnchorBay license key.

Expected format:

```text
WPAB-XXXXXXXXXXXX-XXXXXXXXXXXX
```

Activation sends the key, product slug, and site domain to the WPAnchorBay license server through the local WordPress admin request. The browser does not call the license server directly.

Development domains such as `localhost`, `.local`, `.dev`, `.test`, and staging domains can be treated as valid locally without consuming production activation slots.

## License Actions

CartBay licenses are provided after purchase. Most users receive the license key in the purchase confirmation email. Users can also retrieve their license by logging in to their WPAnchorBay account dashboard at `wpanchorbay.com`.

If a user cannot find their license key or needs account help, contact WPAnchorBay support at `support@wpanchorbay.com`.

### Check Current License

`Check Current License` requests a fresh license status check from the license server.

Use it after renewal, domain changes, or support troubleshooting.

### Remove License

`Remove License` removes the locally stored license key and cached license transient.

Removing the local license disconnects this site from CartBay updates and support checks until a new key is activated. Recovery flows continue running.

## Retention Period

`Retention Period` controls how long CartBay keeps abandoned cart session data.

Default: `30` days.

Allowed range: `7` to `90` days.

The daily `cartbay_prune_sessions` background job handles retention cleanup for expired sessions.

Use shorter retention when privacy policy or storage requirements demand it. Use longer retention when reporting and support analysis need more history.

## Delete Data on Uninstall

`Delete Data on Uninstall` controls whether CartBay deletes its data when the plugin is deleted.

Default: off.

When off:

- Deleting the plugin preserves CartBay settings and recovery data for a future reinstall.

When on:

- Deleting the plugin removes CartBay settings, license data, campaign settings, sessions, generated coupons, template records, suppression records, scheduled actions, transients, and CartBay-owned log files.

:::danger
Enable this only when intentionally removing CartBay and its data permanently.
:::

## WooCommerce Menu Shortcut

`WooCommerce Menu Shortcut` controls whether CartBay appears under the WooCommerce admin menu.

Default: enabled.

When enabled, `WooCommerce > CartBay` opens the CartBay settings area directly. When disabled, CartBay remains available through `WooCommerce > Settings > Cart`.

## Enable Agent Access

`Enable Agent Access` is the master gate for CartBay AI-agent and automation access.

Default: off.

When off, CartBay agent REST endpoints and agent ability surfaces are not available for automation use. Keep it off unless the store has a defined automation workflow.

Read [Agent Access](/cartbay/agents/agent-access/) before enabling this feature.

## Agent Surfaces

The Agent Surfaces row shows the main automation surfaces:

- `/wp-json/cartbay/v1/agent`
- `cartbay/*` WordPress Abilities

Use Application Passwords for WordPress Abilities and MCP workflows. Use CartBay Bearer tokens only for CartBay agent REST endpoints.

## REST Access

`REST Access` enables CartBay's agent REST endpoints when the master agent access setting is enabled.

Default: on.

Turn this off if the store uses WordPress Abilities or MCP exposure but does not want CartBay Bearer-token REST access.

## Abilities Access

`Abilities Access` exposes CartBay WordPress Abilities for authenticated users when the WordPress Abilities API exists.

Default: on.

This is useful for automation clients that discover tools through WordPress-native ability metadata.

## MCP Public Exposure

`MCP Public Exposure` marks CartBay Abilities as MCP-public for the official WordPress MCP Adapter.

Default: off.

Enable it only for dedicated, least-privilege MCP users. MCP clients act as authenticated WordPress users.

## Agent Write Actions

`Agent Write Actions` allows authorized agents to update safe CartBay settings and campaign settings.

Default: off.

Keep this disabled for read-only monitoring agents.

## Agent Contact Actions

`Agent Contact Actions` allows authorized agents to perform email-related actions, such as sending or canceling recovery emails.

Default: off.

Treat this as high impact because it can affect customer communication.

## Agent Sensitive Data

`Agent Sensitive Data` allows authorized agents to request raw customer email, cart snapshot, coupon, and linked order details.

Default: off.

Keep this disabled unless the automation workflow explicitly needs sensitive data and the store owner approves that access.

## Agent Destructive Actions

`Agent Destructive Actions` allows authorized agents to expire or delete CartBay sessions.

Default: off.

Enable only for tightly controlled cleanup workflows.

## Test Mode

`Test Mode` enables QA-oriented behavior such as shortened email delays and dummy test sessions.

Default: off.

Use it in staging or controlled production testing when you need quick feedback without waiting for the normal recovery schedule.

Test Mode is required for the Templates section's `Trigger Test Flow` button.

## WooCommerce Logs

`WooCommerce Logs` opens the WooCommerce Status log viewer filtered to the `cartbay` log source.

Use it to inspect checkout capture, Action Scheduler, restore, license, and recovery messages written through WooCommerce logging.

## CartBay Logs

`CartBay Logs` opens CartBay's hidden Logs section.

CartBay's sanitized JSON-line log file is stored under:

```text
wp-content/uploads/cartbay/cartbay.log
```

Default log behavior:

- Logging enabled.
- 7 days retention.
- 5 MB maximum file size.

The Logs section supports filtering, pagination, details modal, and copy controls for support workflows.

## Mail Environment Warnings

CartBay passively detects known SMTP/mail delivery plugins and email logger plugins. If no delivery plugin is detected, the admin UI may warn that recovery emails may not reliably reach inboxes.

Detection does not send a test email. Use the Templates test flow and SMTP/ESP logs for real delivery verification.

## Best Practices

- Keep the license active for private updates.
- Use 30 days retention unless privacy or reporting requirements say otherwise.
- Keep uninstall deletion disabled unless removing CartBay permanently.
- Keep agent access disabled until a specific automation workflow requires it.
- Use Test Mode only for controlled QA.
- Check both WooCommerce Logs and CartBay Logs when troubleshooting.
