import type { ProjectContent } from "../../types";

export default {
  title: "Craftveda Technology",
  theme: "dark",
  tags: ["react", "javascript", "html"],
  description: "Stagiaire en Ingénierie Logicielle. 01/2022 - 03/2022.\nApplication MedTech avec intégration Bluetooth en temps réel pour l'analyse de santé avec React Native.",
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
