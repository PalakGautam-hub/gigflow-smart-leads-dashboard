import { useLeadStats, useRecentLeads } from '@/hooks/useLeads';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { StatsSkeleton, Skeleton } from '@/components/ui/Skeleton';

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useLeadStats();
  const { data: recentLeads, isLoading: recentLoading } = useRecentLeads();

  const distributionItems = stats
    ? [
        { label: 'New',       value: stats.new,       total: stats.total, color: 'linear-gradient(90deg,#1d4ed8,#3b82f6)' },
        { label: 'Contacted', value: stats.contacted,  total: stats.total, color: 'linear-gradient(90deg,#b45309,#f59e0b)' },
        { label: 'Qualified', value: stats.qualified,  total: stats.total, color: 'linear-gradient(90deg,#065f46,#10b981)' },
        { label: 'Lost',      value: stats.lost,       total: stats.total, color: 'linear-gradient(90deg,#9f1239,#e11d48)' },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Stats */}
      {statsLoading ? <StatsSkeleton /> : stats ? <StatsCards stats={stats} /> : null}

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Recent Activity — 2/3 width */}
        <div className="lg:col-span-2">
          {recentLoading ? (
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <Skeleton className="h-5 w-36" />
              </div>
              <div className="p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-2 py-1">
                    <div className="h-10 w-10 rounded-full animate-pulse flex-shrink-0"
                      style={{ background: 'var(--border-glow)' }} />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3.5 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <RecentActivity leads={recentLeads || []} />
          )}
        </div>

        {/* Lead Distribution — 1/3 width */}
        <div
          className="rounded-2xl p-6"
          className="card"
        >
          <h3 className="text-base font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
            Lead Distribution
          </h3>

          {stats ? (
            <div className="space-y-4">
              {distributionItems.map((item) => {
                const pct = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                          {item.value}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          ({pct}%)
                        </span>
                      </div>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'var(--bg-card)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: item.color }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Total callout */}
              <div
                className="mt-6 rounded-xl p-4 text-center"
                style={{ background: 'var(--glow-violet)' }}
              >
                <p className="text-3xl font-extrabold" style={{ color: 'var(--accent-violet)' }}>
                  {stats.total}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Total Leads
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                  <Skeleton className="h-1.5 w-full" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
