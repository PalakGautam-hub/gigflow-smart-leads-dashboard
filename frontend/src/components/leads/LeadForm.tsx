import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadFormData } from '@/lib/validations';
import { LeadSource, LeadStatus } from '@/types';
import type { Lead } from '@/types';
import { Loader2 } from 'lucide-react';

interface LeadFormProps {
  lead?: Lead;
  onSubmit: (data: LeadFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#e2d9f3',
  borderRadius: '12px',
  padding: '12px 16px',
  fontSize: '0.875rem',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
};

export function LeadForm({ lead, onSubmit, onCancel, isLoading = false }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name:   lead?.name   || '',
      email:  lead?.email  || '',
      status: lead?.status || LeadStatus.NEW,
      source: lead?.source,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Name */}
      <div>
        <label htmlFor="lead-name" className="label">Name</label>
        <input
          id="lead-name"
          type="text"
          className="input-field"
          placeholder="Enter lead name"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-medium" style={{ color: '#f87171' }}>{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className="label">Email</label>
        <input
          id="lead-email"
          type="email"
          className="input-field"
          placeholder="Enter lead email"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs font-medium" style={{ color: '#f87171' }}>{errors.email.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label htmlFor="lead-status" className="label">Status</label>
        <select id="lead-status" style={selectStyle} {...register('status')}>
          {Object.values(LeadStatus).map((s) => (
            <option key={s} value={s} style={{ background: '#1a1330' }}>{s}</option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1.5 text-xs font-medium" style={{ color: '#f87171' }}>{errors.status.message}</p>
        )}
      </div>

      {/* Source */}
      <div>
        <label htmlFor="lead-source" className="label">Source</label>
        <select id="lead-source" style={selectStyle} {...register('source')}>
          <option value="" style={{ background: '#1a1330' }}>Select source</option>
          {Object.values(LeadSource).map((s) => (
            <option key={s} value={s} style={{ background: '#1a1330' }}>{s}</option>
          ))}
        </select>
        {errors.source && (
          <p className="mt-1.5 text-xs font-medium" style={{ color: '#f87171' }}>{errors.source.message}</p>
        )}
      </div>

      {/* Actions */}
      <div
        className="flex items-center justify-end gap-3 pt-4"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <button type="button" onClick={onCancel} className="btn-secondary" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {lead ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}
