import Header from "@/components/Header";
import { FileText, Store, Upload } from "lucide-react";

export default function ExhibitorRegisterPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-10">
        <p className="font-bold text-[#B58CFF]">تسجيل التاجر</p>
        <h1 className="mt-2 text-5xl font-black text-[#2D2638]">
          أنشئ حساب مشروعك
        </h1>

        <div className="mt-8 rounded-[36px] bg-white p-8 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="اسم المشروع" />
            <Field label="اسم صاحب المشروع" />
            <Field label="نوع النشاط" />
            <Field label="رقم التواصل" />
            <Field label="البريد الإلكتروني" />
            <Field label="حساب الانستغرام" />

            <div className="md:col-span-2">
              <label className="mb-2 block font-bold text-[#2D2638]">
                رقم الرخصة التجارية
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#F0E5FF] px-4 py-3">
                <FileText className="text-[#B58CFF]" size={20} />
                <input className="w-full bg-transparent outline-none" />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-bold text-[#2D2638]">
                تاريخ انتهاء الرخصة
              </label>
              <input
                type="date"
                className="w-full rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
              />
            </div>

            <div className="rounded-3xl border border-dashed border-[#D8C7FF] bg-[#FFF9FD] p-6 text-center">
              <Upload className="mx-auto text-[#B58CFF]" size={34} />
              <h3 className="mt-3 font-black">رفع الرخصة</h3>
              <p className="mt-1 text-sm text-[#74687D]">PDF أو صورة واضحة</p>
            </div>
          </div>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#B58CFF] py-4 font-bold text-white">
            <Store size={18} />
            إرسال طلب التسجيل
          </button>
        </div>
      </section>
    </main>
  );
}

function Field({ label }: { label: string }) {
  return (
    <div>
      <label className="mb-2 block font-bold text-[#2D2638]">{label}</label>
      <input className="w-full rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none" />
    </div>
  );
}
