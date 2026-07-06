---
title: Email Delivery Setup
description: Configure reliable WordPress email delivery for CartBay using SMTP or ESP-native plugins, SPF, DKIM, DMARC, and delivery testing.
---

CartBay hands every recovery email to WordPress and WooCommerce for delivery — it does not send email itself. If sending is unreliable, the fix is your site's mail setup, not CartBay. This page walks through choosing a delivery plugin, setting it up, authenticating your domain, and confirming that delivery actually works.

:::tip
If you already have an SMTP plugin installed, you can skip this step.
:::

## 1. How CartBay Sends Email

CartBay schedules and triggers recovery emails, but every send goes through `wp_mail()` — the same WordPress function WooCommerce uses for order confirmations, and the same function every other plugin on the site uses.

By default, `wp_mail()` falls back to PHP's built-in `mail()` function. On most shared hosting, PHP `mail()` sends unauthenticated messages that receiving mail servers routinely spam-filter, throttle, or reject outright. This is not a CartBay-specific problem — it affects every transactional email a WordPress or WooCommerce site sends, including order emails and password resets.

The fix is the same one WooCommerce stores have always needed: connect WordPress to an authenticated mail transport instead of relying on PHP `mail()`.


## 2. Two Ways to Get Reliable Delivery

| Approach | How it works |
|---|---|
| SMTP plugin | Replaces PHP `mail()` with an authenticated SMTP or API connection to a mail relay. Enter a host, port, and credentials (or an API key) once, and every WordPress email — including CartBay's — routes through it. |
| ESP-native plugin | A transactional email provider's own WordPress plugin (Mailgun, SendGrid, Postmark, Brevo, Amazon SES, and others each publish one). It connects directly to that provider's API instead of generic SMTP, and is usually simpler to set up if you have already chosen that provider. |

Both approaches solve the same problem: give WordPress an authenticated way to hand off mail. Neither is inherently better — pick whichever matches a provider you already use or want to use.

## 3. Compare Supported Delivery Plugins

CartBay's built-in mail environment detector recognizes the plugins below and treats an active match as high-confidence evidence that reliable delivery is configured. This is the same detection shown in the [Setup Wizard](/cartbay/getting-started/setup-wizard/)'s Email Delivery step and on the [Notifications](/cartbay/user-guide/notifications/) page.

<!-- keep in sync with MailEnvironmentDetector::get_delivery_plugins() -->
| Plugin | Type | WordPress.org |
|---|---|---|
| WP Mail SMTP | SMTP plugin | [wp-mail-smtp](https://wordpress.org/plugins/wp-mail-smtp/) |
| Postman SMTP | SMTP plugin | [postman-smtp](https://wordpress.org/plugins/postman-smtp/) |
| Post SMTP | SMTP plugin | [post-smtp](https://wordpress.org/plugins/post-smtp/) |
| Easy WP SMTP | SMTP plugin | [easy-wp-smtp](https://wordpress.org/plugins/easy-wp-smtp/) |
| FluentSMTP | SMTP plugin | [fluent-smtp](https://wordpress.org/plugins/fluent-smtp/) |
| SMTP Mailer | SMTP plugin | [smtp-mailer](https://wordpress.org/plugins/smtp-mailer/) |
| WP SMTP | SMTP plugin | [wp-smtp](https://wordpress.org/plugins/wp-smtp/) |
| Mailgun | ESP-native plugin | [mailgun](https://wordpress.org/plugins/mailgun/) |
| SendGrid | ESP-native plugin | [sendgrid-email-delivery-simplified](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/) |
| Postmark | ESP-native plugin | [postmark-approved-wordpress-plugin](https://wordpress.org/plugins/postmark-approved-wordpress-plugin/) |
| Brevo | ESP-native plugin | [mailin](https://wordpress.org/plugins/mailin/) |
| WP Offload SES | ESP-native plugin (Amazon SES) | [wp-offload-ses](https://wordpress.org/plugins/wp-offload-ses/) |
| WP SES | ESP-native plugin (Amazon SES) | [wp-ses](https://wordpress.org/plugins/wp-ses/) |
| SparkPost | ESP-native plugin | [sparkpost](https://wordpress.org/plugins/sparkpost/) |

This list covers what CartBay can identify by name, not every plugin that works — any other SMTP plugin or transactional email service can deliver CartBay's recovery emails just as reliably.

## 4. Set Up an SMTP Plugin

Setting up any SMTP plugin generally follows the same pattern:

1. Install and activate the plugin.
2. Choose a mailer or connection type inside the plugin (most support plain SMTP plus several providers' APIs).
3. Enter the host, port, encryption, username, and password your mail provider or host gives you — or an API key, if the plugin connects that way.
4. Send a test email from the plugin's own test tool, then confirm again with CartBay's **Send Test Email** (see below).

### WP Mail SMTP

[WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) is one of the most widely used SMTP plugins for WordPress. After activating it, run its setup wizard, choose a mailer, and enter the credentials or API key for your chosen provider. It includes its own delivery test tool in addition to CartBay's.

### FluentSMTP

[FluentSMTP](https://wordpress.org/plugins/fluent-smtp/) can manage multiple mail connections at once. Add a connection, choose your provider or plain SMTP, and enter the host, port, credentials, or API key. It also keeps its own delivery log.

### Post SMTP

[Post SMTP](https://wordpress.org/plugins/post-smtp/) sets up an authenticated SMTP or OAuth connection for WordPress mail. Run its onboarding wizard, choose your provider, and authorize or enter credentials. Post SMTP keeps a delivery log you can cross-reference with CartBay's [Notifications](/cartbay/user-guide/notifications/) page.

### Easy WP SMTP

[Easy WP SMTP](https://wordpress.org/plugins/easy-wp-smtp/) provides a simplified setup wizard. Choose a mailer, enter your provider's credentials or API key, and send a test email from its own dashboard.

## 5. Set Up an ESP-Native Plugin

Setting up a provider's native plugin generally follows the same pattern:

1. Sign up for the provider's transactional email service and verify your sending domain.
2. Generate an API key or SMTP credentials from the provider's dashboard.
3. Install and activate the provider's official WordPress plugin.
4. Enter the API key or credentials in the plugin's settings to connect it.

### Brevo

Brevo (formerly Sendinblue) connects through its [WordPress plugin](https://wordpress.org/plugins/mailin/). Sign up for a Brevo account, generate an API key, install the plugin, and connect it using that key.

### Mailgun

[Mailgun](https://wordpress.org/plugins/mailgun/)'s official plugin connects WordPress directly to your Mailgun domain. Sign up, verify your sending domain, install the plugin, and enter your API key and domain.

### SendGrid

[SendGrid](https://wordpress.org/plugins/sendgrid-email-delivery-simplified/)'s plugin sends WordPress mail through the SendGrid API. Create an account, generate an API key, install the plugin, and enter the key in its settings.

### Postmark

[Postmark](https://wordpress.org/plugins/postmark-approved-wordpress-plugin/)'s official plugin routes WordPress mail through Postmark. Sign up, verify your sending domain, generate an API token, install the plugin, and connect it with that token.

### Amazon SES

There is no single official Amazon SES plugin — connect through [WP Offload SES](https://wordpress.org/plugins/wp-offload-ses/) or [WP SES](https://wordpress.org/plugins/wp-ses/) instead. Both send WordPress mail through your Amazon SES account: create an AWS account, verify your sending domain in SES, request production sending access, generate IAM credentials, then install and connect one of these plugins using those credentials.

Any other SMTP or ESP plugin not listed above works the same way: authenticate WordPress with the provider, then confirm delivery with a test email.

## 6. Configure SPF, DKIM, and DMARC

Domain authentication records tell receiving mail servers that your outgoing mail is legitimate. They matter for inbox placement no matter which SMTP or ESP plugin you use.

| Record | Purpose |
|---|---|
| SPF (Sender Policy Framework) | Lists which servers are allowed to send email for your domain. Receiving servers check the sending server's address against this list. |
| DKIM (DomainKeys Identified Mail) | Adds a cryptographic signature to outgoing messages, verified against a public key published in your DNS. Confirms the message was not altered in transit and really came from your domain. |
| DMARC (Domain-based Message Authentication, Reporting and Conformance) | A DNS policy that tells receiving servers what to do when SPF or DKIM checks fail, and where to send failure reports. |

Mailbox providers increasingly filter or reject unauthenticated mail straight to spam, so configuring all three materially improves whether recovery emails reach the inbox.

These are DNS records, so you add them at your domain's DNS provider — your registrar or hosting control panel, wherever you manage DNS for your store's domain. Your SMTP plugin or ESP dashboard will show the exact record values to add. Use the values your provider gives you rather than reusing values from a different service; they are provider-specific.

## 7. Verify Email Delivery Works

CartBay includes a built-in **Send Test Email** tool that checks whether `wp_mail()` can actually deliver on this specific site, without needing an external tool.

Run it from either place:

- The [Setup Wizard](/cartbay/getting-started/setup-wizard/)'s Email Delivery step, during first-run setup.
- **WooCommerce > CartBay > Notifications**, in the Email Delivery Test section, any time afterward.

To use it:

1. Enter a recipient email address.
2. Click **Send Test Email**.
3. Check the result message next to the button, and check the recipient inbox within a few minutes.

If the test fails, CartBay captures the real underlying error WordPress raised (for example, `SMTP Error: Could not authenticate.`) and shows it in the result message instead of a generic failure notice. Use that specific reason to fix the actual problem — wrong credentials, an unreachable host, a blocked port, or an unverified domain — instead of guessing. See [Notifications](/cartbay/user-guide/notifications/) for the full detection and test-email reference.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Test email fails with an authentication error | Wrong SMTP username/password or API key. | Re-enter the credentials in your SMTP or ESP plugin, then send the test again. |
| Test email fails with a connection or timeout error | Host, port, or encryption setting is wrong, or your host blocks outbound mail ports. | Confirm the settings against your provider's documentation, or ask your host whether outbound SMTP is blocked. |
| Test email succeeds, but recovery emails never arrive | Recovery sequence disabled, Action Scheduler delayed, or the session was canceled. | Check [Recovery Sequence](/cartbay/user-guide/recovery-sequence/) and [Notifications](/cartbay/user-guide/notifications/). |
| Emails arrive in spam | Missing or misaligned SPF, DKIM, or DMARC. | Verify your sending domain and DNS records with your SMTP or ESP provider. |
| "No SMTP plugin detected" warning persists | The detector does not recognize the active plugin, or none is installed. | Install one of the plugins in the comparison table above, or confirm your existing plugin is active. |
| Works on staging, fails on production (or vice versa) | Mail configuration, credentials, or outbound port access differs between environments. | Configure and test the delivery plugin separately in each environment. |

---

## Best Practices

- Set up an SMTP or ESP-native plugin on every environment that sends real recovery email, not just production.
- Configure SPF, DKIM, and DMARC for the domain your recovery emails send from.
- Run CartBay's **Send Test Email** after any hosting, DNS, or delivery plugin change.
- Monitor [Notifications](/cartbay/user-guide/notifications/) for failed and retry-queued emails, not just totals sent.
- Keep SMTP credentials and API keys out of version control, and rotate them if ever exposed.
