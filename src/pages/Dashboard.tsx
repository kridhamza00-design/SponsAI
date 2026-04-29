import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Handshake, 
  Sparkles, 
  Zap, 
  Target, 
  Users, 
  ArrowUpRight, 
  Calendar,
  FileText,
  Clock,
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-emerald mb-4">
             <Target size={14} /> Stratégie & Performance
          </div>
          <h1 className="text-5xl font-display font-medium text-brand-ink leading-tight">Bonjour, Sarah.</h1>
          <p className="text-lg font-medium text-brand-ink/40 mt-2 italic">Dernière mise à jour de l'IA : il y a 5 minutes.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-6 py-4 rounded-xl border border-brand-ink/5 bg-white/50 backdrop-blur-sm font-bold text-sm shadow-sm hover:bg-white transition-all">
             Exporter Audit
           </button>
           <button className="btn-primary py-4 px-8 text-sm flex items-center gap-2">
             Créer un événement <Zap size={16} />
           </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Budget Collecté" value="64 250 €" change="+12.4%" icon={<TrendingUp />} />
        <StatCard label="Partenariats" value="24" change="+3" icon={<Handshake />} />
        <StatCard label="Reach Estimé" value="125 K" change="+15%" icon={<Users />} />
        <StatCard label="Temps Gagné" value="128 h" change="-40%" icon={<Zap />} />
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: AI Suggestions & Goals */}
        <div className="lg:col-span-2 space-y-10">
          <section className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-brand-emerald pointer-events-none group-hover:scale-110 transition-transform">
              <Bot size={200} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="ai-badge">
                   <Sparkles size={10} className="fill-current" /> AI Insights
                 </div>
              </div>
              <h2 className="text-3xl font-display font-medium mb-10 leading-tight">
                L'Agent IA a identifié <span className="text-brand-emerald">3 entreprises</span> parfaitement alignées avec votre ADN "Tech Éco-responsable".
              </h2>
              
              <div className="space-y-4">
                 <MatchItem name="EcoFlow" score={96} sector="Énergie Verte" explanation="Forte résonance avec votre audience engagée RSE." />
                 <MatchItem name="Back Market" score={92} sector="Refurbished Tech" explanation="Cible démographique 18-35 ans identique à votre festival." />
                 <MatchItem name="Ledger" score={88} sector="Cybersécurité" explanation="Potentiel de workshop technologique très élevé." />
              </div>

              <button className="mt-10 text-sm font-bold text-brand-emerald flex items-center gap-2 group">
                 Voir tous les matchs potentiels <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
          </section>

          <section className="glass-card p-10 rounded-[2.5rem]">
             <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-display font-medium">Progression des Objectifs</h2>
                <button className="text-xs font-black uppercase tracking-widest text-brand-ink/40">Éditer ma roadmap</button>
             </div>
             <div className="space-y-10">
                <GoalProgress label="Collecte Sponsoring Trimestre" current={45000} target={60000} unit="€" />
                <GoalProgress label="Signature Contrats Premium" current={12} target={15} unit="contrats" />
                <GoalProgress label="Couverture Médias Locaux" current={85} target={100} unit="%" />
             </div>
          </section>
        </div>

        {/* Right Column: Timeline & Activity */}
        <div className="space-y-10">
           <section className="glass-card p-8 rounded-[2.5rem] bg-brand-ink text-brand-cream border-none">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-display font-medium">Timeline Événements</h2>
                 <Calendar size={20} className="text-brand-emerald" />
              </div>
              <div className="space-y-8 relative">
                 <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-brand-emerald/10" />
                 <TimelineItem date="15 Juin" title="Tech Summit 2026" status="Confirmé" active />
                 <TimelineItem date="22 Sept" title="Green Expo Paris" status="Draft" />
                 <TimelineItem date="10 Nov" title="Gala de l'Innovation" status="Prospect" />
              </div>
           </section>

           <section className="glass-card p-8 rounded-[2.5rem]">
              <h2 className="text-xl font-display font-medium mb-8">Activité Récente</h2>
              <div className="space-y-6">
                 <ActivityItem icon={<FileText size={14} />} text="Dossier IA généré pour TechCorp" time="Il y a 12 min" />
                 <ActivityItem icon={<ShieldCheck size={14} />} text="Contrat signé avec FinFlow" time="Il y a 2h" />
                 <ActivityItem icon={<Clock size={14} />} text="IA relance EcoJuice (Relance #3)" time="Hier à 14:20" />
              </div>
              <button className="w-full mt-8 py-3 bg-brand-ink/5 rounded-xl text-xs font-black uppercase tracking-widest text-brand-ink/40 hover:bg-brand-ink/10 transition-colors">
                 Historique complet
              </button>
           </section>
        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value, change, icon }: { label: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-8 rounded-[2rem] group hover:border-brand-emerald/30 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-[10px] font-black font-mono text-brand-emerald-dark bg-brand-emerald/10 px-2 py-0.5 rounded-full">
          {change}
        </div>
      </div>
      <div>
        <div className="text-3xl font-display font-black tracking-tight mb-1">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-brand-ink/40">{label}</div>
      </div>
    </div>
  );
}

function MatchItem({ name, score, sector, explanation }: { name: string, score: number, sector: string, explanation: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/40 rounded-2xl border border-brand-ink/5 group hover:bg-white transition-all cursor-pointer">
       <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-brand-ink text-white rounded-xl flex flex-col items-center justify-center font-display font-black text-xs">
            {score}%
          </div>
          <div>
            <div className="font-bold text-brand-ink">{name}</div>
            <div className="text-[10px] uppercase font-black tracking-widest text-brand-emerald-dark">{sector}</div>
          </div>
       </div>
       <div className="hidden md:block text-xs font-medium text-brand-ink/40 max-w-[200px] italic">
         "{explanation}"
       </div>
       <ChevronRight size={18} className="text-brand-ink/20 group-hover:translate-x-1 group-hover:text-brand-emerald transition-all" />
    </div>
  );
}

function GoalProgress({ label, current, target, unit }: { label: string, current: number, target: number, unit: string }) {
  const percentage = Math.min((current / target) * 100, 100);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="text-sm font-bold text-brand-ink">{label}</div>
        <div className="text-[10px] font-black font-mono opacity-40">
           {current.toLocaleString()} {unit} / {target.toLocaleString()} {unit}
        </div>
      </div>
      <div className="w-full h-2 bg-brand-ink/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-brand-emerald rounded-full" 
        />
      </div>
    </div>
  );
}

function TimelineItem({ date, title, status, active = false }: { date: string, title: string, status: string, active?: boolean }) {
  return (
    <div className="flex gap-6 relative group">
       <div className={`w-8 h-8 rounded-lg shrink-0 z-10 flex items-center justify-center text-[10px] font-black border transition-all ${active ? 'bg-brand-emerald border-brand-emerald text-brand-ink shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-brand-ink border-white/10 text-white/50'}`}>
          {active ? <Sparkles size={14} /> : <div className="w-1 h-1 bg-white/20 rounded-full" />}
       </div>
       <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-emerald mb-1">{date}</div>
          <div className="font-bold mb-1 group-hover:text-brand-emerald transition-colors leading-tight">{title}</div>
          <div className="text-[10px] font-medium opacity-40 italic">{status}</div>
       </div>
    </div>
  );
}

function ActivityItem({ icon, text, time }: { icon: React.ReactNode, text: string, time: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-xl bg-brand-ink/5 flex items-center justify-center text-brand-ink shrink-0 group-hover:bg-brand-emerald/10 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold leading-tight mb-1">{text}</div>
        <div className="text-[10px] opacity-40 font-mono">{time}</div>
      </div>
    </div>
  );
}
