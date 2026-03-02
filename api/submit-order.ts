import type { VercelRequest, VercelResponse } from '@vercel/node'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8651732113:AAF6DQioU4mgf7XAukDqATGzNrwk1UuIgo0'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1003771041554'
const TELEGRAM_THREAD_ID = process.env.TELEGRAM_THREAD_ID || '2'

interface OrderData {
  name: string
  phone: string
  email: string
  comment?: string
}

async function sendToTelegram(data: OrderData): Promise<boolean> {
  const message = `
🆕 <b>Новая заявка с лендинга!</b>

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
📧 <b>Email:</b> ${data.email}
💬 <b>Комментарий:</b> ${data.comment || 'Не указан'}

🕐 <b>Дата:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
  `.trim()

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        message_thread_id: parseInt(TELEGRAM_THREAD_ID),
        text: message,
        parse_mode: 'HTML',
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Telegram API error:', result)
      return false
    }

    return result.ok
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return false
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, phone, email, comment } = req.body as OrderData

    // Validation
    if (!name || !phone || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'phone', 'email']
      })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Send to Telegram
    const success = await sendToTelegram({ name, phone, email, comment })

    if (!success) {
      return res.status(500).json({ error: 'Failed to send message' })
    }

    return res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена!'
    })
  } catch (error) {
    console.error('Handler error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
