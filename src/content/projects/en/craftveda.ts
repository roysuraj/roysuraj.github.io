import type { ProjectContent } from "../../types";

export default {
  title: "Craftveda Technology",
  theme: "dark",
  tags: ["react", "javascript", "html"],
  description: "Software Engineering Intern. 01/2022 - 03/2022.\nDeveloped a MedTech application with real-time Bluetooth integration for vital health metrics analysis, leveraging React Native and Highcharts JS for cross-platform functionality and intuitive data visualization.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/doodle.png",
        alt: "Craftveda Technology",
        caption: "Craftveda Technology",
      },
    },
  ],
} as const satisfies ProjectContent;
