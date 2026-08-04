import type { ProjectContent } from "../../types";

export default {
  title: "Distarise",
  theme: "dark",
  tags: ["javascript"],
  description: "ফ্লাটার ডেভেলপার। ০১/২০২১ - ০৭/২০২১।\nDistarise-এ Flutter প্রজেক্টে অভিজ্ঞ ডেভেলপারদের সাথে কাজ করা এবং মোবাইল অ্যাপ্লিকেশনের জন্য দক্ষ কোড লেখা।",
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
