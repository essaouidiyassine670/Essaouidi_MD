import { createHash } from 'crypto'

let regex = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  if (user.registered === true) {
    throw `✳️ أنت مسجل بالفعل\n\nهل ترغب في التسجيل مرة أخرى؟\n\n 📌 استخدم هذا الأمر لحذف تسجيلك\n*${usedPrefix}unreg* <رقم التسلسل>`
  }

  if (!regex.test(text)) {
    throw `⚠️ صيغة غير صحيحة\n\n ✳️ استخدام الأمر: *${usedPrefix + command} اسم.عمر*\n📌 مثال: *${usedPrefix + command}* ${name2}.18`
  }

  let [_, name, splitter, age] = text.match(regex)

  if (!name) {
    throw '✳️ يجب أن لا يكون الاسم فارغاً'
  }

  if (!age) {
    throw '✳️ العمر لا يمكن أن يكون فارغاً'
  }

  if (name.length >= 30) {
    throw '✳️ الاسم طويل جداً'
  } 

  age = parseInt(age)

  if (age > 100) {
    throw '👴🏻 واو، كبير في السن للعب مع البوت'
  }

  if (age < 5) {
    throw '🚼 يبدو أن هناك طفل هنا، هههه'
  }

  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true

  let serialNumber = createHash('md5').update(m.sender).digest('hex')

  m.reply(`
┌─「 *تم التسجيل* 」─
▢ *الاسم:* ${name}
▢ *العمر* : ${age} سنة
▢ *رقم التسلسل* :
${serialNumber}

└──────────────

*${usedPrefix}help* لعرض القائمة
`.trim())
}

handler.help = ['reg'].map(v => v + ' <اسم.عمر>')
handler.tags = ['owner']

handler.command = ['verify', 'reg', 'register', 'registrar']

export default handler
