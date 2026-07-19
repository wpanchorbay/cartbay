# Deferred documentation (not built)

Pages here are intentionally **outside** the `src/content/docs` collection, so Astro/Starlight does not
build, list, or export them (they won't appear in the sidebar, `llms.txt`, `llms-full.txt`, the per-page
markdown exports, or the sitemap).

## `agents/` — AI Agent Access (removed for v1.0.0)

The AI Agent Access layer (agent REST endpoints, WordPress Abilities `cartbay/*`, `cartbay_agent_*`
capabilities, bearer tokens, audit log, MCP adapter) **does not ship in CartBay v1.0.0** — it exists in
neither the free plugin nor the Pro add-on. These pages were removed from the published docs on 2026-07-19
to keep the documentation accurate to the shipping product.

To restore them when the feature ships: `git mv _deferred/agents src/content/docs/agents`, re-add the
"AI Agents" group to the `sidebar` in `astro.config.mjs`, restore the `agentAccess` entry in
`src/lib/links.ts`, and re-verify every claim against the shipped code first.
