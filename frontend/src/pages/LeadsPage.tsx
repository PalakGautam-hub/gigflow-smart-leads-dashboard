import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from '@/hooks/useLeads';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuthStore } from '@/store/auth.store';
import { LeadFiltersBar } from '@/components/leads/LeadFilters';
import { LeadTable } from '@/components/leads/LeadTable';
import { LeadForm } from '@/components/leads/LeadForm';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { exportLeadsToCSV } from '@/utils/csv';
import { UserRole, type Lead, type LeadFilters } from '@/types';
import type { LeadFormData } from '@/lib/validations';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '1rem',
  overflow: 'hidden',
};

export function LeadsPage() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === UserRole.ADMIN;

  const [filters, setFilters] = useState<LeadFilters>({ page: 1, limit: 10, sort: 'latest' });
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editLead, setEditLead]   = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);

  const { data, isLoading } = useLeads({ ...filters, search: debouncedSearch || undefined });
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();

  const handleFilterChange = (partial: Partial<LeadFilters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const handleCreate = (formData: LeadFormData) =>
    createMutation.mutate(formData, { onSuccess: () => setIsCreateOpen(false) });

  const handleUpdate = (formData: LeadFormData) => {
    if (!editLead) return;
    updateMutation.mutate({ id: editLead._id, data: formData }, { onSuccess: () => setEditLead(null) });
  };

  const handleDelete = () => {
    if (!deleteLead) return;
    deleteMutation.mutate(deleteLead._id, { onSuccess: () => setDeleteLead(null) });
  };

  const handleExport = () => {
    if (data?.leads) exportLeadsToCSV(data.leads, 'gigflow_leads');
  };

  return (
    <div className="space-y-5">

      {/* ── Page header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#f0eaff' }}>
            Lead Management
          </h2>
          <p className="text-sm mt-0.5" style={{ color: '#6b5f87' }}>
            {data?.pagination.total ?? 0} total leads
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="btn-secondary"
            disabled={!data?.leads.length}
          >
            <Download size={15} />
            Export CSV
          </button>
          {isAdmin && (
            <button onClick={() => setIsCreateOpen(true)} className="btn-primary">
              <Plus size={15} />
              Add Lead
            </button>
          )}
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div style={cardStyle} className="p-4">
        <LeadFiltersBar
          filters={filters}
          onFilterChange={handleFilterChange}
          searchValue={searchInput}
          onSearchChange={setSearchInput}
        />
      </div>

      {/* ── Table ── */}
      <div style={cardStyle}>
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton />
          </div>
        ) : data?.leads.length ? (
          <>
            <LeadTable
              leads={data.leads}
              onEdit={setEditLead}
              onDelete={setDeleteLead}
            />
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '0 8px' }}>
              <Pagination
                pagination={data.pagination}
                onPageChange={(page) => handleFilterChange({ page })}
              />
            </div>
          </>
        ) : (
          <EmptyState
            title="No leads found"
            description={
              debouncedSearch || filters.status || filters.source
                ? 'Try adjusting your filters or search terms.'
                : 'Create your first lead to get started.'
            }
            action={
              isAdmin && !debouncedSearch && !filters.status && !filters.source ? (
                <button onClick={() => setIsCreateOpen(true)} className="btn-primary">
                  <Plus size={15} />
                  Create Lead
                </button>
              ) : undefined
            }
          />
        )}
      </div>

      {/* ── Modals ── */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Lead">
        <LeadForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>

      <Modal isOpen={!!editLead} onClose={() => setEditLead(null)} title="Edit Lead">
        {editLead && (
          <LeadForm
            lead={editLead}
            onSubmit={handleUpdate}
            onCancel={() => setEditLead(null)}
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>

      <Modal isOpen={!!deleteLead} onClose={() => setDeleteLead(null)} title="Delete Lead" maxWidth="max-w-md">
        <div className="space-y-5">
          <p className="text-sm leading-relaxed" style={{ color: '#a89cc8' }}>
            Are you sure you want to delete{' '}
            <span className="font-semibold" style={{ color: '#e2d9f3' }}>{deleteLead?.name}</span>?{' '}
            This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => setDeleteLead(null)} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn-danger"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
