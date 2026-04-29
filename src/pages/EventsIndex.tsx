import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, MapPin, Target, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_EVENTS } from '../lib/mockData';

export default function EventsIndex() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-emerald mb-4">
             <Calendar size={14} /> Gestion Événementielle
          </div>
          <h1 className="text-5xl font-display font-medium text-brand-ink">Mes Événements</h1>
        </div>
        
        <button 
          onClick={() => navigate('create')}
          className="btn-primary py-4 px-8 text-sm flex items-center gap-2"
        >
          Nouvel Événement <Plus size={18} />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={18} />
           <input 
             type="text" 
             placeholder="Rechercher un événement..."
             className="w-full bg-white/50 border border-brand-ink/5 rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-emerald/20 outline-none transition-all"
           />
        </div>
        <button className="px-6 py-4 rounded-xl border border-brand-ink/10 flex items-center gap-2 font-bold text-sm hover:bg-white transition-all">
           <Filter size={18} /> Filtres
        </button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-6">
        {MOCK_EVENTS.map((event, idx) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(event.id)}
            className="glass-card p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-10 group cursor-pointer hover:border-brand-emerald/30 transition-all"
          >
            <div className="w-full md:w-48 aspect-video bg-brand-ink rounded-2xl flex items-center justify-center text-white overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/20 to-transparent" />
               <Calendar size={48} className="opacity-20" />
               <div className="absolute top-4 left-4">
                  <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${event.status === 'active' ? 'bg-brand-emerald text-brand-ink' : 'bg-white/20 text-white'}`}>
                    {event.status}
                  </div>
               </div>
            </div>
            
            <div className="flex-1 space-y-4">
               <div>
                  <h3 className="text-2xl font-display font-bold group-hover:text-brand-emerald transition-colors">{event.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm font-medium text-brand-ink/40">
                     <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                     <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
               </div>
               
               <p className="text-sm text-brand-ink/60 line-clamp-2 max-w-2xl font-medium">
                 {event.description}
               </p>

               <div className="flex flex-wrap gap-2 pt-2">
                  {event.needs?.map(need => (
                    <span key={need} className="px-3 py-1 rounded-lg bg-brand-ink/5 text-[10px] font-black uppercase tracking-widest opacity-60">
                      {need}
                    </span>
                  ))}
               </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-end gap-2 shrink-0">
               <div className="text-right">
                  <div className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Collecte</div>
                  <div className="text-xl font-display font-black">
                    {event.collectedBudget.toLocaleString()} € <span className="text-brand-ink/20 font-sans text-sm">/ {event.targetBudget.toLocaleString()} €</span>
                  </div>
               </div>
               <div className="w-32 h-1.5 bg-brand-ink/5 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-brand-emerald" style={{ width: `${(event.collectedBudget / event.targetBudget) * 100}%` }} />
               </div>
               <div className="mt-4 flex items-center gap-2 text-brand-emerald font-bold text-sm">
                  Détails <ChevronRight size={18} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
