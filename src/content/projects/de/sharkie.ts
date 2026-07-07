import type { ProjectContent } from "../../types";

export default {
  title: "Sonics Music Station",
  theme: "dark",
  tags: ["html", "css", "javascript"],
  live: "https://upload.app/download/sonic-station/com.sonics.user/dc9ddd5a88922a67346fb5d2ad8aafa00a969a4bc684d11f5d241fa9ec67598d",
  description: "A music and radio streaming app with song discovery, station browsing, and audio playback.",
  components: [
    { type: "media", props: { type: "image", src: "/images/sonics.png", alt: "Sonics", caption: "Home" } },
    { type: "media", props: { type: "image", src: "/images/sonics.png", alt: "Sonics", caption: "Browse" } },
    { type: "media", props: { type: "image", src: "/images/sonics.png", alt: "Sonics", caption: "Player" } },
    { type: "media", props: { type: "image", src: "/images/sonics.png", alt: "Sonics", caption: "Stations" } },
    { type: "media", props: { type: "image", src: "/images/sonics.png", alt: "Sonics", caption: "Library" } },
  ],
} as const satisfies ProjectContent;
