function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#F0E5FF] bg-white/90 backdrop-blur" dir="rtl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-black text-[#2D2638]" dir="ltr">
          The<span className="text-[#B58CFF]">Events</span>
        </a>

        <nav className="hidden gap-6 text-sm font-bold text-[#6F647A] md:flex">
          <a href="/">الرئيسية</a>
          <a href="/events">الفعاليات</a>
          <a href="/exhibitor">التجار</a>
          <a href="/dashboard/organizer">أصحاب المعارض</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-[#E7DDF4] bg-white px-4 py-2 text-sm font-bold text-[#6F647A]">
            العربية | English
          </button>

          <a
            href="/login"
            className="rounded-full bg-[#2D2638] px-5 py-2.5 text-sm font-bold text-white"
          >
            دخول
          </a>
        </div>
      </div>
    </header>
  );
}

export { Header };
export default Header;
