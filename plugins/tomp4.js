import { webp2mp4 } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/webp/.test(mime) || /ptv/.test(q.mtype) || q.isAnimated) {
	let out = await q.download()
	if (/webp/.test(mime)) out = await webp2mp4(out).catch(_ => null) || Buffer.alloc(0)
	await conn.sendFile(m.chat, out, '', '\n متابعة لصاحب البوت هنا \n *_www.instagram.com/essaouidi_yassine_*', m)
	} else throw `قم بالرد على الملصق لتحويله إلى فيديو *${usedPrefix + command}*`
}

handler.help = ['tovid']
handler.tags = ['sticker']
handler.command = /^((tovid))$/i

export default handler
