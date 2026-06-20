import Header from "@/components/Header";
import { Lock, Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F1E7FF] px-4 py-2 text-sm font-bold text-[#8A5CF6]">
            <Sparkles size={16} />
            دخول آمن إلى منصة TheEvents
          </div>

          <h1 className="text-5xl font-black leading-tight text-[#2D2638]">
            سجل دخولك لإدارة مشاركاتك ومعارضك
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#74687D]">
            من خلال حسابك تقدر تدير المعارض، تحجز البوثات، تتابع الرخص،
            وتراجع الحجوزات والمدفوعات.
          </p>
        </div>

        <div className="rounded-[36px] bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[#2D2638]">
            تسجيل الدخول
          </h2>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-[#F0E5FF] px-4 py-3">
              <Mail className="text-[#B58CFF]" size={20} />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="البريد الإلكتروني"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#F0E5FF] px-4 py-3">
              <Lock className="text-[#B58CFF]" size={20} />
              <input
                type="password"
                className="w-full bg-transparent outline-none"
                placeholder="كلمة المرور"
              />
            </div>

            <button className="w-full rounded-full bg-[#2D2638] py-4 font-bold text-white">
              دخول
            </button>
          </div>

          <div className="mt-6 grid gap-3 text-center text-sm font-bold text-[#74687D]">
            <a href="/register/exhibitor">إنشاء حساب تاجر</a>
            <a href="/register/organizer">إنشاء حساب صاحب معرض</a>
          </div>
        </div>
      </section>
    </main>
  );
}
