import type { ProjectContent } from "../../types";

export default {
  title: "Ionio",
  theme: "dark",
  tags: ["javascript", "node", "postgresql"],
  description: "Senior Mobile Engineer. 10/2023 - 01/2024.\nSpearheaded the creation of a SaaS application tailored for Amazon sellers within the e-commerce sector. This platform boasted advanced barcode scanning capabilities, revolutionizing product research for both retail and online arbitrage. Effectively integrated Google ML Kit and other machine learning resources for Android, alongside AV Foundation for iOS, to seamlessly implement scanning functionality. The project utilized Flutter for the frontend, Node.js for the backend, and PostgreSQL as the database. Leveraged CI/CD for streamlined cloud deployments.",
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
