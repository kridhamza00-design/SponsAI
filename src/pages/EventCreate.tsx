import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, ChevronRight, Layout, Database, Zap, ArrowRight, Check } from 'lucide-react';

export default function EventCreate() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleNext = (val: any) => {
    setFormData({ ...formData, ...val });
    setStep(s => s + 1);
  };

  const finish = () => {
    setIsGenerating(true);
    // Simuler génération IA
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/app/events');
    }, 4000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-8">
      <AnimatePresence mode="wait">
        {!isGenerating ? (
          <div className="w-full max-w-3xl space-y-12">
            <div className="flex gap-2">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-12 bg-brand-emerald' : 'w-6 bg-brand-ink/5'}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <StepSection 
                  key="1"
                  title="Commençons par les bases."
                  subtitle="Quel est le nom et la vision de cet événement ?"
                >
                  <div className="space-y-6">
                    <input 
                      autoFocus
                      placeholder="Nom de l'événement..."
                      className="w-full text-4xl font-display font-medium border-b-2 border-brand-ink/5 focus:border-brand-emerald outline-none bg-transparent pb-4"
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <textarea 
                      placeholder="Une brève description..."
                      rows={4}
                      className="w-full text-xl font-medium bg-brand-ink/5 rounded-[2rem] p-8 outline-none focus:ring-2 focus:ring-brand-emerald/10 transition-all no-scrollbar"
                      onChange={e => setFormData({ ...formData, desc: e.target.value })}
                    />
                    <button onClick={() => handleNext({})} className="btn-primary flex items-center gap-2 !px-10">Suivant <ChevronRight size={18} /></button>
                  </div>
                </StepSection>
              )}

              {step === 2 && (
                <StepSection 
                  key="2"
                  title="Parlons chiffres & besoins."
                  subtitle="Quel budget visez-vous et quels sont vos besoins logistiques ?"
                >
                  <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Budget Cible (€)</label>
                         <input type="number" className="w-full text-2xl font-display font-black p-4 bg-brand-ink/5 rounded-2xl outline-none" placeholder="50 000" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Date prévue</label>
                         <input type="date" className="w-full font-bold p-4 bg-brand-ink/5 rounded-2xl outline-none" />
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Besoins prioritaires</label>
                       <div className="flex flex-wrap gap-2">
                          {['Financier', 'Matériel', 'Media', 'Expertise', 'Lieux'].map(tag => (
                            <button key={tag} className="px-6 py-3 rounded-xl border border-brand-ink/10 text-xs font-bold hover:bg-brand-emerald hover:text-white transition-all">{tag}</button>
                          ))}
                       </div>
                    </div>
                    
                    <button onClick={() => handleNext({})} className="btn-primary flex items-center gap-2 !px-10">Suivant <ChevronRight size={18} /></button>
                  </div>
                </StepSection>
              )}

              {step === 3 && (
                <StepSection 
                  key="3"
                  title="Dernière étape : L'ADN de vente."
                  subtitle="Voulez-vous que SponAi génère votre dossier de sponsoring automatiquement ?"
                >
                  <div className="space-y-8">
                    <div className="glass-card p-10 rounded-[2.5rem] border-brand-emerald/30 bg-brand-emerald/[0.02]">
                       <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-brand-emerald/10 text-brand-emerald rounded-2xl flex items-center justify-center animate-pulse">
                            <Bot size={24} />
                          </div>
                          <div>
                            <div className="font-bold text-xl">IA Copilote Activé</div>
                            <div className="text-sm opacity-60 font-medium">L'IA analysera le web pour identifier vos meilleurs prospects.</div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <Feature text="Rédaction automatique du dossier PDF" />
                          <Feature text="Calcul du Score de Compatibilité" />
                          <Feature text="Préparation des scripts de négociation" />
                       </div>
                    </div>
                    <button onClick={finish} className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-emerald/20">
                       Lancer la génération IA <Zap size={24} className="fill-current" />
                    </button>
                  </div>
                </StepSection>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <AIGenerationModal />
        )}
      </AnimatePresence>
    </div>
  );
}

function StepSection({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-5xl font-display font-medium leading-tight">{title}</h2>
        <p className="text-lg font-medium text-brand-ink/40 italic">{subtitle}</p>
      </div>
      <div className="pt-8">
        {children}
      </div>
    </motion.div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-bold">
       <div className="w-5 h-5 rounded-full bg-brand-emerald/20 flex items-center justify-center text-brand-emerald shrink-0">
          <Check size={12} strokeWidth={4} />
       </div>
       {text}
    </div>
  );
}

function AIGenerationModal() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center p-12 glass-card rounded-[3rem] w-full max-w-xl space-y-10"
    >
      <div className="relative inline-block">
         <div className="absolute inset-0 bg-brand-emerald/20 blur-3xl rounded-full scale-150 animate-pulse" />
         <div className="w-24 h-24 bg-brand-ink rounded-[2rem] flex items-center justify-center text-brand-emerald relative z-10 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
               <Sparkles size={48} />
            </motion.div>
         </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-display font-bold">L'IA prépare votre dossier</h2>
        <div className="space-y-3 pt-6">
           <LoadingStatus label="Scraping des partenaires potentiels..." active />
           <LoadingStatus label="Analyse de l'ADN de l'événement..." />
           <LoadingStatus label="Génération de l'argumentaire de vente..." />
        </div>
      </div>
    </motion.div>
  );
}

function LoadingStatus({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 text-sm font-bold transition-opacity ${active ? 'opacity-100' : 'opacity-20'}`}>
       <div className={`w-2 h-2 rounded-full ${active ? 'bg-brand-emerald animate-ping' : 'bg-brand-ink'}`} />
       {label}
    </div>
  );
}
