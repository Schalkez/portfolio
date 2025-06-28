<script lang="ts">
  import { languages } from "../../i18n/ui";
  import Select from "../ui/Select.svelte";

  const props = $props<{
    currentLang: string;
    currentPath: string;
  }>();

  function getLanguageUrl(lang: string) {
    const current = props.currentPath;
    if (lang === "en") {
      // Loại bỏ /vi ở đầu nếu có
      return current.replace(/^\/vi(\/|$)/, "/");
    }
    // Nếu đã có /vi thì giữ nguyên, nếu chưa thì thêm vào
    return current.startsWith("/vi") ? current : `/vi${current}`;
  }

  function handleLanguageChange(lang: string) {
    window.location.href = getLanguageUrl(lang);
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
  options={languageOptions}
  value={props.currentLang}
  width="w-12"
  onChange={handleLanguageChange}
  noArrow={true}
  noBorder={true}
  customClass="px-3 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 ring-base-900/5 dark:text-base-200 dark:ring-white/10"
/>
