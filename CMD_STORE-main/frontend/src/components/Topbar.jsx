// src/components/Topbar.jsx
import { Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import topbar from '../../public/topbar.jpg';  // 👈 import

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <img
        src={topbar}                    // 👈 import variable use karo
        alt="Shared Service Site C&M"
        className="w-full h-auto block"
      />
      {/* ... baaki code ... */}
    </header>
  );
};

export default Topbar;