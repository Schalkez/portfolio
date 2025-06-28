<script lang="ts">
import { onMount } from "svelte";

let _visible = false;

onMount(() => {
	_visible = true;
});

export let video: string;
</script>

{#if _visible && video}
  <video
    autoplay
    loop
    muted
    playsinline
    class="absolute inset-0 h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-200 z-10"
    preload="none"
  >
    <source src={video} type="video/mp4" />
  </video>
{/if}

<div class="h-1 w-1"></div>
