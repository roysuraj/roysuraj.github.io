import type { ProjectContent } from "../../types";

export default {
  title: "Optique",
  theme: "dark",
  tags: ["javascript", "node", "react"],
  description: "সফটওয়্যার ডেভেলপমেন্ট ইঞ্জিনিয়ার। ০৫/২০২২ - ১১/২০২৩।\nCloudCraftz-এ বৈচিত্র্যময় প্রজেক্টের নেতৃত্বদান, যেমন OptiqueSutra School (Flutter & Firebase)। Java (Micronaut), TypeScript, Python (Flask), GCP এবং OpenAI মডেল সলিউশন ব্যবহার করে নির্মিত।",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/optique.svg",
        alt: "OptiqueSutra School",
        caption: "OptiqueSutra School",
      },
    },
  ],
} as const satisfies ProjectContent;
