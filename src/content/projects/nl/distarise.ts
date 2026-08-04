import type { ProjectContent } from "../../types";

export default {
  title: "Distarise",
  theme: "dark",
  tags: ["javascript"],
  description: "Flutter Developer. 01/2021 - 07/2021.\nBij Distarise samengewerkt met ervaren ontwikkelaars aan Flutter-projecten, vaardigheden verfijnd in het schrijven van efficiënte, hoogwaardige code voor mobiele applicaties.",
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
