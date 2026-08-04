import type { Locale } from "../../i18n/types";

export const projectIds = ["inland", "ionio", "cloudcraftz", "craftveda", "distarise", "education", "cubewar", "quibbo", "sharkie", "particles", "pokedex", "streakon"];

function simplifyModules(glob: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [path, mod] of Object.entries(glob)) {
    const match = path.match(/\/([a-z0-9_-]+)\.ts$/i);
    if (match) result[match[1] as string] = mod;
  }
  return result;
}

export const projectModules = {
  en: simplifyModules(import.meta.glob("./en/*.ts", { eager: true })),
  de: simplifyModules(import.meta.glob("./de/*.ts", { eager: true })),
  nl: simplifyModules(import.meta.glob("./nl/*.ts", { eager: true })),
  es: simplifyModules(import.meta.glob("./es/*.ts", { eager: true })),
  fr: simplifyModules(import.meta.glob("./fr/*.ts", { eager: true })),
  hi: simplifyModules(import.meta.glob("./hi/*.ts", { eager: true })),
  bn: simplifyModules(import.meta.glob("./bn/*.ts", { eager: true })),
} as const satisfies Record<Locale, Record<string, any>>;
