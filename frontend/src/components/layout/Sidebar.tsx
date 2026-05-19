import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  LogOut,
  X,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/leads',     label: 'Leads',     icon: Users },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'rgba(15, 10, 30, 0.92)',
          borderRight: '1px solid rgba(139, 92, 246, 0.15)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Subtle inner glow at top */}
        <div
          className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          className="flex h-16 items-center justify-between px-5 relative z-10"
          style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.12)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
              }}
            >
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: '#f0eaff' }}>
              Gig<span style={{ color: '#a78bfa' }}>Flow</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 lg:hidden transition-colors"
            style={{ color: '#6b5f87' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0eaff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b5f87')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 relative z-10 mt-2">
          <p
            className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: '#4a3f6b' }}
          >
            Navigation
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive ? 'sidebar-active' : 'sidebar-inactive'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2))',
                      color: '#c4b5fd',
                      border: '1px solid rgba(139,92,246,0.3)',
                      boxShadow: '0 2px 12px rgba(139,92,246,0.15)',
                    }
                  : {
                      color: '#7c6fa0',
                      border: '1px solid transparent',
                    }
              }
              onMouseEnter={e => {
                const el = e.currentTarget;
                if (!el.classList.contains('sidebar-active')) {
                  el.style.background = 'rgba(139,92,246,0.08)';
                  el.style.color = '#c4b5fd';
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                if (!el.classList.contains('sidebar-active')) {
                  el.style.background = '';
                  el.style.color = '#7c6fa0';
                }
              }}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div
          className="p-3 relative z-10"
          style={{ borderTop: '1px solid rgba(139, 92, 246, 0.12)' }}
        >
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
              }}
            >
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold" style={{ color: '#e2d9f3' }}>
                {user?.name}
              </p>
              <p className="truncate text-xs capitalize" style={{ color: '#6b5f87' }}>
                {user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-1.5 transition-all duration-200"
              title="Sign out"
              style={{ color: '#6b5f87' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fca5a5';
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#6b5f87';
                e.currentTarget.style.background = '';
              }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
