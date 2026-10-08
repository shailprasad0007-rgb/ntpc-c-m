// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import CmDepartment from './pages/CmDepartment';
import ImportantLinks from './pages/ImportantLinks';
import Circulars from './pages/Circulars';
import DopPage from './pages/DopPage';
// import DSR from './pages/DSR';
import Manuals from './pages/Manuals';

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
            <Route path="/circulars" element={<Circulars />} />
            <Route path="/doppage" element={<DopPage />} />
            {/* <Route path="/dsr" element={<DSR />} /> */}
            <Route path="/manuals" element={<Manuals />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;