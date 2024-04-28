/*export async function before(m) {
    // إعدادات الأوتوماتيكية للصلاة
    this.autosholat = this.autosholat ? this.autosholat : {}
    // تحديد الشخص المذكور في الرسالة
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    // الحصول على اسم المستخدم
    let name = await this.getName(who)
    // تحديد معرف الدردشة
    let id = m.chat
    // التحقق مما إذا كانت هناك بالفعل تنبيهات للصلاة في هذه الدردشة
    if (id in this.autosholat) {
        return false
    }

    // جدول لأوقات الصلاة لمدينة مراكش/المغرب
    let jadwalSholat = {
      Fajr: "الفجر",
      Sunrise: "الشروق",
      Dhuhr: "الظهر",
      Asr: "العصر",
      Sunset: "الغروب",
      Maghrib: "المغرب",
      Isha: "العشاء",
      Imsak: "الإمساك",
      Midnight: "منتصف الليل",
      Firstthird: "ثلث الليل الأول",
      Lastthird: "ثلث الليل الأخير"
    }

    // الحصول على الوقت الحالي في منطقة مراكش/المغرب
    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Africa/Casablanca" // تحديد المنطقة الزمنية
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // التحقق مما إذا كان الوقت الحالي يتطابق مع أحد أوقات الصلاة
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            // إنشاء رسالة التنبيه بمعلومات الصلاة والوقت الحالي
            let caption = `مرحبًا ${name},\nوقت *${sholat}* قد حان، قم بأخذ الوضوء وأد الصلاة بأسرع وقت🙂.\n\n*${waktu}*\n_لمنطقة مراكش/المغرب والمناطق المجاورة._`
            // حفظ تنبيه الصلاة في قائمة الأوتوماتيكية لمدة معينة
            this.autosholat[id] = [
                this.reply(m.chat, caption, null),
                setTimeout(() => {
                    delete this.autosholat[id]
                }, 57000) // 57 ثانية
            ]
        }
    }
}
export const disabled = false*/
