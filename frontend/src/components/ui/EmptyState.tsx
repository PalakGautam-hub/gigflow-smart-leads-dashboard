import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No data found',
  description = 'There are no items to display at the moment.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div
        className="mb-5 rounded-2xl p-5"
        style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
      >
        {icon || <Inbox className="h-10 w-10" style={{ color: '#6b5f87' }} />}
      </div>
      <h3 className="mb-2 text-base font-semibold" style={{ color: '#c4b5fd' }}>
        {title}
      </h3>
      <p className="mb-6 max-w-xs text-sm" style={{ color: '#6b5f87' }}>
        {description}
      </p>
      {action}
    </div>
  );
}
