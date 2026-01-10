export default function StatusBadge({ status }) {
  const styles = {
    open: "bg-red-100 text-red-600",
    "in-progress": "bg-amber-100 text-amber-600",
    resolved: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status]}`}
    >
      {status.replace("-", " ")}
    </span>
  );
}
