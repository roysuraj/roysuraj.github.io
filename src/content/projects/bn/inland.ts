import type { ProjectContent } from "../../types";

export default {
  title: "Inland World Logistics",
  theme: "dark",
  tags: ["javascript", "html", "css"],
  description: "সহকারী পরিচালক - IT। ০৩/২০২৪ - বর্তমান।\nআন্তর্জাতিক ফ্রেইট ফরওয়ার্ডিং প্রজেক্টে ৫-৬ জনের ডেভেলপমেন্ট টিমের নেতৃত্বদান। শিপিং লাইন, লজিস্টিকস এবং প্রজেক্ট ডেলিভারি পরিচালনা। প্রজেক্ট ট্র্যাকিংয়ের জন্য জিরা এবং টিম যোগাযোগের জন্য স্ল্যাক ব্যবহার। ডিজিটাল রূপান্তরের মাধ্যমে উৎপাদনশীলতা বৃদ্ধি এবং ক্লায়েন্ট সন্তুষ্টি নিশ্চিতকরণ।",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: "/images/xlenttea.png",
        alt: "Inland World Logistics",
        caption: "Inland World Logistics",
      },
    },
  ],
} as const satisfies ProjectContent;
