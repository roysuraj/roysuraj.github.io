import type { ProjectPreview } from "../../types";

export default [
  { title: "X-lent Tea", slug: "cubewar", thumbnail: "/images/xlenttea.png", description: "चाय ई-कॉमर्स ऐप" },
  { title: "Optique", slug: "cloudcraftz", thumbnail: "/images/optique.svg", description: "स्कूल प्रबंधन और लर्निंग ऐप" },
  { title: "Afterbell", slug: "quibbo", thumbnail: "/images/afterbell.png", description: "बाल शिक्षा और प्रगति ट्रैकिंग ऐप" },
  { title: "Sonics Music Station", slug: "sharkie", thumbnail: "/images/sonics.png", description: "संगीत और रेडियो ऐप" },
  { title: "QOMIX", slug: "pokedex", thumbnail: "/images/qomix.svg", description: "वेब अनुभव" },
] as const satisfies ProjectPreview[];
