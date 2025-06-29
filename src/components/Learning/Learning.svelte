<script lang="ts">
  import { fade, slide } from "svelte/transition";

  interface Learning {
    title: string;
    description: string;
    date: string;
  }

  interface Props {
    lang: string;
  }

  export let lang: string;

  const learnings: Learning[] = [
    {
      title: "Astro",
      description:
        "Astro is a fresh breeze in web development, offering a lightweight and optimized experience for content-focused static sites. It has quickly become my favorite, surpassing even Svelte in simplicity and efficiency.",
      date: "2025-03",
    },
    {
      title: "Supabase & PostgreSQL",
      description:
        "Exploring Supabase opened a new door with PostgreSQL, blending real-time power with a user-friendly interface. While MongoDB remains my favorite, Supabase offers remarkable flexibility for projects.",
      date: "2024-10",
    },
    {
      title: "Svelte & SvelteKit",
      description:
        "Svelte is my passion in web development. With its simplicity and outstanding performance, SvelteKit powers many personal projects, including this website.",
      date: "2024-06",
    },
    {
      title: "TanStack Query & Zustand & Jotai",
      description:
        "The trio of TanStack Query, Zustand, and Jotai has revolutionized state and data management, delivering a seamless and highly efficient experience in complex applications.",
      date: "2024-03",
    },
    {
      title: "Firebase & Google Cloud Platform",
      description:
        "Firebase and GCP provide robust platforms for storage and deployment. Though MongoDB is my favorite, these tools bring unique strengths to scalable projects.",
      date: "2024-02",
    },
    {
      title: "Fastify",
      description:
        "Fastify offers speed and power for building APIs. While not my top choice, it remains a reliable companion for backend projects.",
      date: "2023-12",
    },
    {
      title: "MySQL",
      description:
        "MySQL delivers tight structure and elegant organization in data management, providing a solid foundation for consistent and beautiful data handling.",
      date: "2023-10",
    },
    {
      title: "Nest.js",
      description:
        "Nest.js offers a clean and powerful framework for Node.js applications, making transitions between MySQL and MongoDB smooth and efficient.",
      date: "2023-09",
    },
    {
      title: "MongoDB",
      description:
        "MongoDB is a game-changer, offering unmatched flexibility in data management and unlocking endless possibilities for creative projects.",
      date: "2023-02",
    },
    {
      title: "TailwindCSS",
      description:
        "TailwindCSS is a new breeze in design, breaking free from traditional CSS constraints. Its flexibility and speed make it a cornerstone in nearly all my recent projects.",
      date: "2023-01",
    },
    {
      title: "Styled-components",
      description:
        "Styled-components makes writing CSS in JavaScript intuitive and powerful, serving as a key pillar in crafting modern interfaces for my projects.",
      date: "2022-10",
    },
    {
      title: "Next.js",
      description:
        "Though not a huge fan of React, Next.js stands as a leading star in web development, with unmatched performance and SEO features that are hard to replace.",
      date: "2022-10",
    },
    {
      title: "Express.js",
      description:
        "Express.js is a solid foundation for building APIs. Despite mixed feelings about the React ecosystem, it remains a trusted choice for backend development.",
      date: "2022-07",
    },
    {
      title: "Redux",
      description:
        "Redux is a powerful tool for state management in React, though I find it complex compared to modern, lighter alternatives.",
      date: "2022-05",
    },
    {
      title: "React.js",
      description:
        "React isn’t my favorite, but its popularity and vast ecosystem keep it a significant choice for many projects.",
      date: "2022-03",
    },
  ];

  // Nội dung tiếng Việt cho learnings
  const learningsVi: Learning[] = [
    {
      title: "Astro",
      description:
        "Astro là một luồng gió mới trong phát triển web, mang đến trải nghiệm nhẹ nhàng và tối ưu cho các trang tĩnh tập trung vào nội dung. Nó nhanh chóng trở thành yêu thích của tôi, vượt qua cả Svelte về sự đơn giản và hiệu quả.",
      date: "2025-03",
    },
    {
      title: "Supabase & PostgreSQL",
      description:
        "Khám phá Supabase mở ra một cánh cửa mới với PostgreSQL, kết hợp sức mạnh thời gian thực và giao diện thân thiện. Dù trái tim tôi vẫn thuộc về MongoDB, Supabase mang đến sự linh hoạt đáng kinh ngạc cho các dự án.",
      date: "2024-10",
    },
    {
      title: "Svelte & SvelteKit",
      description:
        "Svelte là ngọn lửa đam mê của tôi trong phát triển web. Với sự đơn giản và hiệu suất vượt trội, SvelteKit đã trở thành trái tim của các dự án cá nhân, bao gồm cả website này.",
      date: "2024-06",
    },
    {
      title: "TanStack Query & Zustand & Jotai",
      description:
        "Bộ ba TanStack Query, Zustand và Jotai đã cách mạng hóa cách tôi quản lý trạng thái và dữ liệu. Chúng mang đến trải nghiệm mượt mà, giúp các ứng dụng phức tạp trở nên dễ dàng và hiệu quả.",
      date: "2024-03",
    },
    {
      title: "Firebase & Google Cloud Platform",
      description:
        "Firebase và GCP là những nền tảng mạnh mẽ cho lưu trữ và triển khai. Dù MongoDB vẫn giữ vị trí yêu thích, các công cụ này mang đến điểm mạnh độc đáo cho các dự án cần mở rộng.",
      date: "2024-02",
    },
    {
      title: "Fastify",
      description:
        "Fastify là tốc độ và sức mạnh trong việc xây dựng API. Dù không phải lựa chọn hàng đầu của tôi, nó vẫn là một người bạn đồng hành đáng tin cậy cho các dự án backend.",
      date: "2023-12",
    },
    {
      title: "MySQL",
      description:
        "MySQL mang đến sự chặt chẽ và tổ chức rõ ràng trong quản lý dữ liệu. Nó là một nền tảng vững chắc để đảm bảo tính nhất quán và đẹp mắt trong các dự án.",
      date: "2023-10",
    },
    {
      title: "Nest.js",
      description:
        "Nest.js là bộ khung mạnh mẽ cho các ứng dụng Node.js, với cấu trúc sạch sẽ giúp việc chuyển đổi giữa MySQL và MongoDB trở nên mượt mà và hiệu quả.",
      date: "2023-09",
    },
    {
      title: "MongoDB",
      description:
        "MongoDB là một bước ngoặt, mang đến tính linh hoạt vô song trong quản lý dữ liệu. Nó mở ra vô số khả năng để tôi sáng tạo trong các dự án.",
      date: "2023-02",
    },
    {
      title: "TailwindCSS",
      description:
        "TailwindCSS là luồng gió mới trong thiết kế, phá vỡ quy ước của CSS truyền thống. Với tính linh hoạt và tốc độ, nó đã trở thành trụ cột trong hầu hết các dự án gần đây.",
      date: "2023-01",
    },
    {
      title: "Styled-components",
      description:
        "Styled-components làm cho việc viết CSS trong JavaScript trở nên trực quan và mạnh mẽ. Nó là chìa khóa để tạo ra giao diện hiện đại trong các dự án của tôi.",
      date: "2022-10",
    },
    {
      title: "Next.js",
      description:
        "Dù không phải fan lớn của React, Next.js vẫn là ngọn cờ đầu trong phát triển web, với hiệu suất và tính năng SEO khó có đối thủ thay thế.",
      date: "2022-10",
    },
    {
      title: "Express.js",
      description:
        "Express.js là nền tảng vững chắc để xây dựng API. Dù tôi có cảm xúc lẫn lộn với hệ sinh thái React, nó vẫn là lựa chọn đáng tin cậy cho backend.",
      date: "2022-07",
    },
    {
      title: "Redux",
      description:
        "Redux là công cụ mạnh mẽ để quản lý trạng thái trong React, nhưng tôi thấy nó phức tạp so với các giải pháp hiện đại và nhẹ nhàng hơn.",
      date: "2022-05",
    },
    {
      title: "React.js",
      description:
        "React không phải yêu thích của tôi, nhưng sự phổ biến và hệ sinh thái rộng lớn khiến nó vẫn là lựa chọn quan trọng trong nhiều dự án.",
      date: "2022-03",
    },
  ];

  // Lấy nội dung theo ngôn ngữ
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
        "một trong những điều tôi yêu thích nhất về lập trình là luôn có điều mới để học. đây là một số thứ tôi đã học gần đây:",
      showMore: "xem thêm",
    },
  };

  const content = titles[lang as keyof typeof titles] || titles.en;
  const currentLearnings = lang === "vi" ? learningsVi : learnings;

  function _formatDate(date: string) {
    return new Date(date)
      .toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
        year: "numeric",
        month: "long",
      })
      .toLowerCase();
  }

  let showAll = false;

  $: shownLearnings = showAll
    ? currentLearnings
    : [...currentLearnings].slice(0, 3);
</script>

<div class="relative isolate overflow-hidden bg-background">
  <div class="mx-auto max-w-5xl px-6 lg:px-8">
    <div id="learning" class="py-16 md:py-32 section">
      <div class="max-w-2xl">
        <h1
          class="text-4xl font-bold tracking-tight text-base-800 dark:text-base-100 sm:text-5xl"
        >
          {content.title}
        </h1>
        <p class="mt-6 text-base text-base-600 dark:text-base-400">
          {content.description}
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
                {content.showMore}

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
