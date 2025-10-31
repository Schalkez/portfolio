---
title: "Dùng Biome thay cho combo ESLint + Prettier — Tại sao không?"
description: "Không phải vì ESLint + Prettier dở, mà vì Biome đang làm điều tương tự… nhanh hơn, gọn hơn."
pubDate: "2025-10-29"
published: true
tags: ["Biome", "ESLint", "Prettier", "tooling"]
slug: "dung-biome-thay-cho-eslint-prettier"
author: "Hien Nguyen"
ogTitle: "Dùng Biome thay cho combo ESLint + Prettier — Tại sao không?"
ogDescription: "Không phải vì ESLint + Prettier dở, mà vì Biome đang làm điều tương tự… nhanh hơn, gọn hơn."
pairSlug:
  en: "use-biome-instead-eslint-prettier"
---

# Dùng Biome thay cho combo ESLint + Prettier — Tại sao không?

> "Không phải vì ESLint + Prettier dở, mà vì Biome đang làm điều tương tự… nhanh hơn, gọn hơn."

Nếu bạn là một lập trình viên JavaScript/TypeScript, có lẽ bạn không thể sống thiếu "bộ đôi quyền lực": ESLint (để tìm lỗi và đảm bảo chất lượng code) và Prettier (để định dạng code nhất quán). Chúng là tiêu chuẩn vàng.

Nhưng... việc cài đặt, cấu hình và duy trì cả hai công cụ này (cùng với các plugin để chúng "chơi" với nhau như eslint-plugin-prettier hay eslint-config-prettier) đôi khi khá mệt mỏi.

- Cấu hình xung đột.
- Thời gian chạy lint và format trong CI/CD hoặc pre-commit hook ngày càng chậm.
- Thư mục node_modules ngày càng phình to.

Đây chính là lúc Biome xuất hiện.

## Biome là gì?

Biome (trước đây là Rome) là một toolchain (bộ công cụ) "tất cả trong một" dành cho web, được viết bằng Rust.

"Tất cả trong một" ở đây có nghĩa là nó đặt mục tiêu thay thế nhiều công cụ riêng lẻ. Ngay tại thời điểm này, nó đã là một linter VÀ formatter cực kỳ mạnh mẽ cho JavaScript, TypeScript, và JSX.

Và đây là điểm mấu chốt: Nó được thiết kế từ đầu để thực hiện cả hai vai trò đó một cách thống nhất.

## 1. Tốc độ (Lý do ăn tiền nhất)

Đây là thứ bạn sẽ nhận thấy ngay lập tức. Biome nhanh. Nhanh đến mức kinh ngạc.

ESLint và Prettier được xây dựng trên Node.js (JavaScript). Biome được xây dựng bằng Rust. Khi nói đến hiệu năng xử lý hàng ngàn file, Rust gần như luôn chiến thắng.

Theo benchmark của Biome, nó có thể:

- Format code nhanh hơn Prettier ~35 lần.
- Lint code nhanh hơn ESLint ~15 lần.

Tốc độ này không chỉ là để "cho oai". Nó có nghĩa là:

- Trải nghiệm trong VS Code (khi lưu file) mượt mà gần như tức thì.
- Pre-commit hook chạy trong nháy mắt.
- Pipeline CI/CD của bạn tiết kiệm được vài phút quý giá.

## 2. Sự đơn giản (Chỉ một công cụ)

Đây là cơn ác mộng cấu hình mà Biome giải quyết:

| Trước đây (ESLint + Prettier)                  | Bây giờ (Với Biome)            |
| ---------------------------------------------- | ------------------------------ |
| npm i eslint prettier                          | npm i @biomejs/biome           |
| npm i eslint-plugin-react                      | (Đã tích hợp sẵn)              |
| npm i @typescript-eslint/parser                | (Đã tích hợp sẵn)              |
| npm i @typescript-eslint/eslint-plugin         | (Đã tích hợp sẵn)              |
| npm i eslint-config-prettier (để tắt xung đột) | (Không cần - vì là một)        |
| .eslintrc.json                                 | biome.json                     |
| .prettierrc                                    | (Không cần)                    |
| .eslintignore                                  | (Không cần, dùng chung config) |

Với Biome, bạn chỉ cần một dependency và một file cấu hình biome.json.

Vì linter và formatter là cùng một công cụ, chúng không bao giờ xung đột với nhau. Bạn không cần phải cài thêm plugin để "tắt" các quy tắc format của linter để nhường chỗ cho Prettier. Chúng được sinh ra để hoạt động cùng nhau.

## 3. Chẩn đoán lỗi tuyệt vời

Biome không chỉ ném ra một thông báo lỗi. Nó thường giải thích tại sao đó là lỗi và cung cấp các đề xuất sửa lỗi (autofix) rất rõ ràng. Trải nghiệm gỡ rối và học hỏi từ linter tốt hơn hẳn.

## 4. Nó tương thích cao với Prettier

Đội ngũ Biome hiểu rằng Prettier là tiêu chuẩn. Vì vậy, họ đã nỗ lực để đảm bảo Biome có độ tương thích ~97% với các tùy chọn định dạng của Prettier.

Điều này có nghĩa là nếu bạn di chuyển một dự án đang dùng Prettier sang Biome, bạn sẽ thấy rất ít thay đổi về định dạng. Quá trình chuyển đổi trở nên cực kỳ dễ dàng.

## Vậy, có "nhược điểm" nào không?

Tất nhiên, không có gì là hoàn hảo.

- **Hệ sinh thái Plugin (Ecosystem):** ESLint đã tồn tại rất lâu và có một hệ sinh thái plugin khổng lồ cho mọi thứ (ví dụ: eslint-plugin-vue, eslint-plugin-svelte, các bộ quy tắc riêng của công ty). Biome vẫn còn mới và hệ sinh thái plugin của nó chưa thể so sánh được. (Tuy nhiên, nó đã hỗ trợ React/JSX và TypeScript gốc rất tốt).
- **Tính "cố chấp" (Opinionated):** Giống như Prettier, Biome khá "cố chấp" về cách định dạng code. Dù nó cung cấp nhiều tùy chọn hơn Prettier, nhưng nếu team của bạn có những quy tắc format quá đặc thù, bạn có thể gặp khó khăn.

## Cách để bắt đầu thử

Bạn không cần phải xóa ESLint/Prettier ngay. Hãy thử Biome trong 5 phút:

Cài đặt:

```bash
npm install --save-dev --save-exact @biomejs/biome
```

Khởi tạo file cấu hình:

```bash
npx @biomejs/biome init
```

(Thao tác này sẽ tạo ra một tệp biome.json)

Chạy format và lint:

```bash
# Chạy format và ghi đè file
npx @biomejs/biome format --write .

# Chạy lint và tự động sửa các lỗi an toàn
npx @biomejs/biome lint --apply .
```

Cài đặt Extension cho VS Code:
Tìm "Biome" trên Marketplace của VS Code và cài đặt. Nó sẽ tự động nhận diện biome.json và trở thành linter/formatter mặc định cho dự án của bạn.

## Kết luận: "Tại sao không?"

Quay lại câu trích dẫn ban đầu: ESLint và Prettier không hề dở. Chúng đã phục vụ cộng đồng rất tốt.

Nhưng Biome đang cung cấp một giải pháp thay thế hiện đại, giải quyết trực tiếp những điểm yếu lớn nhất của bộ đôi cũ: tốc độ và sự phức tạp trong cấu hình.

Đối với dự án mới? Gần như không có lý do gì để không bắt đầu với Biome.

Đối với dự án hiện tại? Hãy thử chạy Biome. Bạn có thể sẽ ngạc nhiên về tốc độ và sự đơn giản mà nó mang lại.

Đã đến lúc chúng ta có một toolchain nhanh hơn, gọn hơn. Và Biome chính là câu trả lời đó.
