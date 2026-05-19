import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadApi } from '@/api/lead.api';
import type { CreateLeadData, LeadFilters, UpdateLeadData } from '@/types';
import toast from 'react-hot-toast';

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => leadApi.getLeads(filters),
    placeholderData: (previousData) => previousData,
  });
};

export const useLead = (id: string) => {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadApi.getLeadById(id),
    enabled: !!id,
  });
};

export const useLeadStats = () => {
  return useQuery({
    queryKey: ['lead-stats'],
    queryFn: leadApi.getStats,
  });
};

export const useRecentLeads = () => {
  return useQuery({
    queryKey: ['recent-leads'],
    queryFn: leadApi.getRecentLeads,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadData) => leadApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      queryClient.invalidateQueries({ queryKey: ['recent-leads'] });
      toast.success('Lead created successfully');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Failed to create lead');
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadData }) =>
      leadApi.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      queryClient.invalidateQueries({ queryKey: ['recent-leads'] });
      toast.success('Lead updated successfully');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Failed to update lead');
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leadApi.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      queryClient.invalidateQueries({ queryKey: ['recent-leads'] });
      toast.success('Lead deleted successfully');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
    },
  });
};
