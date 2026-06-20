"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Lock, Mail } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("بيانات الدخول غير صحيحة");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="min-h-screen bg-[#FFF9FD]" dir="rtl">
      <Header />

      <section className="mx-auto max-w-xl px-6 py-20">
        <div className="rounded-[36px] bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-[#2D2638]">تسجيل الدخول</h1>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-[#F0E5FF] px-4 py-3">
              <Mail className="text-[#B58CFF]" size={20} />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#F0E5FF] px-4 py-3">
              <Lock className="text-[#B58CFF]" size={20} />
              <input
                type="password"
                className="w-full bg-transparent outline-none"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={login}
              className="w-full rounded-full bg-[#2D2638] py-4 font-bold text-white"
            >
              دخول
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
