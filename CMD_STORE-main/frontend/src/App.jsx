// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import CmDepartment from './pages/CmDepartment';
import ImportantLinks from './pages/ImportantLinks';
import ExternalLinks from './pages/ExternalLinks';
import CoalMiningLinks from './pages/CoalMiningLinks';
import Circulars from './pages/Circulars';
import DopPage from './pages/DopPage';
// import DSR from './pages/DSR';
import Manuals from './pages/Manuals';
import ProtectedRoute from './components/ProtectedRoute';
import Admin_Upload from './pages/UploadPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#f5f7fb]">
        <Sidebar />

        <main className="flex-1 min-w-0 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/cmdepartment" element={<CmDepartment />} />
            <Route path="/important-links" element={<ImportantLinks />} />
            <Route path="/external-links" element={<ExternalLinks />} />
            <Route path="/coal-mining-links" element={<CoalMiningLinks />} />
            <Route path="/circulars" element={<Circulars />} />
            <Route path="/doppage" element={<DopPage />} />
            {/* <Route path="/dsr" element={<DSR />} /> */}
            <Route path="/manuals" element={<Manuals />} />
            {/* <ProtectedRoute>  */}
            <Route path="/upload" element={<Admin_Upload/>}/>
            {/* </ProtectedRoute> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;