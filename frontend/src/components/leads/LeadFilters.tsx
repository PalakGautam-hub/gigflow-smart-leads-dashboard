import { Search, SlidersHorizontal, X } from 'lucide-react';
import { LeadSource, LeadStatus } from '@/types';
import type { LeadFilters } from '@/types';

interface LeadFiltersProps {
  filters: LeadFilters;
  onFilterChange: (filters: Partial<LeadFilters>) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const selectStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#a89cc8',
  borderRadius: '10px',
  padding: '8px 12px',
  fontSize: '0.8rem',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
};

export function LeadFiltersBar({
  filters,
  onFilterChange,
  searchValue,
  onSearchChange,
}: LeadFiltersProps) {
  const hasActiveFilters = filters.status || filters.source || searchValue;

  const clearFilters = () => {
    onSearchChange('');
    onFilterChange({ status: undefined, source: undefined, sort: 'latest', page: 1 });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#6b5f87' }}
          />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field pl-10"
            id="lead-search"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: '#4a3f6b' }}>
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filters</span>
          </div>

          {/* Status */}
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ status: (e.target.value as LeadStatus) || undefined, page: 1 })}
            style={selectStyle}
            id="filter-status"
          >
            <option value="">All Status</option>
            {Object.values(LeadStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Source */}
          <select
            value={filters.source || ''}
            onChange={(e) => onFilterChange({ source: (e.target.value as LeadSource) || undefined, page: 1 })}
            style={selectStyle}
            id="filter-source"
          >
            <option value="">All Sources</option>
            {Object.values(LeadSource).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange({ sort: e.target.value as 'latest' | 'oldest', page: 1 })}
            style={selectStyle}
            id="filter-sort"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200"
              style={{ color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; }}
            >
              <X size={13} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
