import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { APIRoute, GetStaticPaths } from "astro";

export const prerender = true;

const agentGuides = {
  skills: ".agents/SKILLS.md",
  tasks: ".agents/TASKS.md",
  "content-authoring": ".agents/CONTENT_AUTHORING.md",
} as const;

type AgentGuideSlug = keyof typeof agentGuides;

export const getStaticPaths: GetStaticPaths = () => {
  return Object.keys(agentGuides).map((guide) => ({
    params: { guide },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const guide = params.guide as AgentGuideSlug;
  const relativePath = agentGuides[guide];

  if (!relativePath) {
    return new Response("Not found\n", { status: 404 });
  }

  const filePath = fileURLToPath(new URL(`../../../${relativePath}`, import.meta.url));
  const source = await readFile(filePath, "utf8");

  return new Response(`${source.trim()}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
};
