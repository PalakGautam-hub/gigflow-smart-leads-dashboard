import api from './axios';
import type {
  ApiResponse,
  CreateLeadData,
  Lead,
  LeadFilters,
  LeadStats,
  PaginationMeta,
  UpdateLeadData,
} from '@/types';

export const leadApi = {
  getLeads: async (
    filters: LeadFilters
  ): Promise<{ leads: Lead[]; pagination: PaginationMeta }> => {
    const params = new URLSearchParams();
    params.set('page', filters.page.toString());
    params.set('limit', filters.limit.toString());
    params.set('sort', filters.sort);
    if (filters.status) params.set('status', filters.status);
    if (filters.source) params.set('source', filters.source);
    if (filters.search) params.set('search', filters.search);

    const { data } = await api.get<ApiResponse<Lead[]>>(
      `/leads?${params.toString()}`
    );
    return {
      leads: data.data!,
      pagination: data.pagination!,
    };
  },

  getLeadById: async (id: string): Promise<Lead> => {
    const { data } = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
    return data.data!;
  },

  createLead: async (leadData: CreateLeadData): Promise<Lead> => {
    const { data } = await api.post<ApiResponse<Lead>>('/leads', leadData);
    return data.data!;
  },

  updateLead: async (id: string, leadData: UpdateLeadData): Promise<Lead> => {
    const { data } = await api.put<ApiResponse<Lead>>(`/leads/${id}`, leadData);
    return data.data!;
  },

  deleteLead: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },

  getStats: async (): Promise<LeadStats> => {
    const { data } = await api.get<ApiResponse<LeadStats>>('/leads/stats');
    return data.data!;
  },

  getRecentLeads: async (): Promise<Lead[]> => {
    const { data } = await api.get<ApiResponse<Lead[]>>('/leads/recent');
    return data.data!;
  },
};
