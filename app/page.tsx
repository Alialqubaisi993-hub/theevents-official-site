import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-right" dir="rtl">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-6xl font-black mb-6">
          ثيفنت
        </h1>

        <p className="text-2xl text-gray-600 mb-10">
          منصة إدارة المعارض والفعاليات في الإمارات
        </p>

        <div className="bg-gray-100 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            لا توجد معارض حالياً
          </h2>

          <p className="text-gray-500">
            سيتم عرض المعارض الحقيقية المضافة من لوحة التحكم هنا
          </p>
        </div>
      </section>
    </main>
  );
}