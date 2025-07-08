exports.handler = async function (event) {
  // Sadece POST isteklerini kabul et
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // API anahtarını güvenli ortam değişkeninden al
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: 'Sunucuda API anahtarı ayarlanmamış.' };
  }

  const requestBody = JSON.parse(event.body);
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: 'Sunucu hatası: ' + error.message };
  }
};
