import type { ProjectPreview } from "../../types";

export default [
  { title: "X-lent Tea", slug: "cubewar", thumbnail: "/images/xlenttea.png", description: "চা ই-কমার্স অ্যাপ" },
  { title: "Optique", slug: "cloudcraftz", thumbnail: "/images/optique.svg", description: "স্কুল ম্যানেজমেন্ট এবং লার্নিং অ্যাপ" },
  { title: "Afterbell", slug: "quibbo", thumbnail: "/images/afterbell.png", description: "শিশু শিক্ষা ও অগ্রগতি ট্র্যাকিং অ্যাপ" },
  { title: "Sonics Music Station", slug: "sharkie", thumbnail: "/images/sonics.png", description: "সঙ্গীত এবং রেডিও অ্যাপ" },
  { title: "QOMIX", slug: "pokedex", thumbnail: "/images/qomix.svg", description: "ওয়েব অভিজ্ঞতা" },
] as const satisfies ProjectPreview[];
