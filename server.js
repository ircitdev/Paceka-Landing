import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = 3002

app.use(cors())
app.use(express.json())

const TELEGRAM_BOT_TOKEN = '8651732113:AAF6DQioU4mgf7XAukDqATGzNrwk1UuIgo0'
const TELEGRAM_CHAT_ID = '-1003771041554'
const TELEGRAM_THREAD_ID = '2'

app.post('/api/submit-order', async (req, res) => {
  try {
    const { name, phone, email, comment } = req.body

    if (!name || !phone || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'phone', 'email']
      })
    }

    const message = `
🆕 <b>Новая заявка с лендинга!</b>

👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email}
💬 <b>Комментарий:</b> ${comment || 'Не указан'}

🕐 <b>Дата:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
    `.trim()

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramUrl, {
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
      return res.status(500).json({ error: 'Failed to send message to Telegram' })
    }

    res.json({
      success: true,
      message: 'Заявка успешно отправлена!'
    })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀 API server running on http://localhost:${PORT}`)
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/submit-order\n`)
})
