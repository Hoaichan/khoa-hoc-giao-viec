/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - KHÓA HỌC GIAO VIỆC DỄ DÀNG
 * ==============================================================================
 * ID Sheet: 1-kU84hAZpjZffVpP5_Iv5Z7L4QPjkYM_wxKqvIfDxgc
 * Tên Trang Tính: Danh sach
 * Cột A -> F: TT | Mã Đơn Hàng | Họ và tên | Điện thoại | Email | Trạng thái thanh toán
 */

const SPREADSHEET_ID = "1-kU84hAZpjZffVpP5_Iv5Z7L4QPjkYM_wxKqvIfDxgc";
const SHEET_NAME = "Danh sach";

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  // Khóa đồng bộ trong 10 giây để đảm bảo nhảy Mã Đơn Hàng chính xác khi có nhiều người đăng ký cùng lúc
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
    
    // Nếu chưa có trang tính 'Danh sach', tự động tạo và khởi tạo dòng tiêu đề
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["TT", "Mã Đơn Hàng", "Họ và tên", "Điện thoại", "Email", "Trạng thái thanh toán"]);
    }

    // Tự động sinh Mã Đơn Hàng KGV001 -> KGV999 dựa theo số dòng hiện có
    const lastRow = sheet.getLastRow();
    // Giả sử hàng 1 là hàng Tiêu đề (Header)
    let nextNum = lastRow > 0 ? lastRow : 1;
    const orderId = "KGV" + String(nextNum).padStart(3, "0");

    // Thời gian nhập liệu (Dấu dòng thời gian GMT+7)
    const timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

    // Ghi dữ liệu vào trang tính (Cột A đến F)
    sheet.appendRow([
      timestamp,   // Cột A: TT (Thời gian nhập liệu)
      orderId,     // Cột B: Mã Đơn Hàng (KGVxxx)
      name,        // Cột C: Họ và tên
      phone,       // Cột D: Điện thoại
      email,       // Cột E: Email
      "UNPAID"     // Cột F: Trạng thái thanh toán (Mặc định UNPAID)
    ]);

    // Trả về JSON thành công kèm theo Mã Đơn Hàng vừa tạo
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
