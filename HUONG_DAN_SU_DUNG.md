# 🚀 TÀI LIỆU HƯỚNG DẪN QUY TRÌNH & ĐÓNG GÓI - SOLO BUSINESS VER 3

Dự án: **Landing Page & Hệ Thống Tự Động Hóa Khóa Học "Giao Việc Dễ Dàng, Sếp Càng Thảnh Thơi"**  
Chủ đề / Diễn giả: **LS / Coach Helen Đào Thúy Hoàn**  
Phiên bản: **Solo Business ver 3 (Full Automation)**

---

## 🔒 DANH SÁCH CÁC BIẾN CẦN TÙY BIẾN KHI BÀN GIAO (CUSTOMIZATION CHECKLIST)

> 💡 **Lưu ý quan trọng cho đồng nghiệp:** Bộ Kit **Solo Business ver 3** đã được làm sạch và tách biệt toàn bộ các thông tin cá nhân/nhạy cảm (số tài khoản ngân hàng, token Telegram, ID Google Sheet...). Khi nhân bản cho sản phẩm mới, đồng nghiệp chỉ cần thay thế các biến sau:

| STT | Loại Thông Tin | Vị Trí Cần Thay | Giá Trị Mẫu / Hướng Dẫn |
| :--- | :--- | :--- | :--- |
| 1 | **ID Google Sheet** | `Code.gs` (Dòng 10) | Thay `"YOUR_GOOGLE_SHEET_ID"` bằng ID Sheet của bạn |
| 2 | **Telegram Bot Token** | `Code.gs` (Dòng 14) | Thay `"YOUR_TELEGRAM_BOT_TOKEN"` bằng Token từ `@BotFather` |
| 3 | **Telegram Chat ID** | `Code.gs` (Dòng 15) | Thay `"YOUR_TELEGRAM_CHAT_ID"` bằng ID từ `@userinfobot` |
| 4 | **Link Nhóm Telegram** | `Code.gs` (Dòng 16) | Thay `"YOUR_TELEGRAM_GROUP_LINK"` bằng link nhóm học tập |
| 5 | **Google Apps Script URL** | `index.html` & `api/sepay-webhook.js` | Thay `"YOUR_APPS_SCRIPT_WEB_APP_URL"` bằng Web App URL sau khi Deploy |
| 6 | **Tài khoản Ngân hàng** | `index.html` (Phần VietQR) | Thay `YOUR_BANK_NAME`, `YOUR_BANK_ACCOUNT_NUMBER`, `YOUR_ACCOUNT_HOLDER_NAME` |
| 7 | **Ảnh Diễn giả / Logo** | Thư mục dự án | Thay file ảnh chân dung & logo thương hiệu mới |

---

## 📁 1. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
Solo Business ver 3/
├── index.html               # Trang Landing Page chính (VietQR, Popup Modal 3 bước, Polling Realtime)
├── Chi Hoan.jpg             # Ảnh chân dung diễn giả (Hiển thị Hero & Profile)
├── favicon.jpg              # Biểu tượng trang web (Logo MyProject)
├── Code.gs                  # Mã nguồn Google Apps Script (Lưu Sheet, Telegram Bot, SePay Webhook)
├── vercel.json              # File cấu hình Deployment Vercel & API Rewrite Rules
├── api/
│   └── sepay-webhook.js     # Cổng Vercel Serverless Proxy xử lý SePay Webhook (Bỏ qua lỗi HTTP 302)
├── commands/                # Các lệnh hỗ trợ quy trình công việc
├── skills/                  # Các kỹ năng đóng gói sẵn (Landing Page, Offer, Sales, Vercel, Telegram)
└── HUONG_DAN_SU_DUNG.md     # Tài liệu hướng dẫn bàn giao này
```

---

## ⚡ 2. QUY TRÌNH VẬN HÀNH TỰ ĐỘNG HÓA 100% (AUTO-PIPELINE)

```text
[Khách hàng điền 3 trường: Họ tên, SĐT, Email]
                      │
                      ▼
[1. Lưu Google Sheet (Trạng thái: UNPAID)] ──► [2. Bot Telegram nổ thông báo Đơn Mới]
                      │
                      ▼
[3. Trang web hiện Popup VietQR MBBank 890.000đ]
                      │
   (Khách quét App Ngân hàng chuyển tiền)
                      │
                      ▼
[4. SePay nhận biến động số dư] ──► [5. Gửi POST Webhook tới Vercel Proxy]
                                                      │
                                                      ▼
[7. Popup trên Web TỰ ĐỘNG BẬT] ◄── [6. Apps Script đổi Sheet sang PAID & Telegram nổ tin nhắn]
 "🎉 THANH TOÁN THÀNH CÔNG!"
 [ VÀO NHÓM TELEGRAM HỌC TẬP NGAY ]
```

---

## 🛠️ 3. HƯỚNG DẪN CẤU HÌNH TỪ A - Z CHO ĐỒNG NGHIỆP

### 📊 BƯỚC 1: Cấu Hình Google Sheet & Apps Script
1. Tạo 1 **Google Sheet** mới với tên: `Khóa học giao việc dễ dàng`.
2. Đổi tên trang tính (Tab) thành: `Danh sach`.
3. Tạo hàng tiêu đề Cột từ **A đến F**:
   - **A:** `TT` (Thời gian nhập dữ liệu)
   - **B:** `Mã Đơn Hàng` (Định dạng tự sinh: `KGV001`, `KGV002`...)
   - **C:** `Họ và tên`
   - **D:** `Điện thoại`
   - **E:** `Email`
   - **F:** `Trạng thái thanh toán` (`UNPAID` / `PAID`)
4. Vào menu **Tiện ích mở rộng (Extensions)** → Chọn **Apps Script**.
5. Dán toàn bộ mã nguồn file `Code.gs` vào.
6. **Thay thế 3 biến ở đầu file `Code.gs`:**
   - `SPREADSHEET_ID`: ID file Google Sheet của bạn.
   - `TELEGRAM_BOT_TOKEN`: Token của Bot Telegram.
   - `TELEGRAM_CHAT_ID`: Chat ID Telegram nhận tin nhắn.
   - `TELEGRAM_GROUP_LINK`: Đường link nhóm Telegram học tập.
7. **Cấp quyền truy cập (Bắt buộc 1 lần duy nhất):**
   - Tại menu chọn hàm bên cạnh nút Run, chọn hàm `authorizeTelegram` → Nhấn **▶ Run**.
   - Bấm **Xem lại quyền (Review Permissions)** → Chọn Gmail → **Nâng cao (Advanced)** → **Đến Khóa học... (không an toàn)** → **Cho phép (Allow)**.
8. **Triển khai Web App:**
   - Nhấn **Triển khai (Deploy)** → **Triển khai mới (New deployment)**.
   - **Thực thi dưới tư cách (Execute as):** `Tôi (Me)`.
   - **Ai có quyền truy cập (Who has access):** `Bất kỳ ai (Anyone)`.
   - Nhấn **Triển khai** và sao chép **Web App URL**.

---

### 🤖 BƯỚC 2: Tạo Bot Telegram Nhận Thông Báo Tức Thì
1. Mở ứng dụng Telegram, tìm kiếm **`@BotFather`**.
2. Gửi tin nhắn `/newbot` → Nhập tên Bot và Username bot.
3. Sao chép **HTTP API Token** nhận được (Dán vào `TELEGRAM_BOT_TOKEN` trong `Code.gs`).
4. Tìm bot **`@userinfobot`** trên Telegram → Nhấn **Start** để lấy **Chat ID** cá nhân (Dán vào `TELEGRAM_CHAT_ID` trong `Code.gs`).

---

### 🌐 BƯỚC 3: Đưa Trang Web Lên Vercel & GitHub
1. Mở **Terminal / CMD** tại thư mục dự án và chạy các lệnh:
   ```bash
   git init
   git add .
   git commit -m "Initial commit Solo Business ver 3"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
2. Truy cập **[https://vercel.com/new](https://vercel.com/new)** → Nhấn **Import** repository vừa đẩy lên.
3. Chọn Framework Preset là `Other` → Nhấn **Deploy**.
4. Trang web sẽ online tại đường dẫn dạng `https://ten-du-an.vercel.app`.

---

### 💳 BƯỚC 4: Cấu Hình SePay Webhook (Chuyển Khoản Tự Động)
1. Đăng nhập trang quản trị SePay: **[https://my.sepay.vn](https://my.sepay.vn)**
2. Chọn **Tích hợp** → **Webhooks** → **Tạo Webhook mới**.
3. **Gọi tới URL (Webhook URL):** Dán đường dẫn Vercel Proxy API vào:
   ```text
   https://ten-du-an.vercel.app/api/sepay-webhook
   ```
4. **Phương thức (Method):** `POST`.
5. **Kiểu dữ liệu (Content Type):** `application/json`.
6. **Bảo mật:** Chọn `● Không xác thực`.
7. Nhấn **Lưu cấu hình** và bấm **Gửi thử** (Test Webhook).
👉 *SePay sẽ báo xanh **HTTP 200 OK** và Telegram sẽ nổ tin nhắn thử nghiệm thành công!*

---

## 🎯 4. DANH SÁCH FILE & TÍNH NĂNG CHI TIẾT

| File | Chức Năng |
| :--- | :--- |
| **`index.html`** | Thiết kế chuẩn Landing Page chuyển đổi cao (Be Vietnam Pro, VietQR MBBank, Popup Modal 3 bước, Polling trạng thái thanh toán realtime 3s/lần). |
| **`Code.gs`** | Xử lý dữ liệu Google Sheet, tự sinh mã `KGV001-KGV999`, gửi thông báo Telegram HTML, xử lý logic SePay Webhook tự động đổi `UNPAID` -> `PAID`. |
| **`api/sepay-webhook.js`** | Cổng Vercel Serverless Function giúp SePay Webhook phản hồi HTTP 200 OK ngay lập tức, khắc phục lỗi HTTP 302 của Google Apps Script. |
| **`vercel.json`** | Cấu hình bảo mật headers và Rewrite Rule cho đường dẫn `/api/sepay-webhook`. |

---

Tài liệu này đã đóng gói trọn bộ quy trình chuẩn (SOP). Đồng nghiệp chỉ cần mở thư mục **`Solo Business ver 3`**, làm theo từng bước trên là có thể tự vận hành và nhân bản cho các khóa học/sản phẩm tiếp theo!
