// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AboutUs from './pages/Links/AboutUs';
import CmDepartment from './pages/Links/CmDepartment';
import ImportantLinks from './pages/Links/ImportantLinks';
import Circulars from './pages/Circulars';
import DopPage from './pages/DopPage';
// import DSR from './pages/DSR';
import Manuals from './pages/Manuals';
import ProtectedRoute from '../src/components/ProtectedRoute';
import UploadPage from '../src/pages/UploadPage';
import ExternalLinks from './pages/Links/ExternalLinks';
import CoalMiningLinks from './pages/Links/CoalMiningLinks';

// ===================== LAYOUT =====================
const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <div className="flex min-h-screen bg-[#f5f7fb]">
        {!isLoginPage && <Sidebar />}

        <main className="flex-1 min-w-0 min-h-screen">
          {/* Topbar — sirf non-login pages pe */}
          {!isLoginPage && (
            <div className="px-4 pt-4">
              <Topbar />
            </div>
          )}

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/cmdepartment" element={<CmDepartment />} />
            <Route path="/important-links" element={<ImportantLinks />} />
            <Route path="/external-links" element={<ExternalLinks />} />
            <Route path="/circulars" element={<Circulars />} />
            <Route path="/doppage" element={<DopPage />} />
            {/* <Route path="/dsr" element={<DSR />} /> */}
            <Route path="/manuals" element={<Manuals />} />
            <Route path="/coal-mining-links" element={<CoalMiningLinks />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/upload" element={<UploadPage />} />
            </Route>
          </Routes>
        </main>
      </div>

      <footer className="bg-[#04173e] text-white text-center py-3 text-[20px]">
        &copy; {new Date().getFullYear()} NTPC C&M SIKRI. All rights reserved.
      </footer>
    </>
  );
};

// ===================== APP =====================
const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;