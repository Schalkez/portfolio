---
title: "Tôi dùng AI để code nhanh gấp 10 — mà vẫn pass review như senior"
description: "Cách dev hiện đại dùng AI agent (Cursor, ChatGPT Codex...) để build nhanh hơn, sạch hơn, và luôn kiểm soát codebase."
pubDate: "2025-10-27"
published: true
tags:
  [
    "AI",
    "developer",
    "workflow",
    "productivity",
    "system design",
    "chatgpt",
    "claude",
    "orchestrator",
  ]
---

# Tôi dùng AI để code nhanh gấp 10 — mà vẫn pass review như senior

> "AI không thay thế dev — nó chỉ thay thế những người không hiểu mình đang làm gì."

---

## Câu chuyện quen thuộc

Chắc bạn từng thấy (hoặc chính bạn đã từng là người đó):

### Scene 1: Anh Thiện – Ném hết spec vô AI rồi... ngồi đợi phép màu

Dán nguyên project plan dài 200 dòng vô Cursor: “mày lo hết đi nha”.  
→ AI gật đầu, code ra app chạy được thật — UI mượt cực, nhưng **bấm “Save” thì mở modal “Delete”, fix 1 bug mọc thêm 10 bug mới.**

Vì sao?  
Vì AI chỉ “hiểu tạm thời” trong context hiện tại, không thể nhớ nổi toàn bộ flow hệ thống như dev thật.  
Khi ông nhét 5–6 tính năng chồng lên nhau trong một prompt, phần sau sẽ đè phần trước, logic bị rối, và AI phải **bịa code hợp lý trong phạm vi nó còn nhớ được**.  
Thế là bug nối bug, như hiệu ứng domino.

👉 Prompt càng to, context càng loãng.  
Muốn AI code ổn, hãy chia nhỏ từng feature, feed lại context cũ, và để nó “suy nghĩ từng phần” như dev thật.

---

### Scene 2: Anh Sang ở đội Anti-AI

> "AI ngu vãi, code dở ẹc"  
> → Trong khi prompt chỉ vỏn vẹn: "code website bán hàng đi".

Nghe quen đúng không?  
Thật ra AI không ngu — chỉ là bạn chưa biết cách làm việc với nó.

---

## Sự thật: AI giống như một đội junior dev siêu tốc

Nó có những ưu điểm:

- Code nhanh như điện
- Không cần nghỉ
- Không đòi tăng lương

Nhưng nó cần bạn:

- Chỉ rõ mục tiêu
- Review kết quả
- Hướng dẫn cách làm đúng

Và đó chính là cách tôi dùng AI mỗi ngày.  
Dưới đây là quy trình cụ thể tôi đang áp dụng.

---

## 3 bước để làm chủ AI (thay vì bị AI dắt mũi)

### Bước 1: Trò chuyện với AI như đang phân tích yêu cầu với khách hàng

Trước khi code, tôi dùng ChatGPT hoặc Claude để hiểu vấn đề thật sự.

Ví dụ:

```
Bạn: "Tôi muốn build tính năng tracking price cho 1 product url bất kì"

AI: "OK, cho tôi hỏi:
- Bạn muốn theo dõi giá cho cá nhân?
- Có cần real-time alert?
- Bạn muốn track ở mọi domain?
- Muốn crawl định kỳ (ví dụ 6h/lần) hay on-demand khi user vào trang?
- Mức scale mong muốn: 100 URL, 10 000 URL, hay 1 000 000 URL?"
```

Tôi để AI hỏi ngược lại mình — 5 phút này thường giúp tôi:

- Nhìn ra các trường hợp đặc biệt
- Chọn đúng giải pháp
- Tránh sai hướng ngay từ đầu

> Mẹo: Hỏi AI "Tôi nên tự hỏi những câu nào trước khi build tính năng này?"

---

### Bước 2: Để AI lập kế hoạch chi tiết

Sau khi chọn được hướng đi, tôi nói:

```
"Tạo danh sách công việc chi tiết cho tính năng đăng nhập.
Mỗi task phải có:
- Input/output rõ ràng
- Tiêu chí hoàn thành cụ thể
- Test case cần có"
```

AI sẽ tạo ra một kế hoạch kiểu này:

```
Task 1: Thiết kế database schema cho User
Task 2: Xây dựng JWT service
Task 3: Tạo API endpoint đăng nhập
...
```

Sau khi AI trả về kế hoạch, **đừng làm theo ngay**.

Đây là lúc con người phải **vào vai tech lead** – xem lại xem:

- Kế hoạch đó có khả thi thật không?
- Dữ kiện AI đang dựa vào có đủ chưa?
- Có phụ thuộc vào thư viện, API hay công nghệ nào chưa chắc dùng được không?

Nếu thấy **chưa hợp lý hoặc còn thiếu dữ kiện**, hãy hỏi ngược lại ngay:

```
“Kế hoạch này có vẻ ổn, nhưng chỗ này dùng queue kiểu gì?”
“Lib đó có stable không?”
“Nếu thay phần này bằng Graphile Worker thì vẫn đúng logic chứ?”
...
```

Hoặc nếu **phần lớn plan ổn nhưng có 1 mảnh chưa chắc ăn**, hãy cho AI thử gợi ý cách khác:
“Phần cron job này khó deploy trên Cloud Run, có cách nào khác mà vẫn đảm bảo periodic task không?”

> Đây chính là điểm khác giữa người _dùng AI_ và người _chỉ đạo AI_:  
> **AI có thể lập kế hoạch — nhưng bạn quyết định kế hoạch đó có được duyệt hay không.**

<!-- Giờ tôi có lộ trình rõ ràng, không còn cảm giác "chẳng biết bắt đầu từ đâu". -->

---

### 🧱 Trước khi code: Dựng nền và ép luật chơi cho AI agent (Cursor, ChatGPT Codex...)

Đừng vội bảo **Cursor** hay **ChatGPT Codex** “code cho tôi tính năng X” khi project của ông còn trống trơn.  
**Trước khi viết dòng code đầu tiên, hãy dựng codebase chuẩn chỉnh trước.**

Cụ thể:

1. **Khởi tạo project với kiến trúc rõ ràng** — theo DDD hoặc module hóa hợp lý.
2. **Cài đầy đủ công cụ kiểm soát chất lượng:**
   - ESLint, Prettier, Husky, Lint-staged
   - Đặt rule chặt: không `any`, không ép kiểu bừa, cấm `console.log`, v.v.
3. **Đặt nguyên tắc code:** DRY, KISS, SOLID — để ép **AI agent** code theo văn hóa kỹ thuật của bạn.
4. **Tạo file README mô tả mục tiêu và guideline code** — để khi bạn bảo “đọc lại codebase”, **Cursor** hay **Codex** có thứ để bám.

> Vì sao bước này cực kỳ quan trọng?  
> Vì nó giúp “đặt sân chơi” cho AI agent. Khi luật rõ ràng, **Cursor** sẽ viết code theo phong cách và rule của bạn,  
> còn nếu không, nó sẽ code theo _tưởng tượng riêng_ của nó — và đó là lúc bug bắt đầu đẻ con.

---

### 💾 Commit như checkpoint — đừng để Cursor “chơi chết không hồi sinh”

Mỗi khi xong một tính năng, **hãy commit đầy đủ lên GitHub**.  
Lý do rất đơn giản: **Cursor** hoặc **Codex** đôi khi hiểu sai prompt hoặc mất context,  
và code có thể “chệch đường ray” mà ông không kịp nhận ra.

Khi có commit rõ ràng:

- Nếu AI đi sai hướng → revert lại “checkpoint” gần nhất như hồi sinh trong game.
- Giúp AI mới (Cursor hoặc Codex chat mới) đọc lại codebase dễ hơn vì cấu trúc, commit message rõ ràng.

> Coi mỗi commit là một **mốc an toàn**.  
> Chết thì load lại chứ đừng chơi lại từ đầu.

---

### 🧪 Viết test ngay sau mỗi module — để AI tự kiểm tra chính nó

Sau khi hoàn thành **một module hoặc một tính năng**, đừng nhảy sang phần tiếp theo ngay.  
**Bảo Cursor hoặc ChatGPT Codex viết test case** cho phần vừa xong (unit test, integration test, hoặc E2E tuỳ scope).

Ví dụ prompt:
Viết test case cho module Auth (đăng nhập, đăng ký, refresh token) dùng Jest.
Bao gồm cả trường hợp lỗi và edge case.

Sau đó:

- **Review kỹ từng test** xem có case nào bị bỏ sót không.
- **Chạy test thực tế** để chắc rằng AI hiểu đúng logic code mà nó vừa sinh ra.
- Nếu test fail, dùng chính test đó làm context để bảo AI refactor lại code.

> Đây là cách “ép AI chịu trách nhiệm với code của nó”.  
> Khi mỗi phần có test riêng, bạn vừa có tài liệu sống, vừa tránh việc fix bug này sinh ra bug khác.

---

### 🔄 Khi context đầy — reset và dạy lại Cursor / Codex từ đầu

Khi cuộc hội thoại đã quá dài, **Cursor** hoặc **Codex** sẽ bắt đầu “quên chuyện cũ” hoặc hiểu sai logic.  
Đó là dấu hiệu context bị quá tải.

**Cách xử lý đúng:**

1. Mở chat mới (reset context trong Cursor hoặc start thread mới với Codex).
2. Trước khi hỏi tiếp, nói rõ:
   > “Ê, mày hãy đọc lại code của worker trong codebase A”
3. Sau khi AI đọc xong, yêu cầu nó **tóm tắt lại flow hiện tại** (ví dụ: “a → b → c đúng không?”).
4. Khi confirm xong mới tiếp tục yêu cầu code phần dở dang.

> Giống như khi load game, hãy chắc rằng AI nhớ đúng chỗ mình đang đứng.

---

### Bước 3: Code cùng AI Agent (CursorAI, ChatGPT Codex) — nhưng bạn giữ quyền kiểm soát

Đây là phần quan trọng nhất: Đừng bao giờ approve code của AI mà không hiểu.

Khi AI viết code, tôi:

#### Hỏi lại:

```
"Thuật toán mã hóa nào phù hợp với làm checksum?"
"Đoạn get all products này, query 1 phát thế lỡ có cả ngàn product vào RAM 1 lần thì sao?"
```

#### Yêu cầu giải thích:

```
"Giải thích từng bước của function parse DOM này"
"Hàm này có nên pipeline hóa không? Vì sao?"
```

#### Bắt refactor:

```
"Code này hơi rối phần xử lý bất đồng bộ, viết lại bằng Lodash và Rxjs cho dễ đọc hơn"
"Tách function util này ra, không nên để chung với file service"
"Module search chưa chuẩn SOLID, bạn hãy lên refactor todo để tôi review các bước sẽ làm"
```

Kết quả: tôi vừa học thêm, vừa có code chuẩn, vừa hiểu toàn bộ flow hệ thống.

---

## Thay đổi tư duy: Từ "Người code" → "Người thiết kế hệ thống"

**Trước đây (chưa có AI):**

- Viết từng dòng code
- Chìm trong code lặp đi lặp lại
- Google syntax suốt ngày

**Giờ (với AI):**

- Tập trung vào thiết kế hệ thống & kiến trúc
- Để AI xử lý các phần lặp lại
- Bạn kiểm soát logic, bảo mật, test

> Bạn không còn là "người xây nhà" — mà là người thiết kế và giám sát công trình.

---

## 3 điều tuyệt đối không nên làm với AI

Copy code mà không đọc — bug chắc chắn sẽ tới.  
Tin AI mù quáng — nó có thể bịa API hoặc dùng cách đã có từ thời khủng long.  
Bỏ qua test — code AI viết mà không test = bom nổ chậm.

---

## Những kỹ năng vẫn là vũ khí chính

AI giúp bạn tăng tốc, nhưng không thể thay thế:

1. Tư duy hệ thống — hiểu cách mọi thứ kết nối với nhau
2. Kỹ năng debug — biết cách tìm và sửa lỗi
3. Tư duy bảo mật — nhận ra lỗ hổng tiềm ẩn
4. Review code — phân biệt code tốt và code dở
5. Viết test — đảm bảo code ổn định và an toàn

> Đây là thứ AI không có — chỉ con người có khả năng phán đoán.

---

## Kết luận

> AI không thay thế bạn — nó nâng cấp bạn.

**Người thắng với AI là người:**

- Biết kiến thức nền tảng (code, database, hệ thống)
- Đặt câu hỏi tốt
- Học hỏi từ AI mỗi ngày
- Giữ quyền kiểm soát cuối cùng

**Người thua là:**

- Copy mà không hiểu
- Không test
- Không chịu học tiếp

Bạn chọn ở phe nào?

---

## Thử ngay hôm nay

Lần tới khi code, thử làm khác đi:

1. Đừng Google ngay
2. Hỏi AI: "Tôi đang gặp vấn đề X, giúp tôi hiểu rõ trước khi giải quyết"
3. Để AI hỏi ngược lại bạn
4. Chọn hướng → Bảo AI code → Review kỹ

Tin tôi đi — bạn sẽ thấy sự khác biệt ngay.

---

**P/S:** Nếu bạn thấy bài viết này hữu ích, hãy share cho đồng nghiệp nhé!  
Càng nhiều dev biết dùng AI đúng cách, cộng đồng dev Việt càng mạnh.

_Written by [Hien Nguyen](https://facebook.com/nguyenhien2611) – Fullstack Dev tận dụng AI để build nhanh hơn, học nhiều hơn, và ngủ đủ giấc hơn._
