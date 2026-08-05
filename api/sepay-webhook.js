export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxPnvo7p51f5AFnLvPet9ZP9c3MJpZcnRUe7yp6L-QGHF8Rk1y2DRfm6Yo17WcoUoK5Yg/exec";

  try {
    const payload = req.body || {};
    const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);

    // Truyền dữ liệu SePay qua Query String ?isSepay=1&payload=... để bảo toàn qua Google 302 Redirect
    const targetUrl = APPS_SCRIPT_URL + "?isSepay=1&payload=" + encodeURIComponent(payloadString);

    const response = await fetch(targetUrl, {
      method: 'GET',
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
