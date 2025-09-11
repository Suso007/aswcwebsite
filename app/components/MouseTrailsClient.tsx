'use client';

import { useEffect, useState } from 'react';

export default function MouseTrailsClient() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
      style={{ left: position.x - 12, top: position.y - 12 }}
    >
      <div className="w-6 h-6 text-teal-400 opacity-60">
        <i className="ri-time-line"></i>
      </div>
    </div>
  );
}


