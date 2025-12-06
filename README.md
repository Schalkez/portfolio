# Portfolio cá nhân (Astro + Svelte)

Trang portfolio hiển thị dự án, blog, học tập… được xây dựng bằng Astro 5, Svelte, TailwindCSS và hệ thống i18n hai ngôn ngữ (vi/en).

## Tính năng chính

- **Astro + Svelte islands:** phần tĩnh kết hợp interactive components (Hero 3D, navigation, v.v.).
- **Hỗ trợ đa ngôn ngữ:** dùng `astro-i18n-aut`, tự động build đường dẫn và metadata cho `vi`/`en`.
- **Blog & Projects quản lý bằng Content Collections:** Markdown/MDX trong `src/content`, kèm schema kiểm tra frontmatter.
- **SEO & OG tối ưu:** `BaseHead`, dữ liệu cấu trúc, `og` fallback, `astro config` cấu hình trailing slash.
- **TailwindCSS + tailwind-merge:** theme sáng/tối, typography đã tinh chỉnh trong `tailwind.config.mjs`.
- **High-perf assets:** tắt image service mặc định để dùng assets tĩnh kiểm soát được.

## Cấu trúc thư mục đáng chú ý

- `src/components/` – component UI (Navigation, Blog, Projects, Hero 3D…).
- `src/layouts/` – layout Astro (BaseLayout, BlogPost, ProseWrapper).
- `src/content/` – content collections:
  - `blog/{vi|en}/` – bài viết Markdown.
  - `projects/{vi|en}/` – trang dự án MDX.
  - `main/{vi|en}/` – nội dung trang chính.
- `src/pages/` – routing Astro, gồm `blog/post/[...slug].astro`, RSS/Atom feed, sitemap.
- `astro.config.mjs` – cấu hình integrations (tailwind, mdx, svelte, i18n).
- `tailwind.config.mjs` – theme, typography plugin, custom mdx styling.

## Yêu cầu môi trường

- Node.js ≥ 18.17 (khuyến nghị Node 20 LTS).
- pnpm (Ưu tiên dùng pnpm; cài bằng `npm install -g pnpm` nếu chưa có).

## Khởi chạy local

```bash
pnpm install
pnpm dev
```

Dev server sẽ chạy ở `http://localhost:4321/` (mặc định của Astro). Dùng `CTRL+C` để dừng.

### Build & preview

```bash
pnpm build   # astro build -> sinh static site trong ./dist
pnpm preview # chạy thử bản build cục bộ
```

## Viết bài blog mới

1. Tạo file Markdown trong `src/content/blog/vi/` và bản dịch ở `src/content/blog/en/`.
2. Điền frontmatter theo schema trong `src/content/config.ts`. Ví dụ:

   ```yaml
   ---
   title: "Từ 1 Triệu Đồng 'Tiền Ngu'..."
   description: "Bài học xương máu..."
   pubDate: "2025-12-06"
   published: true
   tags:
     - AWS
     - cloud
   pairSlug:
     en: aws-first-principles
   ---
   ```

3. Nếu hai ngôn ngữ dùng slug khác nhau, bổ sung `pairSlug` để language switcher hoạt động chính xác.
4. Ảnh minh họa đặt trong `src/assets/...` và tham chiếu bằng đường dẫn tuyệt đối (`/src/assets/...`).

## Triển khai

- Chạy `pnpm build` để tạo static output trong `dist/`.
- Có thể deploy lên bất kỳ static host nào (Cloudflare Pages, Netlify, Vercel, S3 + CloudFront...).  
  Với GitHub Actions, chỉ cần upload thư mục `dist/`.
- Đảm bảo biến môi trường/`SITE` trong `src/config.ts` trỏ đúng domain để sitemap & meta chính xác.

## Ghi chú

- Nếu thêm dịch vụ MCP cho việc tra tài liệu tự động, tham khảo mục “Bonus” trong bài blog `dev-ai-orchestrator` để cấu hình.
- Luôn kiểm tra linter/formatting (`@biomejs/biome`) trước khi commit.
