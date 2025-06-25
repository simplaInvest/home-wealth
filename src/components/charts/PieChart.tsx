import React from 'react';

interface PieChartProps {
  title: string;
  data: { label: string; value: number; color: string }[];
}

export default function PieChart({ title, data }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const paths = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Convert to radians
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    // Calculate arc path
    const largeArcFlag = angle > 180 ? 1 : 0;
    const x1 = 50 + 40 * Math.cos(startAngleRad);
    const y1 = 50 + 40 * Math.sin(startAngleRad);
    const x2 = 50 + 40 * Math.cos(endAngleRad);
    const y2 = 50 + 40 * Math.sin(endAngleRad);
    
    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    currentAngle += angle;
    
    return {
      path: pathData,
      color: item.color,
      label: item.label,
      percentage: percentage.toFixed(1)
    };
  });

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            {paths.map((path, index) => (
              <path
                key={index}
                d={path.path}
                fill={path.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </svg>
        </div>
        
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <p className="text-slate-300 text-sm">{item.label}</p>
                <p className="text-white font-semibold">{paths[index].percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}