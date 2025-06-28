export const languages = {
  en: "English",
  vi: "Tiếng Việt",
};

export const defaultLang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.learning": "Learning",
    "nav.contact": "Contact",
    "nav.map": "Map",
    "hero.title": "Hi, I'm Hien",
    "hero.subtitle": "Full-stack Developer",
    "hero.description":
      "I build modern web applications with cutting-edge technologies.",
    "about.title": "About Me",
    "about.description":
      "I am a passionate full-stack developer with experience in building modern web applications.",
    "projects.title": "Projects",
    "projects.description": "Here are some of my recent projects.",
    "blog.title": "Blog",
    "blog.description":
      "Thoughts and insights about technology and development.",
    "learning.title": "Learning",
    "learning.description": "My learning journey and resources.",
    "contact.title": "Contact",
    "contact.description": "Get in touch with me.",
    "footer.copyright": "© 2024 Hien Nguyen. All rights reserved.",
  },
  vi: {
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.projects": "Dự án",
    "nav.blog": "Blog",
    "nav.learning": "Học tập",
    "nav.contact": "Liên hệ",
    "nav.map": "Bản đồ",
    "hero.title": "Xin chào, tôi là Hiền",
    "hero.subtitle": "Lập trình viên Full-stack",
    "hero.description":
      "Tôi xây dựng các ứng dụng web hiện đại với công nghệ tiên tiến.",
    "about.title": "Về tôi",
    "about.description":
      "Tôi là một lập trình viên full-stack đam mê với kinh nghiệm xây dựng các ứng dụng web hiện đại.",
    "projects.title": "Dự án",
    "projects.description": "Đây là một số dự án gần đây của tôi.",
    "blog.title": "Blog",
    "blog.description":
      "Những suy nghĩ và hiểu biết về công nghệ và phát triển.",
    "learning.title": "Học tập",
    "learning.description": "Hành trình học tập và tài nguyên của tôi.",
    "contact.title": "Liên hệ",
    "contact.description": "Liên hệ với tôi.",
    "footer.copyright": "© 2024 Nguyễn Hiền. Tất cả quyền được bảo lưu.",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
