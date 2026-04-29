import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Bot, 
  Zap, 
  Target, 
  ShieldCheck, 
  Info,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { MOCK_CONTRACTS, MOCK_MESSAGES } from '../lib/mockData';
import { Message } from '../types';

export default function WarRoomChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contract = MOCK_CONTRACTS.find(c => c.id === id);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES.filter(m => m.contractId === id));
  const [input, setInput] = useState('');
  const [isAiOn, setIsAiOn] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      contractId: id!,
      senderType: 'organizer',
      content: input,
      createdAt: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setInput('');

    // Simuler réponse IA/Sponsor
    setTimeout(() => {
       const aiMsg: Message = {
         id: (Date.now() + 1).toString(),
         contractId: id!,
         senderType: 'ai_agent',
         content: "J'analyse cette proposition. Je suggère de souligner notre portée digitale auprès de la génération Z pour justifier le maintien du tarif premium.",
         createdAt: new Date().toISOString()
       };
       setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  if (!contract) return <div>Contrat introuvable</div>;

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 pt-4 relative">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass-card rounded-[2.5rem] bg-white/40 overflow-hidden relative">
        {/* Chat Header */}
        <div className="px-8 py-6 border-b border-brand-ink/5 bg-white/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate('/app/warroom')} className="p-2 rounded-xl hover:bg-brand-ink/5 transition-colors">
                <ArrowLeft size={18} />
             </button>
             <div>
                <h2 className="font-bold text-lg leading-tight">{contract.sponsorName}</h2>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-brand-emerald rounded-full" />
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40">En direct de la War Room</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             {/* AI Mode Switch */}
             <div className="flex items-center gap-3 bg-brand-ink/5 p-1.5 rounded-2xl border border-brand-ink/5">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity ${isAiOn ? 'opacity-20' : 'opacity-100'}`}>Humain</span>
                <button 
                  onClick={() => setIsAiOn(!isAiOn)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-500 ${isAiOn ? 'bg-brand-emerald' : 'bg-brand-ink/20'}`}
                >
                   <motion.div 
                     animate={{ x: isAiOn ? 24 : 4 }}
                     className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm flex items-center justify-center"
                   >
                     {isAiOn && <Sparkles size={8} className="text-brand-emerald fill-current" />}
                   </motion.div>
                </button>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity ${isAiOn ? 'opacity-100 text-brand-emerald' : 'opacity-20'}`}>Auto-Pilot</span>
             </div>
             <button className="p-2 text-brand-ink/20 hover:text-brand-ink transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.senderType === 'organizer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.senderType === 'ai_agent' ? 'w-full' : ''}`}>
                   {msg.senderType === 'ai_agent' ? (
                     <div className="glass-card p-6 rounded-3xl border-brand-emerald/30 bg-brand-emerald/[0.03] space-y-4">
                        <div className="flex items-center gap-2 text-brand-emerald text-[10px] font-black uppercase tracking-widest">
                           <Bot size={14} /> SponAi Suggestions
                        </div>
                        <div className="text-sm font-medium leading-relaxed text-brand-ink/80 prose prose-brand">
                           <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                        <div className="flex gap-2 pt-2">
                           <button className="px-3 py-1.5 rounded-lg bg-brand-emerald text-white text-[10px] font-bold shadow-sm">Valider & Envoyer</button>
                           <button className="px-3 py-1.5 rounded-lg bg-white border border-brand-ink/10 text-[10px] font-bold">Modifier</button>
                        </div>
                     </div>
                   ) : (
                     <div className={`p-5 rounded-2xl text-sm font-medium leading-relaxed ${msg.senderType === 'organizer' ? 'bg-brand-ink text-white rounded-tr-none' : 'bg-white border border-brand-ink/5 text-brand-ink rounded-tl-none shadow-sm'}`}>
                        {msg.content}
                     </div>
                   )}
                   <div className={`text-[9px] font-black uppercase tracking-widest opacity-20 mt-2 ${msg.senderType === 'organizer' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                   </div>
                </div>
             </div>
           ))}
           <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-brand-ink/5 bg-white/40 backdrop-blur-md">
           <div className={`flex items-center gap-4 bg-white p-2 rounded-2xl shadow-inner border transition-all ${isAiOn ? 'border-brand-emerald/30 ring-4 ring-brand-emerald/5' : 'border-brand-ink/5'}`}>
              <button className="p-3 text-brand-ink/20 hover:text-brand-ink transition-colors"><Zap size={20} /></button>
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                placeholder={isAiOn ? "L'IA attend vos instructions de négociation..." : "Écrire un message..."}
              />
              <button 
                onClick={handleSend}
                className={`p-3 rounded-xl transition-all ${input.trim() ? 'bg-brand-emerald text-white shadow-lg' : 'bg-brand-ink/5 text-brand-ink/20'}`}
              >
                 <Send size={20} />
              </button>
           </div>
        </div>
      </div>

      {/* Constraints Panel (Right) */}
      <div className="hidden lg:flex w-80 flex-col gap-6">
         <div className="glass-card p-6 rounded-[2rem] space-y-6">
            <h3 className="font-display font-bold text-xl flex items-center gap-2">
               <Target size={18} className="text-brand-emerald" /> Contexte
            </h3>
            <div className="space-y-4">
               <ContextItem label="Pack Visé" value="Premium - Stage" />
               <ContextItem label="Budget Min." value="22 000 €" />
               <ContextItem label="Budget Max." value="35 000 €" />
               <ContextItem label="Deadline" value="20 Mai 2026" />
            </div>
            <div className="pt-4 border-t border-brand-ink/5">
               <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">ADN Marketing</div>
               <div className="flex flex-wrap gap-1.5">
                  {['Digital', 'GenZ', 'Éthique'].map(t => (
                    <span key={t} className="px-2 py-1 bg-brand-emerald/10 text-brand-emerald rounded text-[9px] font-black">#{t}</span>
                  ))}
               </div>
            </div>
         </div>

         <div className="glass-card p-6 rounded-[2rem] bg-brand-ink text-brand-cream border-none shadow-xl shadow-brand-ink/20">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
               <ShieldCheck size={18} className="text-brand-emerald" /> Guide Étique
            </h3>
            <p className="text-xs font-medium opacity-60 leading-relaxed">
              L'IA ne fera jamais de promesses sans validation humaine dès que le montant dépasse 10 000€.
            </p>
            <button className="mt-4 w-full py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
               Modifier Limites
            </button>
         </div>
      </div>
    </div>
  );
}

function ContextItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-xs font-medium opacity-40">{label}</span>
       <span className="text-xs font-bold">{value}</span>
    </div>
  );
}
