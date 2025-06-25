import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Building2, 
  Shield, 
  UserX, 
  Users,
  LogOut,
  Loader2
} from 'lucide-react';
import Sidebar from './Sidebar';
import KPICard from './KPICard';
import DonutChart from './charts/DonutChart';
import CaptacaoChartContainer from './charts/CaptacaoChartContainer';
import CaptacaoAcumuladaChartContainer from './charts/CaptacaoAcumuladaChartContainer';
import LineChart from './charts/LineChart';
import SpeedometerChart from './charts/SpeedometerChart';
import SalesFunnel from './charts/SalesFunnel';
import ExpandableCard from './ExpandableCard';

interface DashboardProps {
  onLogout: () => void;
}

interface ApiData {
  "XP BRASIL": number;
  "XP INTERNACIONAL": number;
  "BTG BRASIL": number;
  "BTG INTERNACIONAL": number;
  "AVENUE": number;
  "CUSTODIA TOTAL": number;
  "CUSTODIA CORRETORAS": number;
  "CUSTODIA FEE FIXO": number;
  "CUSTODIA INATIVA": number;
  "CUSTODIA PARCEIROS": number;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('simpla-wealth');
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api-wealth.simplainvest.com.br/dados/captacao');
        const data = await response.json();
        setApiData(data[0]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const kpiData = [
    {
      title: 'Custódia Total',
      value: apiData ? formatCurrency(apiData["CUSTODIA TOTAL"]) : 'Carregando...',
      icon: DollarSign
    },
    {
      title: 'Custódia Corretoras',
      value: apiData ? formatCurrency(apiData["CUSTODIA CORRETORAS"]) : 'Carregando...',
      icon: Building2
    },
    {
      title: 'Custódia Fee Fixo',
      value: apiData ? formatCurrency(apiData["CUSTODIA FEE FIXO"]) : 'Carregando...',
      icon: Shield
    },
    {
      title: 'Custódia Inativa',
      value: apiData ? formatCurrency(apiData["CUSTODIA INATIVA"]) : 'Carregando...',
      icon: UserX
    },
    {
      title: 'Custódia Parceiros',
      value: apiData ? formatCurrency(apiData["CUSTODIA PARCEIROS"]) : 'Carregando...',
      icon: Users
    }
  ];

  const donutChartData = apiData ? [
    { label: 'BTG Brasil', value: apiData["BTG BRASIL"], color: '#fbbf24' },
    { label: 'BTG Int', value: apiData["BTG INTERNACIONAL"], color: '#3b82f6' },
    { label: 'XP Int', value: apiData["XP INTERNACIONAL"], color: '#10b981' },
    { label: 'XP Brasil', value: apiData["XP BRASIL"], color: '#ef4444' },
    { label: 'Avenue', value: apiData["AVENUE"], color: '#8b5cf6' }
  ] : [];

  const custodiaAcumuladaData = [
    { label: 'S1', value: 720.5 },
    { label: 'S2', value: 735.2 },
    { label: 'S3', value: 742.8 },
    { label: 'S4', value: 758.1 },
    { label: 'S5', value: 771.3 },
    { label: 'S6', value: 785.7 },
    { label: 'S7', value: 798.2 },
    { label: 'S8', value: 812.6 },
    { label: 'S9', value: 825.9 },
    { label: 'S10', value: 834.1 },
    { label: 'S11', value: 841.8 },
    { label: 'S12', value: 847.2 }
  ];

  const speedometerData = [
    { title: 'Chamadas Realizadas', value: 847, max: 1000, color: '#fbbf24' },
    { title: 'Reuniões Marcadas', value: 234, max: 300, color: '#3b82f6' },
    { title: 'Reuniões Realizadas', value: 189, max: 250, color: '#10b981' },
    { title: 'Contratos Assinados', value: 67, max: 100, color: '#ef4444' }
  ];

  const funnelData = [
    { stage: 'Reuniões Marcadas', value: 234, color: '#3b82f6' },
    { stage: 'Reuniões Realizadas', value: 189, color: '#10b981' },
    { stage: 'Contratos Assinados', value: 67, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeItem={activeMenuItem}
        onItemClick={setActiveMenuItem}
      />
      
      <div className="flex-1 lg:ml-0 transition-all duration-300">
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:ml-0 ml-12">
              <h1 className="text-2xl font-bold text-white">Simpla Wealth</h1>
              <p className="text-slate-400">Dashboard de Custódia e Investimentos</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <main className="p-6 space-y-8">
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Carregando dados...</span>
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                icon={kpi.icon}
              />
            ))}
          </div>

          {/* Donut + Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpandableCard>
              <DonutChart
                title="Distribuição por Corretora"
                data={donutChartData}
              />
            </ExpandableCard>
            
            <ExpandableCard>
              <CaptacaoChartContainer/>
            </ExpandableCard>
          </div>

          {/* Line Chart sozinho abaixo */}
          <div className="grid grid-cols-1">
            <ExpandableCard>
            <CaptacaoAcumuladaChartContainer />
            </ExpandableCard>
          </div>

          {/* Speedometers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speedometerData.map((speedometer, index) => (
              <ExpandableCard key={index}>
                <SpeedometerChart
                  title={speedometer.title}
                  value={speedometer.value}
                  max={speedometer.max}
                  color={speedometer.color}
                />
              </ExpandableCard>
            ))}
          </div>

          {/* Sales Funnel */}
          <div className="grid grid-cols-1">
            <ExpandableCard>
              <SalesFunnel
                title="Funil de Vendas"
                data={funnelData}
              />
            </ExpandableCard>
          </div>
        </main>
      </div>
    </div>
  );
}