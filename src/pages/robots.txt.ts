import type { APIRoute } from "astro";
import { buildAbsoluteUrl } from "../../site-config.mjs";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Sitemap",
    `Sitemap: ${buildAbsoluteUrl("/sitemap-index.xml")}`,
    "",
    "# LLM-friendly content",
    "# These files provide documentation in a format optimized for AI and LLMs",
    `# Discovered at: ${buildAbsoluteUrl("/llms.txt")}`,
  ].join("\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
