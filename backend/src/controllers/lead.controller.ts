import { Request, Response, NextFunction } from 'express';
import { leadService } from '../services/lead.service';
import { LeadQueryParams } from '../types';
import { sendResponse } from '../utils/response';

export class LeadController {
  async getLeads(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params: LeadQueryParams = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        status: req.query.status as LeadQueryParams['status'],
        source: req.query.source as LeadQueryParams['source'],
        search: req.query.search as string | undefined,
        sort: (req.query.sort as 'latest' | 'oldest') || 'latest',
      };

      const { leads, pagination } = await leadService.getLeads(params);
      sendResponse(res, 200, 'Leads retrieved successfully', leads, pagination);
    } catch (error) {
      next(error);
    }
  }

  async getLeadById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const lead = await leadService.getLeadById(req.params.id as string);
      sendResponse(res, 200, 'Lead retrieved successfully', lead);
    } catch (error) {
      next(error);
    }
  }

  async createLead(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const lead = await leadService.createLead(req.body);
      sendResponse(res, 201, 'Lead created successfully', lead);
    } catch (error) {
      next(error);
    }
  }

  async updateLead(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const lead = await leadService.updateLead(req.params.id as string, req.body);
      sendResponse(res, 200, 'Lead updated successfully', lead);
    } catch (error) {
      next(error);
    }
  }

  async deleteLead(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await leadService.deleteLead(req.params.id as string);
      sendResponse(res, 200, 'Lead deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getStats(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const stats = await leadService.getStats();
      sendResponse(res, 200, 'Stats retrieved successfully', stats);
    } catch (error) {
      next(error);
    }
  }

  async getRecentLeads(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const leads = await leadService.getRecentLeads();
      sendResponse(res, 200, 'Recent leads retrieved successfully', leads);
    } catch (error) {
      next(error);
    }
  }
}

export const leadController = new LeadController();
