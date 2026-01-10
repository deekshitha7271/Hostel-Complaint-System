import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchComplaints, createComplaint } from "../api/complaint";
import StatCard from "./StatCard";
import StatusBadge from "./StatusBadge";
import Header from "./Header";
import NewComplaintDialog from "./NewComplaintDialog";
import { useDebounce } from "../hooks/useDebounce";
import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TableShimmer() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          {[...Array(5)].map((_, j) => (
            <TableCell key={j}>
              <div className="h-4 bg-gray-200 rounded w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function StatCardSkeleton() {
  return (
    <div className="h-28 rounded-xl bg-white shadow-sm border p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-gray-200" />
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { token } = useContext(AuthContext);

  const [complaints, setComplaints] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 500);

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchInput !== debouncedSearch) {
      setIsSearching(true);
    }
  }, [searchInput, debouncedSearch]);

  const loadComplaints = async () => {
    try {
      const data = await fetchComplaints(token, {
        search: debouncedSearch,
        status,
        category,
        limit,
        page,
      });

      setComplaints(data.complaints);
      setTotalPages(data.pagination.totalPages);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [debouncedSearch, status, category, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, category]);

  const total = complaints.length;
  const open = complaints.filter((c) => c.status === "open").length;
  const inProgress = complaints.filter(
    (c) => c.status === "in-progress"
  ).length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  return (
    <div className="min-h-screen  bg-gray-100">
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
                onClick={() => {
                  setSearchInput("");
                  setStatus("");
                  setCategory("");
                  setPage(1);
                }}
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
            {isSearching ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <StatCard title="Total" value={total} variant="total" />
                <StatCard title="Open" value={open} variant="open" />
                <StatCard
                  title="In Progress"
                  value={inProgress}
                  variant="progress"
                />
                <StatCard
                  title="Resolved"
                  value={resolved}
                  variant="resolved"
                />
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                placeholder="Search by room number..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <select
              className="border bg-[#FFFFFF] px-4 py-2 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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

          <Table className="bg-white rounded-lg border-amber-50 overflow-hidden shadow-sm">
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
              {isSearching ? (
                <TableShimmer />
              ) : complaints.length === 0 ? (
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

          <div className="flex justify-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded bg-white disabled:opacity-50"
            >
              prev
            </button>
            <span className="px-3 py-1 border rounded bg-white">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded bg-white disabled:opacity-50"
            >
              next
            </button>
          </div>
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
