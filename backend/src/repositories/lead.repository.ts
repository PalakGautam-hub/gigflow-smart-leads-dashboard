import { FilterQuery, SortOrder } from 'mongoose';
import { Lead } from '../models/lead.model';
import { ILeadDocument, LeadQueryParams, LeadStats } from '../types';
import { CreateLeadInput, UpdateLeadInput } from '../validators/lead.validator';

export class LeadRepository {
  async findAll(params: LeadQueryParams): Promise<{
    leads: ILeadDocument[];
    total: number;
  }> {
    const {
      page = 1,
      limit = 10,
      status,
      source,
      search,
      sort = 'latest',
    } = params;

    const filter: FilterQuery<ILeadDocument> = {};

    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOrder: Record<string, SortOrder> =
      sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort(sortOrder).skip(skip).limit(limit).lean(),
      Lead.countDocuments(filter),
    ]);

    return { leads: leads as unknown as ILeadDocument[], total };
  }

  async findById(id: string): Promise<ILeadDocument | null> {
    return Lead.findById(id);
  }

  async create(data: CreateLeadInput): Promise<ILeadDocument> {
    return Lead.create(data);
  }

  async update(
    id: string,
    data: UpdateLeadInput
  ): Promise<ILeadDocument | null> {
    return Lead.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<ILeadDocument | null> {
    return Lead.findByIdAndDelete(id);
  }

  async getStats(): Promise<LeadStats> {
    const [total, newCount, contacted, qualified, lost] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ status: 'Contacted' }),
      Lead.countDocuments({ status: 'Qualified' }),
      Lead.countDocuments({ status: 'Lost' }),
    ]);

    return { total, new: newCount, contacted, qualified, lost };
  }

  async getRecent(limit = 5): Promise<ILeadDocument[]> {
    return Lead.find().sort({ createdAt: -1 }).limit(limit).lean() as unknown as Promise<
      ILeadDocument[]
    >;
  }
}

export const leadRepository = new LeadRepository();
