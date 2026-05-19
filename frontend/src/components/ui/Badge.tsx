import { LeadStatus } from '@/types';

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusConfig: Record<LeadStatus, { label: string; style: React.CSSProperties }> = {
  [LeadStatus.NEW]: {
    label: 'New',
    style: {
      background: 'rgba(59,130,246,0.15)',
      color: '#93c5fd',
      border: '1px solid rgba(59,130,246,0.25)',
    },
  },
  [LeadStatus.CONTACTED]: {
    label: 'Contacted',
    style: {
      background: 'rgba(245,158,11,0.15)',
      color: '#fcd34d',
      border: '1px solid rgba(245,158,11,0.25)',
    },
  },
  [LeadStatus.QUALIFIED]: {
    label: 'Qualified',
    style: {
      background: 'rgba(16,185,129,0.15)',
      color: '#6ee7b7',
      border: '1px solid rgba(16,185,129,0.25)',
    },
  },
  [LeadStatus.LOST]: {
    label: 'Lost',
    style: {
      background: 'rgba(239,68,68,0.15)',
      color: '#fca5a5',
      border: '1px solid rgba(239,68,68,0.25)',
    },
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={config.style}
    >
      {config.label}
    </span>
  );
}

interface SourceBadgeProps {
  source: string;
}

export function SourceBadge({ source }: SourceBadgeProps) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        background: 'rgba(139,92,246,0.12)',
        color: '#a78bfa',
        border: '1px solid rgba(139,92,246,0.2)',
      }}
    >
      {source}
    </span>
  );
}
