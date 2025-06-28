<script lang="ts">
import type { Item } from "./items";

export const current: Item = "home";

export const active: Item = "home";

export let hide: () => void;
</script>

<li>
  <a
    href="/#{current}"
    class="block py-2 {active == current ? 'dark:text-accent-400' : ''}"
    on:click={hide}
  >
    {current}
  </a>
</li>
