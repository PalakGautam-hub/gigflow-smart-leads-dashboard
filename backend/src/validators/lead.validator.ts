import { z } from 'zod';
import { LeadStatus, LeadSource } from '../types';

export const createLeadSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be at most 100 characters')
      .trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address')
      .trim()
      .toLowerCase(),
    status: z.nativeEnum(LeadStatus).optional().default(LeadStatus.NEW),
    source: z.nativeEnum(LeadSource, {
      required_error: 'Source is required',
      invalid_type_error: 'Invalid source value',
    }),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be at most 100 characters')
      .trim()
      .optional(),
    email: z.string().email('Invalid email address').trim().toLowerCase().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Lead ID is required' }),
  }),
});

export const leadQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
    search: z.string().optional(),
    sort: z.enum(['latest', 'oldest']).optional().default('latest'),
  }),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>['body'];
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>['body'];
export type LeadQueryInput = z.infer<typeof leadQuerySchema>['query'];
