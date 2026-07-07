import type { ProjectContent } from "../../types";

export default {
  title: "Afterbell",
  theme: "dark",
  tags: ["three", "node", "redis"],
  live: "https://upload.app/download/afterbell/com.quizuser.com/13b897373ccc84c640d122488942ca91a376cf8ab7e6d5d8270f481cb51e4763",
  description: "A child learning and progress tracking app with periodic monitoring and adaptive learning support.",
  components: [
    { type: "media", props: { type: "image", src: "/images/afterbell.png", alt: "Afterbell", caption: "Dashboard" } },
    { type: "media", props: { type: "image", src: "/images/afterbell.png", alt: "Afterbell", caption: "Progress" } },
    { type: "media", props: { type: "image", src: "/images/afterbell.png", alt: "Afterbell", caption: "Reports" } },
    { type: "media", props: { type: "image", src: "/images/afterbell.png", alt: "Afterbell", caption: "Students" } },
    { type: "media", props: { type: "image", src: "/images/afterbell.png", alt: "Afterbell", caption: "Insights" } },
    { type: "media", props: { type: "image", src: "/images/afterbell.png", alt: "Afterbell", caption: "Flow" } },
  ],
} as const satisfies ProjectContent;
