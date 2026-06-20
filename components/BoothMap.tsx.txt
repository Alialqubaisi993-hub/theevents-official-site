export default function BoothMap() {
  const booths = [
    "A1","A2","A3","A4",
    "B1","B2","B3","B4",
    "C1","C2","C3","C4",
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {booths.map((booth) => (
        <div
          key={booth}
          className="rounded-xl border p-4 text-center font-bold"
        >
          {booth}
        </div>
      ))}
    </div>
  );
}