import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.webp";
import thumbnailQuibbo from "../../../assets/thumbnails/quibbo.webp";
import thumbnailPokedex from "../../../assets/thumbnails/pokedex.webp";
import thumbnailSharkie from "../../../assets/thumbnails/sharkie.webp";

import type { ProjectPreview } from "../../types";

export default [
  { title: "X-lent Tea", slug: "cubewar", thumbnail: thumbnailCubeWar, description: "Tea ecommerce app" },
  { title: "Afterbell", slug: "quibbo", thumbnail: thumbnailQuibbo, description: "Learning progress tracker" },
  { title: "Sonics Music Station", slug: "sharkie", thumbnail: thumbnailSharkie, description: "Music and radio app" },
  { title: "QOMIX", slug: "pokedex", thumbnail: thumbnailPokedex, description: "Web experience" },
] as const satisfies ProjectPreview[];
