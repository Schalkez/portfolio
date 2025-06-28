<script lang="ts">
  import type { Item } from "./items";
  import NavigationItem from "./NavigationItem.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";

  export const className: string = "";
  export let active: Item;
  export let items: Item[];
  export let navigationItems: { href: string; label: string }[];
  export let currentLang: string = "vi";
  export let currentPath: string = "/";
</script>

<nav class={className}>
  <ul
    class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 ring-1 ring-base-900/5 backdrop-blur dark:bg-white/5 dark:text-base-200 dark:ring-white/10"
  >
    {#each navigationItems as item, index}
      <NavigationItem
        href={`/${currentLang}#${items[index]}`}
        isActive={active == items[index]}>{item.label}</NavigationItem
      >
    {/each}
    <li class="flex items-center ml-2">
      <LanguageSwitcher {currentLang} {currentPath} />
    </li>
  </ul>
</nav>
