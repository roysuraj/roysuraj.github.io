import type { ProjectContent } from "../../types";

export default {
  title: "Cloudcraftz Solutions",
  theme: "dark",
  tags: ["javascript", "node", "react"],
  description: "Software Development Engineer. 05/2022 - 11/2023.\nLed diverse projects at CloudCraftz, including cross-platform mobile apps like OptiqueSutra School (Flutter & Firebase). Utilized technologies such as Java (Micronaut), TypeScript for cloud functions, Python (Flask), and GCP for advanced features like push notifications and analytics/reporting. Followed best practices in API testing and architecture. Additionally, leveraged OpenAI for model generation and fine-tuning. Proficient in Google Analytics (GA4).",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/optique.svg",
        alt: "OptiqueSutra School",
        caption: "OptiqueSutra School",
      },
    },
  ],
} as const satisfies ProjectContent;
