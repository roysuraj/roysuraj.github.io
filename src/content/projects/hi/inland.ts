import type { ProjectContent } from "../../types";

export default {
  title: "Inland World Logistics",
  theme: "dark",
  tags: ["javascript", "html", "css"],
  description: "सहायक प्रबंधक - IT। 03/2024 - वर्तमान।\nअंतर्राष्ट्रीय माल अग्रेषण परियोजना में 5-6 डेवलपर्स की टीम का नेतृत्व। शिपिंग लाइनों, रसद और वितरण प्रबंधन। जीरा और स्लैक के माध्यम से परियोजना प्रबंधन और टीम सहयोग।",
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
