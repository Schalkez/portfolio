<script lang="ts">
  import { onMount } from "svelte";
  import { initClarity } from "$scripts/clarity";

  onMount(() => {
    void initClarity();
  });
</script>
