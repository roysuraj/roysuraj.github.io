import type { ProjectPreview } from "../../types";

export default [
  { title: "X-lent Tea", slug: "cubewar", thumbnail: "/images/xlenttea.png", description: "Tea ecommerce app" },
  { title: "Afterbell", slug: "quibbo", thumbnail: "/images/afterbell.png", description: "Learning progress tracker" },
  { title: "Sonics Music Station", slug: "sharkie", thumbnail: "/images/sonics.png", description: "Music and radio app" },
  { title: "QOMIX", slug: "pokedex", thumbnail: "/images/qomix.svg", description: "Web experience" },
] as const satisfies ProjectPreview[];
