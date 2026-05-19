import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '@/components/ui/Badge';
import { formatRelativeTime } from '@/utils/formatters';
import { EmptyState } from '@/components/ui/EmptyState';
import { Clock } from 'lucide-react';
import type { Lead } from '@/types';

interface RecentActivityProps {
  leads: Lead[];
}

export function RecentActivity({ leads }: RecentActivityProps) {
  const navigate = useNavigate();

  if (leads.length === 0) {
    return (
      <div className="card rounded-2xl overflow-hidden">
        <div
          className="px-6 py-4"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            Recent Activity
          </h2>
        </div>
        <EmptyState
          title="No recent activity"
          description="New leads will appear here."
          icon={<Clock className="h-10 w-10" style={{ color: 'var(--text-muted)' }} />}
        />
      </div>
    );
  }

  return (
    <div className="card rounded-2xl overflow-hidden">
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          Recent Activity
        </h2>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: 'var(--border-glow)' }}
        >
          {leads.length} leads
        </span>
      </div>

      <div>
        {leads.map((lead, idx) => (
          <button
            key={lead._id}
            onClick={() => navigate(`/leads/${lead._id}`)}
            className="flex w-full items-center gap-4 px-6 py-4 text-left transition-all duration-200"
            style={{
              borderBottom: idx < leads.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.06)')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLElement).style.background = '')
            }
          >
            {/* Avatar */}
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{
                background: `linear-gradient(135deg, hsl(${(lead.name.charCodeAt(0) * 7) % 360}, 60%, 45%), hsl(${(lead.name.charCodeAt(0) * 11) % 360}, 70%, 55%))`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {lead.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {lead.name}
              </p>
              <p className="truncate text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {lead.email}
              </p>
            </div>

            {/* Badge + time */}
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <StatusBadge status={lead.status} />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {formatRelativeTime(lead.createdAt)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
