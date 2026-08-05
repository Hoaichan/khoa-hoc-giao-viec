# 📘 THƯ VIỆN KỸ NĂNG & QUY TRÌNH TOÀN DIỆN - SOLO BUSINESS VER 3

> **Dự án đóng gói:** Khóa học *"Giao việc dễ dàng, Sếp càng thảnh thơi"* (Giảng viên: LS/Coach Helen Đào Thúy Hoàn)  
> **Đơn vị vận hành:** Solo Business Kit (Version 3 - Full Automation)  
> **Ngày đóng gói:** 24/07/2026

---

## 🧭 TỔNG QUAN HỆ THỐNG TỰ ĐỘNG HÓA 6 BƯỚC (END-TO-END PIPELINE)

```text
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 1: Nghiên Cứu Thị Trường & Đánh Giá Offer (RAPP & 10-Point Scorecard)  │
 └──────────────────────────────────────┬──────────────────────────────────────────┘
                                        │
                                        ▼
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 2: Thiết Kế & Lập Trình Landing Page Chuyển Đổi Cao (index.html)        │
 │ - Font: Be Vietnam Pro | Framework: Tailwind CSS | Mobile Responsive 100%       │
 │ - Popup Modal 3 bước: Form -> Mã VietQR MBBank -> Popup Thành Công Realtime     │
 └──────────────────────────────────────┬──────────────────────────────────────────┘
                                        │
                                        ▼
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 3: Tích Hợp Google Sheet & Google Apps Script (Code.gs)               │
 │ - Tự động tạo mã đơn KGV001 -> KGV999 | Ghi cột A -> F (TT, Mã, Tên, SĐT, Email) │
 └──────────────────────────────────────┬──────────────────────────────────────────┘
                                        │
                                        ▼
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 4: Tích Hợp Telegram Bot Thông Báo Tức Thì (@NhaZoeBot)               │
 │ - Gửi thông báo HTML khi có đơn mới & khi chuyển khoản thành công               │
 └──────────────────────────────────────┬──────────────────────────────────────────┘
                                        │
                                        ▼
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 5: Tích Hợp SePay Webhook & Vercel API Proxy (/api/sepay-webhook)      │
 │ - Khắc phục lỗi HTTP 302 của Google Apps Script | Đổi trạng thái PAID tự động  │
 │ - Lắng nghe Real-time (Polling 3s): Tự động bật Popup "VÀO NHÓM TELEGRAM HỌC"  │
 └──────────────────────────────────────┬──────────────────────────────────────────┘
                                        │
                                        ▼
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │ GIAI ĐOẠN 6: Triển Khai Lên Vercel & GitHub (khoa-hoc-giao-viec.vercel.app)       │
 └─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 GIAI ĐOẠN 1: NGHIÊN CỨU THỊ TRƯỜNG & ĐÁNH GIÁ OFFER

### 1.1. Khung Nghiên Cứu RAPP (Research, Analysis, Positioning, Packaging)
- **Đối tượng mục tiêu:** Chủ doanh nghiệp nhỏ (SME), Lãnh đạo/Quản lý có quy mô nhân sự 30 - 50 nhân sự.
- **Nỗi đau chính (Pain Points):**
  1. Ôm đồm công việc, làm việc 12-14h/ngày nhưng doanh nghiệp không thể tự chạy nếu thiếu sếp.
  2. Nhân viên thụ động, giao việc gì làm nấy, không có tinh thần trách nhiệm.
  3. Sợ giao việc vì lo nhân viên làm hỏng, lại phải tự tay đi sửa lỗi.
- **Giải pháp đóng gói (Offer):** Khóa học *"Giao việc dễ dàng, Sếp càng thảnh thơi"* với Quy trình 12 bước Coaching Matrix & Mô hình 4 Trụ cột Lãnh đạo Khai vấn.
- **Giá bán:** **890.000 VNĐ** (Ưu đãi 70% từ giá gốc 6.800.000đ).

### 1.2. Thước Đo Đánh Giá 10 Tiêu Chí (Scorecard)
- **Kết quả:** `83/100 Điểm` -> **STRONG GO** (Dự án tiềm năng cao, nhu cầu thị trường lớn).

---

## 🎨 GIAI ĐOẠN 2: THIẾT KẾ & LẬP TRÌNH LANDING PAGE

### 2.1. Cấu Trúc Trang `index.html`
Trang web được thiết kế theo cấu trúc chuyển đổi chuẩn Marketing:
1. **Header & Navbar:** Logo MyProject + Nút Đăng Ký Nhanh + Hotline.
2. **Hero Section:** Tiêu đề hứa hẹn kết quả (Giải phóng 50% thời gian điều hành) + Video/Hình ảnh diễn giả LS/Coach Helen Đào Thúy Hoàn + Nút kêu gọi hành động (CTA).
3. **Chẩn Đoán Nỗi Đau (Pain Points):** 4 biểu hiện sếp đang bị kẹt trong bẫy vận hành.
4. **Hệ Thống 4 Trụ Cột:** 
   - Trụ cột 1: Tâm thế Lãnh đạo Khai vấn.
   - Trụ cột 2: Quy trình 12 bước Coaching Matrix.
   - Trụ cột 3: Kỹ thuật đặt câu hỏi kích hoạt sự tự chủ.
   - Trụ cột 4: Cơ chế kiểm soát & Đánh giá hiệu suất không gây áp lực.
5. **Chương Trình Chi Tiết (Curriculum Breakdown):** Nguồn lực 4 buổi qua Zoom.
6. **Stack Quà Tặng (Bonus Stack):** Bộ biểu mẫu 12 bước giao việc + Ebook độc quyền.
7. **Bảng So Sánh Chuyển Đổi (Transformation Table):** Trước và sau khi áp dụng.
8. **FAQ Accordion (Hỏi - Đáp):** Giải đáp thắc mắc thường gặp.
9. **Footer & Pháp Lý.**

### 2.2. Quy Trình Popup Modal 3 Bước (Registration & Payment Flow)
- **Bước 1 (Nhập thông tin):** Form nhận 3 trường mandatory: `Họ và tên`, `Số điện thoại`, `Địa chỉ email`.
- **Bước 2 (Mã VietQR MBBank):** Sau khi bấm tiếp tục, hệ thống gửi thông tin về Google Sheet & Telegram, đồng thời hiện mã VietQR MBBank tự động khớp với Mã đơn hàng (`KGV001 0987654321`). Màn hình hiển thị trạng thái chờ `⏳ Hệ thống đang chờ nhận chuyển khoản tự động SePay...`.
- **Bước 3 (Thanh toán thành công Realtime):** Ngay khi SePay nhận tiền và gửi Webhook, màn hình VietQR **tự động chuyển sang Popup Thành Công 🎉** hiển thị nút lớn: `[ 👉 VÀO NHÓM TELEGRAM HỌC TẬP NGAY ]`.

---

## 📊 GIAI ĐOẠN 3: KẾT NỐI GOOGLE SHEET & GOOGLE APPS SCRIPT

### 3.1. Cấu Trúc Google Sheet `Danh sach`
- **ID Sheet:** `YOUR_GOOGLE_SHEET_ID`
- **Tên trang tính:** `Danh sach`
- **Thứ tự Cột A -> F:**
  - `A`: TT (Thời gian nhập dữ liệu `yyyy-MM-dd HH:mm:ss`)
  - `B`: Mã Đơn Hàng (`DON001`, `DON002`... tự tăng từ `000` đến `999`)
  - `C`: Họ và tên
  - `D`: Điện thoại
  - `E`: Email
  - `F`: Trạng thái thanh toán (`UNPAID` / `PAID`)

### 3.2. Mã Nguồn Apps Script (`Code.gs`)
```javascript
const SPREADSHEET_ID = "YOUR_GOOGLE_SHEET_ID";
const SHEET_NAME = "Danh sach";
const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; 
const TELEGRAM_CHAT_ID = "YOUR_TELEGRAM_CHAT_ID";   
const TELEGRAM_GROUP_LINK = "YOUR_TELEGRAM_GROUP_LINK";
```
- **Hàm `doPost(e)` / `doGet(e)`:** Tiếp nhận dữ liệu đăng ký từ website và dữ liệu Webhook từ SePay.
- **Hàm `handleSePayWebhook(data)`:** Bắt biến động số dư, quét mã `KGVxxx` trong nội dung chuyển khoản, đổi trạng thái Cột F sang `PAID` và bắn tin nhắn Telegram.
- **Hàm `getOrderStatus(orderId)`:** Cho phép Landing Page kiểm tra trạng thái thanh toán realtime (Polling 3s/lần).

---

## 🤖 GIAI ĐOẠN 4: TÍCH HỢP TELEGRAM BOT THÔNG BÁO TỨC THÌ

### 4.1. Quy Trình Tạo Bot Telegram
1. Mở Telegram -> Tìm bot `@BotFather` -> Gửi `/newbot` -> Nhập tên Bot -> Nhận **HTTP API Token**.
2. Tìm bot `@userinfobot` -> Nhấn **Start** -> Nhận **Chat ID** cá nhân.
3. Dán Token & Chat ID vào đầu file `Code.gs`.

### 4.2. Cấp Quyền OAuth (`UrlFetchApp.fetch`)
- Trong Google Apps Script: Chọn hàm `authorizeTelegram` -> Nhấn **Run** -> Nhấn **Review Permissions** -> **Advanced** -> **Go to (unsafe)** -> **Allow**.

### 4.3. Mẫu Tin Nhắn Telegram (HTML Format)
- **Khi có đơn hàng mới (UNPAID):**
```text
🔔 ĐƠN HÀNG MỚI - KHOÁ HỌC GIAO VIỆC
-----------------------------------
🆔 Mã đơn hàng: KGV001
👤 Họ và tên: Nguyễn Văn A
📞 Điện thoại: 0987654321
📧 Email: nguyenvana@gmail.com
💰 Số tiền: 890.000 VNĐ
⏰ Thời gian: 2026-07-24 16:18:00
📌 Trạng thái: UNPAID (Đang chờ quét VietQR)
```

- **Khi chuyển khoản thành công (PAID):**
```text
✅ THANH TOÁN THÀNH CÔNG - KHOÁ HỌC GIAO VIỆC 🎉
-----------------------------------
🆔 Mã đơn hàng: KGV001
👤 Họ và tên: Nguyễn Văn A
📞 Điện thoại: 0987654321
📧 Email: nguyenvana@gmail.com
💰 Số tiền: 890.000 VNĐ
⏰ Thời gian: 2026-07-24 16:55:00
📌 Trạng thái: PAID (Đã chuyển khoản thành công)
🔗 Link nhóm Telegram: https://t.me/NhaZoeBot
```

---

## 💳 GIAI ĐOẠN 5: TÍCH HỢP SEPAY WEBHOOK & VERCEL PROXY

### 5.1. Khắc Phục Lỗi HTTP 302 Chuyển Hướng Google Apps Script
Google Apps Script mặc định trả về `HTTP 302 Found` khi nhận POST request. Một số hệ thống Webhook (như SePay) ngắt kết nối nếu gặp 302.

**Giải pháp:** Tạo Vercel Serverless Function tại `api/sepay-webhook.js`:
```javascript
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYwtC3183jHUuDcS3MYktYiTQOIm93tIaeRZjYwNc0DMejJu_rYjOpclAtcuurQJwmRw/exec";

  const payload = req.body || {};
  const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const targetUrl = APPS_SCRIPT_URL + "?isSepay=1&payload=" + encodeURIComponent(payloadString);

  await fetch(targetUrl, { method: 'GET', redirect: 'follow' });
  return res.status(200).json({ success: true, message: "Forwarded to Apps Script" });
}
```

### 5.2. Cấu Hình Webhook Trên SePay Dashboard
- **URL Webhook:** `https://khoa-hoc-giao-viec.vercel.app/api/sepay-webhook`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Bảo mật:** `Không xác thực`
- **Kết quả:** Phản hồi `HTTP 200 OK` 100% ổn định.

---

## 🚀 GIAI ĐOẠN 6: TRIỂN KHAI VERCEL & GITHUB

### 6.1. File `vercel.json`
```json
{
  "name": "khoa-hoc-giao-viec",
  "version": 2,
  "cleanUrls": true,
  "rewrites": [
    { "source": "/api/sepay-webhook", "destination": "/api/sepay-webhook.js" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### 6.2. Các Lệnh Git & Vercel CLI
```bash
git init
git add .
git commit -m "Deploy Solo Business ver 3"
git branch -M main
git remote add origin https://github.com/Hoaichan/khoa-hoc-giao-viec.git
git push -u origin main
```
- **Đường dẫn Live Website:** **`https://khoa-hoc-giao-viec.vercel.app`**

---

## 📋 CHEATSHEET LỆNH SLASH & PROMPT MẪU CHO ĐỒNG NGHIỆP

1. `/research` - Đánh giá ý tưởng sản phẩm & phân tích đối tượng mục tiêu.
2. `/landing-page` - Thiết kế trang Landing Page đơn file chuẩn Tailwind & Be Vietnam Pro.
3. `/deploy` - Triển khai trang web lên Vercel CLI hoặc kết nối GitHub CI/CD.
4. `/notification` - Thiết lập Telegram Bot thông báo đơn hàng & webhook thanh toán.

*Bộ tài liệu này đã lưu trữ đầy đủ 100% tri thức, mã nguồn, kỹ năng và quy trình làm việc. Đồng nghiệp chỉ cần mở thư mục **`Solo Business ver 3`** là có thể nhân bản và vận hành ngay lập tức!*
