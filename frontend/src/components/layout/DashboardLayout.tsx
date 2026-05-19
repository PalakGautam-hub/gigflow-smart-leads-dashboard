import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
};

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith('/leads/') ? 'Lead Details' : 'Dashboard');

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: '#0d0a1a' }}>
      {/* ── Deep-space background orbs ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(88, 28, 135, 0.55) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 60% 50% at 90% 80%, rgba(139, 92, 246, 0.25) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 50% 40% at 10% 90%, rgba(168, 85, 247, 0.2) 0%, transparent 60%), ' +
            '#0d0a1a',
        }}
      />
      {/* Subtle animated blob top-right */}
      <div
        className="absolute top-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full pointer-events-none z-0 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Pink accent blob bottom-left */}
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[45%] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title={title}
      />

      <div className="relative flex flex-1 flex-col overflow-hidden z-10">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
        />

        <main className="flex-1 overflow-y-auto scroll-smooth p-4 sm:p-6 z-10 relative">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
