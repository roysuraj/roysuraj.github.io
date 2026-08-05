import type { ProjectPreview } from "../../types";

export default [
  { title: "X-lent Tea", slug: "cubewar", thumbnail: "/images/xlenttea.png", description: "Thee e-commerce app" },
  { title: "Optique", slug: "cloudcraftz", thumbnail: "/images/optique.svg", description: "Schoolbeheer en leer-app" },
  { title: "Afterbell", slug: "quibbo", thumbnail: "/images/afterbell.png", description: "Kinder-leer- en voortgangstracker" },
  { title: "Sonics Music Station", slug: "sharkie", thumbnail: "/images/sonics.png", description: "Muziek- en radio-app" },
  { title: "QOMIX", slug: "pokedex", thumbnail: "/images/qomix.svg", description: "Web-ervaring" },
] as const satisfies ProjectPreview[];
