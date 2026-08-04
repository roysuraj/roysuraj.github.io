import type { ProjectContent } from "../../types";

export default {
  title: "Cloudcraftz Solutions",
  theme: "dark",
  tags: ["javascript", "node", "react"],
  description: "Ingeniero de Desarrollo de Software. 05/2022 - 11/2023.\nLideró proyectos en CloudCraftz como OptiqueSutra School (Flutter & Firebase). Uso de Java (Micronaut), TypeScript para funciones en la nube, Python y modelos de OpenAI.",
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
