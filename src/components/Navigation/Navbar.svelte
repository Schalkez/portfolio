<script lang="ts">
import DesktopNavigation from "./DektopNavigation.svelte";
import type { Item } from "./items";
import { items } from "./items";
import MobileNavigation from "./MobileNavigation.svelte";

function _setActive() {
	// @ts-ignore
	const currentlyActive = mostVisible(document.querySelectorAll(".section"));

	if (currentlyActive?.id) {
		active = currentlyActive.id;
	}
}

export let active: Item = "home";
</script>

<svelte:window
  on:scroll={() => {
    _setActive();
  }}
/>

<div class="fixed top-6 w-full z-40 pointer-events-none">
  <div class="flex flex-1 justify-end md:justify-center">
    <DesktopNavigation
      {items}
      bind:active
      className="pointer-events-auto hidden md:block"
    />
  </div>
</div>

<div class="fixed bottom-6 right-0 z-40">
  <MobileNavigation
    {items}
    bind:active
    className="pointer-events-auto md:hidden mt-10"
  />
</div>
