---
title: Capture
description: Configure checkout capture, consent text, consent defaults, and abandonment timing for CartBay recovery sessions.
---

The Capture section controls how CartBay starts the abandoned-cart recovery lifecycle. It determines whether CartBay can collect consented checkout email and cart data, what consent text shoppers see, whether the checkbox starts checked or unchecked, and how long CartBay waits before treating an inactive cart as abandoned.

## Where to Find It

Open `WooCommerce > CartBay > Capture` or `WooCommerce > Settings > Cart > Capture`.

## Purpose

CartBay uses this section to decide when a checkout visitor becomes a recoverable cart session. Capture must work before CartBay can mark carts abandoned, send recovery emails, restore carts, or report recovery revenue.

CartBay captures a recovery session when all of these are true:

- Capture is enabled.
- The shopper is on checkout, not the order-received page.
- A valid email address is available.
- The recovery consent checkbox is checked.
- The email is not suppressed by a previous unsubscribe.

Both classic checkout and WooCommerce Block Checkout use the same public endpoint: `POST /wp-json/cartbay/v1/capture`.

## Enable Capture

`Enable Capture` turns checkout cart capture on or off for both supported checkout types.

Default: enabled.

When enabled:

- CartBay loads the classic checkout capture script on eligible checkout pages.
- CartBay registers the Block Checkout consent field when WooCommerce Blocks checkout is used.
- Consented capture requests are accepted by the REST route and the capture service.
- CartBay can create or update order-backed recovery sessions.
- New captured sessions can later become abandoned and enter the recovery sequence.

When disabled:

- Classic checkout capture script is not loaded.
- Block Checkout consent field registration is skipped.
- New consented capture requests are ignored by the REST route and service layer.
- Existing sessions, already scheduled emails, restore links, reports, and logs remain available.

Use this setting to pause new abandoned-cart tracking without deleting existing CartBay data.

:::note
Disabling capture does not automatically cancel recovery emails that were already scheduled for existing abandoned sessions.
:::

## Consent Text

`Consent Text` is the message shown next to the recovery consent checkbox at checkout.

Default:

```text
Save my email to recover my cart if I leave.
```

Where it appears:

- Classic checkout: near the billing email field.
- Block Checkout: in the contact section as the `cartbay/marketing-consent` additional checkout field.

Why it matters:

- It explains why CartBay is saving the shopper's email and cart data.
- It helps set shopper expectations before recovery emails are sent.
- It should align with the store's privacy policy and marketing consent requirements.

What happens when you change it:

- New checkout page loads show the updated consent text.
- New captured sessions store the current consent text as part of consent context.
- Existing captured sessions keep the consent metadata already stored at capture time.

Good examples:

```text
Save my email to recover my cart if I leave.
```

```text
Email me a reminder if I do not finish checkout.
```

Avoid vague copy such as `Keep me updated` because it does not clearly explain abandoned-cart recovery messaging.

:::caution
Consent rules vary by region. Confirm the wording and default checkbox state with the store owner's legal or privacy process before launch.
:::

## Consent Checkbox Default State

`Consent Checkbox Default State` controls whether the checkout consent checkbox starts checked or unchecked.

Default: checked.

Options:

| Option | Meaning | Capture behavior |
|---|---|---|
| Checked | The checkbox is selected when checkout loads. | CartBay can capture after a valid email appears unless the shopper unchecks it. |
| Unchecked | The checkbox is empty when checkout loads. | CartBay does not capture until the shopper actively checks it. |

Shoppers can change the checkbox either way. CartBay only captures while consent is checked.

If a shopper unchecks consent after a session was captured, CartBay treats that as consent withdrawal. It finds the active captured or abandoned session, cancels pending abandonment checks and recovery email jobs for that session, deletes the session order, and stops future recovery for that withdrawn capture.

## Abandonment Timeout (minutes)

`Abandonment Timeout` is the number of minutes CartBay waits after the shopper's last captured checkout activity before marking the cart abandoned.

Default: `30` minutes.

Allowed range: `5` to `1440` minutes.

Recommended starting values:

| Store type | Suggested timeout |
|---|---:|
| Standard retail | 30 minutes |
| Fast checkout or low-ticket products | 15 to 30 minutes |
| High-consideration products | 45 to 60 minutes |
| B2B or quote-like checkout | 60 minutes or more |

How it affects recovery timing:

- The cart is first captured as `wc-cartbay-captured`.
- CartBay schedules an exact abandonment check for the configured timeout.
- A fallback scanner also checks inactive captured sessions every 5 minutes.
- When the timeout is reached, the session becomes `wc-cartbay-abandoned`.
- Recovery email delays are counted after abandonment, not after the first checkout visit.

Example: if Abandonment Timeout is `30` minutes and Email 1 is scheduled `45` minutes after abandonment, the first email is sent about `75` minutes after the shopper's last captured activity.

## Classic Checkout Behavior

On classic checkout, CartBay:

- Inserts the consent checkbox near the billing email field.
- Watches billing email changes.
- Debounces capture requests to avoid posting on every keystroke.
- Stores `cartbay_session_id` in browser `sessionStorage` so later updates can target the same session.
- Captures a prefilled billing email when consent is checked.
- Skips initial prefilled-email capture for checkouts already tied to a restored CartBay session.
- Sends `source: classic` to the capture endpoint.

## Block Checkout Behavior

On Block Checkout, CartBay:

- Registers a WooCommerce additional checkout field with ID `cartbay/marketing-consent` in the contact location.
- Applies the configured default checked state.
- Finds the contact email input and consent checkbox in the checkout block DOM.
- Reads Store API cart data when available.
- Stores `cartbay_session_id` in browser `sessionStorage`.
- Sends `source: block` to the capture endpoint.

## Stored Session Behavior

Each captured cart is stored as a WooCommerce order-backed session with status `wc-cartbay-captured`. CartBay stores email hash, consent metadata, source, cart total, currency, cart snapshot, cart fingerprint, item count, timestamps, and event history.

One shopper email can have multiple active CartBay sessions when the carts are materially different. Cart identity is based on the CartBay session ID and cart fingerprint, not email alone.

## Rate Limiting

The capture endpoint is public because checkout visitors are not necessarily logged in. CartBay protects it with validation and IP-based transient rate limiting.

Default public limit:

```text
10 requests per 600 seconds per endpoint and IP address
```

The transient key shape is `cartbay_rl_capture_{md5(REMOTE_ADDR)}`.

## Troubleshooting Capture

| Symptom | Check |
|---|---|
| Consent checkbox missing | Confirm Capture is enabled and the page is checkout, not order received. |
| Block Checkout consent missing | Confirm WooCommerce Blocks checkout is active and WooCommerce initialized the additional field. |
| Sessions are not created | Confirm a valid email is entered, consent is checked, and the email is not suppressed. |
| Sessions disappear | Confirm the shopper did not withdraw consent by unchecking the box. |
| Capture is delayed | The frontend intentionally debounces capture requests. |
| Repeated `429` responses | The IP exceeded the public endpoint rate limit. |

## Best Practices

- Configure Capture before editing recovery emails.
- Use a short, privacy-reviewed consent sentence.
- Choose the checkbox default based on the store's compliance requirements.
- Start with a 30-minute abandonment timeout unless the store has a clear reason to change it.
- Test both classic checkout and Block Checkout if the store supports both.
