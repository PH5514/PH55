
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Rocket, 
  ShieldCheck, 
  Target, 
  Users, 
  CheckCircle,
  Star,
  Play,
  Calculator,
  Coins,
  TrendingUp,
  Info
} from 'lucide-react';
import { Analytics } from '../analytics';

const PersonalizedBanner = () => {
  const [source, setSource] = useState<string | null>(null);
  
  useEffect(() => {
    const utms = Analytics.getUTMs();
    if (utms.source) {
      setSource(utms.source.toLowerCase());
    }
  }, []);

  if (!source) return null;

  const messages: Record<string, string> = {
    facebook: "Vindo do Facebook? Temos um bônus exclusivo para você hoje!",
    google: "Vimos que você nos achou no Google. Aproveite o guia gratuito!",
    instagram: "Bem-vindo, seguidor do Instagram! O conteúdo que você procurava está aqui.",
    whatsapp: "Acesso direto via WhatsApp liberado. Comece agora!"
  };

  const message = messages[source] || `Oferta exclusiva para você que chegou via ${source}!`;

  return (
    <div className="bg-orange-500 text-white py-2 px-4 text-center text-sm font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top duration-500">
      <Info className="h-4 w-4" />
      {message}
    </div>
  );
};

const ProfitCalculator = () => {
  const [investment, setInvestment] = useState(500);
  const conversionRate = 0.05;
  const avgCommission = 150;
  
  const estimatedSales = Math.floor((investment / 1) * conversionRate);
  const estimatedProfit = (estimatedSales * avgCommission) - investment;

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-w-5xl mx-auto my-24">
      <div className="p-10 md:p-16 bg-gray-900 text-white md:w-1/2">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-500 px-4 py-1.5 rounded-full text-xs font-black uppercase mb-8">
          <Calculator className="h-4 w-4" />
          Simulador de Ganhos
        </div>
        <h2 className="text-3xl font-black heading-font mb-6 leading-tight">Quanto você quer <span className="text-orange-500">lucrar</span>?</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">Arraste o botão para simular seu investimento inicial em tráfego pago e veja o potencial de retorno como afiliado profissional.</p>
        
        <div className="space-y-6">
          <div className="flex justify-between font-bold">
            <span className="text-sm uppercase text-gray-500">Investimento Mensal</span>
            <span className="text-orange-500">R$ {investment.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100" 
            value={investment} 
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </div>
      
      <div className="p-10 md:p-16 bg-white md:w-1/2 flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl text-orange-500">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Lucro Estimado</p>
              <p className="text-4xl font-black text-gray-900">R$ {estimatedProfit.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 opacity-50">
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-500">
              <Coins className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Vendas Estimadas</p>
              <p className="text-xl font-bold text-gray-900">{estimatedSales} vendas/mês</p>
            </div>
          </div>
        </div>
        
        <Link 
          to="/captura" 
          onClick={() => Analytics.trackButtonClick('Simulador - Quero esse Resultado')}
          className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all text-center shadow-xl shadow-orange-100 flex items-center justify-center gap-2 group"
        >
          QUERO ESSE RESULTADO
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PersonalizedBanner />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-orange-50 blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-bounce">
              <Star className="h-4 w-4 fill-current" />
              <span>O Caminho Mais Curto para sua Liberdade Financeira</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black heading-font tracking-tight text-gray-900 mb-8 leading-tight">
              Transforme Cliques em <span className="text-orange-500">Lucros Reais</span> Todos os Dias
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Descubra como construir um negócio digital sólido como afiliado, mesmo começando do absoluto zero. Sem segredos, apenas resultados.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/captura" 
                onClick={() => Analytics.trackButtonClick('Hero - Começar Agora')}
                className="w-full sm:w-auto bg-orange-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 hover:scale-105 active:scale-95 flex items-center justify-center group"
              >
                QUERO COMEÇAR AGORA
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/sobre" 
                className="w-full sm:w-auto bg-gray-100 text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center"
              >
                Como Funciona?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 font-medium mb-8 text-sm uppercase tracking-widest">Plataformas que Utilizamos</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="text-3xl font-black text-gray-800">HOTMART</div>
            <div className="text-3xl font-black text-gray-800">EDUZZ</div>
            <div className="text-3xl font-black text-gray-800">KIWIFY</div>
            <div className="text-3xl font-black text-gray-800">BRAIP</div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black heading-font mb-4">Por que o Click & Earn?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Nós não ensinamos apenas teorias. Mostramos o campo de batalha para quem quer lucrar de verdade.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Rocket className="h-8 w-8 text-orange-500" />}
              title="Escalabilidade Rápida"
              description="Aprenda a escalar suas campanhas e multiplicar seus ganhos de forma previsível e segura."
            />
            <BenefitCard 
              icon={<Target className="h-8 w-8 text-blue-500" />}
              title="Tráfego Qualificado"
              description="O segredo está em quem vê sua oferta. Te ensinamos a atrair compradores, não curiosos."
            />
            <BenefitCard 
              icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
              title="Estratégias Validadas"
              description="Métodos testados por grandes nomes do mercado para garantir que você não perca dinheiro."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <ProfitCalculator />
        </div>
      </section>

      <section className="py-24 bg-orange-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Rocket className="h-96 w-96 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black heading-font mb-6 leading-tight">
            Pare de apenas olhar. Comece a lucrar!
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Junte-se a mais de 5.000 alunos que já transformaram seus celulares em máquinas de vendas online.
          </p>
          <Link 
            to="/captura" 
            onClick={() => Analytics.trackButtonClick('CTA Final - Garantir Vaga')}
            className="bg-white text-orange-600 px-12 py-5 rounded-full font-black text-xl hover:bg-gray-100 transition-all shadow-2xl flex items-center justify-center mx-auto w-fit"
          >
            GARANTIR MINHA VAGA AGORA
          </Link>
        </div>
      </section>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-50 p-8 rounded-3xl hover:shadow-xl transition-all border border-gray-100 group">
    <div className="bg-white p-4 rounded-2xl w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black heading-font mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default HomePage;
