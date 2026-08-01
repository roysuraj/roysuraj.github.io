import type { ProjectContent } from "../../types";

export default {
  title: "Personal Portfolio",
  theme: "dark",
  tags: ["three", "javascript", "html"],
  videoBorder: false,
  live: "https://roysuraj.github.io",
  description: "A 3D interactive portfolio website built with Vue, Three.js, and GSAP.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/personalPortfolio.jpg",
        alt: "Personal Portfolio",
        caption: "Personal Portfolio",
      },
    },
  ],
} as const satisfies ProjectContent;
