<script lang="ts">
  import type { Item } from "./items";
  import MobileNavigationItem from "./MobileNavigationItem.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";

export const className: string = "";

export let active: Item;

export let items: readonly Item[];
  export let navigationItems: { href: string; label: string }[];

  export let currentLang: string = "vi";
  export let currentPath: string = "/";
</script>

<nav class={className}>
  <div class="flex items-center justify-center w-full max-w-md mx-auto">
    <!-- Navigation Items -->
    <div class="flex items-center space-x-0.5 sm:space-x-1">
      {#each items as item, index}
        <MobileNavigationItem
          current={item}
          label={navigationItems[index].label}
          {active}
          {currentLang}
        />
      {/each}
    </div>

    <!-- Language Switcher - ở cuối -->
    <div class="flex items-center ml-2 sm:ml-3">
      <LanguageSwitcher {currentLang} {currentPath} isMobile={true} />
    </div>
  </div>
</nav>
