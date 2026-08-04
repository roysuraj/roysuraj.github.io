import type { ProjectContent } from "../../types";

export default {
  title: "Craftveda Technology",
  theme: "dark",
  tags: ["react", "javascript", "html"],
  description: "সফটওয়্যার ইঞ্জিনিয়ারিং ইন্টার্ন। ০১/২০২২ - ০৩/২০২২।\nস্বাস্থ্য ডেটা বিশ্লেষণের জন্য রিয়েল-টাইম ব্লুটুথ ইন্টিগ্রেশন সহ MedTech অ্যাপ্লিকেশন তৈরি, React Native এবং Highcharts JS ব্যবহার করে।",
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
