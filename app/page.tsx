"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  CalendarDays,
  Store,
  Users,
  LayoutGrid,
  ShieldCheck,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [titleAr, setTitleAr] = useState("احجز بوثك وشارك في أقوى الفعاليات بسهولة");
  const [titleEn, setTitleEn] = useState("Book your booth and join top events easily");
  const [subAr, setSubAr] = useState("ثيفنت تجمع أصحاب المعارض، التجار، والزوار في منصة واحدة لإدارة الفعاليات وحجز البوثات.");
  const [subEn, setSubEn] = useState("TheEvents connects organizers, exhibitors, and visitors in one platform.");

  const isAr = lang === "ar";

  useEffect(() => {
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
        setTitleAr(title.ar_value || titleAr);
        setTitleEn(title.en_value || titleEn);
      }

      if (subtitle) {
        setSubAr(subtitle.ar_value || subAr);
        setSubEn(subtitle.en_value || subEn);
      }
    }

    loadContent();
  }, []);

  return (
    <main
      className="min-h-screen bg-[#FFF9FD] text-[#2D2638]"
      dir={isAr ? "rtl" : "ltr"}
    >
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="text-3xl font-black" dir="ltr">
          The<span className="text-[#B58CFF]">Events</span>
        </a>

        <nav className="hidden gap-7 text-sm font-bold text-[#6F647A] md:flex">
          <a href="/">{isAr ? "الرئيسية" : "Home"}</a>
          <a href="/events">{isAr ? "الفعاليات" : "Events"}</a>
          <a href="/exhibitor">{isAr ? "التجار" : "Exhibitors"}</a>
          <a href="/dashboard/organizer">
            {isAr ? "أصحاب المعارض" : "Organizers"}
          </a>
          <a href="/admin">{isAr ? "الإدارة" : "Admin"}</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="rounded-full border border-[#E7DDF4] bg-white px-4 py-2 text-sm font-bold text-[#6F647A]"
          >
            {isAr ? "English" : "العربية"}
          </button>

          <a
            href="/login"
            className="rounded-full bg-[#2D2638] px-5 py-2.5 text-sm font-bold text-white"
          >
            {isAr ? "دخول" : "Sign In"}
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F1E7FF] px-4 py-2 text-sm font-bold text-[#8A5CF6]">
            <Sparkles size={16} />
            {isAr
              ? "منصة المعارض والفعاليات في الإمارات"
              : "UAE Events & Exhibition Platform"}
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            {isAr ? titleAr : titleEn}
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-9 text-[#74687D]">
            {isAr ? subAr : subEn}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/events"
              className="rounded-full bg-[#B58CFF] px-8 py-4 font-bold text-white shadow-lg shadow-purple-200"
            >
              {isAr ? "استعرض الفعاليات" : "Explore Events"}
            </a>

            <a
              href="/exhibitor"
              className="rounded-full border border-[#E7DDF4] bg-white px-8 py-4 font-bold text-[#2D2638]"
            >
              {isAr ? "سجل كتاجر" : "Register as Exhibitor"}
            </a>
          </div>
        </div>

        <div className="rounded-[42px] bg-gradient-to-br from-[#F2E4FF] via-[#FFF0F7] to-[#FFEAD7] p-6 shadow-2xl shadow-purple-100">
          <div className="rounded-[34px] bg-white/85 p-6 backdrop-blur">
            <h2 className="text-2xl font-black">
              {isAr ? "لوحة ثيفنت الذكية" : "TheEvents Smart Dashboard"}
            </h2>

            <p className="mt-2 text-[#74687D]">
              {isAr
                ? "متابعة مباشرة للمعارض، البوثات، التجار والزوار."
                : "Live overview for events, booths, exhibitors, and visitors."}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Stat icon={<CalendarDays />} title={isAr ? "الفعاليات" : "Events"} value="0" />
              <Stat icon={<Store />} title={isAr ? "التجار" : "Exhibitors"} value="0" />
              <Stat icon={<LayoutGrid />} title={isAr ? "البوثات" : "Booths"} value="0" />
              <Stat icon={<Users />} title={isAr ? "الزوار" : "Visitors"} value="0" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[32px] border border-dashed border-[#D8C7FF] bg-white p-10 text-center">
          <CalendarDays className="mx-auto text-[#B58CFF]" size={52} />
          <h3 className="mt-5 text-2xl font-black">
            {isAr ? "لا توجد فعاليات حالياً" : "No events available yet"}
          </h3>
          <p className="mt-3 text-[#74687D]">
            {isAr
              ? "عند إضافة معرض أو فعالية من لوحة صاحب المعرض، ستظهر هنا مباشرة."
              : "When an organizer publishes an event, it will appear here automatically."}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-16 md:grid-cols-3">
        <Feature
          icon={<Store />}
          title={isAr ? "للتجار" : "For Exhibitors"}
          text={
            isAr
              ? "تسجيل الحساب، رفع الرخصة التجارية، اختيار المعرض، وحجز البوث."
              : "Create your profile, upload your trade license, select an event, and book a booth."
          }
        />
        <Feature
          icon={<ShieldCheck />}
          title={isAr ? "لأصحاب المعارض" : "For Organizers"}
          text={
            isAr
              ? "إنشاء المعرض، إدارة البوثات، مراجعة التجار، والعقود."
              : "Create events, manage booths, review exhibitors, and handle contracts."
          }
        />
        <Feature
          icon={<QrCode />}
          title={isAr ? "للزوار" : "For Visitors"}
          text={
            isAr
              ? "استعراض المعارض، خريطة المشاركين، وQR لتسجيل الدخول."
              : "Browse events, view participant maps, and use QR check-in."
          }
        />
      </section>
    </main>
  );
}

function Stat({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-3 text-[#B58CFF]">{icon}</div>
      <p className="text-sm font-bold text-[#74687D]">{title}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-[#B58CFF]">{icon}</div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 leading-7 text-[#74687D]">{text}</p>
    </div>
  );
}
