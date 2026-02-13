
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight, 
  TrendingUp, 
  Facebook, 
  Instagram, 
  Youtube,
  MessageCircle,
  Send,
  Loader2,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Gift,
  AlertCircle,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  BarChart4
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Analytics } from './analytics';
import { SITE_CONFIG } from './config';

// Pages
import HomePage from './pages/HomePage';
import LeadCapturePage from './pages/LeadCapturePage';
import SalesPage from './pages/SalesPage';
import BlogPage from './pages/BlogPage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminInsightsPage from './pages/AdminInsightsPage';

const SatisfactionWidget = () => {
  const [step, setStep] = useState<'ask' | 'comment' | 'thanks' | 'closed'>('ask');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  if (step === 'closed') return null;

  const handleFeedback = (val: number) => {
    setRating(val);
    setStep('comment');
  };

  const submitFeedback = () => {
    if (rating !== null) {
      Analytics.trackFeedback(rating, comment);
      setStep('thanks');
      setTimeout(() => setStep('closed'), 3000);
    }
  };

  return (
    <div className="fixed bottom-6 left-24 z-[90] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 max-w-[300px] animate-in slide-in-from-bottom-10 duration-500">
      {step === 'ask' && (
        <>
          <p className="text-sm font-bold text-gray-900 mb-4">Como está sua experiência no {SITE_CONFIG.name}?</p>
          <div className="flex gap-4">
            <button onClick={() => handleFeedback(1)} className="flex-1 flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <ThumbsDown className="text-gray-400 h-6 w-6" />
              <span className="text-[10px] font-bold text-gray-400 uppercase">Melhorar</span>
            </button>
            <button onClick={() => handleFeedback(5)} className="flex-1 flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <ThumbsUp className="text-orange-500 h-6 w-6" />
              <span className="text-[10px] font-bold text-orange-500 uppercase">Excelente</span>
            </button>
          </div>
        </>
      )}
      {step === 'comment' && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-900">O que podemos fazer melhor?</p>
          <textarea 
            className="w-full text-xs p-3 bg-gray-50 rounded-lg outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Seu comentário (opcional)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button 
            onClick={submitFeedback}
            className="w-full bg-orange-500 text-white py-2 rounded-lg text-xs font-bold"
          >
            ENVIAR FEEDBACK
          </button>
        </div>
      )}
      {step === 'thanks' && (
        <div className="text-center py-4">
          <CheckCircle2 className="text-green-500 h-8 w-8 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-900">Obrigado!</p>
        </div>
      )}
      <button onClick={() => setStep('closed')} className="absolute top-2 right-2 text-gray-300 hover:text-gray-500">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Produtos', path: '/produtos' },
    { label: 'Blog', path: '/blog' },
    { label: 'Sobre', path: '/sobre' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-[90] border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-orange-500 p-2 rounded-lg text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black heading-font tracking-tight text-gray-900">
                CLICK<span className="text-orange-500">&</span>EARN
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  location.pathname === item.path ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/captura"
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-200"
            >
              Começar Agora
            </Link>
            <Link to="/admin-insights" className="text-gray-200 hover:text-orange-500 transition-colors">
               <BarChart4 className="h-4 w-4" />
            </Link>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top-4">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-bold text-gray-900 border-b border-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/captura"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-orange-500 text-white px-6 py-4 rounded-xl font-black mt-4"
            >
              COMEÇAR AGORA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: `Olá! Sou o assistente da ${SITE_CONFIG.name}. Como posso te ajudar a lucrar hoje?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Você é um consultor especialista em Marketing de Afiliados da plataforma ${SITE_CONFIG.name} (${SITE_CONFIG.domain}). Seu objetivo é ajudar o usuário com dicas de vendas, tráfego e persuadi-lo a conhecer os produtos e cursos da plataforma de forma profissional, ética e motivadora. Seque o tom de um mentor de sucesso.`
        }
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Tive um pequeno problema técnico. Pode repetir a sua pergunta?' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Estou com alta demanda de leads agora! Visite nosso blog para dicas imediatas ou tente novamente em instantes.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-bold">Consultoria IA {SITE_CONFIG.name}</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleChat} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sua dúvida sobre lucro digital..."
              className="flex-grow px-4 py-2 bg-gray-50 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <button type="submit" className="bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-600 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 text-white p-4 rounded-full shadow-xl shadow-orange-200 hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.supportMessage)}`;

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/captura" element={<LeadCapturePage />} />
            <Route path="/oferta" element={<SalesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/obrigado" element={<ThankYouPage />} />
            <Route path="/admin-insights" element={<AdminInsightsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        
        <AIAssistant />
        
        {/* Botão Flutuante WhatsApp Corrigido */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 left-6 z-[100] bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center animate-pulse-orange"
        >
          <MessageCircle className="h-6 w-6" />
        </a>

        <SatisfactionWidget />
      </div>
    </Router>
  );
};

export default App;
