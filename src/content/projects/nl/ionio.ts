import type { ProjectContent } from "../../types";

export default {
  title: "Ionio AI Solutions",
  theme: "dark",
  tags: ["javascript", "node", "postgresql"],
  description: "Senior Mobile Engineer. 10/2023 - 01/2024.\nLeiding gegeven aan de ontwikkeling van een SaaS-applicatie voor Amazon-verkopers in de e-commerce sector. Het platform beschikte over geavanceerde streepjescode-scanningsmogelijkheden. Integratie van Google ML Kit voor Android en AV Foundation voor iOS. Ontwikkeld met Flutter, Node.js, PostgreSQL en CI/CD voor cloud-implementaties.",
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
