import Header from "@/components/Header";
import { BadgeCheck, CalendarDays, FileText, Store, Upload } from "lucide-react";

export default function ExhibitorPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FD] text-[#2D2638]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="font-bold text-[#B58CFF]">بوابة التجار</p>
          <h1 className="mt-2 text-5xl font-black">ملف التاجر</h1>
          <p className="mt-3 text-[#74687D]">
            سجل مشروعك، ارفع الرخصة التجارية، واحجز بوثك في المعارض المتاحة.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-[32px] bg-white p-6 shadow-sm">
            <Store className="mb-4 text-[#B58CFF]" size={34} />
            <h2 className="text-2xl font-black">بيانات المشروع</h2>

            <div className="mt-6 grid gap-4">
              <input className="rounded-2xl border border-[#F0E5FF] px-4 py-3" placeholder="اسم المشروع" />
              <input className="rounded-2xl border border-[#F0E5FF] px-4 py-3" placeholder="نوع النشاط" />
              <input className="rounded-2xl border border-[#F0E5FF] px-4 py-3" placeholder="رقم التواصل" />
              <input className="rounded-2xl border border-[#F0E5FF] px-4 py-3" placeholder="حساب الانستغرام" />

              <button className="rounded-full bg-[#B58CFF] px-6 py-4 font-bold text-white">
                حفظ البيانات
              </button>
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-6 shadow-sm">
            <FileText className="mb-4 text-[#B58CFF]" size={34} />
            <h2 className="text-2xl font-black">الرخصة التجارية</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-[#F0E5FF] px-4 py-3" placeholder="رقم الرخصة" />
              <input type="date" className="rounded-2xl border border-[#F0E5FF] px-4 py-3" />

              <div className="md:col-span-2 rounded-3xl border border-dashed border-[#D8C7FF] bg-[#FFF9FD] p-8 text-center">
                <Upload className="mx-auto text-[#B58CFF]" size={42} />
                <h3 className="mt-4 text-xl font-black">رفع الرخصة التجارية</h3>
                <p className="mt-2 text-[#74687D]">PDF أو صورة واضحة للرخصة</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card icon={<BadgeCheck />} title="حالة الحساب" value="بانتظار التحقق" />
          <Card icon={<CalendarDays />} title="حجوزاتي" value="لا توجد حجوزات" />
          <Card icon={<Store />} title="المعارض المتاحة" value="لا توجد معارض حالياً" />
        </div>
      </section>
    </main>
  );
}

function Card({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-[#B58CFF]">{icon}</div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 text-[#74687D]">{value}</p>
    </div>
  );
}
