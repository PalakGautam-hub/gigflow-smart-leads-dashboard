import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationMeta } from '@/types';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, totalPages, total, limit } = pagination;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 1);
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const navBtnBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    color: '#6b5f87',
    border: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-2 py-3 sm:flex-row">
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Showing{' '}
        <span style={{ color: '#c4b5fd', fontWeight: 600 }}>{start}</span>
        {' '}–{' '}
        <span style={{ color: '#c4b5fd', fontWeight: 600 }}>{end}</span>
        {' '}of{' '}
        <span style={{ color: '#c4b5fd', fontWeight: 600 }}>{total}</span>
        {' '}results
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          style={{ ...navBtnBase, opacity: page <= 1 ? 0.3 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
          onMouseEnter={e => { if (page > 1) { e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; }}}
          onMouseLeave={e => { e.currentTarget.style.color = '#6b5f87'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </button>

        {getVisiblePages().map((p, idx) =>
          typeof p === 'string' ? (
            <span key={`dots-${idx}`} className="px-1 text-sm" style={{ color: 'var(--text-muted)' }}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              style={
                p === page
                  ? {
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                      color: '#fff',
                      border: '1px solid rgba(139,92,246,0.4)',
                      boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
                      cursor: 'default',
                      padding: '0 8px',
                    }
                  : {
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      background: 'rgba(255,255,255,0.03)',
                      color: '#7c6fa0',
                      border: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      padding: '0 8px',
                      transition: 'all 0.2s',
                    }
              }
              onMouseEnter={e => { if (p !== page) { e.currentTarget.style.color = '#c4b5fd'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)'; }}}
              onMouseLeave={e => { if (p !== page) { e.currentTarget.style.color = '#7c6fa0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          style={{ ...navBtnBase, opacity: page >= totalPages ? 0.3 : 1, cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
          onMouseEnter={e => { if (page < totalPages) { e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; }}}
          onMouseLeave={e => { e.currentTarget.style.color = '#6b5f87'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
