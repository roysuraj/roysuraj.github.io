import type { ProjectContent } from "../../types";

export default {
  title: "X-lent Tea",
  theme: "dark",
  tags: ["javascript", "node", "gray"],
  live: "https://x-lent-tea.en.uptodown.com/android",
  description: "Ecommerce app for tea lovers with product browsing, orders, and a smooth mobile shopping flow.",
  components: [
    { type: "media", props: { type: "image", src: "/images/xlenttea.png", alt: "X-lent Tea", caption: "Home" } },
    { type: "media", props: { type: "image", src: "/images/xlenttea.png", alt: "X-lent Tea", caption: "Products" } },
    { type: "media", props: { type: "image", src: "/images/xlenttea.png", alt: "X-lent Tea", caption: "Cart" } },
    { type: "media", props: { type: "image", src: "/images/xlenttea.png", alt: "X-lent Tea", caption: "Checkout" } },
  ],
} as const satisfies ProjectContent;
