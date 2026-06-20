import Header from "@/components/Header";
import {
  CalendarDays,
  LayoutGrid,
  Users,
  Wallet,
  PlusCircle,
} from "lucide-react";

export default function OrganizerDashboard() {
  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-[#B58CFF]">لوحة صاحب المعرض</p>
            <h1 className="mt-2 text-5xl font-black text-[#2D2638]">
              إدارة المعارض والفعاليات
            </h1>
          </div>

          <button className="flex items-center gap-2 rounded-full bg-[#B58CFF] px-6 py-4 font-bold text-white">
            <PlusCircle size={18} />
            إنشاء معرض جديد
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <Stat title="المعارض" value="0" icon={<CalendarDays />} />
          <Stat title="البوثات" value="0" icon={<LayoutGrid />} />
          <Stat title="التجار" value="0" icon={<Users />} />
          <Stat title="الإيرادات" value="0 درهم" icon={<Wallet />} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black">إنشاء معرض جديد</h2>

            <div className="mt-6 grid gap-4">
              <input
                className="rounded-2xl border border-[#EEE4FF] px-4 py-3"
                placeholder="اسم المعرض"
              />

              <input
                className="rounded-2xl border border-[#EEE4FF] px-4 py-3"
                placeholder="الموقع"
              />

              <input
                type="date"
                className="rounded-2xl border border-[#EEE4FF] px-4 py-3"
              />

              <input
                className="rounded-2xl border border-[#EEE4FF] px-4 py-3"
                placeholder="عدد البوثات"
              />

              <button className="rounded-full bg-[#2D2638] px-6 py-4 font-bold text-white">
                حفظ المعرض
              </button>
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black">آخر الأنشطة</h2>

            <div className="mt-8 rounded-3xl border border-dashed border-[#D8C7FF] p-10 text-center">
              <CalendarDays
                className="mx-auto text-[#B58CFF]"
                size={48}
              />

              <h3 className="mt-4 text-xl font-black">
                لا توجد معارض حالياً
              </h3>

              <p className="mt-2 text-[#74687D]">
                سيتم عرض المعارض التي تنشئها هنا.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-3 text-[#B58CFF]">{icon}</div>
      <h3 className="text-sm font-bold text-[#74687D]">{title}</h3>
      <p className="mt-2 text-3xl font-black text-[#2D2638]">{value}</p>
    </div>
  );
}
