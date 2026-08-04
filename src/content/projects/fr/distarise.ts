import type { ProjectContent } from "../../types";

export default {
  title: "Distarise",
  theme: "dark",
  tags: ["javascript"],
  description: "Développeur Flutter. 01/2021 - 07/2021.\nDéveloppement d'applications mobiles Flutter performantes.",
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
