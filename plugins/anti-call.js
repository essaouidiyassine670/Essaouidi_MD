const delay = time => new Promise(res => setTimeout(res, time));

export async function before(m) {
    // التحقق من أن الرسالة ليست من نوع Baileys وأن الاتصالات الفائتة مفعلة في الدردشة
    if (m.isBaileys || !global.db.data.chats[m.chat]?.antiCall) return;

    const edtr = `🧙‍♂️ @${m.sender.split('@')[0]} 🧙‍♂️`;
    const messageType = {
        40: '📞 لقد فاتك مكالمة صوتية وتم فقدها.',
        41: '📹 لقد فاتك مكالمة فيديو وتم فقدها.',
        45: '📞 لقد فاتك مكالمة صوتية جماعية وتم فقدها.',
        46: '📹 لقد فاتك مكالمة فيديو جماعية وتم فقدها.'
    }[m.messageStubType];

    if (messageType) {
        const cap = 'أنت محظور + محظور + تم تحذيرك + تم طردك من قبل البوت لمخالفتك لقواعد البوت\n\n*📮الاتصال بالبوت محظور!*';
        await this.sendMessage(m.chat, {
            text: `${edtr}\n${messageType}`,
            mentions: [m.sender]
        }, {
            quoted: fakes // تأكيد الرسالة
        });
        await this.reply(m.chat, cap, m); // رسالة تأكيد العقوبة
        await delay(1000); // تأخير لمدة ثانية
        global.db.data.users[m.sender].banned = true; // تحديد حالة الحظر للمستخدم
        global.db.data.users[m.sender].warning = 1; // تحديد عدد التحذيرات
        await this.updateBlockStatus(m.sender, "block"); // حظر المستخدم
        if (m.isGroup) {
            await this.groupParticipantsUpdate(m.chat, [m.sender], "remove"); // إزالة المستخدم من المجموعة
        }
    } else {
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: m.messageStubType
        }); // عرض البيانات في حالة عدم تطابق نوع الرسالة الفائتة المتوقع
    }
}

// تحديد حالة التفعيل للكود
export const disabled = false;
