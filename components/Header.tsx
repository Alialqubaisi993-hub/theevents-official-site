function Header() {
  return (
    <header className="border-b border-[#F0E5FF] bg-white" dir="rtl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-black text-[#2D2638]">
          ثيفنت
        </a>

        <nav className="flex gap-6 text-sm font-semibold text-[#6F647A]">
          <a href="/">الرئيسية</a>
          <a href="/events">المعارض</a>
          <a href="/dashboard/organizer">صاحب المعرض</a>
          <a href="/dashboard/exhibitor">التاجر</a>
        </nav>
      </div>
    </header>
  );
}

export { Header };
export default Header;