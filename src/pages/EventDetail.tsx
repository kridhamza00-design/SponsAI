import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MoreHorizontal, 
  TrendingUp, 
  Users, 
  Zap, 
  ChevronRight,
  Sparkles,
  Bot
} from 'lucide-react';
import { MOCK_EVENTS, MOCK_CONTRACTS } from '../lib/mockData';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = MOCK_EVENTS.find(e => e.id === id);

  if (!event) return <div>Événement non trouvé</div>;

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/app/events')} className="flex items-center gap-2 text-sm font-bold text-brand-ink/40 hover:text-brand-ink transition-colors">
          <ArrowLeft size={18} /> Retour à la liste
        </button>
        <div className="flex gap-4">
           <button className="p-3 rounded-xl border border-brand-ink/5 hover:bg-white transition-all"><Share2 size={18} /></button>
           <button className="p-3 rounded-xl border border-brand-ink/5 hover:bg-white transition-all"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <div className="ai-badge">ID #{event.id}</div>
           <h1 className="text-6xl font-display font-medium text-brand-ink">{event.name}</h1>
           <p className="text-xl font-medium text-brand-ink/40 max-w-2xl leading-relaxed italic">"{event.description}"</p>
        </div>
        
        <button className="btn-primary py-5 px-10 flex items-center gap-3 text-md shadow-lg shadow-brand-emerald/10">
          Télécharger le Dossier <Download size={20} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatsBox label="Progression Budget" value={`${((event.collectedBudget / event.targetBudget) * 100).toFixed(1)}%`} sub={`${event.collectedBudget.toLocaleString()} € / ${event.targetBudget.toLocaleString()} €`} icon={<TrendingUp />} />
         <StatsBox label="Sponsors Confirmés" value="12" sub="3 en attente de signature" icon={<Zap />} />
         <StatsBox label="Reach Audience" value="85 K" sub="Personnes visées" icon={<Users />} />
      </div>

      {/* Contracts Table */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-display font-bold">Propositions & Contrats</h2>
          <div className="flex gap-2">
             {['Tous', 'Signés', 'En cours'].map(f => (
               <button key={f} className="px-4 py-2 rounded-full border border-brand-ink/5 text-[10px] font-black uppercase tracking-widest hover:bg-brand-ink/5">{f}</button>
             ))}
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-ink/[0.02] border-b border-brand-ink/5">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Sponsor / Marque</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Match Score</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Montant</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest opacity-40">Statut</th>
                <th className="p-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-ink/5">
              {MOCK_CONTRACTS.map(contract => (
                <tr key={contract.id} className="group hover:bg-brand-emerald/[0.01] transition-colors cursor-pointer" onClick={() => navigate(`/app/warroom/${contract.id}`)}>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-brand-ink text-white flex items-center justify-center font-display font-bold italic">
                         {contract.sponsorName[0]}
                       </div>
                       <div className="font-bold">{contract.sponsorName}</div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <div className="px-2 py-1 bg-brand-emerald/10 text-brand-emerald rounded text-[10px] font-black font-mono">
                         {contract.matchScore}%
                       </div>
                       <div className="w-16 h-1 bg-brand-ink/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-emerald" style={{ width: `${contract.matchScore}%` }} />
                       </div>
                    </div>
                  </td>
                  <td className="p-6 font-display font-black">{contract.agreedAmount.toLocaleString()} €</td>
                  <td className="p-6">
                     <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${contract.status === 'signed' ? 'bg-brand-emerald/20 text-brand-emerald' : 'bg-brand-ink/5 text-brand-ink/40'}`}>
                       {contract.status}
                     </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-3 rounded-xl bg-brand-ink/5 group-hover:bg-brand-emerald group-hover:text-white transition-all">
                       <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Suggestions Footer */}
      <div className="glass-card p-10 rounded-[2.5rem] bg-brand-emerald/[0.03] border-brand-emerald/20 flex flex-col md:flex-row items-center gap-10">
         <div className="w-20 h-20 bg-brand-ink text-brand-emerald rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg">
            <Bot size={40} />
         </div>
         <div className="flex-1 space-y-4">
            <div className="ai-badge">Agent Alert</div>
            <h3 className="text-2xl font-display font-bold leading-tight">J'ai identifié une incohérence dans les contre-propositions de Ledger.</h3>
            <p className="text-sm font-medium opacity-60">Ils demandent un placement logo premium pour un montant "Basic". Souhaitez-vous que je ré-ajuste le script de négociation ?</p>
         </div>
         <button className="btn-primary !bg-brand-ink border-none !text-brand-emerald hover:!bg-brand-emerald hover:!text-white transition-all whitespace-nowrap">
            Gérer avec l'IA
         </button>
      </div>
    </div>
  );
}

function StatsBox({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-8 rounded-[2rem]">
       <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</div>
          <div className="text-brand-emerald">{icon}</div>
       </div>
       <div className="text-4xl font-display font-black mb-1">{value}</div>
       <div className="text-[10px] font-black opacity-40 uppercase tracking-widest">{sub}</div>
    </div>
  );
}
