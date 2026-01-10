import { ClipboardList, Inbox, Cog, CheckCircle } from "lucide-react";

const variants = {
  total: {
    icon: ClipboardList,
    bg: "bg-blue-100",
    iconBg: "bg-blue-300",
    text: "text-blue-600",
    border: "border-blue-300",
  },
  open: {
    icon: Inbox,
    bg: "bg-red-100",
    iconBg: "bg-red-300",
    text: "text-red-600",
    border: "border-red-300",
  },
  progress: {
    icon: Cog,
    bg: "bg-amber-100",
    iconBg: "bg-amber-300",
    text: "text-amber-600",
    border: "border-amber-300",
  },
  resolved: {
    icon: CheckCircle,
    bg: "bg-green-100",
    iconBg: "bg-green-300",
    text: "text-green-600",
    border: "border-green-300",
  },
};

export default function StatCard({ title, value, variant }) {
  const style = variants[variant];
  const Icon = style.icon;

  return (
    <div
      className={`rounded-xl border ${style.border} ${style.bg} p-10 flex items-center gap-4 shadow-sm`}
    >
      <div className={`p-6 rounded-lg ${style.iconBg}`}>
        <Icon className={`w-10 h-10 ${style.text}`} />
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className={`text-2xl font-bold ${style.text}`}>{value}</p>
      </div>
    </div>
  );
}
