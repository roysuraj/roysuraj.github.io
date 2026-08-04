import type { ProjectContent } from "../../types";

export default {
  title: "Ionio AI Solutions",
  theme: "dark",
  tags: ["javascript", "node", "postgresql"],
  description: "Ingeniero Móvil Senior. 10/2023 - 01/2024.\nLideró el desarrollo de aplicación SaaS para vendedores de Amazon en e-commerce. Integración de Google ML Kit para Android y AV Foundation para iOS. Construido con Flutter, Node.js y PostgreSQL.",
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
