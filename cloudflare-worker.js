// Cloudflare Worker для прокси запросов к Telegram API
// Деплой: wrangler deploy или через Cloudflare Dashboard

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    try {
      // Parse request
      const data = await request.json()

      // Validate
      if (!data.name || !data.phone || !data.email) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Telegram credentials
      const BOT_TOKEN = '8651732113:AAF6DQioU4mgf7XAukDqATGzNrwk1UuIgo0'
      const CHAT_ID = '1021916107'

      // UTM parameters
      const utmSource = data.utmSource || '-'
      const utmMedium = data.utmMedium || '-'
      const utmCampaign = data.utmCampaign || '-'
      const utmContent = data.utmContent || '-'
      const utmTerm = data.utmTerm || '-'

      // Device info
      const deviceType = data.deviceType || 'Unknown'
      const os = data.os || 'Unknown'
      const browser = data.browser || 'Unknown'
      const screenRes = data.screenRes || 'Unknown'

      // Format message
      const message = `🆕 <b>Новая заявка с лендинга!</b>

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
📧 <b>Email:</b> ${data.email}
💬 <b>Комментарий:</b> ${data.comment || 'Не указан'}

━━━━━━━━━━━━━━━━━━━━━━
📊 <b>UTM метки</b>
━━━━━━━━━━━━━━━━━━━━━━
🎯 <b>Source:</b> ${utmSource}
📢 <b>Medium:</b> ${utmMedium}
🎪 <b>Campaign:</b> ${utmCampaign}
📝 <b>Content:</b> ${utmContent}
🔍 <b>Term:</b> ${utmTerm}

━━━━━━━━━━━━━━━━━━━━━━
💻 <b>Устройство</b>
━━━━━━━━━━━━━━━━━━━━━━
📱 <b>Тип:</b> ${deviceType}
🖥 <b>ОС:</b> ${os}
🌐 <b>Браузер:</b> ${browser}
📐 <b>Разрешение:</b> ${screenRes}

🕐 <b>Дата:</b> ${new Date().toLocaleString('ru-RU')}
🌐 <b>Сайт:</b> dev.uspeshnyy.ru/www/paceka/`

      // Send to Telegram
      const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      })

      const result = await response.json()

      if (result.ok) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } else {
        return new Response(JSON.stringify({ error: 'Telegram API error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  },
}
