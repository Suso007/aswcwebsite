'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start with loading true
    document.body.style.overflow = 'hidden';
    
    // Hide loading screen after delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="relative">
      {/* Main content */}
      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
        {children}
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="transition-opacity duration-300">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}
