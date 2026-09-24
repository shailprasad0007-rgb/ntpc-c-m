import React, { useState, useEffect, useRef, useCallback } from 'react';
import hop from '../../public/hop.jpg';
import prashantImg from '../../public/prashant.jpeg';

// Array of profiles to rotate through
const profiles = [
  {
    name: 'DHANANJAY SHRIKHANDE',
    image: hop,
    title: 'HOP CBCMP',
    accent: '#4338ca', // indigo-700
    accentSoft: '#eef2ff',
    gradient: 'from-indigo-600 to-blue-600',
  },
  {
    name: 'PRASHANT KUMAR GUPTA',
    image: prashantImg,
    title: 'HOD C&M (CBCMP & KDCMP SHARED)',
    accent: '#0f766e', // teal-700
    accentSoft: '#00FFFF',
    gradient: 'from-emerald-600 to-teal-600',
  },
];

const ROTATE_MS = 8000;

const RightSidebar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressStart = useRef(Date.now());

  useEffect(() => {
    progressStart.current = Date.now();
    setProgress(0);

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - progressStart.current;
      setProgress(Math.min(100, (elapsed / ROTATE_MS) * 100));
    }, 50);

    const rotateTimer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % profiles.length);
        setIsTransitioning(false);
      }, 350);
    }, ROTATE_MS);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(rotateTimer);
    };
  }, [currentIndex]);

  const goTo = (idx) => {
    if (idx === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsTransitioning(false);
    }, 350);
  };

  const currentProfile = profiles[currentIndex];

  // --- 3D tilt-on-hover ---
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 16; // rotateY range
    const rx = (0.5 - py) * 14; // rotateX range
    setTilt({ rx, ry, mx: px * 100, my: py * 100 });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  }, []);

  return (
    <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0" style={{ perspective: '1200px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative rounded-3xl overflow-hidden border border-white/60 bg-white transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.01,1.01,1.01)`,
          transformStyle: 'preserve-3d',
          boxShadow: `${-tilt.ry * 1.2}px ${tilt.rx * 1.2 + 18}px 40px -12px rgba(15,23,42,0.25), 0 2px 6px rgba(15,23,42,0.06)`,
        }}
      >
        {/* Full-bleed portrait */}
        <div className="relative w-full h-80 overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
          <img
            key={currentProfile.name}
            src={currentProfile.image}
            alt={currentProfile.name}
            className={`w-full h-full object-cover object-top transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />

          {/* Dynamic light sheen that follows the cursor */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.35), transparent 55%)`,
            }}
          />

          {/* Bottom gradient scrim for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Name & title overlaid on image, floating above via translateZ */}
          <div
            className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <span
              className="inline-block mb-2 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md"
              style={{ color: '#fff', backgroundColor: `${currentProfile.accent}cc` }}
            >
              {currentProfile.title}
            </span>
            <h2 className="text-lg font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
              {currentProfile.name}
            </h2>

          </div>
        </div>

        {/* Footer */}
        <div
          className="relative bg-white px-5 py-3.5 border-t border-gray-100 flex items-center justify-between"
          style={{ transform: 'translateZ(10px)' }}
        >


          <div className="flex gap-1.5">
            {profiles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? `w-5 bg-gradient-to-r ${currentProfile.gradient}`
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View profile ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;