import type { ProjectContent } from "../../types";

export default {
  title: "Inland World Logistics",
  theme: "dark",
  tags: ["javascript", "html", "css"],
  description: "Assistant Manager - IT. 03/2024 - Heden.\nLeiding over een team van 5-6 ontwikkelaars in een internationaal vrachtvervoersproject. Beheer van rederijen, logistiek en projectlevering. Inzet van Jira voor projecttracering en Slack voor teamsamenwerking. Productiviteit verhoogd door digitale transformatie. Tijdige uitvoering en klanttevredenheid gewaarborgd.",
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
