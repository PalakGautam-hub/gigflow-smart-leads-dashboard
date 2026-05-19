import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
} from 'lucide-react';
import type { LeadStats } from '@/types';

interface StatsCardsProps {
  stats: LeadStats;
}

const cards = [
  {
    key: 'total' as const,
    label: 'Total Leads',
    icon: Users,
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    glow: 'rgba(139, 92, 246, 0.35)',
    accent: '#a78bfa',
  },
  {
    key: 'new' as const,
    label: 'New Leads',
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    glow: 'rgba(59, 130, 246, 0.35)',
    accent: '#93c5fd',
  },
  {
    key: 'qualified' as const,
    label: 'Qualified',
    icon: UserCheck,
    gradient: 'linear-gradient(135deg, #065f46, #10b981)',
    glow: 'rgba(16, 185, 129, 0.35)',
    accent: '#6ee7b7',
  },
  {
    key: 'lost' as const,
    label: 'Lost Leads',
    icon: UserX,
    gradient: 'linear-gradient(135deg, #9f1239, #e11d48)',
    glow: 'rgba(225, 29, 72, 0.35)',
    accent: '#fca5a5',
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={card.key}
          className="relative overflow-hidden rounded-2xl p-6 animate-slide-up transition-all duration-300 group cursor-default"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            animationDelay: `${index * 80}ms`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.border = `1px solid rgba(139,92,246,0.25)`;
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(139,92,246,0.1)`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '';
          }}
        >
          {/* Top-right glow */}
          <div
            className="absolute -top-4 -right-4 w-24 h-24 rounded-full pointer-events-none opacity-30"
            style={{
              background: card.gradient,
              filter: 'blur(24px)',
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6b5f87' }}>
                {card.label}
              </p>
              <p className="text-4xl font-extrabold" style={{ color: card.accent }}>
                {stats[card.key]}
              </p>
            </div>

            <div
              className="flex h-13 w-13 items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                background: card.gradient,
                boxShadow: `0 8px 24px ${card.glow}`,
                padding: '12px',
              }}
            >
              <card.icon size={22} className="text-white" />
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: card.gradient, opacity: 0.4 }}
          />
        </div>
      ))}
    </div>
  );
}
