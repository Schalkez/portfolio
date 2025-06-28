<script lang="ts">
  import { fade, slide } from "svelte/transition";

  interface Learning {
    title: string;
    description: string;
    date: string;
  }

  const learnings: Learning[] = [
    {
      title: "Astro",
      description:
        "Really enjoying Astro; it feels like Svelte but even better suited for content-focused static sites.",
      date: "2025-3",
    },
    {
      title: "supabase & postgresql",
      description:
        "Started using Supabase for a few projects. While I still prefer MongoDB, Supabase offers some neat features.",
      date: "2024-10",
    },
    {
      title: "svelte & sveltekit",
      description:
        "Svelte is my go-to framework for web development. I use it for most personal projects, including this website.",
      date: "2024-06",
    },
    {
      title: "tanstack query & zustand & jotai",
      description:
        "TanStack Query, Zustand, and Jotai make state and data management in apps incredibly smooth and efficient.",
      date: "2024-03",
    },
    {
      title: "firebase & gcp",
      description:
        "Tried Firebase and Google Cloud Platform for some projects. MongoDB remains my favorite, but they have unique strengths.",
      date: "2024-02",
    },
    {
      title: "fastify",
      description:
        "Fastify delivers a fast and powerful experience for building APIs, making it a great choice for backend projects.",
      date: "2023-12",
    },
    {
      title: "mysql",
      description:
        "Used MySQL before switching to MongoDB, and the flexibility of MongoDB has kept me from looking back.",
      date: "2023-10",
    },
    {
      title: "nest.js",
      description:
        "Nest.js provides a clean and robust structure for Node.js apps, easing my transition from MySQL to MongoDB.",
      date: "2023-09",
    },
    {
      title: "mongodb",
      description:
        "Switching from MySQL to MongoDB was a game-changer, offering unmatched flexibility for handling data.",
      date: "2023-02",
    },
    {
      title: "tailwindcss",
      description:
        "TailwindCSS is a brilliant yet unconventional idea, far superior to plain CSS. It's in most of my recent projects, including this site.",
      date: "2023-01",
    },
    {
      title: "styled-components",
      description:
        "Styled-components makes writing CSS in JavaScript intuitive and powerful, used in many of my modern projects.",
      date: "2022-10",
    },
    {
      title: "next.js",
      description:
        "Not a huge fan of React, but Next.js remains the leading framework, with no strong alternatives for native development yet.",
      date: "2022-10",
    },
    {
      title: "express.js",
      description:
        "Express.js is a solid choice for building APIs, widely used despite my mixed feelings about React-based ecosystems.",
      date: "2022-07",
    },
    {
      title: "redux",
      description:
        "Redux is powerful for state management in React apps, though I find it complex compared to newer alternatives.",
      date: "2022-05",
    },
    {
      title: "react.js",
      description:
        "React isn't my favorite, but its popularity and lack of strong native alternatives keep it relevant for many projects.",
      date: "2022-03",
    },
  ];

  function _formatDate(date: string) {
    return new Date(date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
      .toLowerCase();
  }

  let showAll = false;

  $: shownLearnings = showAll ? learnings : [...learnings].slice(0, 3);
</script>

<div class="relative isolate overflow-hidden bg-background">
  <div class="mx-auto max-w-5xl px-6 lg:px-8">
    <div id="learning" class="py-16 md:py-32 section">
      <div class="max-w-2xl">
        <h1
          class="text-4xl font-bold tracking-tight text-base-800 dark:text-base-100 sm:text-5xl"
        >
          always keep learning
        </h1>
        <p class="mt-6 text-base text-base-600 dark:text-base-400">
          one of the things i love most about programming is that there's always
          something new to learn. here's a selection of some of the things i've
          been learning lately:
        </p>
      </div>
      <div
        class="mt-16 md:border-l md:border-base-100 md:pl-6 md:dark:border-base-700/40"
      >
        <div class="flex max-w-3xl flex-col space-y-16">
          {#each shownLearnings as learning}
            <article
              transition:slide
              class="md:grid md:grid-cols-4 md:items-baseline"
            >
              <div
                class="group relative flex flex-col items-start md:col-span-3"
              >
                <div
                  class="text-base font-semibold tracking-tight text-base-800 dark:text-base-100"
                >
                  {learning.title}
                </div>
                <div
                  class="relative z-10 order-first mb-3 flex items-center text-sm text-base-400 dark:text-base-500 pl-3.5 mt-1 md:hidden"
                >
                  <span
                    class="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                  >
                    <!-- svelte-ignore element_invalid_self_closing_tag -->
                    <span
                      class="h-4 w-0.5 rounded-full bg-base-200 dark:bg-base-500"
                    />
                  </span>
                  {_formatDate(learning.date)}
                </div>

                <p
                  class="relative z-10 mt-2 text-sm text-base-600 dark:text-base-400"
                >
                  {learning.description}
                </p>
              </div>
              <div
                class="relative z-10 order-first mb-3 items-center text-sm text-base-400 dark:text-base-500 mt-1 hidden md:block"
              >
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
                aria-label="Update dimensions"
              >
                show more

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="ml-2 h-auto w-4 stroke-base-500 group-hover:stroke-base-700 dark:group-hover:stroke-base-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
