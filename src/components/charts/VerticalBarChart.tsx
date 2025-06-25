import React from 'react';

interface VerticalBarChartProps {
  title: string;
  data: { label: string; value: number }[];
}

export default function VerticalBarChart({ title, data }: VerticalBarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  const barWidth = 32; // largura fixa para barra e label
  const barGap = 24;   // espaço entre barras

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>

      <div className="relative">
        {/* Scroll horizontal contendo barras e labels */}
        <div className="overflow-x-auto">
          <div style={{ width: `${data.length * (barWidth + barGap)}px`, minWidth: '100%' }}>
            {/* Barras */}
            <div className="flex items-end h-64 mb-4 px-2">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ width: `${barWidth}px`, marginRight: `${barGap}px` }}
                >
                  {/* Valor acima da barra */}
                  <div className="text-white text-xs mb-1">
                    {item.value.toFixed(1)}M
                  </div>

                  {/* Barra */}
                  <div className="relative w-full bg-slate-700 rounded-t-lg overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg transition-all duration-1000 ease-out"
                      style={{ height: `${(item.value / maxValue) * 240}px` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Labels alinhadas com barras */}
            <div className="flex px-2">
              {data.map((item, index) => (
                <span
                  key={index}
                  className="text-xs text-slate-400 text-center"
                  style={{ width: `${barWidth}px`, marginRight: `${barGap}px` }}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Linhas de referência do eixo Y */}
        <div className="absolute inset-0 pointer-events-none">
          {[0.25, 0.5, 0.75].map((ratio, index) => (
            <div
              key={index}
              className="absolute w-full border-t border-slate-600 border-dashed opacity-30"
              style={{ bottom: `${ratio * 240 + 32}px` }}
            />
          ))}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="flex justify-between mt-4 pt-4 border-t border-slate-700">
        <div>
          <p className="text-slate-400 text-sm">Maior Captação</p>
          <p className="text-white font-semibold">R$ {maxValue.toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Total Anual</p>
          <p className="text-white font-semibold">
            R$ {data.reduce((sum, item) => sum + item.value, 0).toFixed(1)}M
          </p>
        </div>
      </div>
    </div>
  );
}
