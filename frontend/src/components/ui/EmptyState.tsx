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
        style={{ background: 'var(--glow-violet)' }}
      >
        {icon || <Inbox className="h-10 w-10" style={{ color: 'var(--text-muted)' }} />}
      </div>
      <h3 className="mb-2 text-base font-semibold" style={{ color: 'var(--accent-purple)' }}>
        {title}
      </h3>
      <p className="mb-6 max-w-xs text-sm" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>
      {action}
    </div>
  );
}
