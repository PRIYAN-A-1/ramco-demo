import React from 'react';
import {
  Home,
  TrendingUp,
  Calculator,
  CreditCard,
  Activity,
  Target,
  Users,
  Bot,
  UserCheck,
  Scale,
  Layers,
  Sliders,
  Sparkles
} from 'lucide-react';

interface FinFamBottomNavBarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const FinFamBottomNavBar: React.FC<FinFamBottomNavBarProps> = ({ currentRoute, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Vault', icon: Home },
    { id: 'multi_goal_planner', label: 'Goal AI', icon: Target },
    { id: 'conflict_map', label: 'Conflict Map', icon: Layers },
    { id: 'what_if_lab', label: 'What-If Lab', icon: Sliders },
    { id: 'resolution_lab', label: 'Resolution', icon: Sparkles },
    { id: 'optimizer', label: 'Decision AI', icon: Scale },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'emi', label: 'EMI Engine', icon: Calculator },
    { id: 'payment', label: 'RuPay & Pay', icon: CreditCard },
    { id: 'analytics', label: 'Radar & AI', icon: Activity },
    { id: 'goals', label: 'Milestones', icon: Target },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'advisor', label: 'AI Coach', icon: Bot },
    { id: 'profile', label: 'Profile', icon: UserCheck }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#070C1E]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 sm:py-2">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] sm:min-w-[64px] py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] font-medium tracking-tight mt-1 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
