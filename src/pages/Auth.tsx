import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Handshake, Mail, Globe, Github, ArrowRight, Sparkles } from 'lucide-react';
import { AuthContext } from '../App';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'auth
    login({ 
      id: '1', 
      name: email.split('@')[0] || 'Sarah', 
      needsOnboarding: !isLogin // Nouveau compte a besoin d'onboarding
    });
    
    if (isLogin) {
      navigate('/app/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-emerald/5 via-transparent to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center text-white shadow-lg">
            <Handshake size={24} />
          </div>
          <span className="font-display font-bold text-3xl tracking-tight text-brand-ink">SponAi</span>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] shadow-xl">
          <div className="flex gap-8 mb-10 border-b border-brand-ink/5 pb-2">
            <button 
              onClick={() => setIsLogin(true)}
              className={`text-sm font-bold transition-all relative ${isLogin ? 'text-brand-ink' : 'text-brand-ink/40'}`}
            >
              Connexion
              {isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-brand-emerald" />}
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`text-sm font-bold transition-all relative ${!isLogin ? 'text-brand-ink' : 'text-brand-ink/40'}`}
            >
              Inscription
              {!isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-brand-emerald" />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Email</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={18} />
                 <input 
                   required
                   type="email" 
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   className="w-full bg-brand-ink/5 border-none rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none"
                   placeholder="nom@exemple.fr"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Mot de passe</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-brand-ink/5 border-none rounded-xl py-4 px-4 text-sm font-medium focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-brand-emerald hover:underline">Mot de passe oublié ?</button>
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
              {isLogin ? 'Se connecter' : 'Créer un compte'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-brand-ink/5">
             <p className="text-center text-[10px] font-black uppercase tracking-widest opacity-30 mb-6">Ou continuer avec</p>
             <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-brand-ink/10 text-sm font-bold hover:bg-brand-ink/5 transition-colors">
                   <Globe size={16} /> Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-brand-ink/10 text-sm font-bold hover:bg-brand-ink/5 transition-colors">
                   <Github size={16} /> GitHub
                </button>
             </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs font-medium text-brand-ink/40">
           En continuant, vous acceptez nos <span className="underline cursor-pointer">Conditions d'Utilisation</span> et notre <span className="underline cursor-pointer">Politique de Confidentialité</span>.
        </p>
      </motion.div>
    </div>
  );
}
