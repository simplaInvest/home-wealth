import React from 'react';

interface SpeedometerChartProps {
  title: string;
  value: number;
  max: number;
  color: string;
}

export default function SpeedometerChart({ title, value, max, color }: SpeedometerChartProps) {
  const percentage = (value / max) * 100;
  const angle = (percentage / 100) * 180; // 180 degrees for semicircle
  
  // Calculate needle position
  const needleAngle = angle - 90; // Adjust for SVG coordinate system
  const needleX = 50 + 35 * Math.cos((needleAngle * Math.PI) / 180);
  const needleY = 50 + 35 * Math.sin((needleAngle * Math.PI) / 180);
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">{title}</h3>
      
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg viewBox="0 0 100 60" className="w-40 h-24">
            {/* Background arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#374151"
              strokeWidth="8"
              strokeLinecap="round"
            />
            
            {/* Progress arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(angle / 180) * 125.66} 125.66`}
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Center dot */}
            <circle cx="50" cy="50" r="3" fill="#374151" />
            
            {/* Needle */}
            <line
              x1="50"
              y1="50"
              x2={needleX}
              y2={needleY}
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Needle tip */}
            <circle cx={needleX} cy={needleY} r="2" fill="#fbbf24" />
          </svg>
        </div>
        
        <div className="text-center mt-4">
          <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
          <div className="text-sm text-slate-400">de {max.toLocaleString()}</div>
          <div className="text-sm font-medium mt-1" style={{ color }}>
            {percentage.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}