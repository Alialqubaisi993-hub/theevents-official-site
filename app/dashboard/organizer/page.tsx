"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { CalendarDays, LayoutGrid, PlusCircle, TicketCheck, Trash2, Wallet } from "lucide-react";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({ events: 0, bookings: 0, booths: 0, revenue: "0" });

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!supabase) return;

    const [{ data: eventData }, bookings, booths] = await Promise.all([
      supabase.from("exhibitions").select("*").order("created_at", { ascending: false }),
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("booths").select("id", { count: "exact", head: true }),
    ]);

    setEvents(eventData || []);
    setStats({
      events: eventData?.length || 0,
      bookings: bookings.count || 0,
      booths: booths.count || 0,
      revenue: "0",
    });
  }

  async function addEvent() {
    if (!supabase) return alert("Supabase غير مربوط");
    if (!name) return alert("اكتب اسم المعرض");

    setSaving(true);

    const { error } = await supabase.from("exhibitions").insert({
      name,
      city,
      venue,
      location: venue,
      status: "published",
    });

    setSaving(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setName("");
    setCity("");
    setVenue("");
    await loadData();
    alert("تم حفظ المعرض");
  }

  async function deleteEvent(id: string) {
    if (!supabase) return;
    if (!confirm("هل تريد حذف هذا المعرض؟")) return;

    const { error } = await supabase.from("exhibitions").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    await loadData();
  }

  return (
    <main className="min-h-screen bg-[#FFF9FD] text-[#2D2638]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="font-bold text-[#B58CFF]">بوابة صاحب المعرض</p>
        <h1 className="mt-2 text-5xl font-black">لوحة صاحب المعرض</h1>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Stat icon={<CalendarDays />} label="المعارض" value={String(stats.events)} />
          <Stat icon={<TicketCheck />} label="الحجوزات" value={String(stats.bookings)} />
          <Stat icon={<Wallet />} label="الإيرادات" value={`${stats.revenue} درهم`} />
          <Stat icon={<LayoutGrid />} label="البوثات" value={String(stats.booths)} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
          <div className="rounded-[34px] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">إنشاء معرض</h2>

            <div className="mt-5 grid gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم المعرض"
                className="rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="المدينة"
                className="rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
              />
              <input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="الموقع / القاعة"
                className="rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
              />

              <button
                onClick={addEvent}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-full bg-[#B58CFF] px-7 py-4 font-black text-white disabled:opacity-60"
              >
                <PlusCircle size={18} />
                {saving ? "جاري الحفظ..." : "حفظ المعرض"}
              </button>
            </div>
          </div>

          <div className="rounded-[34px] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">معارضي</h2>

            <div className="mt-5 grid gap-4">
              {events.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#D8C7FF] bg-[#FFF9FD] p-8 text-center text-[#74687D]">
                  لا توجد معارض حالياً
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-3xl border border-[#F0E5FF] bg-[#FFF9FD] p-5"
                  >
                    <div>
                      <h3 className="text-xl font-black">{event.name}</h3>
                      <p className="mt-1 text-sm text-[#74687D]">
                        {event.city || "بدون مدينة"} · {event.venue || event.location || "بدون موقع"}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="rounded-full bg-red-500 p-3 text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="text-[#B58CFF]">{icon}</div>
      <p className="mt-4 text-sm font-bold text-[#74687D]">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}
