/**
 * Centralized links registry.
 *
 * All hyperlinks and resource URLs used across this project should reference
 * the constants exported from this file rather than being hardcoded inline.
 *
 * Groups:
 *   EXTERNAL_LINKS – third-party / outbound URLs
 *   PAGE_LINKS     – internal page paths (site-relative, includes BASE_PATH)
 *   ASSET_LINKS    – static asset paths   (site-relative, includes BASE_PATH)
 *   FEED_LINKS     – full absolute URLs for machine-readable resources
 *
 * NOTE: YAML frontmatter in .md/.mdx files cannot reference JS expressions,
 * so any link that lives purely in frontmatter remains a plain string there.
 * Those values are annotated with a comment referencing the matching constant
 * so they stay easy to find and update in lock-step.
 */

import {
  BASE_PATH,
  ICON_HREF,
  OG_IMAGE_HREF,
  REPO_URL,
  WPANCHORBAY_URL,
  WPANCHORBAY_PROJECT_LANDING_URL,
  buildAbsoluteUrl,
} from "../../site-config.mjs";

// ---------------------------------------------------------------------------
// External (third-party) URLs
// ---------------------------------------------------------------------------

export const EXTERNAL_LINKS = {
  /** WPAnchorBay main website */
  wpAnchorBay: WPANCHORBAY_URL,

  /** Project-specific WPAnchorBay landing page */
  wpAnchorBayProjectLanding: WPANCHORBAY_PROJECT_LANDING_URL,

  /** GitHub repository for this documentation project */
  githubRepo: REPO_URL,

  /** Astro framework website */
  astro: "https://astro.build/",

  /** Starlight official getting-started guide */
  starlightGettingStarted: "https://starlight.astro.build/getting-started/",

  /** WooCommerce documentation */
  woocommerce: "https://woocommerce.com/documentation/woocommerce/",

  /** Action Scheduler documentation */
  actionScheduler: "https://actionscheduler.org/",
} as const;

// ---------------------------------------------------------------------------
// Internal page paths  (site-relative; include the base path)
// ---------------------------------------------------------------------------

export const PAGE_LINKS = {
  /** Documentation home */
  home: `${BASE_PATH}/`,

  /** Getting Started – Introduction */
  introduction: `${BASE_PATH}/getting-started/introduction/`,

  /** Getting Started – Requirements */
  requirements: `${BASE_PATH}/getting-started/requirements/`,

  /** Getting Started – Installation */
  installation: `${BASE_PATH}/getting-started/installation/`,

  /** Getting Started – License Activation */
  licenseActivation: `${BASE_PATH}/getting-started/license-activation/`,

  /** Quick Start */
  quickStart: `${BASE_PATH}/getting-started/quick-start/`,

  /** CartBay Overview admin section */
  cartbayOverview: `${BASE_PATH}/user-guide/overview/`,

  /** Capture */
  capture: `${BASE_PATH}/user-guide/capture/`,

  /** Recovery Sequence */
  recoverySequence: `${BASE_PATH}/user-guide/recovery-sequence/`,

  /** Notifications */
  notifications: `${BASE_PATH}/user-guide/notifications/`,

  /** Templates */
  templates: `${BASE_PATH}/user-guide/templates/`,

  /** Offers */
  offers: `${BASE_PATH}/user-guide/offers/`,

  /** Settings */
  settings: `${BASE_PATH}/user-guide/settings/`,

  /** Troubleshooting */
  troubleshooting: `${BASE_PATH}/user-guide/troubleshooting/`,

  /** Developer Architecture */
  developerArchitecture: `${BASE_PATH}/developers/architecture/`,

  /** Agent Access */
  agentAccess: `${BASE_PATH}/agents/agent-access/`,
} as const;

// ---------------------------------------------------------------------------
// Static asset paths (site-relative; include the base path)
// ---------------------------------------------------------------------------

export const ASSET_LINKS = {
  /** Site favicon and navbar logo icon (SVG) */
  icon: ICON_HREF,

  /** OpenGraph share image (PNG) */
  ogImage: OG_IMAGE_HREF,
} as const;

// ---------------------------------------------------------------------------
// Machine-readable / feed resources (full absolute URLs)
// ---------------------------------------------------------------------------

export const FEED_LINKS = {
  /** Canonical root URL */
  canonical: buildAbsoluteUrl("/"),

  /** Absolute URL of the OpenGraph share image */
  ogImage: buildAbsoluteUrl("/assets/WPAnchorBay-Documentation-OG.png"),

  /** XML sitemap index */
  sitemap: buildAbsoluteUrl("/sitemap-index.xml"),

  /** LLM-friendly documentation index */
  llms: buildAbsoluteUrl("/llms.txt"),

  /** LLM-friendly full documentation */
  llmsFull: buildAbsoluteUrl("/llms-full.txt"),

  /** MCP server documentation page */
  mcpDocs: buildAbsoluteUrl("/agents/agent-access/"),
} as const;
