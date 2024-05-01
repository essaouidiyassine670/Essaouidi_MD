// NO GITA STUFF ALLOWED
import fetch from 'node-fetch';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text && !(m.quoted && m.quoted.text)) {
  if (!text) {
    throw `*_Need query._*\n*_Example:_* _${usedPrefix + command} متى مات السيد المسيح_`;
  }
     }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  m.react('⚡')
  try {
    conn.sendPresenceUpdate('composing', m.chat);
    

    const API_URL = `https://vihangayt.me/tools/chatgpt5?q=Hi${encodeURIComponent(text)}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    m.react(done)
    if (data.status && data.data) {
      const respuestaAPI = data.data;
      conn.reply(m.chat, respuestaAPI, m);
    } else {
      throw '*😂 لا يمكن الحصول على إجابة صحيحة آسف*';
    }
  } catch (error) {
    throw `*😂 عفوًا، خطأ في واجهة برمجة التطبيقات. الرجاء معاودة المحاولة في وقت لاحق*`;
  }
};

handler.command = /^gpt5$/i;
handler.tags = ['study'];

export default handler;
