<script lang="ts">
  import DesktopNavigation from "./DektopNavigation.svelte";
  import type { Item } from "./items";
  import { items, getNavigationItems } from "./items";
  import MobileNavigation from "./MobileNavigation.svelte";
  import { useTranslations } from "../../i18n/ui";

  function _setActive() {
    // @ts-ignore
    const currentlyActive = mostVisible(document.querySelectorAll(".section"));

    if (currentlyActive?.id) {
      active = currentlyActive.id;
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

<div class="fixed top-6 w-full z-40">
  <div class="flex flex-1 justify-center">
    <DesktopNavigation
      {items}
      {navigationItems}
      bind:active
      currentLang={lang}
      {currentPath}
      className="pointer-events-auto hidden md:block"
    />
  </div>
</div>

<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
  <MobileNavigation
    {items}
    {navigationItems}
    bind:active
    currentLang={lang}
    {currentPath}
    className="pointer-events-auto md:hidden mt-10"
  />
</div>
