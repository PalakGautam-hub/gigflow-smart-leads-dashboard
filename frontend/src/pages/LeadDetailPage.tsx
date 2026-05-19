import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Globe, Calendar, RefreshCw } from 'lucide-react';
import { useLead } from '@/hooks/useLeads';
import { StatusBadge, SourceBadge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate, formatRelativeTime } from '@/utils/formatters';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '1rem',
  overflow: 'hidden',
};

const rowBorder: React.CSSProperties = {
  borderBottom: '1px solid rgba(255,255,255,0.04)',
};

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: lead, isLoading, error } = useLead(id || '');

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <Skeleton className="h-8 w-48" />
        <div style={cardStyle} className="p-6 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-lg font-medium" style={{ color: '#e2d9f3' }}>Lead not found</p>
        <button onClick={() => navigate('/leads')} className="btn-primary mt-4">
          Back to Leads
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate('/leads')}
        className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        style={{ color: '#7c6fa0' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')}
        onMouseLeave={e => (e.currentTarget.style.color = '#7c6fa0')}
      >
        <ArrowLeft size={16} />
        Back to Leads
      </button>

      {/* Header card */}
      <div style={cardStyle} className="p-6 relative">
        {/* Top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="flex items-start gap-4 relative z-10">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
            style={{
              background: `linear-gradient(135deg, hsl(${(lead.name.charCodeAt(0) * 7) % 360},55%,40%), hsl(${(lead.name.charCodeAt(0) * 11) % 360},65%,55%))`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            {lead.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold" style={{ color: '#f0eaff' }}>
              {lead.name}
            </h2>
            <p className="mt-0.5 text-sm" style={{ color: '#6b5f87' }}>{lead.email}</p>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <StatusBadge status={lead.status} />
              <SourceBadge source={lead.source} />
            </div>
          </div>
        </div>
      </div>

      {/* Details card */}
      <div style={cardStyle}>
        <div
          className="px-6 py-4"
          style={{ borderBottom: '1px solid rgba(139,92,246,0.12)' }}
        >
          <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#6b5f87' }}>
            Lead Details
          </h3>
        </div>

        <div>
          {[
            {
              icon: Mail,
              label: 'Email',
              value: lead.email,
            },
            {
              icon: Globe,
              label: 'Source',
              value: lead.source,
            },
            {
              icon: Calendar,
              label: 'Created',
              value: `${formatDate(lead.createdAt)} (${formatRelativeTime(lead.createdAt)})`,
            },
            {
              icon: RefreshCw,
              label: 'Last Updated',
              value: `${formatDate(lead.updatedAt)} (${formatRelativeTime(lead.updatedAt)})`,
            },
          ].map((row, idx, arr) => (
            <div
              key={row.label}
              className="flex items-center gap-4 px-6 py-4 transition-colors duration-150"
              style={idx < arr.length - 1 ? rowBorder : {}}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.04)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '')}
            >
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}
              >
                <row.icon size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#4a3f6b' }}>
                  {row.label}
                </p>
                <p className="text-sm font-medium" style={{ color: '#e2d9f3' }}>
                  {row.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
