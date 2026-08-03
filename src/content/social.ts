export const social = [
  { url: "mailto:spyrogypsertech@gmail.com", name: "mail" },
  { url: "https://github.com/roysuraj", name: "github" },
  { url: "http://www.linkedin.com/in/suraj-roy-0245a8184", name: "linkedin" },
  { url: "https://www.instagram.com/roy_suraj_mithai?igsh=eHIzYjNjcm52dTF0", name: "instagram" },
  { url: "https://youtube.com/@christyleillusion?si=3M-sVWZ3uzNDT655", name: "youtube-music" },
  { url: "https://youtube.com/@spyrogypsertech1606?si=_-_j7OB1NlgSkHow", name: "youtube-tech" },
  { url: "https://twitter.com/roy_suraj_m?s=09", name: "x" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" | "youtube-music" | "youtube-tech" }[];
