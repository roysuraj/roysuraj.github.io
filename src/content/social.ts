export const social = [
  { url: "mailto:roysuraj@example.com", name: "mail" },
  { url: "https://github.com/roysuraj", name: "github" },
  { url: "http://www.linkedin.com/in/suraj-roy-0245a8184", name: "linkedin" },
  { url: "https://twitter.com/roy_suraj_m?s=09", name: "x" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
