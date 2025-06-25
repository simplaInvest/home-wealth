import React from 'react';

interface BarChartProps {
  title: string;
  data: { label: string; value: number }[];
}

export default function BarChart({ title, data }: BarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 text-sm text-slate-300 text-right">
              {item.label}
            </div>
            <div className="flex-1 bg-slate-700 rounded-full h-8 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="text-slate-900 font-semibold text-sm">
                  {item.value.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}