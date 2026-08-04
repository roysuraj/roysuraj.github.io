import type { ProjectContent } from "../../types";

export default {
  title: "Craftveda Technology",
  theme: "dark",
  tags: ["react", "javascript", "html"],
  description: "Pasante de Ingeniería de Software. 01/2022 - 03/2022.\nDesarrollo de aplicación MedTech con integración Bluetooth en tiempo real para análisis de salud con React Native y Highcharts JS.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/doodle.png",
        alt: "Craftveda Technology",
        caption: "Craftveda Technology",
      },
    },
  ],
} as const satisfies ProjectContent;
