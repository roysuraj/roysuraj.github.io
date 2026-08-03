export const LOCALES = {
  en: {
    iso: "en-US",
    name: "English",
    short: "EN",
    flag: "🇬🇧",
  },
  bn: {
    iso: "bn-IN",
    name: "বাংলা",
    short: "BN",
    flag: "🇧🇩",
  },
  hi: {
    iso: "hi-IN",
    name: "हिंदी",
    short: "HI",
    flag: "🇮🇳",
  },
  es: {
    iso: "es-ES",
    name: "Español",
    short: "ES",
    flag: "🇪🇸",
  },
  fr: {
    iso: "fr-FR",
    name: "Français",
    short: "FR",
    flag: "🇫🇷",
  },
  de: {
    iso: "de-DE",
    name: "Deutsch",
    short: "DE",
    flag: "🇩🇪",
  },
} as const satisfies Record<
  string,
  {
    name: string;
    iso: string;
    short: string;
    flag: string;
  }
>;

export const LOCALE_DEFAULT: keyof typeof LOCALES = "en";
