/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - KHÓA HỌC GIAO VIỆC DỄ DÀNG + SEPAY WEBHOOK & TELEGRAM
 * ==============================================================================
 * ID Sheet: 1-kU84hAZpjZffVpP5_Iv5Z7L4QPjkYM_wxKqvIfDxgc
 * Tên Trang Tính: Danh sach
 * Cột A -> F: TT | Mã Đơn Hàng | Họ và tên | Điện thoại | Email | Trạng thái thanh toán
 */

const SPREADSHEET_ID = "1-kU84hAZpjZffVpP5_Iv5Z7L4QPjkYM_wxKqvIfDxgc";
const SHEET_NAME = "Danh sach";

// 🤖 CẤU HÌNH TELEGRAM BOT & NHÓM HỌC TẬP
const TELEGRAM_BOT_TOKEN = "8945029594:AAGpux7Dqv59x1eLBSpcmpRM4egvkqWxh5s"; 
const TELEGRAM_CHAT_ID = "-5111655127";   
const TELEGRAM_GROUP_LINK = "https://t.me/NhaZoeBot"; // Thay link nhóm Telegram học tập tại đây

/**
 * 🔑 HÀM ÉP GOOGLE HIỆN BẢNG CẤP QUYỀN TRUY CẬP (AUTHORIZE)
 */
function authorizeTelegram() {
  const res = UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/getMe");
  Logger.log("Kết quả cấp quyền thành công: " + res.getContentText());
}

function testTelegram() {
  const timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
  sendTelegramNotification("KGVTEST", "Nguyễn Văn Test", "0987654321", "test@gmail.com", timestamp, "UNPAID");
}

function doGet(e) {
  // 1. Kiểm tra trạng thái đơn hàng khi Landing Page Poll: ?action=checkStatus&orderId=KGV001
  if (e && e.parameter && e.parameter.action === "checkStatus") {
    const orderId = e.parameter.orderId || "";
    const status = getOrderStatus(orderId);
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderId: orderId,
      paymentStatus: status,
      telegramGroupLink: TELEGRAM_GROUP_LINK
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    let data = {};

    // Đọc dữ liệu từ query parameter ?payload=... (từ SePay Vercel Proxy)
    if (e && e.parameter && e.parameter.payload) {
      try {
        data = JSON.parse(e.parameter.payload);
      } catch (err) {
        data = {};
      }
    } else if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // ⚡ NẾU LÀ SEPAY WEBHOOK (Có chứa parameter isSepay hoặc data SePay)
    if ((e && e.parameter && e.parameter.isSepay) || data.gateway || data.transferType || data.transferAmount !== undefined || data.id || (data.content && String(data.content).length > 0)) {
      return handleSePayWebhook(data);
    }

    // ⚡ NẾU LÀ ĐĂNG KÝ MỚI TỪ LANDING PAGE (Có name, phone, email)
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

    // Ghi dữ liệu vào Google Sheet
    sheet.appendRow([
      timestamp,   // Cột A: TT
      orderId,     // Cột B: Mã Đơn Hàng
      name,        // Cột C: Họ và tên
      phone,       // Cột D: Điện thoại
      email,       // Cột E: Email
      "UNPAID"     // Cột F: Trạng thái thanh toán
    ]);

    // Gửi thông báo đơn hàng mới về Telegram Bot
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      sendTelegramNotification(orderId, name, phone, email, timestamp, "UNPAID");
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderId: orderId,
      timestamp: timestamp,
      name: name,
      phone: phone,
      email: email,
      telegramGroupLink: TELEGRAM_GROUP_LINK
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
 * Xử lý Webhook gửi sang từ SePay khi có biến động tiền về tài khoản
 */
function handleSePayWebhook(data) {
  try {
    const content = (data.content || data.code || data.description || "").toUpperCase();
    const amount = data.transferAmount || data.accumulated || 0;

    // Tìm mã đơn dạng KGVxxx trong nội dung chuyển khoản
    const match = content.match(/KGV\d{3}/i);

    // NẾU LÀ GỬI THỬ TỪ SEPAY (Nội dung không chứa KGVxxx)
    if (!match) {
      // Gửi tin nhắn xác nhận SePay kết nối thành công về Telegram
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        sendTelegramSimpleMessage("🧪 <b>SEPAY WEBHOOK KẾT NỐI THÀNH CÔNG!</b>\n-----------------------------------\nĐã nhận thành công dữ liệu thử nghiệm từ SePay Dashboard qua Vercel Proxy.");
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Đã nhận Webhook thử nghiệm SePay thành công!"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const orderId = match[0].toUpperCase();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Sheet not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const dataRange = sheet.getDataRange().getValues();
    let foundRow = -1;
    let name = "";
    let phone = "";
    let email = "";

    // Duyệt tìm dòng có chứa Mã Đơn Hàng ở Cột B (Index 1)
    for (let i = 1; i < dataRange.length; i++) {
      if (String(dataRange[i][1]).trim().toUpperCase() === orderId) {
        foundRow = i + 1; // 1-based index
        name = dataRange[i][2];
        phone = dataRange[i][3];
        email = dataRange[i][4];
        break;
      }
    }

    if (foundRow > 0) {
      // Cập nhật Cột F (Trạng thái thanh toán) -> PAID
      sheet.getRange(foundRow, 6).setValue("PAID");

      const timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

      // Gửi thông báo XÁC NHẬN THANH TOÁN THÀNH CÔNG về Telegram Bot
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        sendTelegramNotification(orderId, name, phone, email, timestamp, "PAID", amount);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Đã cập nhật trạng thái PAID cho đơn " + orderId
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      // Nếu có mã KGVxxx nhưng không thấy dòng tương ứng
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        sendTelegramSimpleMessage("⚠️ <b>NHẬN THANH TOÁN SEPAY (" + escapeHtml(orderId) + ")</b>\nSố tiền: " + Number(amount).toLocaleString('vi-VN') + " VNĐ\nNội dung: " + escapeHtml(content) + "\n<i>(Không tìm thấy dòng tương ứng trên Google Sheet)</i>");
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "not_found",
        message: "Không tìm thấy dòng tương ứng cho " + orderId
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Lấy trạng thái thanh toán từ Google Sheet
 */
function getOrderStatus(orderId) {
  if (!orderId) return "UNPAID";
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) return "UNPAID";

    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][1]).trim().toUpperCase() === orderId.trim().toUpperCase()) {
        return String(data[i][5]).trim().toUpperCase(); // Cột F là Index 5
      }
    }
  } catch (err) {
    console.warn("Lỗi đọc getOrderStatus:", err);
  }
  return "UNPAID";
}

/**
 * Hàm gửi tin nhắn thông báo về Telegram Bot
 */
function sendTelegramNotification(orderId, name, phone, email, timestamp, status, amount) {
  try {
    let title = "<b>🔔 ĐƠN HÀNG MỚI - KHOÁ HỌC GIAO VIỆC</b>";
    let statusText = "UNPAID (Đang chờ quét VietQR)";
    let moneyText = "890.000 VNĐ";

    if (status === "PAID") {
      title = "<b>✅ THANH TOÁN THÀNH CÔNG - KHOÁ HỌC GIAO VIỆC 🎉</b>";
      statusText = "<b>PAID (Đã chuyển khoản thành công)</b>";
      if (amount) {
        moneyText = Number(amount).toLocaleString('vi-VN') + " VNĐ";
      }
    }

    const message = 
      title + "\n" +
      "-----------------------------------\n" +
      "🆔 <b>Mã đơn hàng:</b> <code>" + escapeHtml(orderId) + "</code>\n" +
      "👤 <b>Họ và tên:</b> " + escapeHtml(name) + "\n" +
      "📞 <b>Điện thoại:</b> <code>" + escapeHtml(phone) + "</code>\n" +
      "📧 <b>Email:</b> " + escapeHtml(email) + "\n" +
      "💰 <b>Số tiền:</b> " + moneyText + "\n" +
      "⏰ <b>Thời gian:</b> " + escapeHtml(timestamp) + "\n" +
      "📌 <b>Trạng thái:</b> " + statusText + "\n\n" +
      "🔗 <b>Link nhóm Telegram:</b> " + TELEGRAM_GROUP_LINK;

    sendTelegramSimpleMessage(message);
  } catch (err) {
    Logger.log("Lỗi gửi thông báo Telegram: " + err);
  }
}

function sendTelegramSimpleMessage(textMessage) {
  try {
    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: textMessage,
      parse_mode: "HTML"
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: false
    };

    UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", options);
  } catch (e) {
    Logger.log("Lỗi sendTelegramSimpleMessage: " + e);
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
