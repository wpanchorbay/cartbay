---
title: Configuration
description: How to configure the boilerplate for your specific project.
---

After installing the boilerplate, you need to update a few key settings to make it your own.

## `site-config.mjs`

Update the variables in `site-config.mjs` to reflect your target deployment environment:

- `SITE_ORIGIN`: Your main domain (e.g., `https://example.com` or `https://org.github.io`).
- `BASE_PATH`: The sub-path if deploying to a subdirectory (e.g., `/my-project-docs`).
- `REPO_URL`: The URL to your GitHub repository for the "Edit this page" links.

## `astro.config.mjs`

Update the `title` and `description` under the `starlight` integration. You can also modify the `sidebar` array to structure your own pages.

## `package.json`

Remember to change the `"name"` attribute in `package.json` to match your actual project.
