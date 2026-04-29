import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Plus, 
  Handshake, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Globe,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../App';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col md:flex-row font-sans">
      {/* Sidebar Desktop */}
      <aside className={`hidden md:flex flex-col border-r border-brand-ink/5 bg-white transition-all duration-500 overflow-hidden ${isSidebarOpen ? 'w-80' : 'w-24'}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-10 h-10 bg-brand-ink rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${!isSidebarOpen && 'mx-auto'}`}>
              <Handshake size={20} />
            </div>
            {isSidebarOpen && <span className="font-display font-bold text-2xl tracking-tight text-brand-ink">SponAi</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
           <SidebarLink icon={<LayoutDashboard />} label="Dashboard" to="/app/dashboard" isOpen={isSidebarOpen} />
           <SidebarLink icon={<Briefcase />} label="Événements" to="/app/events" isOpen={isSidebarOpen} />
           <SidebarLink icon={<MessageSquare />} label="War Room" to="/app/warroom" isOpen={isSidebarOpen} />
           <SidebarLink icon={<Settings />} label="Paramètres" to="/app/settings" isOpen={isSidebarOpen} />
        </nav>

        <div className="p-6 border-t border-brand-ink/5 space-y-4">
           <div className={`flex items-center gap-4 ${!isSidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-emerald to-emerald-200 border-2 border-white shadow-sm shrink-0" />
              {isSidebarOpen && (
                <div className="flex-1 overflow-hidden">
                   <div className="font-bold text-sm truncate">{user?.name || 'Sarah'}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-brand-ink/40">Organisateur</div>
                </div>
              )}
              {isSidebarOpen && <button onClick={logout} className="text-brand-ink/20 hover:text-brand-ink transition-colors"><LogOut size={16} /></button>}
           </div>
           
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="w-full py-3 bg-brand-ink/5 rounded-xl flex items-center justify-center text-brand-ink/40 hover:bg-brand-ink/10 transition-colors"
           >
             {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TopBar */}
        <header className="h-20 border-b border-brand-ink/5 bg-white/50 backdrop-blur-md px-8 flex items-center justify-between relative z-30">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-brand-ink/40">SponAi</span>
            <span className="text-brand-ink/10 text-xl font-thin">/</span>
            <span className="text-sm font-medium text-brand-ink capitalize">{location.pathname.split('/').pop()}</span>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex bg-brand-ink/5 p-1 rounded-xl">
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white shadow-sm text-brand-ink">FR</button>
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-ink/40">EN</button>
             </div>
             <button className="text-brand-ink/40 hover:text-brand-ink transition-colors relative">
               <Bell size={20} />
               <div className="absolute top-0 right-0 w-2 h-2 bg-brand-emerald rounded-full border-2 border-white" />
             </button>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto px-8 md:px-16 no-scrollbar pb-32 md:pb-12">
          {children}
        </div>
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-24 bg-white border-t border-brand-ink/5 px-6 flex items-center justify-around z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
         <BottomLink icon={<LayoutDashboard size={20} />} to="/app/dashboard" />
         <BottomLink icon={<Briefcase size={20} />} to="/app/events" />
         
         <div className="-mt-12 group">
            <button className="w-16 h-16 bg-brand-ink text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-brand-ink/20 group-hover:scale-110 active:scale-95 transition-all">
               <Plus size={32} />
            </button>
         </div>

         <BottomLink icon={<MessageSquare size={20} />} to="/app/warroom" />
         <BottomLink icon={<Settings size={20} />} to="/app/settings" />
      </nav>
    </div>
  );
}

function SidebarLink({ icon, label, to, isOpen }: { icon: React.ReactNode, label: string, to: string, isOpen: boolean }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${isActive ? 'bg-brand-emerald text-white shadow-lg shadow-brand-emerald/10' : 'text-brand-ink/40 hover:text-brand-ink hover:bg-brand-ink/5'}`}
    >
      <div className={isOpen ? '' : 'mx-auto'}>{icon}</div>
      {isOpen && <span className="text-sm">{label}</span>}
    </NavLink>
  );
}

function BottomLink({ icon, to }: { icon: React.ReactNode, to: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `p-3 rounded-2xl transition-all ${isActive ? 'text-brand-emerald bg-brand-emerald/10' : 'text-brand-ink/20'}`}
    >
      {icon}
    </NavLink>
  );
}
