import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Filter, ChevronRight, Sparkles } from 'lucide-react';
import { MOCK_CONTRACTS } from '../lib/mockData';

export default function WarRoomIndex() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 pt-8 flex-1 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-emerald mb-4">
             <MessageSquare size={14} /> Centre de Négociation
          </div>
          <h1 className="text-5xl font-display font-medium text-brand-ink">War Room</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-4 md:px-0">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={18} />
           <input 
             type="text" 
             placeholder="Rechercher une discussion..."
             className="w-full bg-white/50 border border-brand-ink/5 rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-emerald/20 outline-none transition-all"
           />
        </div>
        <button className="px-6 py-4 rounded-xl border border-brand-ink/10 flex items-center gap-2 font-bold text-sm hover:bg-white transition-all whitespace-nowrap">
           <Filter size={18} /> Tri par Score
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-20 no-scrollbar px-4 md:px-0">
         {MOCK_CONTRACTS.map((contract, idx) => (
           <motion.div 
             key={contract.id}
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: idx * 0.1 }}
             onClick={() => navigate(contract.id)}
             className="glass-card p-6 rounded-2xl flex items-center gap-8 cursor-pointer group hover:border-brand-emerald/30 active:scale-[0.99] transition-all bg-white/40"
           >
              <div className="w-16 h-16 bg-brand-ink rounded-2xl flex items-center justify-center text-white shrink-0 font-display text-xl italic group-hover:scale-105 transition-transform">
                {contract.sponsorName[0]}
              </div>
              
              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold truncate">{contract.sponsorName}</h3>
                    <div className="ai-badge scale-75 origin-left">Score {contract.matchScore}%</div>
                 </div>
                 <p className="text-sm font-medium opacity-40 line-clamp-1">
                   {idx === 0 ? "IA : j'attends votre validation pour la contre-proposition..." : "Dernière offre reçue : 15 000€..."}
                 </p>
              </div>

              <div className="text-right shrink-0">
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Statut</div>
                 <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${contract.status === 'negotiating' ? 'bg-amber-100 text-amber-700' : 'bg-brand-emerald/10 text-brand-emerald'}`}>
                    {contract.status}
                 </div>
              </div>

              <ChevronRight size={20} className="text-brand-ink/10 group-hover:translate-x-1 group-hover:text-brand-emerald transition-all" />
           </motion.div>
         ))}
      </div>
    </div>
  );
}
