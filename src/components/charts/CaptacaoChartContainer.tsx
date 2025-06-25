import React, { useEffect, useState } from 'react';
import VerticalBarChart from './VerticalBarChart'; // ajuste o caminho se necessário

export default function CaptacaoChartContainer() {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api-wealth.simplainvest.com.br/dados/semanal')
      .then((res) => res.json())
      .then((dados) => {
        const formatados = dados.map((item: any) => {
            const [semana, mes] = item.Semana.split('.');
            const mesAbrev = mes?.slice(0, 3);
            return {
              label: `S${semana} ${mesAbrev}`,
              value: Number(item.Captação) / 1_000_000,
            };
          });          
        setData(formatados);
      })
      .catch((error) => {
        console.error('Erro ao carregar captação semanal:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Carregando gráfico...</div>;

  return (
    <VerticalBarChart
      title="Captação Semanal"
      data={data}
    />
  );
}