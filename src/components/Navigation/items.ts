export const items = ["home", "about", "blog", "learning", "contact"] as const;

export type Item = (typeof items)[number];

export function getNavigationItems(t: (key: string) => string) {
  return [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/learning", label: t("nav.learning") },
    { href: "/contact", label: t("nav.contact") },
  ];
}
