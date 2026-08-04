import type { ProjectContent } from "../../types";

export default {
  title: "Craftveda Technology",
  theme: "dark",
  tags: ["react", "javascript", "html"],
  description: "Software Engineering Intern. 01/2022 - 03/2022.\nMedTech-applicatie ontwikkeld met real-time Bluetooth-integratie voor vitale gezondheidsmetriekanalyse, gebruikmakend van React Native en Highcharts JS voor intuïtieve gegevensvisualisatie.",
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
