import React from 'react';
import { TrendingDown, Users, Handshake } from 'lucide-react';

interface SalesFunnelProps {
  title: string;
  data: { stage: string; value: number; color: string }[];
}

export default function SalesFunnel({ title, data }: SalesFunnelProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const stageIcons = [Users, TrendingDown, Handshake];
  
  return (
    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">{title}</h3>
      
      <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
        {data.map((item, index) => {
          const width = Math.max((item.value / maxValue) * 100, 20); // Minimum 20% width
          const conversionRate = index > 0 ? ((item.value / data[index - 1].value) * 100).toFixed(1) : '100.0';
          const Icon = stageIcons[index];
          
          return (
            <div key={index} className="w-full relative">
              {/* Stage Header */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-3 bg-slate-700 px-6 py-3 rounded-full border border-slate-600">
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                  <span className="text-white font-semibold text-lg">{item.stage}</span>
                </div>
              </div>
              
              {/* Funnel Shape */}
              <div className="relative flex justify-center">
                <div 
                  className="relative h-20 transition-all duration-1000 ease-out flex items-center justify-center overflow-hidden shadow-lg"
                  style={{
                    width: `${width}%`,
                    background: `linear-gradient(135deg, ${item.color}dd, ${item.color})`,
                    clipPath: index === 0 
                      ? 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
                      : index === data.length - 1
                      ? 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)'
                      : 'polygon(10% 0, 90% 0, 80% 100%, 20% 100%)',
                    borderRadius: '8px'
                  }}
                >
                  {/* Gradient overlay for depth */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.2))`
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-white font-bold text-2xl mb-1">
                      {item.value}
                    </div>
                    {index > 0 && (
                      <div className="text-white/80 text-sm font-medium">
                        {conversionRate}% conversão
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Connection Arrow */}
              {index < data.length - 1 && (
                <div className="flex justify-center mt-4 mb-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-slate-500 to-slate-600"></div>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-slate-500"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Enhanced Summary Stats */}
      <div className="mt-12 pt-8 border-t border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="text-3xl font-bold text-white mb-2">
              {((data[data.length - 1].value / data[0].value) * 100).toFixed(1)}%
            </div>
            <div className="text-slate-300 text-sm font-medium">Taxa de Conversão Total</div>
          </div>
          
          <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {data[0].value}
            </div>
            <div className="text-slate-300 text-sm font-medium">Reuniões Marcadas</div>
          </div>
          
          <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {((data[1].value / data[0].value) * 100).toFixed(1)}%
            </div>
            <div className="text-slate-300 text-sm font-medium">Taxa de Comparecimento</div>
          </div>
          
          <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {data[data.length - 1].value}
            </div>
            <div className="text-slate-300 text-sm font-medium">Contratos Fechados</div>
          </div>
        </div>
        
        {/* Performance Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 rounded-full border border-green-500/30">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">
              Performance: {((data[data.length - 1].value / data[0].value) * 100) > 25 ? 'Excelente' : 'Boa'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}