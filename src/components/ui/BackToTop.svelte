<script lang="ts">
  // Svelte 5 runes API is used in this project
  const props = $props<{
    threshold?: number; // px to start showing button
    right?: string; // tailwind spacing class for right
    bottom?: string; // tailwind spacing class for bottom
    size?: number; // px for button box
    title?: string; // tooltip/aria label
    variant?: 'ghost' | 'solid';
  }>();

  const threshold = props.threshold ?? 240;
  const right = props.right ?? "right-6 sm:right-8";
  const bottom = props.bottom ?? "bottom-6 sm:bottom-8";
  const size = props.size ?? 48;
  const title = props.title ?? "Back to top";
  const variant = props.variant ?? 'ghost';

  let visible = $state(false);
  let progress = $state(0); // 0..1

  function update() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    visible = y > threshold;
    progress = h > 0 ? Math.min(1, Math.max(0, y / h)) : 0;
  }

  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $effect(() => {
    if (typeof window === "undefined") return;
    update();
    const onScroll = () => update();
    const onResize = () => update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  });

  // progress ring math
  const r = 16;
  const c = 2 * Math.PI * r;
  const dash = $derived(c * (1 - progress));

  const containerClass = $derived(
    variant === 'solid'
      ? 'bg-accent-600 hover:bg-accent-500 text-white shadow-lg shadow-base-900/10'
      : 'bg-white/80 dark:bg-base-900/70 text-base-800 dark:text-base-100 border border-base-200 dark:border-base-800 hover:border-accent-300 dark:hover:border-accent-700 backdrop-blur-sm shadow-lg shadow-base-900/5'
  );
  const ringBgClass = $derived(
    variant === 'solid' ? 'stroke-white/25' : 'stroke-base-400/30 dark:stroke-base-500/30'
  );
  const ringFgClass = $derived(
    variant === 'solid' ? 'stroke-white' : 'stroke-accent-500 dark:stroke-accent-400'
  );
  const iconClass = $derived(
    variant === 'solid' ? 'text-white' : 'text-accent-600 dark:text-accent-400'
  );
</script>

<button
  type="button"
  aria-label={title}
  title={title}
  on:click={toTop}
  class={`fixed ${right} ${bottom} z-50 transition-all duration-300 focus:outline-none group 
    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'}`}
>
  <span
    class={`relative inline-flex items-center justify-center rounded-full ring-1 ring-base-900/5 dark:ring-white/10 ${containerClass}`}
    style={`width:${size}px;height:${size}px;`}
  >
    <!-- progress ring background -->
    <svg viewBox="0 0 40 40" class="absolute inset-0 -rotate-90">
      <circle cx="20" cy="20" r={r} class={ringBgClass} stroke-width="3" fill="none" />
      <circle
        cx="20"
        cy="20"
        r={r}
        class={ringFgClass}
        stroke-width="3"
        stroke-linecap="round"
        fill="none"
        style={`stroke-dasharray:${c};stroke-dashoffset:${dash};transition:stroke-dashoffset .15s linear;`}
      />
    </svg>
    <!-- arrow icon -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class={`size-5 ${iconClass}`}>
      <path fill-rule="evenodd" d="M12 4.5a.75.75 0 0 1 .53.22l6.75 6.75a.75.75 0 1 1-1.06 1.06L12.75 7.06V19.5a.75.75 0 0 1-1.5 0V7.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06l6.75-6.75A.75.75 0 0 1 12 4.5Z" clip-rule="evenodd" />
    </svg>
  </span>
  <span class="sr-only">{title}</span>
</button>

<style>
  .size-5 { width: 20px; height: 20px; }
</style>
