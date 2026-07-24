export default async function handler(req, res) {
  // Bật CORS cho phép nhận từ mọi nguồn
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydIqxRYHjC-dE-dnLVbLsRbA3aHoe9yIZyOzbzfQstKCU37_Bbje8ktPIm8fefw0EzPw/exec";

  try {
    const payload = req.body || {};

    // Forward request tới Google Apps Script và tự động theo 302 Redirect
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    const responseData = await response.text();

    // Phản hồi 200 OK cho SePay ngay lập tức
    return res.status(200).json({
      success: true,
      message: "SePay Webhook received and forwarded to Google Apps Script",
      data: responseData
    });
  } catch (error) {
    console.error("Error forwarding SePay Webhook:", error);
    // Trả về 200 OK để SePay không báo lỗi
    return res.status(200).json({
      success: false,
      error: error.toString()
    });
  }
}
