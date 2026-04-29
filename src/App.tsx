import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/Landing';
import AuthPage from './pages/Auth';
import OnboardingPage from './pages/Onboarding';
import DashboardPage from './pages/Dashboard';

// Components
import AppShell from './components/layout/AppShell';

// Mock Auth Hook
const useAuth = () => {
  const [user, setUser] = useState<{ id: string, name: string, needsOnboarding: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('sponai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('sponai_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sponai_user');
  };

  return { user, loading, login, logout };
};

// Global Context for simplicity in this phase
export const AuthContext = React.createContext<any>(null);

function AppRoutes() {
  const { user, loading } = React.useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 rounded-full border-4 border-brand-emerald border-t-transparent animate-spin" 
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route path="/onboarding" element={
          user ? (user.needsOnboarding ? <OnboardingPage /> : <Navigate to="/app/dashboard" />) : <Navigate to="/auth" />
        } />

        <Route path="/app/*" element={
          user ? (
            user.needsOnboarding ? <Navigate to="/onboarding" /> : (
              <AppShell>
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="events" element={<div className="p-8 mt-12"><h1 className="text-5xl font-display font-bold">Événements</h1><p className="text-brand-ink/40 mt-4 font-medium italic">Bientôt disponible en Phase 2</p></div>} />
                  <Route path="warroom" element={<div className="p-8 mt-12"><h1 className="text-5xl font-display font-bold">War Room</h1><p className="text-brand-ink/40 mt-4 font-medium italic">Bientôt disponible en Phase 2</p></div>} />
                  <Route path="settings" element={<div className="p-8 mt-12"><h1 className="text-5xl font-display font-bold">Paramètres</h1><p className="text-brand-ink/40 mt-4 font-medium italic">Bientôt disponible en Phase 2</p></div>} />
                  <Route path="*" element={<Navigate to="/app/dashboard" />} />
                </Routes>
              </AppShell>
            )
          ) : <Navigate to="/auth" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
