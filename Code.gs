/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - KHÓA HỌC GIAO VIỆC DỄ DÀNG + TELEGRAM BOT NOTIFICATION
 * ==============================================================================
 * ID Sheet: 1-kU84hAZpjZffVpP5_Iv5Z7L4QPjkYM_wxKqvIfDxgc
 * Tên Trang Tính: Danh sach
 * Cột A -> F: TT | Mã Đơn Hàng | Họ và tên | Điện thoại | Email | Trạng thái thanh toán
 */

const SPREADSHEET_ID = "1-kU84hAZpjZffVpP5_Iv5Z7L4QPjkYM_wxKqvIfDxgc";
const SHEET_NAME = "Danh sach";

// 🤖 CẤU HÌNH TELEGRAM BOT
const TELEGRAM_BOT_TOKEN = "8945029594:AAGpux7Dqv59x1eLBSpcmpRM4egvkqWxh5s"; 
const TELEGRAM_CHAT_ID = "5488178864";   

/**
 * HÀM CHẠY THỬ ĐỂ CẤP QUYỀN (AUTHORIZE) GỬI TELEGRAM
 * Anh/chị chọn hàm này và bấm nút "Run" trên Apps Script để cấp quyền!
 */
function testTelegram() {
  const timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
  sendTelegramNotification("KGVTEST", "Nguyễn Văn Test", "0987654321", "test@gmail.com", timestamp);
}

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const name = data.name || data.fullName || "";
    const phone = data.phone || "";
    const email = data.email || "";

    if (!name && !phone && !email) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Không nhận được dữ liệu hợp lệ"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["TT", "Mã Đơn Hàng", "Họ và tên", "Điện thoại", "Email", "Trạng thái thanh toán"]);
    }

    const lastRow = sheet.getLastRow();
    let nextNum = lastRow > 0 ? lastRow : 1;
    const orderId = "KGV" + String(nextNum).padStart(3, "0");
    const timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

    // 1. Ghi dữ liệu vào Google Sheet
    sheet.appendRow([
      timestamp,   // Cột A: TT (Thời gian nhập liệu)
      orderId,     // Cột B: Mã Đơn Hàng (KGVxxx)
      name,        // Cột C: Họ và tên
      phone,       // Cột D: Điện thoại
      email,       // Cột E: Email
      "UNPAID"     // Cột F: Trạng thái thanh toán
    ]);

    // 2. Gửi thông báo tự động về Telegram Bot (Dùng định dạng HTML an toàn)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      sendTelegramNotification(orderId, name, phone, email, timestamp);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderId: orderId,
      timestamp: timestamp,
      name: name,
      phone: phone,
      email: email
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Hàm gửi tin nhắn thông báo đơn hàng mới về Telegram (Format HTML an toàn 100%)
 */
function sendTelegramNotification(orderId, name, phone, email, timestamp) {
  try {
    const message = 
      "<b>🔔 ĐƠN HÀNG MỚI - KHOÁ HỌC GIAO VIỆC</b>\n" +
      "-----------------------------------\n" +
      "🆔 <b>Mã đơn hàng:</b> <code>" + escapeHtml(orderId) + "</code>\n" +
      "👤 <b>Họ và tên:</b> " + escapeHtml(name) + "\n" +
      "📞 <b>Điện thoại:</b> <code>" + escapeHtml(phone) + "</code>\n" +
      "📧 <b>Email:</b> " + escapeHtml(email) + "\n" +
      "💰 <b>Số tiền:</b> 890.000 VNĐ\n" +
      "⏰ <b>Thời gian:</b> " + escapeHtml(timestamp) + "\n" +
      "📌 <b>Trạng thái:</b> UNPAID (Đang chờ quét VietQR)";

    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML"
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: false
    };

    const response = UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", options);
    Logger.log("Telegram API Response: " + response.getContentText());
  } catch (err) {
    Logger.log("Lỗi gửi thông báo Telegram: " + err);
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
