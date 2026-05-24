# CartBay Docs

Astro Starlight documentation for CartBay abandoned cart recovery for WooCommerce.

This repository contains the public CartBay documentation site, including Getting Started guides, user/admin documentation, developer references, AI-agent guidance, and machine-readable discovery endpoints.

## Documentation Areas

- **Getting Started:** Introduction, requirements, installation, license activation, and quick start.
- **User Guide:** CartBay admin sections for capture, recovery sequence, notifications, templates, offers, settings, and troubleshooting.
- **Developers:** Architecture, storage, REST API, hooks, background jobs, templates, emails, build, and QA references.
- **AI Agents:** Safe automation, protected agent access, and safety rules.
- **Others:** FAQ and crawler/LLM discovery endpoints.

## Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Run the local dev server:
   ```bash
   pnpm dev
   ```
3. Check the docs before committing:
   ```bash
   pnpm run check
   pnpm run build
   ```

## AI and Crawler Endpoints

The site publishes `robots.txt`, `llms.txt`, `llms-full.txt`, per-page Markdown exports under `/markdown/`, and `.well-known/mcp.json` for agent and crawler discovery.

## Troubleshooting

### Linux: File Watcher Limit (`ENOSPC`)

If you encounter an `ENOSPC` error when running `pnpm dev` or `pnpm start` on Linux, it means you've reached the system limit for file watchers. You can increase this limit by running:

```bash
sudo sysctl fs.inotify.max_user_watches=524288 && echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
```

## AI Agent Integration

This project includes an [AI Agent Skills & Guidelines](.agents/SKILLS.md) file to assist AI coding agents in maintaining project standards, consistent styling, and correct deployment procedures when working on this documentation suite.
