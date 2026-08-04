import type { ProjectContent } from "../../types";

export default {
  title: "Inland World Logistics",
  theme: "dark",
  tags: ["javascript", "html", "css"],
  description: "Subgerente de TI. 03/2024 - Actualidad.\nLiderando equipo de 5-6 ingenieros en proyecto de transporte internacional de mercancías. Gestión de líneas marítimas, logística y entrega de proyectos. Uso de Jira y Slack. Transformación digital e innovación tecnológica.",
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
