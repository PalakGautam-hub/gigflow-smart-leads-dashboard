import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LayoutDashboard, Users, Menu, Zap, LogOut } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Leads',     href: '/leads',     icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 h-16"
      style={{
        background: 'rgba(13, 10, 26, 0.75)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Left — logo + mobile menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg p-2 transition-colors"
          style={{ color: '#7c6fa0' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')}
          onMouseLeave={e => (e.currentTarget.style.color = '#7c6fa0')}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Brand mark (visible on mobile / small sidebars) */}
        <div className="flex items-center gap-2 lg:hidden">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 4px 12px rgba(139,92,246,0.4)',
            }}
          >
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-base font-bold" style={{ color: '#f0eaff' }}>
            Gig<span style={{ color: '#a78bfa' }}>Flow</span>
          </span>
        </div>
      </div>

      {/* Center — pill nav */}
      <nav className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(139,92,246,0.15)',
        }}
      >
        {navItems.map(item => {
          const isActive = location.pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={e => { e.preventDefault(); navigate(item.href); }}
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(168,85,247,0.25))',
                      color: '#c4b5fd',
                      border: '1px solid rgba(139,92,246,0.35)',
                      boxShadow: '0 2px 10px rgba(139,92,246,0.2)',
                    }
                  : {
                      color: '#7c6fa0',
                      border: '1px solid transparent',
                    }
              }
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.color = '#c4b5fd';
                  e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.color = '#7c6fa0';
                  e.currentTarget.style.background = '';
                }
              }}
            >
              <item.icon size={15} />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Right — logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#7c6fa0',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
          e.currentTarget.style.color = '#fca5a5';
          e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          e.currentTarget.style.color = '#7c6fa0';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        }}
        aria-label="Sign out"
      >
        <LogOut size={15} />
        <span className="hidden sm:inline">Sign out</span>
      </button>
    </header>
  );
}
