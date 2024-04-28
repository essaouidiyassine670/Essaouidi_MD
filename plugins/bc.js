let handler = async (m, { conn, text }) => {
  // تعديل رسالة الترحيب والانضمام هنا
  let welcomeMessage = 'مرحبًا بك في المجموعة! نتمنى لك قضاء وقت ممتع معنا.';
  // إضافة رابط المجموعة هنا
  let groupLink = 'https://chat.whatsapp.com/DC3fMtolhr28lT3jgZga2I';
  
  let chats = conn.chats.all().filter(v => v.jid.endsWith('.net')).map(v => v.jid)
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text

  // رسالة تعرضها للمستخدم قبل بدء البث
  conn.reply(m.chat, `سيتم بث رسالة الترحيب التالية لـ${chats.length} مجموعة\n\n${welcomeMessage}\n\nرابط المجموعة: ${groupLink}`, m)
  
  for (let id of chats) {
    await delay(1500)
    await conn.copyNForward(id, conn.cMod(m.chat, cc, `*${welcomeMessage}*\n\n${teks}\n\nرابط المجموعة: ${groupLink}`), true).catch(_ => _)
  }
  
  // رسالة تعرضها للمستخدم بعد الانتهاء من البث
  m.reply('تم بث رسالة الترحيب بنجاح!')
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i

handler.owner = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))
