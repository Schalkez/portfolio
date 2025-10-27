<script lang="ts">
  import { fade, slide } from "svelte/transition";

  interface Learning {
    title: string;
    description: string;
    date: string; // yyyy-mm
  }

  export let lang: string;

  const learnings: Learning[] = [
    {
      title: "Astro",
      description:
        "Astro is a fresh breeze in web development, offering a lightweight and optimized experience for content-focused static sites.",
      date: "2025-03",
    },
    {
      title: "Supabase & PostgreSQL",
      description:
        "Exploring Supabase with PostgreSQL blends real-time capability with a friendly developer experience.",
      date: "2024-10",
    },
    {
      title: "Svelte & SvelteKit",
      description:
        "Svelte's simplicity and performance make it a joy. SvelteKit powers many of my personal projects, including this site.",
      date: "2024-06",
    },
    {
      title: "TanStack Query · Zustand · Jotai",
      description:
        "This trio reshaped how I handle data and state: fast, composable and predictable.",
      date: "2024-03",
    },
    {
      title: "Firebase & Google Cloud Platform",
      description:
        "Solid platforms for storage and deployment. Not always my first pick, but great for the right use cases.",
      date: "2024-02",
    },
    {
      title: "Fastify",
      description:
        "A speedy, capable Node.js framework that keeps APIs fun to build.",
      date: "2023-12",
    },
    {
      title: "MySQL",
      description:
        "Strong structure and reliability—great when data consistency is king.",
      date: "2023-10",
    },
    {
      title: "Nest.js",
      description:
        "Clean architecture for Node.js apps; switching between MySQL and MongoDB feels natural.",
      date: "2023-09",
    },
    {
      title: "MongoDB",
      description:
        "Flexibility that unlocks fast iteration and creative schemas.",
      date: "2023-02",
    },
    {
      title: "TailwindCSS",
      description:
        "Design at the speed of thought. Utility-first keeps me productive.",
      date: "2023-01",
    },
    {
      title: "Styled-components",
      description:
        "Ergonomic CSS-in-JS for component-driven UIs.",
      date: "2022-10",
    },
    {
      title: "Next.js",
      description:
        "Not a huge React fan, but Next.js delivers excellent performance and SEO features.",
      date: "2022-10",
    },
    {
      title: "Express.js",
      description:
        "A dependable foundation for APIs—simple and effective.",
      date: "2022-07",
    },
    {
      title: "Redux",
      description:
        "Powerful for state management, though often more than I need nowadays.",
      date: "2022-05",
    },
    {
      title: "React.js",
      description:
        "React isn’t my favorite, but its popularity and ecosystem keep it relevant for many projects.",
      date: "2022-03",
    },
  ];

  // Localized titles
  const titles = {
    en: {
      title: "always keep learning",
      description:
        "one of the things i love most about programming is that there's always something new to learn. here's a selection of some of the things i've been learning lately:",
      showMore: "show more",
    },
    vi: {
      title: "luôn luôn học hỏi",
      description:
        "một trong những điều tôi thích nhất ở lập trình là luôn có điều mới để học. dưới đây là một số thứ tôi học gần đây:",
      showMore: "xem thêm",
    },
  } as const;

  const content = titles[(lang as 'en' | 'vi') ?? 'vi'] || titles.vi;
  const currentLearnings = learnings;

  function _formatDate(date: string) {
    return new Date(date).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "long",
    });
  }

  let showAll = false;
  $: shownLearnings = showAll ? currentLearnings : [...currentLearnings].slice(0, 3);
</script>

<div class="relative isolate overflow-hidden bg-background">
  <div class="mx-auto max-w-5xl px-6 lg:px-8">
    <div id="learning" class="py-16 md:py-32 section">
      <div class="max-w-2xl">
        <h1 class="text-4xl font-bold tracking-tight text-base-800 dark:text-base-100 sm:text-5xl">
          {content.title}
        </h1>
        <p class="mt-6 text-base text-base-600 dark:text-base-400">
          {content.description}
        </p>
      </div>
      <div class="mt-16 md:border-l md:border-base-100 md:pl-6 md:dark:border-base-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">
          {#each shownLearnings as learning}
            <article transition:slide class="md:grid md:grid-cols-4 md:items-baseline">
              <div class="group relative flex flex-col items-start md:col-span-3">
                <div class="text-base font-semibold tracking-tight text-base-800 dark:text-base-100">
                  {learning.title}
                </div>
                <div class="relative z-10 order-first mb-3 flex items-center text-sm text-base-400 dark:text-base-500 pl-3.5 mt-1 md:hidden">
                  <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                    <!-- svelte-ignore element_invalid_self_closing_tag -->
                    <span class="h-4 w-0.5 rounded-full bg-base-200 dark:bg-base-500" />
                  </span>
                  {_formatDate(learning.date)}
                </div>

                <p class="relative z-10 mt-2 text-sm text-base-600 dark:text-base-400">
                  {learning.description}
                </p>
              </div>
              <div class="relative z-10 order-first mb-3 items-center text-sm text-base-400 dark:text-base-500 mt-1 hidden md:block">
                {_formatDate(learning.date)}
              </div>
            </article>
          {/each}

          {#if !showAll}
            <div class="justify-center flex" transition:fade>
              <button
                on:click={() => (showAll = true)}
                type="button"
                class="group flex items-center rounded-full mr-4 bg-white/90 px-4 py-2 text-sm font-medium text-base-800 shadow-lg shadow-base-800/5 ring-1 ring-base-900/5 backdrop-blur dark:bg-white/5 dark:text-base-200 dark:ring-white/10 dark:hover:ring-white/20"
              >
                {content.showMore}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 h-auto w-4 stroke-base-500 group-hover:stroke-base-700 dark:group-hover:stroke-base-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

