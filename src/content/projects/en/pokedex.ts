import type { ProjectContent } from "../../types";

export default {
  title: "QOMIX",
  theme: "dark",
  tags: ["react", "node", "javascript"],
  live: "https://www.theqomix.com",
  description: "QOMIX is a web experience with a polished product flow and clean interface.",
  components: [
    { type: "media", props: { type: "image", src: "/images/qomix.svg", alt: "QOMIX", caption: "Home" } },
    { type: "media", props: { type: "image", src: "/images/qomix.svg", alt: "QOMIX", caption: "Interface" } },
    { type: "media", props: { type: "image", src: "/images/qomix.svg", alt: "QOMIX", caption: "Flow" } },
    { type: "media", props: { type: "image", src: "/images/qomix.svg", alt: "QOMIX", caption: "Visuals" } },
  ],
} as const satisfies ProjectContent;
