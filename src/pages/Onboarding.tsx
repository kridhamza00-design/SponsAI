import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, ChevronRight, Check, Target, Users, Zap, Briefcase, Handshake } from 'lucide-react';
import { AuthContext } from '../App';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<any>({});
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNext = (key: string, value: any) => {
    setAnswers({ ...answers, [key]: value });
    setStep(s => s + 1);
  };

  const completeOnboarding = () => {
    // Save state
    const updatedUser = { ...user, needsOnboarding: false };
    login(updatedUser);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
         <Handshake size={600} strokeWidth={0.5} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="flex justify-center mb-12">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-brand-emerald' : 'w-4 bg-brand-ink/5'}`} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <OnboardingStep 
              title={<>Bonjour <strong>{user?.name || 'Sarah'}</strong> ! <br/> Je suis Spon, votre assistant IA spécialisé en sponsoring.</>}
              subtitle="Pour commencer, comment s'appelle votre organisation ?"
            >
              <InputStep onNext={(val) => handleNext('orgName', val)} placeholder="Nom de l'organisation..." />
            </OnboardingStep>
          )}

          {step === 2 && (
            <OnboardingStep 
              title="Super ! Quel est votre secteur d'activité ?"
              subtitle="Ceci m'aidera à cibler les sponsors les plus pertinents."
            >
              <ChoiceStep 
                choices={[
                  { id: 'tech', label: 'Technologie', icon: <Zap size={16} /> },
                  { id: 'sport', label: 'Sport', icon: <Target size={16} /> },
                  { id: 'culture', label: 'Culture & Arts', icon: <Users size={16} /> },
                  { id: 'conf', label: 'Évémenentiel B2B', icon: <Briefcase size={16} /> },
                ]}
                onChoice={(val) => handleNext('sector', val)}
              />
            </OnboardingStep>
          )}

          {step === 3 && (
            <OnboardingStep 
              title="Quelle est votre vision à long terme ?"
              subtitle="Décrivez en quelques mots l'impact que vous souhaitez créer."
            >
              <TextAreaStep onNext={(val) => handleNext('vision', val)} placeholder="Notre vision est de démocratiser..." />
            </OnboardingStep>
          )}

          {step === 4 && (
            <OnboardingStep 
              title="Quels sont vos objectifs marketing prioritaires ?"
              subtitle="Sélectionnez ce qui compte le plus pour vos partenaires."
            >
              <MultiChoiceStep 
                choices={[
                  { id: 'brand', label: 'Visibilité de Marque' },
                  { id: 'leads', label: 'Génération de Leads' },
                  { id: 'social', label: 'Impact Social / RSE' },
                  { id: 'engagement', label: 'Engagement Communauté' },
                ]}
                onNext={(vals) => handleNext('goals', vals)}
              />
            </OnboardingStep>
          )}

          {step === 5 && (
            <OnboardingStep 
              title="Tout est prêt pour lancer SponAi."
              subtitle="J'ai configuré votre environnement. Vous pouvez maintenant créer votre premier événement."
            >
              <div className="space-y-8 pt-6">
                <div className="glass-card p-6 rounded-2xl flex items-center gap-6">
                   <div className="w-16 h-16 rounded-full bg-brand-emerald/10 flex items-center justify-center text-brand-emerald">
                     <Check size={32} />
                   </div>
                   <div>
                     <div className="font-bold text-lg leading-tight mb-1">Configuration de l'ADN terminée</div>
                     <p className="text-sm opacity-60 font-medium">L'algorithme de matching est maintenant optimisé pour {answers.orgName}.</p>
                   </div>
                </div>
                <button 
                  onClick={completeOnboarding}
                  className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-emerald/20"
                >
                  Entrer dans SponAi <Bot size={24} />
                </button>
              </div>
            </OnboardingStep>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OnboardingStep({ title, subtitle, children }: { title: React.ReactNode, subtitle: string, children: React.ReactNode | React.ReactNode[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <div className="ai-badge mb-4">
          <Bot size={12} /> AI Consultant
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight text-brand-ink">{title}</h2>
        <p className="text-lg font-medium text-brand-ink/40 leading-relaxed">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}

function InputStep({ onNext, placeholder }: { onNext: (val: string) => void, placeholder: string }) {
  const [val, setVal] = useState('');
  return (
    <div className="space-y-6 pt-4">
      <input 
        autoFocus
        type="text" 
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && val.trim() && onNext(val)}
        className="w-full text-3xl font-display font-medium border-b-4 border-brand-emerald/20 focus:border-brand-emerald bg-transparent outline-none pb-4 transition-colors"
        placeholder={placeholder}
      />
      <button 
        disabled={!val.trim()}
        onClick={() => onNext(val)}
        className="btn-primary flex items-center gap-2 px-8 disabled:opacity-30 disabled:grayscale"
      >
        Continuer <ChevronRight size={18} />
      </button>
    </div>
  );
}

function TextAreaStep({ onNext, placeholder }: { onNext: (val: string) => void, placeholder: string }) {
  const [val, setVal] = useState('');
  return (
    <div className="space-y-6 pt-4">
      <textarea 
        autoFocus
        rows={3}
        value={val}
        onChange={e => setVal(e.target.value)}
        className="w-full text-xl font-medium border-none bg-brand-ink/5 rounded-2xl p-6 outline-none focus:ring-2 focus:ring-brand-emerald/20 transition-all no-scrollbar"
        placeholder={placeholder}
      />
      <button 
        disabled={!val.trim()}
        onClick={() => onNext(val)}
        className="btn-primary flex items-center gap-2 px-8 disabled:opacity-30 disabled:grayscale"
      >
        Continuer <ChevronRight size={18} />
      </button>
    </div>
  );
}

function ChoiceStep({ choices, onChoice }: { choices: { id: string, label: string, icon: React.ReactNode }[], onChoice: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
      {choices.map(choice => (
        <button 
          key={choice.id}
          onClick={() => onChoice(choice.id)}
          className="p-6 glass-card rounded-2xl text-left font-bold text-lg hover:border-brand-emerald hover:bg-brand-emerald/5 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              {choice.icon}
            </div>
            {choice.label}
          </div>
          <ChevronRight size={20} className="text-brand-ink/20 group-hover:translate-x-1 group-hover:text-brand-emerald transition-all" />
        </button>
      ))}
    </div>
  );
}

function MultiChoiceStep({ choices, onNext }: { choices: { id: string, label: string }[], onNext: (ids: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const toggle = (id: string) => {
    if (selected.includes(id)) setSelected(selected.filter(i => i !== id));
    else setSelected([...selected, id]);
  };

  return (
    <div className="space-y-8 pt-6">
      <div className="flex flex-wrap gap-3">
        {choices.map(choice => {
          const isActive = selected.includes(choice.id);
          return (
            <button 
              key={choice.id}
              onClick={() => toggle(choice.id)}
              className={`px-6 py-4 rounded-xl text-md font-bold border-2 transition-all ${isActive ? 'bg-brand-emerald border-brand-emerald text-white' : 'border-brand-ink/5 bg-white/50 text-brand-ink/60 hover:border-brand-ink/20'}`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
      <button 
        disabled={selected.length === 0}
        onClick={() => onNext(selected)}
        className="btn-primary flex items-center gap-2 px-8 disabled:opacity-30 disabled:grayscale"
      >
        Valider mes choix <ChevronRight size={18} />
      </button>
    </div>
  );
}
