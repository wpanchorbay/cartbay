---
title: License Activation
description: Activate a CartBay license key, learn where to find it, and understand license checks, dev domains, and support options.
---

CartBay uses a WPAnchorBay license key for private updates and support checks. Activate the license after installing the plugin and before relying on update delivery.

## Where to Find Your License Key

Most users receive the license key in the purchase confirmation email after buying CartBay.

You can also retrieve your license key by logging in to your WPAnchorBay account dashboard at [wpanchorbay.com](https://wpanchorbay.com/).

If you cannot find your key or need account help, contact WPAnchorBay support at [support@wpanchorbay.com](mailto:support@wpanchorbay.com).

## Where to Activate

Open `WooCommerce > CartBay > Settings`.

Find the `License & Updates` area and use `Activate New Key`.

## Activate the Key

1. Copy your license key from the purchase email or WPAnchorBay dashboard.
2. Paste it into `Activate New Key`.
3. Save or activate the settings.
4. Confirm the license status updates.

Expected key format:

```text
WPAB-XXXXXXXXXXXX-XXXXXXXXXXXX
```

## License Statuses

| Status | Meaning |
|---|---|
| Active | The license server accepted the key. |
| Inactive | No active license state is stored locally. |
| Expired | The license server reported an expired license. |
| Invalid | The stored key was rejected. |
| Dev Mode | Development-domain bypass is active. |
| Server Error | The license server was unreachable. Runtime recovery features continue. |

## Development and Staging Domains

CartBay recognizes development domains such as `localhost`, `.local`, `.dev`, `.test`, and staging domains. These can be treated as valid locally without consuming production activation slots.

## Check Current License

Use `Check Current License` in Settings after renewal, domain changes, or support troubleshooting.

## Remove License

Use `Remove License` only when disconnecting the site from licensed update checks or replacing the key.

Removing the local license does not stop capture, recovery emails, restore links, or analytics. It disconnects private updates and support checks until a new key is activated.

## License Server Outages

If the license server is temporarily unreachable, CartBay does not lock the store. Runtime flows fail open so checkout capture, email sending, and restore behavior continue.

## Need Help?

Contact [support@wpanchorbay.com](mailto:support@wpanchorbay.com) for license, account, purchase, or activation support.
