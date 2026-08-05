import type { ProjectPreview } from "../../types";

export default [
  { title: "X-lent Tea", slug: "cubewar", thumbnail: "/images/xlenttea.png", description: "Application e-commerce de thé" },
  { title: "Optique", slug: "cloudcraftz", thumbnail: "/images/optique.svg", description: "Gestion scolaire et apprentissage" },
  { title: "Afterbell", slug: "quibbo", thumbnail: "/images/afterbell.png", description: "Suivi de l'apprentissage des enfants" },
  { title: "Sonics Music Station", slug: "sharkie", thumbnail: "/images/sonics.png", description: "Application de musique et de radio" },
  { title: "QOMIX", slug: "pokedex", thumbnail: "/images/qomix.svg", description: "Expérience web" },
] as const satisfies ProjectPreview[];
