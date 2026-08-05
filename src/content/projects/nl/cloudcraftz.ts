import type { ProjectContent } from "../../types";

export default {
  title: "Optique",
  theme: "dark",
  tags: ["javascript", "node", "react"],
  description: "Software Development Engineer. 05/2022 - 11/2023.\nGevarieerde projecten geleid bij CloudCraftz, waaronder cross-platform mobiele apps zoals OptiqueSutra School (Flutter & Firebase). Technologieën gebruikt zoals Java (Micronaut), TypeScript voor cloudfuncties, Python (Flask) en GCP. Geavanceerde OpenAI-integratie voor modelgeneratie en GA4-analyse.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/optique.svg",
        alt: "OptiqueSutra School",
        caption: "OptiqueSutra School",
      },
    },
  ],
} as const satisfies ProjectContent;
