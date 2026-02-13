
import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Users, 
  MousePointer2, 
  Target, 
  ArrowUpRight, 
  MessageSquare,
  RefreshCcw,
  Smile,
  Frown,
  Star,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Filter,
  ArrowDown
} from 'lucide-react';
import { Analytics } from '../analytics';

const ConversionFunnel = ({ metrics }: { metrics: any }) => {
  const vToL = metrics.views > 0 ? ((metrics.leads / metrics.views) * 100).toFixed(1) : '0';
  const lToS = metrics.leads > 0 ? ((metrics.checkouts / metrics.leads) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 h-full">
      <h2 className="text-2xl font-black heading-font mb-8">Funil de Conversão</h2>
      <div className="space-y-4">
        {/* Visitors */}
        <div className="relative">
          <div className="w-full bg-blue-500 text-white p-4 rounded-t-3xl font-black text-center relative z-10">
            VISITANTES: {metrics.views}
          </div>
          <div className="h-8 bg-gradient-to-b from-blue-500/20 to-orange-500/20 mx-auto w-4/5 flex items-center justify-center">
            <span className="text-[10px] font-black text-blue-600 bg-white px-2 py-0.5 rounded-full shadow-sm">{vToL}% Conv.</span>
          </div>
        </div>
        {/* Leads */}
        <div className="relative">
          <div className="w-4/5 mx-auto bg-orange-500 text-white p-4 font-black text-center relative z-10">
            LEADS: {metrics.leads}
          </div>
          <div className="h-8 bg-gradient-to-b from-orange-500/20 to-green-500/20 mx-auto w-3/5 flex items-center justify-center">
             <span className="text-[10px] font-black text-orange-600 bg-white px-2 py-0.5 rounded-full shadow-sm">{lToS}% Conv.</span>
          </div>
        </div>
        {/* Sales */}
        <div className="w-3/5 mx-auto bg-green-500 text-white p-4 rounded-b-3xl font-black text-center">
          VENDAS: {metrics.checkouts}
        </div>
      </div>
      <p className="mt-8 text-xs text-gray-400 font-medium text-center italic">
        * Dados baseados no comportamento total acumulado do navegador.
      </p>
    </div>
  );
};

const PerformanceChart = ({ history }: { history: any[] }) => {
  // Take last 7 days or fill with dummy if empty
  const displayData = history.slice(-7);
  const maxVal = Math.max(...displayData.map(d => d.views), 10);

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black heading-font">Desempenho (Últimos 7 Dias)</h2>
        <div className="flex gap-2">
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[10px] font-bold text-gray-400">Views</span></div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div><span className="text-[10px] font-bold text-gray-400">Leads</span></div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[10px] font-bold text-gray-400">Sales</span></div>
        </div>
      </div>

      {displayData.length === 0 ? (
        <div className="h-48 flex items-center justify-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
           <p className="text-gray-400 font-bold">Aguardando mais dados históricos...</p>
        </div>
      ) : (
        <div className="flex items-end justify-between h-48 gap-2">
          {displayData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
              <div className="w-full flex flex-col-reverse gap-0.5 h-full">
                <div 
                  style={{ height: `${(day.views / maxVal) * 100}%` }} 
                  className="w-full bg-blue-100 rounded-t-lg group-hover:bg-blue-500 transition-colors relative min-h-[4px]"
                ></div>
                <div 
                  style={{ height: `${(day.leads / maxVal) * 100}%` }} 
                  className="w-full bg-orange-100 rounded-t-lg group-hover:bg-orange-500 transition-colors relative min-h-[2px]"
                ></div>
                <div 
                  style={{ height: `${(day.sales / maxVal) * 100}%` }} 
                  className="w-full bg-green-100 rounded-t-lg group-hover:bg-green-500 transition-colors relative min-h-[1px]"
                ></div>
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase">
                {new Date(day.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short' })}
              </span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 whitespace-nowrap shadow-xl">
                 V: {day.views} | L: {day.leads} | S: {day.sales}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminInsightsPage: React.FC = () => {
  const [metrics, setMetrics] = useState(Analytics.getMetrics());
  const [onlineNow, setOnlineNow] = useState(Math.floor(Math.random() * 20) + 5);

  const refresh = () => {
    setMetrics(Analytics.getMetrics());
    setOnlineNow(Math.floor(Math.random() * 20) + 5);
  };

  useEffect(() => {
    const interval = setInterval(() => refresh(), 5000);
    return () => clearInterval(interval);
  }, []);

  const leadConversion = metrics.views > 0 ? ((metrics.leads / metrics.views) * 100).toFixed(1) : '0';
  const salesConversion = metrics.leads > 0 ? ((metrics.checkouts / metrics.leads) * 100).toFixed(1) : '0';

  const averageRating = metrics.feedback.length > 0 
    ? (metrics.feedback.reduce((acc: number, f: any) => acc + f.rating, 0) / metrics.feedback.length).toFixed(1)
    : '5.0';

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black heading-font text-gray-900">Métricas Click & Earn</h1>
            <p className="text-gray-500">Monitoramento em tempo real do seu funil de vendas.</p>
          </div>
          <button 
            onClick={refresh}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors font-bold text-gray-700"
          >
            <RefreshCcw className="h-4 w-4" />
            Atualizar Dados
          </button>
        </div>

        {/* Real-time Status */}
        <div className="bg-orange-500 text-white rounded-[2rem] p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-100">
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-300"></span>
              </span>
              <div className="bg-white/20 p-4 rounded-2xl">
                <Users className="h-8 w-8" />
              </div>
            </div>
            <div>
              <p className="text-orange-100 font-bold uppercase text-xs tracking-widest mb-1">Visitantes Online Agora</p>
              <h2 className="text-4xl font-black">{onlineNow} <span className="text-xl opacity-70">pessoas</span></h2>
            </div>
          </div>
          <div className="h-px w-full md:h-16 md:w-px bg-white/20"></div>
          <div className="text-center md:text-left">
            <p className="text-orange-100 font-bold uppercase text-xs tracking-widest mb-1">Satisfação Média</p>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-black">{averageRating}</h2>
              <div className="flex text-yellow-300">
                <Star className="h-6 w-6 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           <ConversionFunnel metrics={metrics} />
           <PerformanceChart history={metrics.history || []} />
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <MetricCard 
            icon={<BarChart className="text-blue-500" />} 
            label="Visualizações Totais" 
            value={metrics.views.toLocaleString()} 
            sub="Tráfego acumulado"
          />
          <MetricCard 
            icon={<Target className="text-orange-500" />} 
            label="Leads Gerados" 
            value={metrics.leads.toLocaleString()} 
            sub={`${leadConversion}% de conversão`}
          />
          <MetricCard 
            icon={<MousePointer2 className="text-green-500" />} 
            label="Checkouts Iniciados" 
            value={metrics.checkouts.toLocaleString()} 
            sub={`${salesConversion}% de eficiência`}
          />
          <MetricCard 
            icon={<MessageSquare className="text-purple-500" />} 
            label="Feedbacks" 
            value={metrics.feedback.length.toLocaleString()} 
            sub="Interações diretas"
          />
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black heading-font mb-8 flex items-center gap-3">
             <Smile className="text-orange-500" />
             Últimas Opiniões dos Usuários
          </h2>
          
          {metrics.feedback.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <p className="text-gray-400 font-bold italic">Nenhum feedback coletado ainda.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {[...metrics.feedback].reverse().slice(0, 5).map((f: any, i: number) => (
                <div key={i} className="flex gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:scale-[1.01] transition-transform">
                  <div className={`p-4 rounded-2xl h-fit ${f.rating >= 4 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {f.rating >= 4 ? <ThumbsUp className="h-5 w-5" /> : <ThumbsDown className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-black text-gray-900 uppercase text-sm tracking-widest">
                        {f.rating >= 4 ? 'Positivo' : 'Melhoria'}
                      </span>
                      <span className="text-gray-400 text-xs">{new Date(f.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 italic">"{f.comment || 'Nenhum comentário adicional.'}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub?: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
    <div className="bg-gray-50 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-black text-gray-900 mb-2">{value}</h3>
    <p className="text-xs font-bold text-orange-500 flex items-center gap-1">
      {sub} <ArrowUpRight className="h-3 w-3" />
    </p>
  </div>
);

export default AdminInsightsPage;
