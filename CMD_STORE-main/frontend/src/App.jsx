import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
// import AboutUs from './pages/AboutUs';
// import Directory from './pages/Directory';
// import Departments from './pages/Departments';
// // import Corporate-Links from './pages/Corporate Links';
// import Circulars from './pages/Circulars';
// import DOP from './pages/DOP';
// import Dsr from './pages/Dsr';
// import Gcc from './pages/Gcc';
// import Manuals from './pages/Manuals';

// Layout component to include Header on all pages
const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 text-sm mt-auto">
        &copy; {new Date().getFullYear()} NTPC USSC Raipur. All rights reserved.
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/upload" element={<UploadPage />} />
            </Route>
          </Route>

          {/* <Route path="/about-us" element={<AboutUs />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/departments" element={<Departments/>} />
          <Route path="/corporate-links" element={< Corporate Links/>} />
          <Route path="/circulars & guidelines" element={<Circulars />} />
          <Route path="/dOP" element={<DOP />} />
          <Route path="/dsr" element={< Dsr/>} />
          <Route path="/gcc" element={<Gcc />} />
          <Route path="/manuals & standards" element={<Manuals />} /> */}

          <Route path="/" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;