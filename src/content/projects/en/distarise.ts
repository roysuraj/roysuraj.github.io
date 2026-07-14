import type { ProjectContent } from "../../types";

export default {
  title: "Distarise",
  theme: "dark",
  tags: ["javascript"],
  description: "Flutter Developer. 01/2021 - 07/2021.\nAt Distarise, collaborated with seasoned developers on Flutter projects, refining skills in writing efficient, high-quality code for mobile applications.",
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
