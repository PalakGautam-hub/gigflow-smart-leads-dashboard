import { leadRepository } from '../repositories/lead.repository';
import { ILeadDocument, LeadQueryParams, LeadStats, PaginationMeta } from '../types';
import { NotFoundError } from '../utils/errors';
import { CreateLeadInput, UpdateLeadInput } from '../validators/lead.validator';

export class LeadService {
  async getLeads(params: LeadQueryParams): Promise<{
    leads: ILeadDocument[];
    pagination: PaginationMeta;
  }> {
    const page = params.page || 1;
    const limit = params.limit || 10;

    const { leads, total } = await leadRepository.findAll(params);

    const pagination: PaginationMeta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    return { leads, pagination };
  }

  async getLeadById(id: string): Promise<ILeadDocument> {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new NotFoundError('Lead not found');
    }
    return lead;
  }

  async createLead(data: CreateLeadInput): Promise<ILeadDocument> {
    return leadRepository.create(data);
  }

  async updateLead(
    id: string,
    data: UpdateLeadInput
  ): Promise<ILeadDocument> {
    const lead = await leadRepository.update(id, data);
    if (!lead) {
      throw new NotFoundError('Lead not found');
    }
    return lead;
  }

  async deleteLead(id: string): Promise<void> {
    const lead = await leadRepository.delete(id);
    if (!lead) {
      throw new NotFoundError('Lead not found');
    }
  }

  async getStats(): Promise<LeadStats> {
    return leadRepository.getStats();
  }

  async getRecentLeads(limit = 5): Promise<ILeadDocument[]> {
    return leadRepository.getRecent(limit);
  }
}

export const leadService = new LeadService();
