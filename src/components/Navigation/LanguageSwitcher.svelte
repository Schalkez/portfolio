<script lang="ts">
  import { languages } from "../../i18n/ui";
  import Select from "../ui/Select.svelte";

  const props = $props<{
    currentLang: string;
    currentPath: string;
  }>();

  let isLoading = $state(false);

  function getLanguageUrl(lang: string) {
    if (lang === "en") {
      return "/";
    }
    return "/vi/";
  }

  function handleLanguageChange(lang: string) {
    const url = getLanguageUrl(lang);
    console.log(
      "LanguageSwitcher: currentLang =",
      props.currentLang,
      "| chọn lang =",
      lang,
      "-> chuyển tới",
      url,
      "| currentPath:",
      props.currentPath
    );

    // Chỉ chuyển đổi nếu ngôn ngữ khác với hiện tại
    if (lang !== props.currentLang) {
      isLoading = true;
      // Thêm một chút delay để user thấy loading
      setTimeout(() => {
        window.location.href = url;
      }, 100);
    }
  }

  // Đường dẫn SVG cờ trong public/flags/
  const flags: Record<string, string> = {
    en: "/flags/us.svg",
    vi: "/flags/vn.svg",
  };

  const languageOptions = $derived(
    Object.entries(languages).map(([code, name]) => ({
      value: code,
      label: name,
      icon: flags[code] || "",
    }))
  );
</script>

<Select
  key={props.currentLang}
  options={languageOptions}
  value={props.currentLang}
  width="w-12"
  onChange={handleLanguageChange}
  noArrow={true}
  noBorder={true}
  disabled={isLoading}
  customClass="px-3 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 ring-base-900/5 dark:text-base-200 dark:ring-white/10 {isLoading
    ? 'opacity-50'
    : ''}"
/>
