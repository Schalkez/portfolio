---
title: "Bên trong bộ não của AI: Nó không thông minh như bạn nghĩ"
description: "Giải mã cách ChatGPT, Cursor và Claude thật sự ‘nghĩ’ — từ token, context, đến cách khiến chúng đọc doc mới và code không bao giờ lỗi thời."
pubDate: "2025-11-03"
published: true
tags: ["ai", "cursor", "chatgpt", "claude", "rag", "fine-tuning", "workflow"]
author: "Hiền Nguyễn"
---

# Tôi hiểu cách AI nghĩ — và từ đó ép nó code đúng như tôi muốn

> “AI không thay thế dev — nhưng nó sẽ thay thế những dev **không hiểu nó đang hoạt động như thế nào**.”

---

## 1) Sự thật phũ phàng: AI không “hiểu”, nó chỉ **đoán**

Điều đầu tiên bạn phải chấp nhận (dù hơi phũ): ChatGPT, Claude, hay bất cứ “con AI” nào bạn đang dùng **không hiểu** bạn.  
Nó chỉ đang **đoán**.

- Nó thấy `const app =` thì đoán tiếp theo là `express()` **không phải** vì nó “hiểu” Express, mà vì nó đã thấy **hàng triệu** “bài văn mẫu” như vậy trên GitHub.
- Nó là cỗ máy “**nhại**” văn mẫu ở tốc độ ánh sáng.
- Vì chỉ đoán, nên khi thiếu dữ kiện, nó sẽ **bịa hợp lý** (_hallucinate_).

**Bài học của tôi:** Đừng hỏi chung chung. **Mớm** cho nó: cung cấp bối cảnh (schema, README, ví dụ I/O) để nó đoán **đúng thứ bạn muốn**.

---

## 2) Bên trong “hộp đen” — cách AI xử lý prompt

Bạn gõ prompt, nhấn Enter.  
Tưởng đâu nó “hiểu” bạn, nhưng thật ra bên trong là một chuỗi phép toán kỳ dị —  
giống như dev đang debug mà chỉ đọc log, không chạy code.

Hãy tưởng tượng nó đang làm việc kiểu này:

### Bước 1: **Băm prompt ra (Tokenization)**

Nó không thấy chữ, chỉ thấy **các mảnh nhỏ** gọi là token.  
Ví dụ: `"Hello world"` bị cắt thành `["Hel", "lo", " world"]`.  
Câu `"Refactor file A nhưng đừng đụng file B"` cũng bị cắt vụn thành cả trăm mảnh kiểu `"Re"`, `"factor"`, `"file"`, `"A"`, `"đừng"`, `"đụng"`, `"file"`, `"B"`.

### Bước 2: **Đổi mảnh thành số (Embedding)**

Sau khi băm, mỗi mảnh (token) được đổi thành một **vector số** —  
hiểu nôm na là “tọa độ ý nghĩa” trong không gian nhiều chiều.

Ví dụ đơn giản:  
| Token | Vector (minh họa 3 chiều) |
|--------|----------------------------|
| "React" | [0.8, 0.6, 0.1] |
| "Vue" | [0.79, 0.58, 0.15] |
| "Angular" | [0.75, 0.6, 0.2] |
| "con mèo" | [-0.2, 0.1, 0.9] |

Ba token đầu **nằm gần nhau** trong không gian vector vì chúng “na ná” về nghĩa (đều là framework UI).  
“con mèo” thì nằm xa tít — vì về mặt ngữ nghĩa, nó chẳng liên quan gì.

AI không “hiểu” từ React là gì;  
nó chỉ **vẽ bản đồ các điểm vector**,  
rồi dùng khoảng cách giữa chúng (cosine similarity) để suy luận mức độ liên quan.

💡 Gợi ý nhỏ:
• Bảng minh hoạ này chỉ dùng để trực quan — 3 chiều nhìn dễ, chứ thật ra các mô hình embedding thường là 1.000+ chiều.

### Bước 3: **Nhìn toàn cảnh để tập trung (Self-Attention)**

Nó không đọc từ trái sang phải; nó **nhìn toàn bộ bản đồ vector của prompt** cùng lúc,  
rồi quyết định “nên chú ý chỗ nào”.  
Trong câu trên, các vector của “đụng” và “file B” nằm gần nhau,  
nên “file B” được đánh dấu là **vùng cấm sờ tới**.  
Không phải vì nó hiểu lệnh, mà vì trong dữ liệu huấn luyện,  
các câu kiểu “đừng làm X với Y” thường có pattern tương tự.

### Bước 4: **Sinh từng token một (Generation)**

Nó không viết ra nguyên đoạn đâu.  
Nó đoán **1 token tiếp theo**, thêm token đó vào ngữ cảnh,  
rồi **đọc lại toàn bộ “bản đồ vector” hiện tại** trước khi đoán tiếp.  
Lặp đi lặp lại như vậy — từng chữ, từng dòng.

**Ví dụ cụ thể (prompt):**

> _“Viết hàm JavaScript `sum(a, b)` trả về tổng, kèm 1 test Jest đơn giản.”_

Để dễ đọc, mình gom các **token nhỏ** thành **cụm** (thực tế là từng token):

| Vòng | Cụm token sinh ra             | Ngữ cảnh vừa được bổ sung       | Ghi chú                                     |
| ---: | ----------------------------- | ------------------------------- | ------------------------------------------- |
|    1 | `function`                    | `function`                      | Bắt đầu theo “văn mẫu” JS                   |
|    2 | ` sum`                        | `function sum`                  | Chọn tên trùng với prompt                   |
|    3 | `(a, b) {`                    | `function sum(a, b) {`          | Thêm tham số & mở khối                      |
|    4 | ` return a + b;`              | `... { return a + b;`           | Căn cứ ngữ nghĩa _tổng_                     |
|    5 | ` }`                          | `... }`                         | Kết thúc hàm                                |
|    6 | `\n\n`                        | (xuống dòng)                    | Chuẩn bị phần test                          |
|    7 | `test('sum', () => {`         | `test('sum', () => {`           | Jest pattern quen thuộc                     |
|    8 | ` expect(sum(2, 3)).toBe(5);` | `... expect(sum(2,3)).toBe(5);` | **Đọc lại ngữ cảnh** để dùng đúng tên `sum` |
|    9 | ` });`                        | `... });`                       | Kết thúc test                               |

**Kết quả ghép lại:**

````js
function sum(a, b) {
  return a + b;
}

test('sum', () => {
  expect(sum(2, 3)).toBe(5);
});

**Pseudo-code (JS):**

```js
function respond(prompt) {
  let context = textToEmbeddings(prompt);
  let output = [];

  while (true) {
    const richContext = selfAttention(context);
    const nextToken = sample(predictNextToken(richContext));
    if (nextToken === "[END_OF_SEQUENCE]") break;
    output.push(nextToken);
    context.push(tokenToEmbedding(nextToken));
  }

  return tokensToText(output);
}
````

> Nó không “hiểu” bạn đâu.  
> Nó chỉ **đọc lại mọi thứ đã viết**, rồi **đoán chữ kế tiếp sao cho hợp logic nhất**.

---

## 3) Vì sao AI dễ “ngáo” khi bạn dán nhiều code?

AI không “đếm dòng code”, mà đếm **độ phức tạp ý nghĩa**.  
Một file 50 dòng nhiều logic có thể “nặng đầu” hơn cả trăm dòng boilerplate.

Khi bạn dán cả chục file vào Cursor, bên trong nó phải làm thế này:

1. **Chunking:** cắt code thành các mảnh nhỏ (chunk).
2. **Embedding:** biến mỗi mảnh thành tọa độ ý nghĩa.
3. **Retrieval:** khi bạn hỏi, nó chỉ nạp vào những mảnh **có tọa độ gần nhất** với câu hỏi.

Vấn đề là **context (vùng nhớ tạm)** có giới hạn.  
Khi quá tải, AI buộc phải **vứt bớt** những mảnh “ít liên quan” —  
và xui thay, “ít liên quan” theo góc nhìn của nó có khi lại chính là file bạn cần.

> Bạn hỏi `authService`, nhưng chunk `authService` bị rớt,  
> thế là nó lôi `userService` gần gần vào để trả lời.  
> Nghe hợp lý, chạy thì toang.

> **Nói đơn giản:** nó không “ngáo” vì file bạn dài,  
> mà vì **quá nhiều thứ cần nhớ cùng lúc** — giống dev đang debug 10 repo sau 3 đêm không ngủ.

**Cách tôi giảm “ngáo”:**

- Chia nhỏ task, giữ câu hỏi thật rõ ràng.
- Paste file quan trọng **sau cùng** để được ưu tiên.
- Cho ví dụ input/output cụ thể.
- Và luôn nói rõ: “chỉ tập trung vào module này, bỏ qua mấy file khác.”

---

## 4) Model to hơn ≠ Nhớ lâu hơn

Nhiều người nghĩ model to (GPT‑4) “nhớ nhiều hơn” (GPT‑3.5). **Sai.**

- Model lớn chỉ **hiểu sâu** hơn, code **mượt** hơn.
- “Nhớ” được bao nhiêu do **Context Window** (RAM tạm), **không phải** số tham số.

Một GPT‑4 **8K** context vẫn “đuối” hơn Claude **200K** context khi bạn ném 100 trang doc.  
**Quy tắc vàng:** **Prompt hẹp → Kết quả sắc. Prompt phình → Dễ loãng.**

---

## 5) Vì sao nó bịa — và cách tôi “trị bệnh bịa hợp lý”

**Bệnh bịa** đơn giản là: thiếu dữ kiện, nhưng mục tiêu của nó là **phải đoán**, nên đoán “đại mà hợp lý”.

**Cách “trị”:**

- **Mớm doc thật:** ném README, schema, changelog.
- **Ra luật chơi:** “Không chắc? Nói **KHÔNG BIẾT**. **Đừng bịa.**”
- **Bật browsing:** ép “đọc web trước khi trả lời”.
- **Chia nhỏ task:** đừng bắt code cả feature; chia nhỏ và **test sau mỗi module**.

---

## 6) Nó “học” và “quên” ra sao — **RAG vs Fine‑tuning**

Tin buồn: đóng tab chat là **quên sạch**. Mỗi chat = **não mới tinh**.

Muốn “nhớ” codebase của bạn, có hai cách:

| Cách                             | Mục tiêu                                     | Khi dùng                       | Chi phí / Nỗ lực                          |
| -------------------------------- | -------------------------------------------- | ------------------------------ | ----------------------------------------- |
| **Fine‑tuning (Huấn luyện lại)** | “Mổ não” và **nhét** kiến thức riêng         | Cần giọng văn/chuẩn code riêng | 💸 **Cực cao** — như nuôi intern 6 tháng  |
| **RAG (Tra cứu nhanh)**          | Phát “giáo trình” (codebase) **mỗi lần hỏi** | Codebase/doc cập nhật liên tục | ⚡ **Thấp** — nhanh, rẻ, ai cũng làm được |

**Dễ hiểu hơn:** **Fine‑tune = Cử đi học Tiến sĩ 4 năm. RAG = Phát tài liệu thi vấn đáp ngay.**  
Gần như **99%** chúng ta chỉ cần **RAG**.

---

## 7) Cơn ác mộng “Hallucination” về bảo mật

AI bịa lỗi cú pháp thì dễ sửa; **bịa logic hợp lý mà sai** thì **nguy hiểm**.

Ví dụ: viết middleware JWT rất “sạch” nhưng **check sai chiều** (`if (isValid)` thay vì `if (!isValid)`) → **ai cũng pass**.  
Code **đẹp** nhưng là một lỗ hổng **toang hoác**.

**Nguyên tắc:** Không auto‑merge. Soi kỹ **auth, input validation, permission**, và **mọi thứ dính tiền/quyền**.

---

## 8) Ép nó “cập nhật não” như dev thật

Não GPT‑4 “đóng băng” từ 2023. Làm sao bắt nó code **React 19 / Next 15**?

- **Cách “lười” (nhưng nhanh):** bật **browsing** → “**đọc changelog mới nhất rồi hẵng code**”.
- **Cách an toàn (tôi hay dùng):** **copy/paste changelog** vào prompt: “**Đây, đọc cái này.** Refactor lại component kia, **soi deprecated** và **đề xuất refactor**.”
- **Cách pro:** dựng **RAG nội bộ**: tự crawl changelog/GitHub/wiki, lưu **vector DB**, để agent **đọc trước khi code**.

---

## 9) Checklist “huấn luyện” AI (tôi dùng mỗi ngày)

- Biết **model** và **RAM (context)** của nó bao nhiêu.
- Chia feature thành **task nhỏ**, mỗi task có **I/O & tiêu chí pass**.
- Luôn **feed doc thật** (schema, interface, README).
- Bắt nó **tự soi deprecated** và **đề xuất refactor**.
- **Test & review** như duyệt code của **intern** (nhất là auth/permission).

---

## 10) Muốn xem tôi “biểu diễn”?

Bài này là **“lý thuyết về bộ não”**.  
Bài trước là **workflow thực hành** để code nhanh hơn, pass review gọn hơn:  
👉 **[Dev x AI Orchestrator](/vi/blog/post/dev-ai-orchestrator/)**

---

## Tóm tắt (cho ai lười đọc)

- AI **không hiểu**, nó **đoán** dựa trên “văn mẫu”. Muốn đoán đúng → **bối cảnh sạch & hẹp**.
- Nó “**ngu**” khi bạn ném nhiều code vì **RAM (context)** có hạn, buộc phải vứt bớt.
- Muốn **cập nhật kiến thức mới** → dùng **RAG** (đưa changelog/doc cho nó đọc).
- **Tuyệt đối** không tin tưởng phần **bảo mật/quyền/tiền**. **Soi kỹ!**

---

**Viết bởi Hiền Nguyễn** — Fullstack dev tận dụng AI để build nhanh hơn, học nhiều hơn, và ngủ đủ giấc hơn.
