export const items = ["home", "about", "projects", "learning", "contact"];

export type Item = (typeof items)[number];

export function getNavigationItems(t: (key: string) => string) {
  return [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/learning", label: t("nav.learning") },
    { href: "/contact", label: t("nav.contact") },
  ];
}
