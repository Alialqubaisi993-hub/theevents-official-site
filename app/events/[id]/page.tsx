import Header from "@/components/Header";
import { CalendarDays, MapPin, Store, LayoutGrid, FileText } from "lucide-react";

export default function EventDetailsPage() {
  const booths = [
    "A1", "A2", "A3", "A4",
    "B1", "B2", "B3", "B4",
    "C1", "C2", "C3", "C4",
  ];

  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="overflow-hidden rounded-[42px] bg-white shadow-sm">
          <div className="h-80 bg-gradient-to-br from-[#F4D8FF] via-[#FFE7F1] to-[#FFEAD7]" />

          <div className="p-8">
            <p className="font-bold text-[#B58CFF]">تفاصيل الفعالية</p>

            <h1 className="mt-2 text-5xl font-black text-[#2D2638]">
              اسم المعرض
            </h1>

            <div className="mt-6 flex flex-wrap gap-5 text-[#74687D]">
              <span className="flex items-center gap-2">
                <CalendarDays size={18} />
                سيتم تحديد التاريخ
              </span>

              <span className="flex items-center gap-2">
                <MapPin size={18} />
                الإمارات العربية المتحدة
              </span>

              <span className="flex items-center gap-2">
                <Store size={18} />
                عدد المشاركين: 0
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-[36px] bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#B58CFF]">خريطة البوثات</p>
                <h2 className="mt-1 text-3xl font-black text-[#2D2638]">
                  اختر البوث المناسب
                </h2>
              </div>

              <LayoutGrid className="text-[#B58CFF]" size={34} />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {booths.map((booth) => (
                <div
                  key={booth}
                  className="rounded-2xl border border-[#F0E5FF] bg-[#FFF9FD] p-5 text-center font-black text-[#2D2638]"
                >
                  {booth}
                  <p className="mt-1 text-xs font-bold text-[#8A5CF6]">
                    متاح
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] bg-white p-8 shadow-sm">
            <FileText className="mb-4 text-[#B58CFF]" size={36} />

            <h2 className="text-3xl font-black text-[#2D2638]">
              طلب المشاركة
            </h2>

            <p className="mt-4 leading-8 text-[#74687D]">
              قبل حجز البوث يجب أن يكون حساب التاجر موثق والرخصة التجارية
              سارية.
            </p>

            <div className="mt-6 rounded-3xl bg-[#FFF9FD] p-5">
              <p className="text-sm font-bold text-[#74687D]">
                السعر يبدأ من
              </p>
              <p className="mt-1 text-3xl font-black text-[#2D2638]">
                سيتم تحديد السعر
              </p>
            </div>

            <a
              href="/exhibitor"
              className="mt-6 block rounded-full bg-[#B58CFF] py-4 text-center font-bold text-white"
            >
              قدم طلب حجز
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
