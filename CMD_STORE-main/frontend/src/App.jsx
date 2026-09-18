import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import CmDepartment from './pages/CmDepartment'; // Import new page
import DopPage from './pages/DopPage';           // Import new page

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/directory/c-and-m" element={<CmDepartment />} />
          <Route path="/dop" element={<DopPage />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/upload" element={<UploadPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
   <footer className="bg-[#86a7f0] text-blue text-center py-3 text-[20px]">
        &copy; {new Date().getFullYear()} NTPC C&M SIKRI. All rights reserved.
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;