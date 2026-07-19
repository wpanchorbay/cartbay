---
title: License Activation
description: Activate a CartBay Pro license key, learn where to find it, and understand license checks and support options.
---

:::note[CartBay Pro]
License Activation applies to [CartBay Pro](/cartbay/getting-started/license-activation/) <span class="cb-badge cb-badge--pro">Pro</span> only. The free CartBay plugin needs **no license key** — it installs from WordPress.org and updates through WordPress normally. You only need a key if you have purchased and installed the Pro add-on.
:::

CartBay Pro <span class="cb-badge cb-badge--pro">Pro</span> uses a WPAnchorBay license key for private updates and support checks. Activate the license after installing the Pro add-on and before relying on Pro update delivery.

## Where to Find Your License Key

Most users receive the license key in the purchase confirmation email after buying CartBay Pro.

You can also retrieve your CartBay Pro license key by logging in to your WPAnchorBay account dashboard at [wpanchorbay.com](https://wpanchorbay.com/).

If you cannot find your key or need account help, contact WPAnchorBay support at [support@wpanchorbay.com](mailto:support@wpanchorbay.com).

## Where to Activate

Open **WooCommerce > Settings > Cart > Settings**.

Find the **License & Updates** area and use **Activate New Key**.

<img src="/cartbay/assets/screenshots/cartbay-license-activate.png" alt="CartBay License Activation screen" data-lightbox="true" />


## Activate the Key

1. Copy your license key from the purchase email or WPAnchorBay dashboard.
2. Paste it into **Activate New Key**.
3. Go to the bottom of the page and click **Save Changes**.
<img src="/cartbay/assets/screenshots/save-changes.png" alt="Save Changes" style="border:none" data-lightbox="false" />
4. Confirm the license status updates.

Expected key format:

```text
WPAB-XXXXXXXXXXXX-XXXXXXXXXXXX
```

Once activated, you will see the following license states - 

| Label | Value | Description |
--------|-------|--------------
| **Status** | `Active` | Shows the most recent license state returned by CartBay licensing. |
| **Current Key** | `XXXXXXXXXXXXXXXXXXXXXXXXXXXA4C1` | Only a masked version is shown here. The full key stays stored in the protected license option. |
| **Activate New Key** | Input Box | In case of new license activation, reactivate or license update, this field will be used to enter the license key. Then use the `Save Changes` below of the page to save the license key. |
| **Actions** | `Check Current License`, `Remove License` | Use these tools to verify the current license status or remove a stored key from this site. |



<img src="/cartbay/assets/screenshots/cartbay-active-license-status.png" alt="CartBay License Active screen" data-lightbox="true" />


## License Statuses

| Status | Meaning |
|---|---|
| Active | The license server accepted the key. |
| Inactive | No active license state is stored locally. |
| Expired | The license server reported an expired license. |
| Invalid | The stored key was rejected. |
| Server Error | The license server was unreachable. Runtime recovery features continue. |

## Actions



### Check Current License

Use `Check Current License` in Settings after renewal, domain changes, or support troubleshooting.

### Remove License

Use `Remove License` only when disconnecting the site from licensed update checks or replacing the key.

Removing the local license does not stop capture, recovery emails, restore links, or analytics. It disconnects private updates and support checks until a new key is activated.

## License Server Outages

If the license server is temporarily unreachable, CartBay will function normally. CartBay will automatically retry to connect to the server later for license status check and updates. 

## Need Help?

Contact [support@wpanchorbay.com](mailto:support@wpanchorbay.com) for license, account, purchase, or activation support.
