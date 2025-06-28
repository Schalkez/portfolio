<script lang="ts">
  import type { Item } from "./items";

  export let current: Item = "home";
  export let label: string = current;

  export let active: Item = "home";

  export let hide: () => void;

  export let currentLang: string = "vi";
</script>

<li>
  <a
    href="/{currentLang}#{current}"
    class="block py-2 {active == current ? 'dark:text-accent-400' : ''}"
    on:click={hide}
  >
    {label}
  </a>
</li>
