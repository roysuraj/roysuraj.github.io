import type { ProjectContent } from "../../types";

export default {
  title: "Cloudcraftz Solutions",
  theme: "dark",
  tags: ["javascript", "node", "react"],
  description: "सॉफ्टवेयर विकास इंजीनियर। 05/2022 - 11/2023।\nCloudCraftz में विभिन्न परियोजनाओं का नेतृत्व, जिसमें OptiqueSutra School (Flutter & Firebase) शामिल है। Java (Micronaut), TypeScript, Python (Flask), GCP और OpenAI का उपयोग।",
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
