import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchComplaints, updateComplaintStatus } from "../api/complaint";
import Header from "./Header";
import StatusBadge from "./StatusBadge";
import StatCard from "./StatCard";
import { Search} from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

function StatCardShimmer() {
  return (
    <div className="h-24 rounded-xl bg-white p-4 shadow-sm animate-pulse">
      <div className="h-4 w-24 bg-slate-200 rounded mb-3" />
      <div className="h-8 w-12 bg-slate-300 rounded" />
    </div>
  );
}

function ComplaintListShimmer({ rows = 4 }) {
  return (
    <div className="bg-white border rounded-lg">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 border-b animate-pulse"
        >
          <div className="space-y-2">
            <div className="h-4 w-48 bg-slate-200 rounded" />
            <div className="h-3 w-64 bg-slate-100 rounded" />
          </div>

          <div className="h-6 w-24 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function CaretakerDashboard() {
  const { token } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalPages, setTotalPages] = useState(1);

  const loadComplaints = async () => {
  setLoading(true);

  try {
    const res = await fetchComplaints(token, {
      page,
      limit,
      status: statusFilter,
      search: debouncedSearch,
      category,
    });

    setComplaints(res.complaints);
    setTotalPages(res.pagination.totalPages);
  } finally {
    setLoading(false);
  }
};



 useEffect(() => {
  setPage(1);
}, [statusFilter, debouncedSearch, category]);


  useEffect(() => {
    loadComplaints();
  }, [page,statusFilter,debouncedSearch,category]);

  const handleStatusChange = async (id, status) => {
    await updateComplaintStatus(token, id, status);
    loadComplaints(); 
  };

   //Stats
  const total = complaints.length;
  const open = complaints.filter((c) => c.status === "open").length;
  const inProgress = complaints.filter(
    (c) => c.status === "in-progress"
  ).length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

 
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Complaints</h2>
        

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 p-4 mb-6">
  {loading ? (
    Array.from({ length: 4 }).map((_, i) => (
      <StatCardShimmer key={i} />
    ))
  ) : (
    <>
      <StatCard title="Total" value={total} variant="total" />
      <StatCard title="Open" value={open} variant="open" />
      <StatCard title="In Progress" value={inProgress} variant="progress" />
      <StatCard title="Resolved" value={resolved} variant="resolved" />
    </>
  )}
</div>


        <div className="flex flex-wrap gap-4 pb-4">
            
            <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
                placeholder="Search by room number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            </div>


            <select
              className="border bg-[#FFFFFF] px-4 py-2 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              className="border px-4 py-2 rounded-md bg-[#FFFFFF]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="internet">Internet</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
{/* 
        <div className="bg-white border rounded-lg">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <p className="font-medium">
                  Room {c.roomNumber} — {c.studentId?.name}
                </p>
                <p className="text-sm text-slate-500">{c.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={c.status} />

                <select
                  value={c.status}
                  onChange={(e) =>
                    handleStatusChange(c._id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div> */}
        {loading ? (
  <ComplaintListShimmer rows={limit} />
) : (
  <div className="bg-white border rounded-lg">
    {complaints.map((c) => (
      <div
        key={c._id}
        className="flex justify-between items-center p-4 border-b"
      >
        <div>
          <p className="font-medium">
            Room {c.roomNumber} — {c.studentId?.name}
          </p>
          <p className="text-sm text-slate-500">{c.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={c.status} />
          <select
            value={c.status}
            onChange={(e) =>
              handleStatusChange(c._id, e.target.value)
            }
            className="border px-2 py-1 rounded"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>
    ))}
  </div>
)}

        <div className="flex justify-between items-center p-4 border-t">
        <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
        >
            Previous
        </button>

        <span className="text-sm">
            Page {page} of {totalPages}
        </span>

        <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
        >
            Next
        </button>
        </div>

      </main>
    </div>
  );
}
