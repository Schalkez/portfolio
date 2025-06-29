import en from "./en";
import vi from "./vi";

export const languages = {
  en: "English",
  vi: "Tiếng Việt",
};

export const defaultLang = "en";

export const ui = {
  en,
  vi,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    return (
      ui[lang][key as keyof typeof en] ||
      ui[defaultLang][key as keyof typeof en] ||
      key
    );
  };
}
