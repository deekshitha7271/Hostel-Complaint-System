import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchComplaints, updateComplaintStatus } from "../api/complaint";
import Header from "./Header";
import StatusBadge from "./StatusBadge";

export default function CaretakerDashboard() {
  const { token } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const loadComplaints = async () => {
    const res = await fetchComplaints(token, {
      status: statusFilter,
    });
    setComplaints(res.complaints);
  };

  useEffect(() => {
    loadComplaints();
  }, [statusFilter]);

  const handleStatusChange = async (id, status) => {
    await updateComplaintStatus(token, id, status);
    loadComplaints(); 
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Complaints</h2>

        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded mb-4"
        >
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

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
      </main>
    </div>
  );
}
