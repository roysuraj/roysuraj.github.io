import type { ProjectContent } from "../../types";

export default {
  title: "Inland World Logistics",
  theme: "dark",
  tags: ["javascript", "html", "css"],
  description: "Directeur Adjoint - IT. 03/2024 - Présent.\nDirection d'une équipe de 5-6 développeurs sur un projet international de transit de fret. Gestion des lignes maritimes, logistique et livraison.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/xlenttea.png",
        alt: "Inland World Logistics",
        caption: "Inland World Logistics",
      },
    },
  ],
} as const satisfies ProjectContent;
