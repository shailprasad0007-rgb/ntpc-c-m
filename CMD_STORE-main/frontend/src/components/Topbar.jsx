
// src/components/Topbar.jsx

import { useAuth } from '../context/AuthContext';
import topbar from '../../public/topbar.jpg';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="relative w-full overflow-hidden rounded-2xl shadow-lg">

      {/* Background Banner Image */}
      <img
        src={topbar}
        alt="Shared Service Site C&M"
        className="w-full h-40 md:h-44 object-cover "
      />

      {/* Welcome and Heading - Top Position */}
      <div className="absolute inset-x-0 top-3 md:top-4 pointer-events-none px-6 md:px-10 flex flex-col">

        {/* Welcome Text */}
        <marquee direction="right">
        <h1
          className="text-2xl md:text-4xl font-extrabold tracking-[0.15em] text-white drop-shadow-lg"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            textShadow: '0 3px 10px rgba(0,0,0,0.7)',
          }}
        >
          Welcome
        </h1>
        </marquee>

        {/* Main Heading */}
        <h2
          className="text-2xl md:text-3xl font-bold uppercase tracking-[0.08em] drop-shadow-lg mt-2"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            color: '#FFFFFF',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Shared Service Site C&M
        </h2>

        {/* Department Names */}
        <h3
          className="text-[11px] md:text-xl font-semibold uppercase tracking-[0.5em] mt-2"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            color: '#f3c634',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          CBCMP &amp; KDCMP
        </h3>

      </div>

      {/* NML Logo - Top Right */}
      <div className="absolute top-15 right-4 md:right-5 z-20 flex items-center gap-3">
  <div className="rounded-lg px-4 py-2 flex items-center justify-center">
    <img
      src="/nml_logo.png"
      alt="NML Logo"
      className="h-10 md:h-14 w-auto object-contain drop-shadow-md"
    />
  </div>
</div>

    </header>
  );
};

export default Topbar;
