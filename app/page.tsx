import Header from "@/components/Header";
import {
  FileText,
  Globe,
  Image,
  LayoutDashboard,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="font-bold text-[#B58CFF]">Super Admin</p>
        <h1 className="mt-2 text-5xl font-black text-[#2D2638]">
          لوحة إدارة ثيفنت
        </h1>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <Card icon={<Globe />} title="الصفحات" value="6" />
          <Card icon={<Users />} title="المستخدمين" value="0" />
          <Card icon={<FileText />} title="طلبات الرخص" value="0" />
          <Card icon={<ShieldCheck />} title="الموافقات" value="0" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[32px] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#2D2638]">
              إدارة محتوى الصفحات
            </h2>

            <div className="mt-6 space-y-3">
              {[
                "الصفحة الرئيسية",
                "صفحة الفعاليات",
                "صفحة التجار",
                "صفحة أصحاب المعارض",
                "صفحة تسجيل الدخول",
                "صفحة التسجيل",
              ].map((page) => (
                <button
                  key={page}
                  className="flex w-full items-center justify-between rounded-2xl bg-[#FFF9FD] px-5 py-4 text-right font-bold text-[#2D2638]"
                >
                  <span>{page}</span>
                  <span className="text-[#B58CFF]">تعديل</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#2D2638]">
              محرر المحتوى
            </h2>

            <div className="mt-6 grid gap-4">
              <label className="font-bold">عنوان الصفحة بالعربي</label>
              <input
                className="rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
                placeholder="مثال: احجز بوثك بسهولة"
              />

              <label className="font-bold">Page Title in English</label>
              <input
                className="rounded-2xl border border-[#F0E5FF] px-4 py-3 outline-none"
                placeholder="Example: Book your booth easily"
              />

              <label className="font-bold">الوصف بالعربي</label>
              <textarea
                rows={4}
                className="rounded-2xl border border-[#F0E5FF] p-4 outline-none"
                placeholder="اكتب وصف الصفحة..."
              />

              <label className="font-bold">English Description</label>
              <textarea
                rows={4}
                className="rounded-2xl border border-[#F0E5FF] p-4 outline-none"
                placeholder="Write page description..."
              />

              <button className="rounded-full bg-[#B58CFF] px-6 py-4 font-bold text-white">
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Tool icon={<Image />} title="إدارة الصور" />
          <Tool icon={<Palette />} title="الألوان والهوية" />
          <Tool icon={<LayoutDashboard />} title="إعدادات الموقع" />
        </div>
      </section>
    </main>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-[#B58CFF]">{icon}</div>
      <p className="text-sm font-bold text-[#74687D]">{title}</p>
      <p className="mt-2 text-3xl font-black text-[#2D2638]">{value}</p>
    </div>
  );
}

function Tool({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-[#B58CFF]">{icon}</div>
      <h3 className="text-xl font-black text-[#2D2638]">{title}</h3>
      <p className="mt-2 text-[#74687D]">
        سيتم ربط هذا القسم مع قاعدة البيانات لاحقاً.
      </p>
    </div>
  );
}
