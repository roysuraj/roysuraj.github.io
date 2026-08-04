import type { ProjectContent } from "../../types";

export default {
  title: "Distarise",
  theme: "dark",
  tags: ["javascript"],
  description: "Desarrollador Flutter. 01/2021 - 07/2021.\nDesarrollo de código eficiente y de alta calidad para aplicaciones móviles Flutter.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/sonics.png",
        alt: "Distarise",
        caption: "Distarise",
      },
    },
  ],
} as const satisfies ProjectContent;
