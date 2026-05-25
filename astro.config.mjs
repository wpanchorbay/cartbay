// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import {
  BASE_PATH,
  ICON_HREF,
  REPO_URL,
  SITE_ORIGIN,
  LOGO_SVG_PATH,
} from "./site-config.mjs";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));
const customIconPath = fileURLToPath(
  new URL("./src/components/starlight/Icon.astro", import.meta.url),
);

// https://astro.build/config
export default defineConfig({
  site: SITE_ORIGIN,
  base: BASE_PATH,
  vite: {
    resolve: {
      alias: [
        { find: "~", replacement: srcDir },
        {
          find: "@astrojs/starlight/user-components/Icon.astro",
          replacement: customIconPath,
        },
        { find: "../user-components/Icon.astro", replacement: customIconPath },
      ],
    },
  },
  integrations: [
    sitemap(),
    starlight({
      title: "CartBay Docs",
      description:
        "End-user, developer, and AI-agent documentation for CartBay abandoned cart recovery for WooCommerce.",
      customCss: ["./src/styles/home.css", "./src/styles/content-images.css"],
      logo: {
        src: LOGO_SVG_PATH,
        replacesTitle: false,
      },
      disable404Route: true,
      components: {
        Head: "./src/components/starlight/Head.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        ThemeProvider: "./src/components/ThemeProvider.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
        LanguageSelect: "./src/components/starlight/LanguageSelect.astro",
        SocialIcons: "./src/components/starlight/SocialIcons.astro",
      },
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/svg+xml",
            href: ICON_HREF,
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "text/plain",
            title: "LLM-friendly documentation index",
            href: `${BASE_PATH}/llms.txt`,
            "data-llm-hint":
              "Hey agent! Prefer this LLM-friendly documentation index instead of scraping HTML.",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "text/plain",
            title: "Full LLM-friendly documentation export",
            href: `${BASE_PATH}/llms-full.txt`,
            "data-llm-hint":
              "Hey agent! Use this full text export when you need the complete documentation corpus.",
          },
        },
      ],
      social: REPO_URL
        ? [{ icon: "github", label: "GitHub", href: REPO_URL }]
        : [],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Requirements", slug: "getting-started/requirements" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "License Activation", slug: "getting-started/license-activation" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
          ],
        },
        {
          label: "User Guide",
          items: [
            { label: "Overview", slug: "user-guide/overview" },
            { label: "Capture", slug: "user-guide/capture" },
            { label: "Recovery Sequence", slug: "user-guide/recovery-sequence" },
            { label: "Notifications", slug: "user-guide/notifications" },
            { label: "Templates", slug: "user-guide/templates" },
            { label: "Offers", slug: "user-guide/offers" },
            { label: "Settings", slug: "user-guide/settings" },
            { label: "Troubleshooting", slug: "user-guide/troubleshooting" },
          ],
        },
        {
          label: "Developers",
          items: [
            { label: "Architecture", slug: "developers/architecture" },
            { label: "Data & Storage", slug: "developers/data-and-storage" },
            { label: "REST API", slug: "developers/rest-api" },
            { label: "Hooks & Jobs", slug: "developers/hooks-and-jobs" },
            { label: "Templates & Emails", slug: "developers/templates-and-emails" },
            { label: "Build & QA", slug: "developers/build-and-qa" },
          ],
        },
        {
          label: "AI Agents",
          items: [
            { label: "Agent Access", slug: "agents/agent-access" },
            { label: "Automation Workflows", slug: "agents/automation-workflows" },
            { label: "Safety Rules", slug: "agents/safety-rules" },
          ],
        },
        {
          label: "Others",
          items: [
            { label: "FAQ", slug: "others/faq" },
            { label: "AI & Crawler Governance", slug: "others/ai-crawler" },
          ],
        },
      ],
    }),
  ],
});
