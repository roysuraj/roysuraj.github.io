import type { ProjectContent } from "../../types";

export default {
  title: "Afterbell",
  theme: "dark",
  tags: ["javascript", "node", "postgresql"],
  description: "Ingénieur Mobile Senior. 10/2023 - 01/2024.\nDéveloppement d'application SaaS pour les vendeurs Amazon. Intégration de Google ML Kit et AV Foundation avec Flutter, Node.js et PostgreSQL.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/afterbell.png",
        alt: "Ionio App",
        caption: "Ionio App",
      },
    },
  ],
} as const satisfies ProjectContent;
