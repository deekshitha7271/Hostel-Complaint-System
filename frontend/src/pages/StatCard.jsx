export default function StatCard({ title, value, color = "slate" }) {
  const colors = {
    red: "text-red-500",
    amber: "text-amber-500",
    green: "text-green-500",
    slate: "text-slate-700",
  };

  return (
    <div className="bg-white  rounded-lg p-12 shadow-md flex flex-col items-start border border-slate-200">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`text-2xl font-semibold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
}


