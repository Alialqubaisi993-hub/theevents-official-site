export default function Header() {
  return (
    <header className="border-b border-[#F0E5FF] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-black text-[#2D2638]">
          The<span className="text-[#B58CFF]">Events</span>
        </a>

        <nav className="flex gap-6 text-sm font-semibold text-[#6F647A]">
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/dashboard/organizer">Organizer</a>
          <a href="/dashboard/exhibitor">Exhibitor</a>
        </nav>
      </div>
    </header>
  );
}
