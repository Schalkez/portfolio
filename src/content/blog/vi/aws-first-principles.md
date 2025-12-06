---
title: "Từ 1 Triệu Đồng 'Tiền Ngu' Bên GCP Đến Hành Trình Học AWS Từ Gốc Rễ"
description: "Bài học xương máu khiến tôi ngừng click-ops vô tội vạ và quay về triết lý first principles khi học AWS."
pubDate: "2025-12-06"
published: true
shortDescription: "Cloud không phải local. Tôi chọn hiểu kiến trúc và nguyên lý nền tảng trước khi gõ dòng lệnh đầu tiên."
tags:
  - AWS
  - cloud
  - first principles
  - learning
  - architecture
pairSlug:
  en: aws-first-principles
---

# Từ 1 Triệu Đồng "Tiền Ngu" Bên GCP Đến Hành Trình Học AWS Từ Gốc Rễ

> Chủ đề: Tại sao tôi chọn học lý thuyết AWS khô khan trước khi thực hành?  
> Tác giả: Một gã dev từng “tay nhanh hơn não”

---

## 1. Cú click trị giá 1 triệu đồng và 12 tiếng kinh hoàng

Tôi chưa bao giờ nghĩ mình sẽ viết về AWS bắt đầu từ... Google Cloud (GCP). Nhưng chính ở đó tôi nhận được bài học xương máu nhất về Cloud Computing.

Ngày ấy, tôi deploy một Cloud Function tưởng chừng đơn giản. Với sự tự tin của người quen code logic, tôi chạy nó rồi... đi ngủ. Tôi không ngờ mình đã tạo ra một vòng lặp trigger vô tận. Function đó chạy miết suốt 12 tiếng trong đêm. Sáng dậy, email billing gào thét: tài khoản bay mất 1.000.000 VNĐ.

Một triệu có thể không lớn với người khác, nhưng với tôi lúc ấy đó là cái giá quá đắt cho sự cẩu thả. Trên máy local, code lỗi thì treo máy, reset là xong. Trên Cloud, lỗi kiến trúc nghĩa là đốt tiền thật, tài nguyên thật.

Từ cú vấp đó, khi bắt đầu học AWS, tôi tự hứa: không còn chuyện “vừa làm vừa mò”. Tôi sẽ học AWS theo tư duy first principles — hiểu tường tận nguyên lý trước khi gõ bất kỳ dòng lệnh nào.

## 2. Vì sao lại là first principles?

Tư duy first principles (nguyên lý đầu tiên) là bóc tách vấn đề xuống những sự thật cơ bản nhất rồi xây dựng lại từ nền móng đó.

Trước kia tôi hay học kiểu top-down: muốn dựng web → tìm tutorial → copy lệnh → chạy được → xong. Nhanh đấy, nhưng rỗng. Giống xây nhà chỉ lo sơn màu mà chẳng biết móng sâu bao nhiêu.

Khi chuyển sang AWS, tôi coi thực hành (click-ops trên console) chỉ là phần nổi của tảng băng. 90% còn lại — thứ giữ hệ thống khỏi sập, khỏi bị hack và khỏi đốt tiền — nằm ở lý thuyết hạ tầng mà ta thường bỏ qua.

## 3. Bản đồ học tập: “cày” gì trước khi tạo EC2 đầu tiên?

Thay vì lao vào tạo máy ảo, tôi dành thời gian đọc và vẽ sơ đồ cho các khái niệm nền:

### A. Global Infrastructure: hiểu câu chuyện “khoảng cách”

- **Region vs Availability Zone:** trước đây tôi nghĩ AZ là cái tên logic; giờ tôi biết mỗi AZ là một cụm data center tách biệt vật lý để chống thảm họa.
- **Latency & chi phí:** dữ liệu đi giữa AZ tốn thời gian và tiền; high availability luôn phải trả giá bằng kiến trúc đa AZ.

### B. Networking & IAM: chi phí của sự an toàn

- **VPC (Virtual Private Cloud):** tôi vẽ tay sơ đồ mạng: subnet nào public, subnet nào private, vì sao cần NAT Gateway, gói tin đi thế nào.
- **IAM (Identity and Access Management):** “người gác cổng” của mọi dịch vụ. Tôi học kỹ nguyên tắc least privilege. Nếu ngày xưa tôi set quota cẩn thận hơn, có lẽ đã không mất tiền.

### C. Compute & Storage: chọn đúng công cụ

- **Compute:** phân biệt khi nào nên dùng EC2 (máy ảo), khi nào dùng Lambda (serverless). Bài học GCP nhắc tôi rằng serverless tiện, nhưng nếu trigger mất kiểm soát, nó là cỗ máy đốt tiền nhanh nhất.
- **Storage:** hiểu block storage (EBS) khác object storage (S3) ra sao để không “xài S3 như ổ cứng cài database”.

## 4. Phương pháp học: chậm mà chắc

Đang làm việc chính với GCP nên tôi học AWS bằng cách mô phỏng thực tế:

- **Billing alarm là bước số 1:** việc đầu tiên khi mở account mới là cấu hình cảnh báo “vượt $5 thì hú ngay”.
- **Mental modeling:** tự đặt bài toán “dịch hệ thống công ty từ GCP sang AWS sẽ dùng dịch vụ gì, luồng request ra sao?”. Nếu không vẽ được, nghĩa là chưa hiểu.
- **Đọc whitepaper:** thay vì video “deploy 5 phút”, tôi nghiền ngẫm “AWS Well-Architected Framework”. Khô thật, nhưng nó rèn tư duy thiết kế chuẩn.

## 5. Từ lý thuyết sang thực hành: sandbox có chủ đích

Khi đã nắm nền tảng, tôi mới chuyển sang thực hành:

1. Lập một sandbox account riêng, không ảnh hưởng production.
2. Viết playbook chi tiết cho từng bài tập (ví dụ dựng VPC 3-tier, triển khai app stateless).
3. Sau mỗi bước đều review lại kiến trúc: “Nếu chức năng này bung, tôi scale thế nào? Logging đặt ở đâu?”.

## 6. Ví dụ thực tế: dựng lại hệ thống cũ, nhưng tính tiền khác hẳn

Tôi mô phỏng hạ tầng sản phẩm cũ:

- Load balancer đặt ở nhiều AZ.
- EC2 stateless nằm trong auto scaling group, database (Aurora) chạy multi-AZ.
- Lambda xử lý asynchronous tasks với hàng rào IAM rõ ràng, CloudWatch Alarm giám sát.

Nhờ đã đọc trước về networking, IAM, cost optimization, tôi tránh được việc mở toang security group hay để Lambda trigger vô tận đốt ngân sách. Chênh lệch chi phí dự kiến so với bản “tay nhanh hơn não” trước kia là cả một trời.

## 7. Lời kết

Cách học này có vẻ “lý thuyết suông”, trong khi nhiều người tin làm trước sửa sau mới nhanh lên tay. Nhưng tôi — người từng trả học phí bằng tiền mặt cho sự thiếu hiểu biết — chọn đi chậm.

Học AWS hay bất kỳ cloud nào, công cụ và giao diện có thể đổi, nhưng nguyên lý hệ thống thì bất biến. Hiểu nguyên lý biến bạn thành kỹ sư đúng nghĩa, biết rõ mình đang làm gì và hệ quả ra sao.

Đừng đợi tới lúc hóa đơn bay màu mới tìm hiểu cách hệ thống vận hành. Tin tôi đi, cảm giác đó không dễ chịu chút nào.

---

_Chia sẻ từ một người đang bắt đầu hành trình AWS với sự cẩn trọng tối đa._

