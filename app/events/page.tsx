"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import {
  CalendarDays,
  MapPin,
  Store,
  LayoutGrid,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [event, setEvent] = useState<any>(null);
  const [booths, setBooths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, []);

  async function loadEvent() {
    if (!supabase) return;

    setLoading(true);

    const { data: eventData, error: eventError } = await supabase
      .from("exhibitions")
      .select("*")
      .eq("id", params.id)
      .single();

    if (eventError) {
      console.error(eventError);
      setLoading(false);
      return;
    }

    const { data: boothData } = await supabase
      .from("booths")
      .select("*")
      .eq("exhibition_id", params.id)
      .order("booth_number", { ascending: true });

    setEvent(eventData);
    setBooths(boothData || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-[32px] bg-white p-10 text-center shadow-sm">
            جاري تحميل بيانات المعرض...
          </div>
        </section>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
        <Header />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-[32px] bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-black text-[#2D2638]">
              المعرض غير موجود
            </h1>
            <a
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B58CFF] px-6 py-3 font-bold text-white"
            >
              <ArrowRight size={18} />
              العودة للفعاليات
            </a>
          </div>
        </section>
      </main>
    );
  }

  const dateText =
    event.start_date && event.end_date
      ? `${event.start_date} - ${event.end_date}`
      : event.start_date || "سيتم تحديد التاريخ";

  const placeText =
    event.venue || event.location || event.city || "الإمارات العربية المتحدة";

  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="overflow-hidden rounded-[42px] bg-white shadow-sm">
          <div className="h-80 bg-gradient-to-br from-[#F4D8FF] via-[#FFE7F1] to-[#FFEAD7]" />

          <div className="p-8">
            <p className="font-bold text-[#B58CFF]">تفاصيل الفعالية</p>

            <h1 className="mt-2 text-5xl font-black text-[#2D2638]">
              {event.name}
            </h1>

            {event.description && (
              <p className="mt-5 max-w-3xl text-lg leading-9 text-[#74687D]">
                {event.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-5 text-[#74687D]">
              <span className="flex items-center gap-2">
                <CalendarDays size={18} />
                {dateText}
              </span>

              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {placeText}
              </span>

              <span className="flex items-center gap-2">
                <Store size={18} />
                عدد البوثات: {booths.length}
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
                  البوثات المتاحة
                </h2>
              </div>

              <LayoutGrid className="text-[#B58CFF]" size={34} />
            </div>

            {booths.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#D8C7FF] bg-[#FFF9FD] p-10 text-center">
                <h3 className="text-xl font-black text-[#2D2638]">
                  لا توجد بوثات لهذا المعرض حالياً
                </h3>
                <p className="mt-2 text-[#74687D]">
                  عند إضافة البوثات من لوحة التحكم ستظهر هنا.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {booths.map((booth) => (
                  <div
                    key={booth.id}
                    className="rounded-2xl border border-[#F0E5FF] bg-[#FFF9FD] p-5 text-center font-black text-[#2D2638]"
                  >
                    {booth.booth_number || booth.name || "Booth"}
                    <p className="mt-1 text-xs font-bold text-[#8A5CF6]">
                      {booth.status || "متاح"}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
