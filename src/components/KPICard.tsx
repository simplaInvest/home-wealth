import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function KPICard({ title, value, icon: Icon, trend }: KPICardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-yellow-400 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-yellow-400 transition-colors duration-200">
          <Icon className="w-6 h-6 text-yellow-400 group-hover:text-slate-900" />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}
          </div>
        )}
      </div>
      
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}