<script lang="ts">
  import DesktopNavigation from "./DektopNavigation.svelte";
  import type { Item } from "./items";
  import { items, getNavigationItems } from "./items";
  import MobileNavigation from "./MobileNavigation.svelte";
  import { useTranslations } from "../../i18n/ui";
  import { mostVisible } from "$scripts/mostVisible";

  function _setActive() {
    const currentlyActive = mostVisible(document.querySelectorAll(".section"));
    const nextActive = currentlyActive?.id;

    if (nextActive && items.includes(nextActive as Item)) {
      active = nextActive as Item;
    }
  }

  export let active: Item = "home";
  export let lang: "en" | "vi" = "en";

  const t = useTranslations(lang);
  const navigationItems = getNavigationItems(t);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  // Debug lang
  if (typeof window !== "undefined") {
    console.log("Navbar lang:", lang);
  }
</script>

<svelte:window
  on:scroll={() => {
    _setActive();
  }}
/>

<!-- Desktop Navigation - Top -->
<div class="fixed top-6 w-full z-40 hidden md:block">
  <div class="flex flex-1 justify-center">
    <DesktopNavigation
      {items}
      {navigationItems}
      bind:active
      currentLang={lang}
      {currentPath}
      className="pointer-events-auto"
    />
  </div>
</div>

<!-- Mobile Navigation - Bottom (PWA Style) -->
<div class="fixed bottom-0 left-0 right-0 z-40 md:hidden">
  <div
    class="bg-white/90 backdrop-blur-md border-t border-base-200/50 dark:bg-black/90 dark:border-base-700/50"
  >
    <div class="flex justify-center items-center px-4 py-3">
      <MobileNavigation
        {items}
        {navigationItems}
        bind:active
        currentLang={lang}
        {currentPath}
        className="pointer-events-auto w-full"
      />
    </div>
  </div>
</div>
