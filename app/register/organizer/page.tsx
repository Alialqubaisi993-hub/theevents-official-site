import Header from "@/components/Header";
import { CalendarDays, LayoutGrid, Upload } from "lucide-react";

export default function OrganizerRegisterPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-10">
        <p className="font-bold text-[#B58CFF]">صاحب المعرض</p>

        <h1 className="mt-2 text-5xl font-black text-[#2D2638]">
          إنشاء حساب صاحب معرض
        </h1>

        <div className="mt-8 rounded-[36px] bg-white p-8 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="اسم الشركة" />
            <Field label="اسم المسؤول" />
            <Field label="البريد الإلكتروني" />
            <Field label="رقم الهاتف" />
            <Field label="الموقع الإلكتروني" />
            <Field label="عدد المعارض السنوية" />

            <div className="md:col-span-2">
              <label className="mb-2 block font-bold">
                نبذة عن الشركة
              </label>

              <textarea
                rows={5}
                className="w-full rounded-2xl border border-[#F0E5FF] p-4 outline-none"
              />
            </div>

            <div className="rounded-3xl border border-dashed border-[#D8C7FF] bg-[#FFF9FD] p-6 text-center">
              <Upload className="mx-auto text-[#B58CFF]" size={34} />
              <h3 className="mt-3 font-black">
                رفع الرخصة التجارية
              </h3>
            </div>

            <div className="rounded-3xl border border-dashed border-[#D8C7FF] bg-[#FFF9FD] p-6 text-center">
              <CalendarDays className="mx-auto text-[#B58CFF]" size={34} />
              <h3 className="mt-3 font-black">
                رفع ملف المعارض السابقة
              </h3>
            </div>
          </div>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#2D2638] py-4 font-bold text-white">
            <LayoutGrid size={18} />
            إنشاء الحساب
          </button>
        </div>
      </section>
    </main>
  );
}

function Field({ label }: { label: string }) {
  return (
    <div>
      <label className="mb-2 block font-bold text-[#2D2638]">
        {label}
      </label>

      <input className="w-full rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none" />
    </div>
  );
}
