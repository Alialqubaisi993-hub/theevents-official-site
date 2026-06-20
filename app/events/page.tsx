import Header from "@/components/Header";
import { CalendarDays, MapPin, Search } from "lucide-react";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-black text-[#2D2638]">
            المعارض والفعاليات
          </h1>

          <p className="mt-3 text-lg text-[#74687D]">
            استعرض جميع المعارض والفعاليات المتاحة في منصة TheEvents
          </p>
        </div>

        <div className="mb-10 rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Search className="text-[#B58CFF]" />
            <input
              placeholder="ابحث عن معرض أو فعالية..."
              className="w-full border-0 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>
    </main>
  );
}

function EventCard() {
  return (
    <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
      <div className="h-56 bg-gradient-to-br from-[#F4D8FF] via-[#FFE7F1] to-[#FFEAD7]" />

      <div className="p-6">
        <h2 className="text-2xl font-black text-[#2D2638]">
          اسم المعرض
        </h2>

        <div className="mt-4 space-y-3 text-[#74687D]">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>سيتم تحديد التاريخ</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>الإمارات العربية المتحدة</span>
          </div>
        </div>

        <button className="mt-6 w-full rounded-full bg-[#B58CFF] py-3 font-bold text-white">
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}
