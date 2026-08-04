import type { ProjectPreview } from "../../types";

export default [
  { title: "Inland World Logistics", slug: "inland", thumbnail: "/images/xlenttea.png", description: "Internationale vrachtvervoer & logistiek platform" },
  { title: "Ionio AI Solutions", slug: "ionio", thumbnail: "/images/afterbell.png", description: "Full stack AI & cloud-architectuur" },
  { title: "CloudCraftz Technology", slug: "cloudcraftz", thumbnail: "/images/sonics.png", description: "Enterprise cloud & data-engineering" },
  { title: "CraftVeda Platform", slug: "craftveda", thumbnail: "/images/qomix.svg", description: "Modern digitaal ambachtelijk platform" },
  { title: "Distarise Cloud", slug: "distarise", thumbnail: "/images/xlenttea.png", description: "Schaalbare cloud-oplossingen" },
  { title: "Education & Research", slug: "education", thumbnail: "/images/afterbell.png", description: "Digitaal onderwijs & onderzoeks-apps" },
] as const satisfies ProjectPreview[];
