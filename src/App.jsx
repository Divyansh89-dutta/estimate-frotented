import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./components/ProtectedLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Estimates from "./pages/Estimates";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import EstimateDetail from "./pages/EstimateDetail";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 🌍 Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/estimates" element={<Estimates />} />
            <Route path="/estimates/new" element={<Estimates />} />
            <Route path="/estimates/:id" element={<EstimateDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* 🚫 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
