import type { ProjectContent } from "../../types";

export default {
  title: "Cloudcraftz Solutions",
  theme: "dark",
  tags: ["javascript", "node", "react"],
  description: "Ingénieur en Développement Logiciel. 05/2022 - 11/2023.\nProjets chez CloudCraftz incluant OptiqueSutra School (Flutter & Firebase). Java, TypeScript, Python et modèles OpenAI.",
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
