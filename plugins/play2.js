import ytdl from 'ytdl-core'; // استيراد ytdl-core لتنزيل مقاطع الفيديو من YouTube
import yts from 'yt-search'; // استيراد yt-search للبحث عن مقاطع الفيديو على YouTube
import fs from 'fs'; // استيراد fs لعمليات نظام الملفات
import { pipeline } from 'stream'; // استيراد pipeline من وحدة stream لمعالجة التدفق
import { promisify } from 'util'; // استيراد promisify من وحدة util لتحويل الدوال المعتمدة على الرد إلى دوال تعتمد على الوعد

const streamPipeline = promisify(pipeline); // تحويل الدالة pipeline إلى وعد لمعالجة التدفق

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `استخدم المثال ${usedPrefix}${command} naruto blue bird`; // إذا لم يتم تحديد الاستعلام، رمي خطأ

  let search = await yts(text); // البحث عن الفيديو باستخدام الاستعلام المعطى
  let vid = search.videos[0]; // الحصول على أول نتيجة للفيديو
  if (!search) throw 'الفيديو غير موجود، جرب عنوانًا آخر'; // إذا لم يتم العثور على نتائج، رمي خطأ

  // استخراج معلومات الفيديو
  let { title, thumbnail, timestamp, views, ago, url } = vid;
  let wm = 'R'; // علامة المائية

  // إعداد الرسالة لإرسال معلومات الفيديو
  let captvid = `╭──── 〔 ESSAOUIDI SONG 〕 ─⬣
  ⬡ العنوان: ${title}
  ⬡ المدة: ${timestamp}
  ⬡ المشاهدات: ${views}
  ⬡ التحميل: ${ago}
  ⬡ الرابط: ${url}
╰────────⬣`;

  // إرسال الصورة المصغرة ومعلومات الفيديو كرسالة
  conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid, viewOnce: false, footer: author }, { quoted: m });

  // تنزيل الصوت من الفيديو
  const audioStream = ytdl(url, {
    filter: 'audioonly', // تحديد تنزيل الصوت فقط
    quality: 'highestaudio', // جودة الصوت المراد تنزيله
  });

  // إنشاء تدفق كتابي لحفظ ملف الصوت
  const writableStream = fs.createWriteStream(`./tmp/${title}.mp3`);

  // بدء عملية التنزيل
  await streamPipeline(audioStream, writableStream);
  
  // إعداد الرسالة لإرسال ملف الصوت
  let doc = {
    audio: {
      url: `./tmp/${title}.mp3` // رابط ملف الصوت
    },
    mimetype: 'audio/mp4', // نوع الملف
    fileName: `${title}`, // اسم الملف
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: wm,
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumbnail)).data
      }
    }
  };

  // إرسال ملف الصوت
  await conn.sendMessage(m.chat, doc, { quoted: m });

  // حذف ملف الصوت المؤقت بعد الإرسال
  fs.unlink(`./tmp/${title}.mp3`, (err) => {
    if (err) {
      console.error(`فشل في حذف ملف الصوت: ${err}`);
    } else {
      console.log(`تم حذف ملف الصوت: ./tmp/${title}.mp3`);
    }
  });
};

handler.help = ['play2'].map((v) => v + ' <query>'); // رسالة المساعدة
handler.tags = ['downloader']; // الوسوم المرتبطة بالدالة
handler.command = /^(play2|song2|lagu2|music2)$/i; // الأمر لتنشيط الدالة

export default handler; // تصدير الدالة handler
