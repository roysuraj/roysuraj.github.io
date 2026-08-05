import type { ProjectContent } from "../../types";

export default {
  title: "Afterbell",
  theme: "dark",
  tags: ["javascript", "node", "postgresql"],
  description: "वरिष्ठ मोबाइल इंजीनियर। 10/2023 - 01/2024।\nई-कॉमर्स क्षेत्र में अमेज़न विक्रेताओं के लिए SaaS एप्लिकेशन का नेतृत्व। उन्नत बारकोड स्कैनिंग क्षमताएं, Flutter, Node.js और PostgreSQL का उपयोग करके निर्मित।",
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
