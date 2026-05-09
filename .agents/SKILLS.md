# AI Agent Skills & Guidelines: Documentation Boilerplate

This document provides instructions for AI Agents working with projects based on this Documentation Boilerplate. When an agent is instantiated in a project that uses this template, it should adhere to these guidelines to maintain consistency, quality, and functionality.

## Core Architecture

This project is built using [Astro Starlight](https://starlight.astro.build/). It uses a combination of static site generation, custom components, and highly refined CSS for a premium user experience (including a heavily customized dark mode).

### Key Files and Directories

*   **`site-config.mjs`**: Contains global site variables (`SITE_ORIGIN`, `BASE_PATH`, `REPO_URL`). Modify these to match the target deployment environment.
*   **`astro.config.mjs`**: The main Astro and Starlight configuration. This is where you configure the `sidebar` navigation, `title`, `description`, and custom components.
*   **`src/content/docs/`**: The root directory for all Markdown (`.md`) and MDX (`.mdx`) content.
*   **`src/styles/home.css`**: The core stylesheet containing custom typography, color palettes, and dark mode overrides. **Do not overwrite this file lightly**; add to it only if necessary and ensure dark mode compatibility (`:root[data-theme='dark']`).
*   **`src/components/`**: Contains customized Starlight components (e.g., `SiteTitle.astro`, `ThemeProvider.astro`). When creating new UI elements, leverage these or match their aesthetic.
*   **`.github/workflows/deploy.yml`**: The CI/CD pipeline. It is pre-configured to use `pnpm` (v10.x/v11.x) and Node.js (v24.x) to deploy to GitHub Pages.

## Agent Workflow: Initializing a New Project

When instructed to use this boilerplate for a *new* documentation project, follow these steps:

1.  **Project Naming:** Update the `"name"` field in `package.json`.
2.  **Configuration:** 
    *   Update `site-config.mjs` with the correct `SITE_ORIGIN` (e.g., `https://docs.myproject.com`) and `REPO_URL`.
    *   Update `astro.config.mjs` to reflect the new project's `title` and `description`.
3.  **Navigation Setup:** Plan the documentation structure and update the `sidebar` array in `astro.config.mjs`.
4.  **Homepage Content:** Modify `src/content/docs/index.mdx` to reflect the new project's branding, features, and quick links.
5.  **Branding:** Replace the placeholder logos in `public/assets/` and `src/assets/` with the project's actual logo assets (ensure they look good in both light and dark modes).

## Agent Workflow: Adding Content

When creating or editing documentation pages:

1.  **Format:** Use standard Markdown (`.md`) or MDX (`.mdx`).
2.  **Frontmatter:** Every page MUST have a frontmatter block containing at least a `title` and `description`.
    ```markdown
    ---
    title: Your Page Title
    description: A brief summary of this page's content for SEO.
    ---
    ```
3.  **Starlight Components:** Utilize Starlight's built-in components (like `<Card>`, `<CardGrid>`, and `<Tabs>`) within MDX files to create rich, engaging layouts.
4.  **Callouts/Asides:** Use the custom Starlight markdown syntax for callouts (`:::tip`, `:::note`, `:::caution`, `:::danger`) to highlight important information.
5.  **Code Blocks:** Ensure all code blocks have the correct syntax highlighting language specified (e.g., ````javascript`).

## Styling and Aesthetic Rules

*   **Premium Feel:** The boilerplate is designed to feel premium. Maintain this by using structured content, clear headings, and avoiding large, unbroken walls of text.
*   **Dark Mode First:** Always verify that any new CSS or UI elements look excellent in dark mode. The project relies on specific HSL color variables and filters defined in `src/styles/home.css`.
*   **No Tailwind:** This boilerplate relies on standard CSS/PostCSS. Do not attempt to introduce Tailwind CSS or utility classes unless explicitly instructed by the user.

## CI/CD and Dependency Rules

*   **Package Manager:** Always use `pnpm` for managing dependencies (`pnpm install`, `pnpm run build`). Do not use `npm` or `yarn`.
*   **Lockfile:** Respect `pnpm-lock.yaml`.
*   **GitHub Actions:** The `deploy.yml` workflow is specifically tuned for GitHub Pages using the `actions/deploy-pages` action. If the user wants to deploy elsewhere (e.g., Vercel, Netlify), you will need to replace this workflow.

## General AI Instructions

*   If you are unsure about a design decision, reference `src/styles/home.css` to understand the established design language.
*   When editing configurations, ensure you maintain valid JavaScript/JSON syntax.
*   Always test builds locally using `pnpm run build` if you have made significant structural changes.
