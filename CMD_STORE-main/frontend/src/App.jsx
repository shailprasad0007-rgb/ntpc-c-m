// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
// import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import Topbar from './components/Topbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import CmDepartment from './pages/CmDepartment';
import DopPage from './pages/DopPage';

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // Login page pe sidebar/topbar nahi dikhana
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* LEFT SIDEBAR — always visible (except login) */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR — search, bell, admin */}
        {/* <Topbar /> */}

        {/* HEADER — NTPC logo + nav (aapka existing) */}
        {/* <Header /> */}

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/directory/c-and-m" element={<CmDepartment />} />
            <Route path="/dop" element={<DopPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/upload" element={<UploadPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="w-full bg-[#0b3d91] text-white text-center py-3 text-[12px] font-medium tracking-wide">
          © {new Date().getFullYear()} NTPC C&M SIKRI. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;