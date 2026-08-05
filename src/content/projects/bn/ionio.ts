import type { ProjectContent } from "../../types";

export default {
  title: "Afterbell",
  theme: "dark",
  tags: ["javascript", "node", "postgresql"],
  description: "সিনিয়র মোবাইল ইঞ্জিনিয়ার। ১০/২০২৩ - ০১/২০২৪।\nই-কমার্স সেক্টরে অ্যামাজন বিক্রেতাদের জন্য SaaS অ্যাপ্লিকেশনের নেতৃত্বদান। উন্নত বারকোড স্ক্যানিং ক্ষমতা এবং মেশিন লার্নিং টুলস (Google ML Kit & AV Foundation) ইন্টিগ্রেশন। Flutter, Node.js, PostgreSQL এবং ক্লাউড ডিপ্লয়মেন্ট ব্যবহার করে নির্মিত।",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/afterbell.png",
        alt: "Ionio App",
        caption: "Ionio App",
      },
    },
  ],
} as const satisfies ProjectContent;
