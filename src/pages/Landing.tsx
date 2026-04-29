import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Briefcase, Handshake, Globe, Zap, Target } from 'lucide-react';

type Persona = 'organizer' | 'sponsor';

export default function LandingPage() {
  const [persona, setPersona] = useState<Persona>('organizer');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-emerald/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-emerald rounded-lg flex items-center justify-center text-white shadow-sm">
            <Handshake size={18} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-brand-ink">SponAi</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-brand-ink/60">
          <a href="#" className="hover:text-brand-ink transition-colors">Produit</a>
          <a href="#" className="hover:text-brand-ink transition-colors">Tarifs</a>
          <a href="#" className="hover:text-brand-ink transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/auth')} className="text-sm font-bold text-brand-ink">Se connecter</button>
          <button onClick={() => navigate('/auth')} className="btn-primary py-2 px-5 text-sm">Commencer</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-emerald/10 text-brand-emerald px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand-emerald/20">
            <Sparkles size={12} /> L'IA de Sponsoring Éthique
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-display font-medium leading-[1.1] md:leading-[1.05] tracking-tight mb-8">
              {persona === 'organizer' ? (
                 <>Trouvez vos sponsors <br/><span className="italic text-brand-emerald">en 60 secondes.</span></>
              ) : (
                 <>Maximisez votre <span className="italic text-brand-emerald">impact marketing.</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl font-medium text-brand-ink/60 max-w-2xl mx-auto mb-12">
              L'IA négocie, rédige vos dossiers et identifie les meilleurs partenaires basés sur l'ADN stratégique de vos projets.
            </p>
          </div>

          {/* Persona Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl flex border border-brand-ink/5 shadow-sm">
               <button 
                onClick={() => setPersona('organizer')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${persona === 'organizer' ? 'bg-brand-ink text-white shadow-md' : 'text-brand-ink/40 hover:text-brand-ink'}`}
               >
                 Je suis Organisateur
               </button>
               <button 
                onClick={() => setPersona('sponsor')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${persona === 'sponsor' ? 'bg-brand-ink text-white shadow-md' : 'text-brand-ink/40 hover:text-brand-ink'}`}
               >
                 Je suis Sponsor
               </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button onClick={() => navigate('/auth')} className="btn-primary w-full md:w-auto px-12 py-5 text-lg flex items-center justify-center gap-2">
              Commencer gratuitement <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 border-t border-brand-ink/5">
           <FeatureCard 
             icon={<Briefcase />} 
             title="ADN Stratégique" 
             description="Notre IA analyse vos besoins pour créer des dossiers de sponsoring personnalisés et irrésistibles."
           />
           <FeatureCard 
             icon={<Globe />} 
             title="Matching Précis" 
             description="Plus de 10 000 entreprises analysées pour trouver les partenaires alignés avec vos valeurs."
           />
           <FeatureCard 
             icon={<Zap />} 
             title="Négociation Assistée" 
             description="L'IA gère les premiers échanges pour vous faire gagner du temps et optimiser les budgets."
           />
        </div>
      </main>

      {/* Secondary Hero / Persona Specific */}
      <section className="bg-brand-ink text-brand-cream py-32 px-6 md:px-12">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
               <h2 className="text-4xl md:text-6xl leading-tight font-display italic">
                 {persona === 'organizer' ? "Libérez-vous de la paperasse. Concentrez-vous sur l'humain." : "Investissez dans des projets qui font sens pour votre marque."}
               </h2>
               <div className="space-y-6">
                  <BenefitItem text={persona === 'organizer' ? "Génération automatique de dossiers PDF" : "Tracking de ROI en temps réel"} />
                  <BenefitItem text={persona === 'organizer' ? "Base de sponsors vérifiés" : "Filtrage IA par ADN de marque"} />
                  <BenefitItem text={persona === 'organizer' ? "War room de négociation intelligente" : "Contrats automatisés et sécurisés"} />
               </div>
               <button onClick={() => navigate('/auth')} className="text-brand-emerald font-bold flex items-center gap-2 group">
                 En savoir plus sur l'offre {persona === 'organizer' ? 'Organisateur' : 'Sponsor'} 
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
            <div className="flex-1 w-full aspect-square bg-white/5 rounded-[4rem] relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/20 to-transparent" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-emerald/20">
                 <Handshake size={300} strokeWidth={0.5} />
               </div>
            </div>
         </div>
      </section>

      <footer className="py-20 px-6 md:px-12 border-t border-brand-ink/5 text-center text-brand-ink/40">
         <div className="flex items-center justify-center gap-2 mb-8 opacity-60 grayscale">
            <div className="w-6 h-6 bg-brand-ink rounded flex items-center justify-center text-white text-[10px] font-bold italic">S</div>
            <span className="font-display font-bold text-lg tracking-tight">SponAi</span>
         </div>
         <p className="text-xs font-bold uppercase tracking-widest">© 2026 SponAi — Made for human impact</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 glass-card rounded-2xl group hover:border-brand-emerald/30 transition-all">
      <div className="w-12 h-12 bg-brand-emerald/10 text-brand-emerald rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-sm font-medium leading-relaxed opacity-60">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 text-lg font-medium">
      <div className="w-6 h-6 rounded-full bg-brand-emerald/20 flex items-center justify-center text-brand-emerald shrink-0">
        <Sparkles size={12} />
      </div>
      {text}
    </div>
  );
}
