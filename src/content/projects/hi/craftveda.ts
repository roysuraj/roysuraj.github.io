import type { ProjectContent } from "../../types";

export default {
  title: "Craftveda Technology",
  theme: "dark",
  tags: ["react", "javascript", "html"],
  description: "सॉफ्टवेयर इंजीनियरिंग इंटर्न। 01/2022 - 03/2022।\nस्वास्थ्य डेटा विश्लेषण के लिए रियल-टाइम ब्लूटूथ एकीकरण के साथ MedTech एप्लिकेशन का विकास।",
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
