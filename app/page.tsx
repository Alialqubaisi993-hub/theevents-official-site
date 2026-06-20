import {
  CalendarDays,
  MapPin,
  Store,
  Users,
  LayoutGrid,
  ShieldCheck,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF9FD] text-[#2D2638]" dir="rtl">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="text-3xl font-black">
          ثيفنت
          <span className="mr-2 text-base font-bold text-[#B58CFF]">
            TheEvents
          </span>
        </a>

        <nav className="hidden gap-7 text-sm font-bold text-[#6F647A] md:flex">
          <a href="/">الرئيسية</a>
          <a href="/events">المعارض</a>
          <a href="/exhibitor">التجار</a>
          <a href="/dashboard/organizer">صاحب المعرض</a>
        </nav>

        <a
          href="/login"
          className="rounded-full bg-[#2D2638] px-6 py-3 text-sm font-bold text-white"
        >
          تسجيل الدخول
        </a>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F1E7FF] px-4 py-2 text-sm font-bold text-[#8A5CF6]">
            <Sparkles size={16} />
            منصة المعارض والفعاليات في الإمارات
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            احجز بوثك وشارك في أقوى الفعاليات بسهولة
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-9 text-[#74687D]">
            ثيفنت تجمع أصحاب المعارض، التجار، والزوار في منصة واحدة لإدارة
            الفعاليات، حجز البوثات، متابعة المشاركين، وإحصائيات الدخول.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/events"
              className="rounded-full bg-[#B58CFF] px-8 py-4 font-bold text-white shadow-lg shadow-purple-200"
            >
              استعرض المعارض
            </a>

            <a
              href="/exhibitor"
              className="rounded-full border border-[#E7DDF4] bg-white px-8 py-4 font-bold text-[#2D2638]"
            >
              سجل كتاجر
            </a>
          </div>
        </div>

        <div className="rounded-[42px] bg-gradient-to-br from-[#F2E4FF] via-[#FFF0F7] to-[#FFEAD7] p-6 shadow-2xl shadow-purple-100">
          <div className="rounded-[34px] bg-white/85 p-6 backdrop-blur">
            <h2 className="text-2xl font-black">لوحة ثيفنت الذكية</h2>
            <p className="mt-2 text-[#74687D]">
              متابعة مباشرة للمعارض، البوثات، التجار والزوار.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Stat icon={<CalendarDays />} title="المعارض" value="0" />
              <Stat icon={<Store />} title="التجار" value="0" />
              <Stat icon={<LayoutGrid />} title="البوثات" value="0" />
              <Stat icon={<Users />} title="الزوار" value="0" />
            </div>

            <div className="mt-6 rounded-3xl bg-[#FFF9FD] p-5">
              <p className="text-sm font-bold text-[#8A5CF6]">
                حالة النظام
              </p>
              <h3 className="mt-2 text-xl font-black">
                جاهز للربط مع قاعدة البيانات
              </h3>
              <p className="mt-2 text-sm text-[#74687D]">
                سيتم عرض المعارض الحقيقية بعد إضافتها من لوحة صاحب المعرض.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-black">المعارض والفعاليات</h2>
            <p className="mt-2 text-[#74687D]">
              لا توجد معارض منشورة حالياً.
            </p>
          </div>
          <a
            href="/dashboard/organizer"
            className="rounded-full bg-[#2D2638] px-6 py-3 text-sm font-bold text-white"
          >
            إنشاء معرض
          </a>
        </div>

        <div className="rounded-[32px] border border-dashed border-[#D8C7FF] bg-white p-10 text-center">
          <CalendarDays className="mx-auto text-[#B58CFF]" size={52} />
          <h3 className="mt-5 text-2xl font-black">
            لا توجد فعاليات حالياً
          </h3>
          <p className="mt-3 text-[#74687D]">
            عند إضافة معرض أو فعالية من لوحة صاحب المعرض، ستظهر هنا مباشرة.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-16 md:grid-cols-3">
        <Feature
          icon={<Store />}
          title="للتجار"
          text="تسجيل الحساب، رفع الرخصة التجارية، اختيار المعرض، وحجز البوث."
        />
        <Feature
          icon={<ShieldCheck />}
          title="لأصحاب المعارض"
          text="إنشاء المعرض، إدارة البوثات، مراجعة التجار، والعقود."
        />
        <Feature
          icon={<QrCode />}
          title="للزوار"
          text="استعراض المعارض، خريطة المشاركين، وQR لتسجيل الدخول."
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
