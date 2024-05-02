import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, 'يرجى إدخال رابط إنستجرام بعد الأمر. \n .instagram2 https://www.instagram.com/reel/C50Bt8vIKNi/?igsh=bDN3eTgwbTBkY29w', m)
  }

  let url = `https://vihangayt.me/download/instagram?url=${encodeURIComponent(text)}`
  
  try {
    // جلب مقطع الفيديو من إنستجرام باستخدام Axios
    const response = await axios.get(url)
    if (!response.data.status) {
      throw new Error(`حدث خطأ في جلب البيانات من ${url}`)
    }

    const data = response.data.data
    if (data && data.data && data.data.length > 0) {
      const videoURL = data.data[0].url
      const caption = data.data[0].type

      // إرسال الملف مع وضع نوعه كتسمية
      await conn.sendFile(m.chat, videoURL, 'instagram_reel.mp4', '*الفيديو الخاص بك*\n _*instagram.com/essaouidi_yassine*_, m)
    } else {
      conn.reply(m.chat, 'تعذر العثور على مقطع فيديو من إنستجرام.', m)
    }
  } catch (error) {
    console.error(error)
    conn.reply(m.chat, 'حدث خطأ أثناء جلب مقطع الفيديو من إنستجرام.', m)
  }
}

handler.command = /^(igdl2|ig2|instagram2)$/i
handler.tags = ['downloader']
handler.help = ['instagram2'']
handler.premium = false
handler.limit = true

export default handler
