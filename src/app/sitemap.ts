import type { MetadataRoute } from "next";
import { PROJECTS_INDEX_PATH, projectPath, projects } from "@/data/projects";
import { siteOrigin } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();

  return [
    {
      url: `${origin}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl(PROJECTS_INDEX_PATH),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(projectPath(project.id)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
