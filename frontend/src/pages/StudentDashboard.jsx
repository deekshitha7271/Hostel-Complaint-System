import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchComplaints, createComplaint } from "../api/complaint";
import StatCard from "./StatCard";
import StatusBadge from "./StatusBadge";
import Header from "./Header";
import NewComplaintDialog from "./NewComplaintDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StudentDashboard() {
  const { token } = useContext(AuthContext);

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [opened, setOpened] = useState(false);

  // Fetch complaints
  const loadComplaints = async () => {
    const data = await fetchComplaints(token, {
      search,
      status,
      category,
    });
    setComplaints(data.complaints || data);
  };

  useEffect(() => {
    loadComplaints();
  }, [search, status, category]);

  //Stats
  const total = complaints.length;
  const open = complaints.filter((c) => c.status === "open").length;
  const inProgress = complaints.filter(
    (c) => c.status === "in-progress"
  ).length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EFF6FF] to-[#E0F2FE]">
      <Header />

     
      <main className="px-6 py-8">
        <div className="space-y-6">
          
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">My Complaints</h2>
              <p className="text-sm text-slate-500">
                Track the status of your submitted complaints
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={loadComplaints}
                className="border px-4 py-2 rounded-md text-sm"
              >
                Refresh
              </button>

              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
                onClick={() => setOpened(true)}
              >
                + New Complaint
              </button>
            </div>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard title="Total" value={total} className="bg-[#FFFFFF]" />
            <StatCard title="Open" value={open} color="red" />
            <StatCard title="In Progress" value={inProgress} color="amber" />
            <StatCard title="Resolved" value={resolved} color="green" />
          </div>

          
          <div className="flex flex-wrap gap-4">
            <input
              placeholder="Search by room number..."
              className="border px-4 py-2 rounded-md w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border px-4 py-2 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              className="border px-4 py-2 rounded-md"
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

          
          <Table className="bg-white rounded-lg border-amber-50 overflow-hidden">
            <TableHeader className="bg-slate-100">
              <TableRow className="text-sm text-slate-600">
                <TableHead>Room</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {complaints.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-slate-500"
                  >
                    No complaints found
                  </TableCell>
                </TableRow>
              ) : (
                complaints.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.roomNumber}</TableCell>
                    <TableCell>{c.category}</TableCell>
                    <TableCell>{c.description}</TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

     
      <NewComplaintDialog
        open={opened}
        onClose={() => setOpened(false)}
        onSubmit={async (data) => {
          await createComplaint(token, data); 
          await loadComplaints();             
        }}
      />
    </div>
  );
}

