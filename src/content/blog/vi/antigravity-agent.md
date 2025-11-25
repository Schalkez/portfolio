---
title: "Antigravity: Khi AI Agent thực sự \"hiểu\" Codebase (thay vì chỉ đoán mò)"
description: "Tại sao mình chuyển từ việc \"chat\" với Cursor sang \"phối hợp\" với Antigravity? Một cái nhìn khách quan về sự khác biệt giữa AI Autocomplete và AI Agent."
pubDate: "2025-11-24"
updatedDate: "2025-11-24"
published: true
tags: ["AI", "Agent", "Coding", "Antigravity", "Google Deepmind", "Cursor"]
pairSlug:
  en: "antigravity-agent"
---

Nếu bạn đã đọc bài viết ["Tôi dùng AI để code nhanh gấp 10"](/blog/post/dev-ai-orchestrator) của mình, bạn sẽ biết mình là một "fan cứng" của việc dùng AI để tăng năng suất. Mình đã dùng qua tất cả: từ GitHub Copilot đời đầu, đến ChatGPT Plus, và gần đây nhất là **Cursor**.

Cursor thực sự rất tuyệt. Nó thay đổi cách mình viết code. Nhưng... nó vẫn có những "nỗi đau" mà chỉ khi làm project phức tạp bạn mới thấm.

## Cursor: "Siêu xe" cho tốc độ

Phải công nhận là Cursor dạo này khôn hơn hẳn. Không cần `@Files` thủ công nhiều như trước, nó tự đoán context khá chuẩn. Code suggest vèo vèo, tab tab vài cái là xong function. Cảm giác code như bay.

Nhưng dù thông minh đến đâu, Cursor vẫn hoạt động theo cơ chế **"Bạn hỏi - Nó trả lời"**.
- Bạn vẫn là người phải chia nhỏ task.
- Bạn vẫn là người phải review từng dòng code nó sinh ra ngay lập tức.
- Bạn vẫn là người "cầm lái" chính.

Nó giống như bạn có một bộ giáp Iron Man: Bạn mạnh lên gấp 10 lần, nhưng bạn vẫn phải tự đánh đấm.

---

## Antigravity: Người đồng đội "Tự giác"

Chuyển sang Antigravity, cảm giác không phải là "mặc giáp", mà là có thêm một ông **Senior Dev ngồi cạnh**.

### 1. Sự chủ động (Proactivity)
Thay vì ngồi đợi mình ra lệnh từng bước, Antigravity tự động dùng lệnh `ls`, `find`, `grep` để tìm hiểu vấn đề.
- Khi mình bảo "Sửa lỗi build trang Blog", nó tự động tìm file `astro.config.mjs`, tự đọc `package.json`, và tự mò vào folder `src/pages/blog`.
- Nó "hiểu" cấu trúc project thực sự, chứ không phải chỉ là những text mình paste vào khung chat.

### 2. Nó có "đôi tay" (Tool Use)
Đây là điểm ăn tiền nhất. Antigravity không chỉ sinh ra code (text), nó **thực thi** hành động.
- **Tự cài package:** Khi thấy thiếu `@microsoft/clarity`, nó tự chạy `pnpm install @microsoft/clarity`. Mình không cần động tay.
- **Tự sửa file:** Nó dùng công cụ `replace_file_content` để sửa chính xác từng block code. Không còn cảnh copy-paste nhầm dòng.
- **Tự Build & Test:** Sau khi sửa xong, nó tự chạy `pnpm build` để kiểm tra xem có lỗi không. Nếu có lỗi? Nó tự đọc log và sửa tiếp.

### 3. Tư duy "Agentic" (Tác tử)
Làm việc với Antigravity giống như pair programming với một Senior Dev hơn là ra lệnh cho một Junior.
- **Junior (Cursor):** "Anh bảo em sửa file A, em sửa file A. Xong rồi ạ (dù file B bị lỗi do import sai từ A)."
- **Senior (Antigravity):** "Khoan đã, nếu sửa file A thế này thì file B sẽ lỗi. Để mình check file B trước... OK, mình cần update cả 2 file và chạy lại test."

## Ví dụ thực tế: Vụ án "Deploy lên Hostinger"

Lúc nãy mình cần setup deploy lên Hostinger.
- **Nếu dùng Cursor:** Mình sẽ phải hỏi "Viết cho tao cái script deploy". Cursor sẽ nhả ra một đống code bash. Mình phải copy vào file, chạy thử, thấy lỗi `rsync not found` (do mình dùng Windows), lại quay lại chửi Cursor, nó lại đưa code khác...
- **Dùng Antigravity:**
    1. Nó tự tạo file `deploy.sh`.
    2. Nó tự thêm vào `.gitignore` (cái này mình hay quên cực).
    3. Nó chạy thử, thấy lỗi `rsync`.
    4. Nó **tự nhận ra** mình đang dùng Windows và không có rsync.
    5. Nó **tự động** viết lại script dùng `scp` và `ssh` để thay thế.
    6. Nó chạy lại và deploy thành công.

Mình chỉ ngồi nhìn. Cảm giác... hơi "thừa thãi", nhưng mà sướng! 😂

## Kết luận: Ai thắng?

- **Dùng Cursor khi:** Bạn cần code nhanh một function, refactor một file lẻ, hoặc cần giải thích code. Tốc độ là vua.
- **Dùng Antigravity khi:** Bạn cần giải quyết một **Task** trọn vẹn (Feature mới, Debug lỗi build, Refactor diện rộng). Bạn cần sự chính xác, cẩn thận và tính tự chủ.

Antigravity không thay thế hoàn toàn Cursor (ít nhất là chưa), nhưng nó lấp đầy khoảng trống lớn nhất của AI hiện tại: **Khả năng tự chủ và hiểu ngữ cảnh sâu.**

Nếu Cursor là chiếc xe đua F1 (nhanh, nhưng cần tay lái lụa), thì Antigravity là chiếc xe tự lái Tesla (bạn chỉ cần nhập điểm đến, và tận hưởng chuyến đi).
