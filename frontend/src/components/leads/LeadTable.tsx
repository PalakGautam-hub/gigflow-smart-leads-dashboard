import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge, SourceBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatters';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types';
import type { Lead } from '@/types';

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadTable({ leads, onEdit, onDelete }: LeadTableProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === UserRole.ADMIN;

  const thStyle: React.CSSProperties = {
    color: '#6b5f87',
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '12px 16px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(139,92,246,0.1)',
    background: 'rgba(139,92,246,0.04)',
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={{ ...thStyle, display: 'none' }} className="sm:table-cell">Email</th>
            <th style={thStyle}>Status</th>
            <th style={{ ...thStyle }} className="hidden md:table-cell">Source</th>
            <th style={{ ...thStyle }} className="hidden lg:table-cell">Created</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr
              key={lead._id}
              style={{ borderBottom: idx < leads.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.05)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '')}
              className="transition-colors duration-150"
            >
              {/* Name */}
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(lead.name.charCodeAt(0) * 7) % 360},55%,40%), hsl(${(lead.name.charCodeAt(0) * 11) % 360},65%,55%))`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    {lead.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {lead.name}
                  </span>
                </div>
              </td>

              {/* Email */}
              <td className="px-4 py-3.5 hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>
                {lead.email}
              </td>

              {/* Status */}
              <td className="px-4 py-3.5">
                <StatusBadge status={lead.status} />
              </td>

              {/* Source */}
              <td className="px-4 py-3.5 hidden md:table-cell">
                <SourceBadge source={lead.source} />
              </td>

              {/* Created */}
              <td className="px-4 py-3.5 hidden lg:table-cell" style={{ color: '#6b5f87', fontSize: '0.75rem' }}>
                {formatDate(lead.createdAt)}
              </td>

              {/* Actions */}
              <td className="px-4 py-3.5">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => navigate(`/leads/${lead._id}`)}
                    className="rounded-lg p-1.5 transition-all duration-200"
                    title="View lead"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#6b5f87'; e.currentTarget.style.background = ''; }}
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => onEdit(lead)}
                    className="rounded-lg p-1.5 transition-all duration-200"
                    title="Edit lead"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fcd34d'; e.currentTarget.style.background = 'rgba(245,158,11,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#6b5f87'; e.currentTarget.style.background = ''; }}
                  >
                    <Pencil size={15} />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(lead)}
                      className="rounded-lg p-1.5 transition-all duration-200"
                      title="Delete lead"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#fca5a5'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#6b5f87'; e.currentTarget.style.background = ''; }}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
