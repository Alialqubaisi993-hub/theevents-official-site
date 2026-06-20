"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Globe,
  Image,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Palette,
  PlusCircle,
  Search,
  Settings,
  ShieldCheck,
  Store,
  TicketCheck,
  Users,
  Wallet,
  Trash2,
} from "lucide-react";

type Tab =
  | "overview"
  | "content"
  | "events"
  | "exhibitors"
  | "bookings"
  | "payments"
  | "reports"
  | "settings";

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");

  const [arTitle, setArTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const [stats, setStats] = useState({
    exhibitions: 0,
    merchants: 0,
    bookings: 0,
    booths: 0,
    revenue: "0",
  });

  useEffect(() => {
    loadContent();
    loadStats();
  }, []);

  async function loadContent() {
    if (!supabase) return;

    const { data } = await supabase
      .from("site_content")
      .select("*")
      .eq("page_key", "home")
      .eq("section_key", "hero");

    if (!data) return;

    const title = data.find((item) => item.field_key === "title");
    const subtitle = data.find((item) => item.field_key === "subtitle");

    if (title) {
      setArTitle(title.ar_value || "");
      setEnTitle(title.en_value || "");
    }

    if (subtitle) {
      setArDescription(subtitle.ar_value || "");
      setEnDescription(subtitle.en_value || "");
    }
  }

  async function loadStats() {
    if (!supabase) return;

    const [exhibitions, merchants, bookings, booths] = await Promise.all([
      supabase.from("exhibitions").select("id", { count: "exact", head: true }),
      supabase.from("merchants").select("id", { count: "exact", head: true }),
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("booths").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      exhibitions: exhibitions.count || 0,
      merchants: merchants.count || 0,
      bookings: bookings.count || 0,
      booths: booths.count || 0,
      revenue: "0",
    });
  }

  async function saveContent() {
    if (!supabase) {
      alert("Supabase غير مربوط");
      return;
    }

    setSaving(true);

    const rows = [
      {
        page_key: "home",
        section_key: "hero",
        field_key: "title",
        ar_value: arTitle,
        en_value: enTitle,
      },
      {
        page_key: "home",
        section_key: "hero",
        field_key: "subtitle",
        ar_value: arDescription,
        en_value: enDescription,
      },
    ];

    const { error } = await supabase.from("site_content").upsert(rows, {
      onConflict: "page_key,section_key,field_key",
    });

    setSaving(false);

    if (error) {
      console.error(error);
      alert("صار خطأ أثناء الحفظ");
      return;
    }

    alert("تم حفظ التعديلات بنجاح");
  }

  return (
    <main className="min-h-screen bg-[#FFF9FD] text-[#2D2638]" dir="rtl">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-l border-[#F0E5FF] bg-white p-5 shadow-sm lg:block">
          <div className="mb-8">
            <a href="/" className="text-3xl font-black" dir="ltr">
              The<span className="text-[#B58CFF]">Events</span>
            </a>
            <p className="mt-2 text-sm font-bold text-[#74687D]">
              Super Admin Dashboard
            </p>
          </div>

          <nav className="space-y-2">
            <NavButton active={tab === "overview"} icon={<LayoutDashboard />} text="الرئيسية" onClick={() => setTab("overview")} />
            <NavButton active={tab === "content"} icon={<Globe />} text="إدارة المحتوى" onClick={() => setTab("content")} />
            <NavButton active={tab === "events"} icon={<CalendarDays />} text="المعارض والفعاليات" onClick={() => setTab("events")} />
            <NavButton active={tab === "exhibitors"} icon={<Store />} text="التجار" onClick={() => setTab("exhibitors")} />
            <NavButton active={tab === "bookings"} icon={<TicketCheck />} text="الحجوزات" onClick={() => setTab("bookings")} />
            <NavButton active={tab === "payments"} icon={<CreditCard />} text="المدفوعات" onClick={() => setTab("payments")} />
            <NavButton active={tab === "reports"} icon={<BarChart3 />} text="التقارير" onClick={() => setTab("reports")} />
            <NavButton active={tab === "settings"} icon={<Settings />} text="الإعدادات" onClick={() => setTab("settings")} />
          </nav>

          <a
            href="/"
            className="mt-10 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-[#74687D] hover:bg-[#FFF9FD]"
          >
            <LogOut size={18} />
            العودة للموقع
          </a>
        </aside>

        <section className="flex-1">
          <header className="sticky top-0 z-20 border-b border-[#F0E5FF] bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-bold text-[#B58CFF]">لوحة الإدارة</p>
                <h1 className="text-2xl font-black">إدارة منصة TheEvents</h1>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <div className="flex items-center gap-2 rounded-full bg-[#FFF9FD] px-4 py-2">
                  <Search size={18} className="text-[#B58CFF]" />
                  <span className="text-sm text-[#74687D]">بحث سريع...</span>
                </div>
                <a href="/" className="rounded-full bg-[#2D2638] px-5 py-2.5 text-sm font-bold text-white">
                  عرض الموقع
                </a>
              </div>
            </div>
          </header>

          <div className="p-6">
            {tab === "overview" && <Overview stats={stats} />}
            {tab === "content" && (
              <ContentEditor
                arTitle={arTitle}
                enTitle={enTitle}
                arDescription={arDescription}
                enDescription={enDescription}
                saving={saving}
                setArTitle={setArTitle}
                setEnTitle={setEnTitle}
                setArDescription={setArDescription}
                setEnDescription={setEnDescription}
                saveContent={saveContent}
              />
            )}
            {tab === "events" && <EventsManager refreshStats={loadStats} />}
            {tab === "exhibitors" && <ExhibitorsManager />}
            {tab === "bookings" && <BookingsManager />}
            {tab === "payments" && <PaymentsManager />}
            {tab === "reports" && <ReportsManager />}
            {tab === "settings" && <SettingsManager />}
          </div>
        </section>
      </div>
    </main>
  );
}

function Overview({ stats }: { stats: any }) {
  return (
    <div>
      <div className="mb-8 rounded-[36px] bg-gradient-to-br from-[#F2E4FF] via-[#FFF0F7] to-[#FFEAD7] p-8 shadow-xl shadow-purple-100">
        <p className="font-bold text-[#8A5CF6]">نظرة عامة</p>
        <h2 className="mt-2 text-4xl font-black">مرحبا بك في لوحة التحكم</h2>
        <p className="mt-3 max-w-2xl text-[#74687D]">
          من هنا تدير محتوى الموقع، المعارض، التجار، الحجوزات، المدفوعات والتقارير.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-5">
        <Stat icon={<CalendarDays />} title="المعارض" value={String(stats.exhibitions)} />
        <Stat icon={<Store />} title="التجار" value={String(stats.merchants)} />
        <Stat icon={<TicketCheck />} title="الحجوزات" value={String(stats.bookings)} />
        <Stat icon={<LayoutGrid />} title="البوثات" value={String(stats.booths)} />
        <Stat icon={<Wallet />} title="الإيرادات" value={`${stats.revenue} درهم`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Panel title="أداء المنصة">
          <div className="flex h-72 items-end gap-4">
            {[30, 55, 42, 70, 62, 85, 74].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-2xl bg-[#B58CFF]" style={{ height: `${h}%` }} />
                <span className="text-xs text-[#74687D]">يوم {i + 1}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="الحجوزات حسب الحالة">
          <div className="space-y-4">
            <Progress label="مؤكدة" value="0" percent={0} />
            <Progress label="بانتظار الدفع" value="0" percent={0} />
            <Progress label="ملغاة" value="0" percent={0} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ContentEditor(props: any) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
      <Panel title="الصفحات">
        <div className="space-y-3">
          {["الصفحة الرئيسية", "صفحة الفعاليات", "صفحة التجار", "صفحة أصحاب المعارض", "تسجيل الدخول", "التسجيل"].map((page) => (
            <button key={page} className="flex w-full items-center justify-between rounded-2xl bg-[#FFF9FD] px-5 py-4 text-right font-bold">
              <span>{page}</span>
              <span className="text-[#B58CFF]">تعديل</span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="محرر الصفحة الرئيسية">
        <div className="grid gap-4">
          <Field label="عنوان الصفحة بالعربي" value={props.arTitle} onChange={props.setArTitle} />
          <Field label="Page Title in English" value={props.enTitle} onChange={props.setEnTitle} />
          <Area label="الوصف بالعربي" value={props.arDescription} onChange={props.setArDescription} />
          <Area label="English Description" value={props.enDescription} onChange={props.setEnDescription} />

          <button
            onClick={props.saveContent}
            disabled={props.saving}
            className="rounded-full bg-[#B58CFF] px-6 py-4 font-bold text-white disabled:opacity-60"
          >
            {props.saving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </Panel>
    </div>
  );
}

function EventsManager({ refreshStats }: { refreshStats: () => void }) {
  const [events, setEvents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);

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

  async function addEvent() {
    if (!supabase) {
      alert("Supabase غير مربوط");
      return;
    }

    if (!name) {
      alert("اكتب اسم المعرض");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("exhibitions").insert({
      name,
      city,
      location,
      description,
      start_date: startDate || null,
      end_date: endDate || null,
      status: "published",
    });

    setSaving(false);

    if (error) {
      console.error(error);
      alert("صار خطأ أثناء إضافة المعرض");
      return;
    }

    setName("");
    setCity("");
    setLocation("");
    setDescription("");
    setStartDate("");
    setEndDate("");

    await loadEvents();
    refreshStats();
    alert("تمت إضافة المعرض بنجاح");
  }

  async function deleteEvent(id: string) {
    if (!supabase) return;

    const confirmDelete = confirm("هل تريد حذف هذا المعرض؟");
    if (!confirmDelete) return;

    const { error } = await supabase.from("exhibitions").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("صار خطأ أثناء الحذف");
      return;
    }

    await loadEvents();
    refreshStats();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
      <Panel title="إضافة معرض جديد">
        <div className="grid gap-4">
          <Field label="اسم المعرض" value={name} onChange={setName} />
          <Field label="المدينة" value={city} onChange={setCity} />
          <Field label="الموقع" value={location} onChange={setLocation} />
          <Area label="وصف المعرض" value={description} onChange={setDescription} />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-bold">تاريخ البداية</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">تاريخ النهاية</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
              />
            </div>
          </div>

          <button
            onClick={addEvent}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-full bg-[#B58CFF] px-6 py-4 font-bold text-white disabled:opacity-60"
          >
            <PlusCircle size={18} />
            {saving ? "جاري الإضافة..." : "إضافة معرض"}
          </button>
        </div>
      </Panel>

      <Panel title="المعارض الحالية">
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#EEE4FF] px-4 py-3">
          <Search size={18} className="text-[#B58CFF]" />
          <span className="text-sm text-[#74687D]">المعارض المنشورة في قاعدة البيانات</span>
        </div>

        <div className="grid gap-4">
          {events.length === 0 && (
            <Empty title="لا توجد معارض حالياً" text="أضف أول معرض من النموذج الموجود في هذه الصفحة." />
          )}

          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl border border-[#F0E5FF] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">{event.name}</h3>
                  <p className="mt-2 text-[#74687D]">{event.city || "بدون مدينة"}</p>
                  <p className="mt-1 text-sm text-[#74687D]">
                    {event.start_date || "بدون تاريخ"} - {event.end_date || "بدون تاريخ"}
                  </p>
                </div>

                <button
                  onClick={() => deleteEvent(event.id)}
                  className="rounded-full bg-red-500 p-3 text-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ExhibitorsManager() {
  return (
    <Panel title="إدارة التجار">
      <div className="grid gap-4 md:grid-cols-3">
        <MiniCard icon={<CheckCircle2 />} title="تجار موثقين" value="0" />
        <MiniCard icon={<FileText />} title="رخص قيد المراجعة" value="0" />
        <MiniCard icon={<ShieldCheck />} title="موافقات" value="0" />
      </div>
      <div className="mt-6">
        <Empty title="لا توجد طلبات تجار حالياً" text="سيتم عرض بيانات جدول merchants هنا." />
      </div>
    </Panel>
  );
}

function BookingsManager() {
  return (
    <Panel title="إدارة الحجوزات">
      <Empty title="لا توجد حجوزات حالياً" text="سيتم عرض حجوزات البوثات من جدول bookings هنا." />
    </Panel>
  );
}

function PaymentsManager() {
  return (
    <Panel title="إدارة المدفوعات">
      <Empty title="لا توجد مدفوعات حالياً" text="لاحقاً سيتم ربط بوابة دفع رسمية." />
    </Panel>
  );
}

function ReportsManager() {
  return (
    <Panel title="التقارير">
      <div className="grid gap-5 md:grid-cols-3">
        <MiniCard icon={<BarChart3 />} title="تقرير المبيعات" value="0 درهم" />
        <MiniCard icon={<Users />} title="تقرير الزوار" value="0" />
        <MiniCard icon={<Store />} title="تقرير التجار" value="0" />
      </div>
    </Panel>
  );
}

function SettingsManager() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Tool icon={<Image />} title="إدارة الصور" />
      <Tool icon={<Palette />} title="الألوان والهوية" />
      <Tool icon={<ShieldCheck />} title="صلاحيات الإدارة" />
    </div>
  );
}

function NavButton({ active, icon, text, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-right text-sm font-bold transition ${
        active ? "bg-[#B58CFF] text-white" : "text-[#74687D] hover:bg-[#FFF9FD]"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

function Stat({ icon, title, value }: any) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-3 text-[#B58CFF]">{icon}</div>
      <p className="text-sm font-bold text-[#74687D]">{title}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function MiniCard({ icon, title, value }: any) {
  return (
    <div className="rounded-3xl bg-[#FFF9FD] p-5">
      <div className="mb-3 text-[#B58CFF]">{icon}</div>
      <p className="text-sm font-bold text-[#74687D]">{title}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function Panel({ title, children }: any) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-black">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }: any) {
  return (
    <div>
      <label className="mb-2 block font-bold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
      />
    </div>
  );
}

function Area({ label, value, onChange }: any) {
  return (
    <div>
      <label className="mb-2 block font-bold">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#F0E5FF] p-4 outline-none"
      />
    </div>
  );
}

function Progress({ label, value, percent }: any) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-3 rounded-full bg-[#FFF9FD]">
        <div className="h-3 rounded-full bg-[#B58CFF]" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function Empty({ title, text }: any) {
  return (
    <div className="rounded-3xl border border-dashed border-[#D8C7FF] bg-[#FFF9FD] p-10 text-center">
      <LayoutGrid className="mx-auto text-[#B58CFF]" size={44} />
      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <p className="mt-2 text-[#74687D]">{text}</p>
    </div>
  );
}

function Tool({ icon, title }: any) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-[#B58CFF]">{icon}</div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 text-[#74687D]">سيتم ربط هذا القسم بقاعدة البيانات لاحقاً.</p>
    </div>
  );
}
