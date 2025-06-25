import React, { useState } from 'react';

interface LineChartProps {
  title: string;
  data: { label: string; value: number }[];
}

export default function LineChart({ title, data }: LineChartProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(data.length - 1);

  const filteredData = data.slice(startIndex, endIndex + 1);

  const maxValue = Math.max(...filteredData.map((d) => d.value));
  const minValue = Math.min(...filteredData.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const paddingTop = 20;
  const paddingX = 30;
  const chartHeight = 240;
  const pointGap = 50;
  const chartWidth = paddingX * 2 + pointGap * (filteredData.length - 1);

  const getX = (i: number) => paddingX + i * pointGap;
  const getY = (val: number) =>
    paddingTop + chartHeight - ((val - minValue) / range) * chartHeight;

  const points = filteredData.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');

  const gradientId = `gradient-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 overflow-x-auto">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>

      <div className="relative min-w-full">
        {/* Gráfico principal */}
        <svg
          width={chartWidth}
          height={chartHeight + paddingTop + 40}
          className="block"
          style={{ minWidth: '100%' }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Área */}
          <polygon
            points={`${getX(0)},${chartHeight + paddingTop} ${points} ${getX(filteredData.length - 1)},${
              chartHeight + paddingTop
            }`}
            fill={`url(#${gradientId})`}
          />

          {/* Linha */}
          <polyline
            points={points}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
          />

          {/* Pontos e valores */}
          {filteredData.map((d, i) => {
            const x = getX(i);
            const y = getY(d.value);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={3} fill="#fbbf24" />
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#ffffff"
                >
                  {d.value.toFixed(1)}M
                </text>
              </g>
            );
          })}

          {/* Labels */}
          {filteredData.map((d, i) => {
            if (i % 3 !== 0) return null;
            const x = getX(i);
            return (
              <text
                key={i}
                x={x}
                y={chartHeight + paddingTop + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#94a3b8"
              >
                {d.label}
              </text>
            );
          })}
        </svg>

        {/* Slider de intervalo (simulando brush) */}
        <div className="flex items-center gap-4 mt-6 px-2">
          <input
            type="range"
            min={0}
            max={data.length - 2}
            value={startIndex}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), endIndex - 1);
              setStartIndex(val);
            }}
            className="w-full accent-yellow-400"
          />
          <input
            type="range"
            min={1}
            max={data.length - 1}
            value={endIndex}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), startIndex + 1);
              setEndIndex(val);
            }}
            className="w-full accent-yellow-400"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between mt-6 pt-4 border-t border-slate-700">
        <div>
          <p className="text-slate-400 text-sm">Atual</p>
          <p className="text-white font-semibold">
            R$ {filteredData[filteredData.length - 1].value.toFixed(1)}M
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Crescimento</p>
          <p className="text-green-400 font-semibold">
            +{(((filteredData[filteredData.length - 1].value - filteredData[0].value) / filteredData[0].value) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
