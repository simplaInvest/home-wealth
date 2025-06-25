import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';

export default function CaptacaoAcumuladaChartContainer() {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api-wealth.simplainvest.com.br/dados/semanal')
      .then((res) => res.json())
      .then((dados) => {
        const formatados = dados
          .filter((item: any) => item["Acumulado Semana"] && !isNaN(Number(item["Acumulado Semana"])))
          .map((item: any) => {
            const [semana, mes] = item.Semana.split('.');
            const mesAbrev = mes.slice(0, 3);
            return {
              label: `S${semana} ${mesAbrev}`,
              value: Number(item["Acumulado Semana"]) / 1_000_000,
            };
          });

        setData(formatados);
      })
      .catch((error) => {
        console.error('Erro ao carregar captação acumulada:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Carregando gráfico...</div>;

  return <LineChart title="Captação Acumulada por Semana" data={data} />;
}
