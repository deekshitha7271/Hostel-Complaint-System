import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import CaretakerDashboard from "./pages/CaretakerDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css';
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/studentDashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route
          path="/caretaker"
          element={
            <ProtectedRoute role="caretaker">
              <CaretakerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
