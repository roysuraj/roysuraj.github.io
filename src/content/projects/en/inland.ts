import type { ProjectContent } from "../../types";

export default {
  title: "Inland World Logistics",
  theme: "dark",
  tags: ["javascript", "html", "css"],
  description: "Assistant Manager - IT. 03/2024 - Current.\nLeading team of 5-6 in international freight forwarding project. Managing shipping lines, logistics & project delivery. Utilizing Jira for project tracking & Slack for team collaboration. Enhancing productivity through digital transformation. Ensuring timely execution & client satisfaction.",
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
