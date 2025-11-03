---
title: "Bên trong bộ não của AI: Nó không thông minh như bạn nghĩ"
description: "Giải mã cách ChatGPT, Cursor và Claude thật sự ‘nghĩ’ — từ token, context, đến cách khiến chúng đọc doc mới và code không bao giờ lỗi thời."
pubDate: "2025-11-03"
published: true
tags: ["ai", "cursor", "chatgpt", "claude", "workflow"]
author: "Hiền Nguyễn"
---

# Tôi hiểu cách AI nghĩ — và từ đó ép nó code đúng như tôi muốn

> “AI không thay thế dev — nhưng nó sẽ thay thế những dev **không hiểu nó đang hoạt động như thế nào**.”

---

## Câu chuyện mở đầu

Tôi từng nghĩ AI là phép màu.  
Nó code React mượt, test pass, UI lung linh.  
Cho đến khi tôi hỏi:

> “Ê, sao hàm `updateUser()` lại... xóa luôn cả user?”

AI trả lời tỉnh queo:

> “Vì pattern này phổ biến trong dataset.”

Tôi cười.  
Không phải vì vui — mà vì tôi hiểu ra một điều:  
**AI không hiểu cái gì cả. Nó chỉ đoán.**

Và nếu dev không hiểu cách nó đoán,  
thì AI chỉ là một thằng intern siêu tốc — **đoán nhanh, nhưng đoán sai cũng nhanh.**

---

## 1. Sự thật hơi phũ: nó không hiểu gì đâu, nó chỉ giỏi đoán

ChatGPT, Claude, Cursor... không có “ý định”, không có “ý thức”,  
nó chỉ là một mô hình ngôn ngữ được train để **đoán từ (token) tiếp theo hợp lý nhất** trong câu bạn vừa gõ.

Ví dụ:

- Bạn gõ: `const app =`
- Nó đoán: `express()`
- Không phải vì hiểu Express là gì,  
  mà vì trong hàng tỷ dòng code, pattern “app = express()” là thứ **phổ biến nhất**.

AI giống autocomplete — nhưng được độ lại với steroid.

---

### Lần tôi bị “bịa” API

Hồi mới dùng, tôi hỏi:

> “API để upgrade user lên premium là gì?”

Nó trả lời siêu tự tin:  
`POST /api/v1/users/premium/upgrade`

Tôi implement xong, test 404.  
Không có endpoint nào như vậy.  
Nó bịa. Một cách rất hợp lý.

Và đó là lúc tôi hiểu:

> **Nó không hiểu. Nó chỉ nhớ mơ hồ những pattern trông giống.**

---

## 2. Bên trong bộ não của nó — Transformer, Attention và cái gọi là Context

Tôi sẽ không giải thích kiểu giáo trình.  
Nói đơn giản:

- Nó đọc mọi thứ bạn gõ **song song**, chứ không từ trái qua phải.
- Nó “ngó lại” những phần quan trọng bằng cơ chế gọi là **attention**.
- Và nó chỉ “nhớ” được trong một vùng tạm gọi là **context window** — kiểu như RAM.

### Attention là gì — hiểu kiểu dev

Khi bạn viết:

> “Refactor file A nhưng **đừng đụng vào file B**.”  
> AI sẽ “đánh dấu” file B là vùng **không nên can thiệp**.  
> Đó chính là attention — nó “chú ý” phần có trọng số cao trong prompt.

Mỗi khi bạn chat, đó là **một phiên làm việc mới**.  
Khi context đầy, nó **quên mất phần đầu** —  
giống dev 3 ngày không ngủ: đọc code xong, 10 phút sau quên hết.

---

## 3. Token — Attention — Context: nghe học thuật vậy thôi

Thực ra hiểu kiểu dev sẽ dễ hơn:

- **Token** là mảnh nhỏ của text: `"function"`, `"return"`, `"()"`.
- **Attention** là cơ chế nó dùng để “chú ý” chỗ quan trọng.
- **Context** là cái RAM tạm thời — và nó có giới hạn.

Ví dụ:  
Bạn paste 10 file code vào Cursor để refactor.  
Lúc đầu, nó hiểu hết, trả lời mượt.  
Đến khi hỏi lại `authService`, nó bảo: “hàm đó chưa được định nghĩa”.  
Không phải nó khùng, mà vì **file đó bị rơi khỏi trí nhớ** — context tràn rồi.

---

### Lần tôi thử nhét 20 file vào Cursor

Tôi refactor module `auth`, nghĩ “đưa hết vô cho nó hiểu tổng thể”.  
Paste một phát 20 file — `auth.service.ts`, `jwt.util.ts`, `user.repository.ts`...

- 10 phút đầu: refactor đẹp, comment tử tế.
- 15 phút sau: bắt đầu viết trùng function.
- 20 phút: **quên luôn `TokenService` ở file đầu tiên.**

Lúc đó tôi mới hiểu:

> “Nó không mệt. Nó chỉ… hết RAM.”

---

## 4. AI “hiểu” code như thế nào (và vì sao nó vẫn sai)

AI không chạy code — nó **mô phỏng cách code vận hành** dựa trên pattern.  
Khi nó thấy `if (x > 0)`, nó không thật sự tính toán, chỉ nghĩ:

> “Ờ, mấy chỗ như này thường sẽ có return hoặc log ở dưới.”

Nên nhiều khi code nhìn đúng nhưng logic lại sai.  
Giống junior nhìn syntax thì chuẩn, chạy lại bug.

👉 Muốn nó “hiểu sâu” hơn:

- Cho **test case, input, expected output** rõ ràng.
- Bảo: “Giải thích vì sao test này pass hoặc fail.”
- Đừng chỉ bảo “viết code”, mà thêm context của **vấn đề**.

AI không cần bạn dạy cú pháp. Nó cần bạn dạy **mục tiêu**.

---

## 5. Mô hình càng lớn, não càng to — nhưng vẫn có giới hạn

Model càng to thì **hiểu ngữ cảnh sâu hơn, đoán mượt hơn**,  
nhưng khả năng **nhớ lâu** vẫn phụ thuộc vào **context window**.

Và kể cả bạn có model 1 triệu token,  
nếu quăng nguyên project vào 1 prompt,  
nó vẫn sẽ _tẩu hỏa nhập ma._

> Prompt càng hẹp, kết quả càng sắc.  
> Prompt càng phình, ý càng loãng.

---

## 6. Vì sao nó bịa — và cách để đỡ bịa

Khi thiếu dữ kiện, nó không nói “tôi không biết”.  
Nó **đoán** thứ **nghe hợp lý nhất**.

**Ví dụ:**

> “Trong Next.js 15, cách fetch server-side mới là gì?”  
> — “Dùng getServerSideProps như bình thường.”  
> (App Router: _tôi đi đây..._)

### Cách trị bệnh “bịa hợp lý”

1. **Feed doc thật:** README, schema, changelog, release note
2. **Ra luật rõ:** “Không chắc → nói UNKNOWN. Không đoán.”
3. **Bắt đọc web trước khi code** (nếu có browsing)
4. **Chia nhỏ prompt:** đừng nhồi cả repo vô 1 lần

AI không ngu, chỉ là **nó không có dữ kiện.**  
Bạn càng cho “data sạch”, kết quả càng đúng.

---

## 7. Nó “học” và “quên” như thế nào

- Mỗi lần chat = một “não tạm” mới.
- Nó không ghi nhớ dài hạn (trừ khi bạn build agent có memory).
- Muốn “nhớ codebase” → dùng **RAG (Retrieval-Augmented Generation)**.

> Có 2 cách dạy AI: hoặc **thay não**, hoặc **đưa giáo trình mới mỗi ngày.**

### RAG vs Fine-tuning (dev version)

| Cách            | Mục tiêu                          | Khi dùng                               | Chi phí / Nỗ lực                                    |
| --------------- | --------------------------------- | -------------------------------------- | --------------------------------------------------- |
| **Fine-tuning** | Train lại model với dữ liệu riêng | Khi muốn AI nói đúng style công ty     | 💸 Cao: cần dataset lớn, tốn thời gian & tiền train |
| **RAG**         | Cho AI truy xuất doc thật mỗi lần | Khi muốn nó luôn hiểu version mới nhất | ⚡ Thấp: nhanh, rẻ, dễ cập nhật data                |

> Nói nôm na: Fine-tuning là **dạy lại não**, RAG là **đưa tài liệu cho nó tra cứu.**

---

## 8. Chunking, Embedding & vì sao prompt dễ loãng

Khi bạn dán code vào Cursor hay ChatGPT, AI sẽ làm ba việc:

1. **Chunking:** băm code hoặc doc thành các mảnh nhỏ (chunks).
2. **Embedding:** biến mỗi chunk thành **tọa độ vector** trong không gian ngữ nghĩa.
3. **Retrieval:** khi bạn hỏi, nó tìm các chunk có “tọa độ gần nhất” với câu hỏi của bạn.

Nhờ vậy, nó biết `authService` gần nghĩa với `userSession`,  
chứ không phải `auth.css`.

Nhưng khi bạn paste 20 file, context (RAM tạm) bị tràn,  
AI bắt đầu **đẩy các chunk ít liên quan ra ngoài**.  
Thế là bạn hỏi `authService`, nó trả lời bằng logic của `userService`.

> **Kết luận:** prompt dễ loãng không phải vì AI ngu,  
> mà vì “tọa độ” của bạn bị đẩy khỏi vùng nhớ ưu tiên.

> Code càng rõ ràng, đặt tên tốt, file chia nhỏ → AI càng thông minh.  
> Giống như teammate hiểu bạn vì bạn viết code sạch vậy.

---

## 9. Hallucination & bảo mật — khi nó “bịa” cả lỗi nguy hiểm

Cái đáng sợ nhất không phải code sai, mà là code “nghe hợp lý nhưng sai âm thầm.”

Tôi từng thấy nó viết middleware JWT check token **sai chiều**,  
nghĩa là ai cũng pass auth nếu token rỗng.

> Nó không hack bạn đâu, nhưng đôi khi “giúp bạn chết nhẹ” với logic kiểu `if (!token) allowAccess();` 😅

> Khi dùng AI code cho backend, **đừng bao giờ để nó tự động merge.**  
> Đặc biệt kiểm tra: auth, input validation, permission.

AI không cố tình phá bạn — nó chỉ “đoán logic phổ biến nhất”.  
Mà phổ biến không đồng nghĩa đúng.

---

## 10. Ép nó “học” như dev thật — cho nó đọc doc trước khi code

Cách dễ nhất để nó update kiến thức trước khi làm.

### Ví dụ:

```
Trước khi code, hãy đọc changelog React 19
và áp dụng cú pháp mới nhất cho useActionState.
```

Hoặc dán trực tiếp:

```
Đây là release note Next.js 15:
https://nextjs.org/blog/next-15

Cập nhật module login sang Server Actions.
```

→ Giống như bảo intern: “Đọc doc mới đi rồi code tiếp.”

---

## 11. Context đúng + Prompt hẹp = Code sắc

Tôi từng test:

- GPT-4: dán 5 file, refactor — quên import, test fail.
- Claude 4.5: dán cả folder `/auth` — refactor sạch, test pass.
- Gemini: đọc nguyên monorepo — hiểu cấu trúc, nhưng code loãng, dài.

Kết luận:  
**Không phải model mạnh hơn là code tốt hơn.**  
Mà là **context đủ + câu hỏi rõ.**

---

## 12. Cần ví dụ thực tế hơn?

Bài này nói về “cách AI hoạt động bên trong”.  
Nếu bạn muốn xem **cách tôi dùng nó để code nhanh gấp 10 lần mà vẫn pass review**,  
xem tiếp phần 1 của series tại đây 👉 [Dev x AI Orchestrator](/vi/blog/post/dev-ai-orchestrator/)

---

## Tóm lại

- AI không “hiểu”, nó chỉ **đoán token hợp lý nhất**.
- Nó nhớ trong **RAM tạm (context window)** — đầy là quên.
- Muốn nó “học”, dùng **RAG** hoặc ép đọc doc.
- Chunking + Embedding giúp nó nhớ code, nhưng context dễ loãng nếu quá tải.
- Context càng hẹp → code càng sắc.
- Và đừng quên: **bảo mật, test, review = phần bạn, không phải nó.**

---

## Kết bài — Khi dev hiểu cách AI nghĩ

Nếu bài [Dev x AI Orchestrator](/vi/blog/post/dev-ai-orchestrator/) nói về _cách làm việc với AI như đồng đội_,  
thì bài này là _hiểu bộ não của đồng đội đó._

Khi bạn hiểu:

- nó **đoán** thế nào,
- nó **quên** ra sao,
- và cách **ép nó học** như dev thật,

bạn không còn “dùng AI” nữa —  
bạn đang **chỉ huy một đội dev vô hình.**

> “Không cần prompt hay — chỉ cần biết đặt luật chơi.”

---

## Hành động nhỏ hôm nay

1. Mở lại một task cũ
2. Feed changelog hoặc doc mới nhất
3. Bảo “trợ lý” code lại theo syntax mới
4. Review kết quả như senior duyệt intern

Nếu bạn thấy code sạch hơn, logic sáng hơn —  
thì chúc mừng, bạn vừa **lên level Dev x AI.**

---

**Written by Hiền Nguyễn** — Fullstack dev tận dụng AI để build nhanh hơn, học nhiều hơn, và ngủ đủ giấc hơn.
