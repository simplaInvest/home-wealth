import React from 'react';

interface DonutChartProps {
  title: string;
  data: { label: string; value: number; color: string }[];
}

export default function DonutChart({ title, data }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const paths = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Convert to radians
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    // Calculate arc path for donut (outer radius 40, inner radius 25)
    const outerRadius = 50; 
    const innerRadius = 35; 
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const x1Outer = 50 + outerRadius * Math.cos(startAngleRad);
    const y1Outer = 50 + outerRadius * Math.sin(startAngleRad);
    const x2Outer = 50 + outerRadius * Math.cos(endAngleRad);
    const y2Outer = 50 + outerRadius * Math.sin(endAngleRad);
    
    const x1Inner = 50 + innerRadius * Math.cos(startAngleRad);
    const y1Inner = 50 + innerRadius * Math.sin(startAngleRad);
    const x2Inner = 50 + innerRadius * Math.cos(endAngleRad);
    const y2Inner = 50 + innerRadius * Math.sin(endAngleRad);
    
    const pathData = [
      `M ${x1Outer} ${y1Outer}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}`,
      `L ${x2Inner} ${y2Inner}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}`,
      'Z'
    ].join(' ');
    
    currentAngle += angle;
    
    return {
      path: pathData,
      color: item.color,
      label: item.label,
      percentage: percentage.toFixed(1),
      value: formatValue(item.value)
    };
  });

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-full">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative mb-6">
          <svg viewBox="0 0 100 100" className="w-48 h-48">
            {paths.map((path, index) => (
              <path
                key={index}
                d={path.path}
                fill={path.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
            <text
              x="50"
              y="48"
              textAnchor="middle"
              className="fill-white text-xs font-semibold"
            >
              Total
            </text>
            <text
              x="50"
              y="58"
              textAnchor="middle"
              className="fill-slate-300 text-[10px] font-medium"
            >
              {formatValue(total)}
            </text>
          </svg>
        </div>
        
        <div className="grid grid-cols-1 gap-2 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300 text-sm">{item.label}</span>
              </div>
              <div className="text-right">
                <span className="text-white font-semibold text-sm">
                  {paths[index].value} ({paths[index].percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
}