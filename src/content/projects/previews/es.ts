import type { ProjectPreview } from "../../types";

export default [
  { title: "X-lent Tea", slug: "cubewar", thumbnail: "/images/xlenttea.png", description: "Aplicación de comercio electrónico de té" },
  { title: "Optique", slug: "cloudcraftz", thumbnail: "/images/optique.svg", description: "Gestión escolar y aprendizaje" },
  { title: "Afterbell", slug: "quibbo", thumbnail: "/images/afterbell.png", description: "Seguimiento del aprendizaje infantil" },
  { title: "Sonics Music Station", slug: "sharkie", thumbnail: "/images/sonics.png", description: "Aplicación de música y radio" },
  { title: "QOMIX", slug: "pokedex", thumbnail: "/images/qomix.svg", description: "Experiencia web" },
] as const satisfies ProjectPreview[];
