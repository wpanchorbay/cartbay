---
title: Automation Workflows
description: Recommended AI-agent and automation workflows for monitoring, diagnosing, configuring, and safely operating CartBay.
---

Use these workflows as starting points for AI agents, MCP clients, and automation systems.

## Read-Only Health Check

Recommended permissions: `read` scope or `cartbay_agent_read` capability.

Workflow:

1. Read the agent manifest.
2. Read analytics for 7, 30, and 90 days.
3. List recent sessions with masked PII.
4. Identify high failed-email counts, low restore rates, or many pending notifications.
5. Report findings without modifying settings.

Safe output:

- Session IDs.
- Status counts.
- Recovery rates.
- Notification status counts.
- Recommendations that require human approval.

Avoid outputting raw customer emails unless sensitive access is explicitly enabled and required.

## Email Failure Diagnosis

Recommended permissions: `read`; optionally sensitive access for trusted support workflows.

Workflow:

1. Read notification-heavy sessions.
2. Identify failed and retry-queued notifications.
3. Inspect error fields and lifecycle timestamps.
4. Check whether Action Scheduler queues are delayed.
5. Recommend SMTP/ESP verification if WordPress mail failures appear.

Do not resend emails automatically unless contact actions are enabled and the store owner approves.

## Campaign Review

Recommended permissions: `read`; `write` only for approved changes.

Workflow:

1. Read current campaign settings.
2. Compare Email 1, 2, and 3 timings with defaults.
3. Check coupon-enabled steps against offer settings.
4. Read analytics by sequence step.
5. Recommend changes such as delaying a step or moving coupons later.
6. Apply changes only when `Agent Write Actions` is enabled and approval is explicit.

## Controlled Send Action

Recommended permissions: `contact` plus read access.

Workflow:

1. Read target session.
2. Confirm it is a CartBay session and currently abandoned.
3. Confirm email is not suppressed.
4. Confirm no recovered order exists.
5. Run `send_email_step_now` only for the intended step.
6. Re-read session notifications and audit log.

## Cleanup Workflow

Recommended permissions: destructive access only for trusted admin automation.

Workflow:

1. List sessions older than the retention policy or clearly test-only sessions.
2. Present candidate session IDs and reasons.
3. Require explicit approval.
4. Use `expire_session` before `delete_session` when possible.
5. Confirm logs and analytics after completion.

:::danger
Agents should never bulk-delete sessions without an explicit, human-reviewed list of session IDs.
:::

## MCP Workflow

For WordPress MCP Adapter users:

1. Create a dedicated WordPress user with least-privilege CartBay capabilities.
2. Use Application Passwords for the MCP client.
3. Enable Abilities Access.
4. Enable MCP Public Exposure only for the dedicated user/workflow.
5. Keep destructive and sensitive gates off unless the workflow requires them.

## Agent Reporting Format

Recommended report fields:

- Time range reviewed.
- Settings gates enabled.
- Capabilities/scopes used.
- Read operations performed.
- Write/contact/destructive operations performed.
- Session IDs touched.
- Warnings and unresolved questions.
- Whether any PII was accessed.
