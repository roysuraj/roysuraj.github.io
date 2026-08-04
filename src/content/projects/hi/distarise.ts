import type { ProjectContent } from "../../types";

export default {
  title: "Distarise",
  theme: "dark",
  tags: ["javascript"],
  description: "फ्लटर डेवलपर। 01/2021 - 07/2021।\nDistarise में Flutter परियोजनाओं पर काम करना और उच्च गुणवत्ता वाला कोड लिखना।",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/sonics.png",
        alt: "Distarise",
        caption: "Distarise",
      },
    },
  ],
} as const satisfies ProjectContent;
