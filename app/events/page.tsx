"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { CalendarDays, MapPin, Search } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("exhibitions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setEvents(data || []);
  }

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;

      return (
        String(event.name || "").toLowerCase().includes(q) ||
        String(event.city || "").toLowerCase().includes(q) ||
        String(event.venue || "").toLowerCase().includes(q) ||
        String(event.location || "").toLowerCase().includes(q)
      );
    });
  }, [events, search]);

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن معرض أو فعالية..."
              className="w-full border-0 bg-transparent outline-none"
            />
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-[#D8C7FF] bg-white p-10 text-center">
            <CalendarDays className="mx-auto text-[#B58CFF]" size={52} />
            <h2 className="mt-5 text-2xl font-black text-[#2D2638]">
              لا توجد معارض حالياً
            </h2>
            <p className="mt-3 text-[#74687D]">
              عند إضافة معرض من لوحة الإدارة سيظهر هنا مباشرة.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function EventCard({ event }: { event: any }) {
  const dateText =
    event.start_date && event.end_date
      ? `${event.start_date} - ${event.end_date}`
      : event.start_date || "سيتم تحديد التاريخ";

  const placeText =
    event.venue || event.location || event.city || "الإمارات العربية المتحدة";

  return (
    <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
      <div className="h-56 bg-gradient-to-br from-[#F4D8FF] via-[#FFE7F1] to-[#FFEAD7]" />

      <div className="p-6">
        <h2 className="text-2xl font-black text-[#2D2638]">
          {event.name || "معرض بدون اسم"}
        </h2>

        {event.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#74687D]">
            {event.description}
          </p>
        )}

        <div className="mt-4 space-y-3 text-[#74687D]">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{dateText}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{placeText}</span>
          </div>
        </div>

        <a
          href={`/event/${event.id}`}
          className="mt-6 block w-full rounded-full bg-[#B58CFF] py-3 text-center font-bold text-white"
        >
          عرض التفاصيل
        </a>
      </div>
    </div>
  );
}
