'use client';

import React, { useEffect } from 'react';

type Props = {
  size?: number;      // width/height in px
  className?: string; // optional tailwind/class hooks
};

const SandClockLoader: React.FC<Props> = ({ size = 300, className }) => {
  return (
    <svg
      id="wrap"
      width={size}
      height={size}
      viewBox="0 0 300 300"
      className={className}
    >
      {/* background */}
      <g>
        <circle cx="150" cy="150" r="130" stroke="lightblue" strokeWidth="18" fill="transparent" />
        <circle cx="150" cy="150" r="115" fill="#2c3e50" />
        <path
          d="M150,150 m0,-130 a 130,130 0 0,1 0,260 a 130,130 0 0,1 0,-260"
          stroke="#2c3e50"
          strokeWidth="18"
          fill="transparent"
          strokeDasharray="820"
          strokeDashoffset="820"
        >
          <animate attributeName="stroke-dashoffset" dur="6s" to="-820" repeatCount="indefinite" />
        </path>
      </g>

      {/* image */}
      <g>
        <path
          id="hourglass"
          d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z"
          stroke="white"
          strokeWidth="5"
          fill="white"
        />
        {/* 'frameA' to avoid duplicate ids */}
        <path
          id="frameA"
          d="M100,97 L200, 97 M100,203 L200,203 M110,97 L110,142 M110,158 L110,200 M190,97 L190,142 M190,158 L190,200 M110,150 L110,150 M190,150 L190,150"
          stroke="lightblue"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <animateTransform
          xlinkHref="#frameA"
          attributeName="transform"
          type="rotate"
          begin="0s"
          dur="3s"
          values="0 150 150; 0 150 150; 180 150 150"
          keyTimes="0; 0.8; 1"
          repeatCount="indefinite"
        />
        <animateTransform
          xlinkHref="#hourglass"
          attributeName="transform"
          type="rotate"
          begin="0s"
          dur="3s"
          values="0 150 150; 0 150 150; 180 150 150"
          keyTimes="0; 0.8; 1"
          repeatCount="indefinite"
        />
      </g>

      {/* sand */}
      <g>
        {/* upper part */}
        <polygon id="upper" points="120,125 180,125 150,147" fill="#2c3e50">
          <animate
            attributeName="points"
            dur="3s"
            keyTimes="0; 0.8; 1"
            values="120,125 180,125 150,147; 150,150 150,150 150,150; 150,150 150,150 150,150"
            repeatCount="indefinite"
          />
        </polygon>

        {/* falling sand */}
        <path
          id="line"
          d="M150,150 L150,198"
          stroke="#2c3e50"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1,4"
          strokeDashoffset="200"
          fill="none"
        >
          {/* running sand */}
          <animate attributeName="stroke-dashoffset" dur="3s" to="1" repeatCount="indefinite" />
          {/* emptied upper */}
          <animate
            attributeName="d"
            dur="3s"
            values="M150,150 L150,198; M150,150 L150,198; M150,198 L150,198; M150,195 L150,195"
            keyTimes="0; 0.65; 0.9; 1"
            to="M150,195 L150,195"
            repeatCount="indefinite"
          />
          {/* last drop */}
          <animate
            attributeName="stroke"
            dur="3s"
            keyTimes="0; 0.65; 0.8; 1"
            values="#2c3e50;#2c3e50;transparent;transparent"
            to="transparent"
            repeatCount="indefinite"
          />
        </path>

        {/* lower part */}
        <g id="lower">
          <path
            d="M150,180 L180,190 A28,10 0 1,1 120,190 L150,180 Z"
            stroke="transparent"
            strokeWidth="5"
            fill="#2c3e50"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              keyTimes="0; 0.65; 1"
              values="0 15; 0 0; 0 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <animateTransform
            xlinkHref="#lower"
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="3s"
            values="0 150 150; 0 150 150; 180 150 150"
            keyTimes="0; 0.8; 1"
            repeatCount="indefinite"
          />
        </g>

        {/* lower overlay - hourglass */}
        <path
          d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z"
          stroke="white"
          strokeWidth="5"
          fill="transparent"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="3s"
            values="0 150 150; 0 150 150; 180 150 150"
            keyTimes="0; 0.8; 1"
            repeatCount="indefinite"
          />
        </path>

        {/* lower overlay - frame (duplicate id avoided: frameB) */}
        <path
          id="frameB"
          d="M100,97 L200, 97 M100,203 L200,203"
          stroke="lightblue"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="3s"
            values="0 150 150; 0 150 150; 180 150 150"
            keyTimes="0; 0.8; 1"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
};

const LoadingScreen = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Blurred background overlay */}
      <div 
        className="fixed inset-0 z-[9998]" 
        style={{ 
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      />
      
      {/* Centered Hourglass Animation */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div className="relative">
          <SandClockLoader />
          {/* Loading Text */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-teal-400 text-sm font-medium animate-pulse">
              Setting Time...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
