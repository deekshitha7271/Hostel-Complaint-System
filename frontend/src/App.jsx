import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import CaretakerDashboard from "./pages/CaretakerDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route
          path="/caretaker"
          element={
            <ProtectedRoute role="caretaker">
              <CaretakerDashboard />
            </ProtectedRoute>
          }
        />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
