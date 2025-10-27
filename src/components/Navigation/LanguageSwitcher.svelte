<script lang="ts">
  import { languages } from "../../i18n/ui";
  import Select from "../ui/Select.svelte";

  const props = $props<{
    currentLang: string;
    currentPath: string;
    isMobile?: boolean;
  }>();

  let isLoading = $state(false);

  function getLanguageUrl(lang: string) {
    if (lang === "en") {
      return "/en/";
    }
    return "/";
  }

  function handleLanguageChange(lang: string) {
    const url = getLanguageUrl(lang);
    console.log("LanguageSwitcher:", { current: props.currentLang, next: lang, to: url, path: props.currentPath });

    // Small delay to show a visual feedback
    if (lang !== props.currentLang) {
      isLoading = true;
      // ThÃªm má»™t Small delay to show a visual feedback
      setTimeout(() => {
        window.location.href = url;
      }, 100);
    }
  }

  // ÄÆ°á»ng dáº«n SVG cá» trong public/flags/
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

{#if props.isMobile}
  <!-- Mobile PWA Style - Icon only -->
  <Select
    key={props.currentLang}
    options={languageOptions}
    value={props.currentLang}
    width="w-12"
    onChange={handleLanguageChange}
    noArrow={true}
    noBorder={true}
    disabled={isLoading}
    isMobile={true}
    customClass="px-2 py-1 text-sm font-medium text-base-600 dark:text-base-400 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-all duration-200 {isLoading
      ? 'opacity-50'
      : ''}"
  />
{:else}
  <!-- Desktop Style -->
  <Select
    key={props.currentLang}
    options={languageOptions}
    value={props.currentLang}
    width="w-12"
    onChange={handleLanguageChange}
    noArrow={true}
    noBorder={true}
    disabled={isLoading}
    isMobile={false}
    customClass="px-2 sm:px-3 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 ring-base-900/5 dark:text-base-200 dark:ring-white/10 {isLoading
      ? 'opacity-50'
      : ''}"
  />
{/if}


