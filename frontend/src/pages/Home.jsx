import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ShieldCheck, CheckCircle } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);

  const isLoggedIn = Boolean(token);

  const handlePrimaryAction = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (role === "student") {
      navigate("/studentDashboard");
    } else if (role === "caretaker") {
      navigate("/caretakerDashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm text-slate-600 mb-6">
          <MessageSquare size={16} />
          Hostel Management System
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Streamlined Complaint <br /> Management
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Report issues quickly, track their progress in real-time, and get them
          resolved efficiently. Built for students and caretakers.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          {/* PRIMARY CTA */}
          <Button size="lg" className="bg-[#2c3e50] hover:bg-[#1a2b3c] text-white px-8" onClick={handlePrimaryAction}>
            {!isLoggedIn
              ? "Get Started"
              : role === "student"
              ? "Go to Dashboard"
              : "Go to Caretaker Panel"}
          </Button>

          {/* SECONDARY CTA */}
          {!isLoggedIn && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")} className="px-8 border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Sign In
            </Button>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-xl bg-slate-100">
                <MessageSquare />
              </div>
              <h3 className="text-lg font-semibold">Easy Complaints</h3>
              <p className="text-sm text-slate-600">
                Submit complaints in seconds with a simple, intuitive interface.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-xl bg-slate-100">
                <ShieldCheck />
              </div>
              <h3 className="text-lg font-semibold">Secure & Private</h3>
              <p className="text-sm text-slate-600">
                Role-based authentication keeps your data protected.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-xl bg-slate-100">
                <CheckCircle />
              </div>
              <h3 className="text-lg font-semibold">Track Progress</h3>
              <p className="text-sm text-slate-600">
                Real-time complaint status from open to resolved.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Hostel Complaint System. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
