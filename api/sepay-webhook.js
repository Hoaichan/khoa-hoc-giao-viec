export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydIqxRYHjC-dE-dnLVbLsRbA3aHoe9yIZyOzbzfQstKCU37_Bbje8ktPIm8fefw0EzPw/exec";

  try {
    const payload = req.body || {};
    const bodyString = typeof payload === 'string' ? payload : JSON.stringify(payload);

    // Forward request tới Google Apps Script (dùng text/plain để Apps Script đọc e.postData.contents không bị lỗi)
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: bodyString,
      redirect: 'follow'
    });

    const responseData = await response.text();

    return res.status(200).json({
      success: true,
      message: "SePay Webhook received and forwarded to Google Apps Script",
      data: responseData
    });
  } catch (error) {
    console.error("Error forwarding SePay Webhook:", error);
    return res.status(200).json({
      success: false,
      error: error.toString()
    });
  }
}
