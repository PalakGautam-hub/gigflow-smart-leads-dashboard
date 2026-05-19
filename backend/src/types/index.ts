import { Request } from 'express';
import { Document, Types } from 'mongoose';

// ─── Enums ───────────────────────────────────────────────
export enum UserRole {
  ADMIN = 'admin',
  SALES = 'sales',
}

export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  LOST = 'Lost',
}

export enum LeadSource {
  WEBSITE = 'Website',
  INSTAGRAM = 'Instagram',
  REFERRAL = 'Referral',
}

// ─── User Types ──────────────────────────────────────────
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
}

// ─── Lead Types ──────────────────────────────────────────
export interface ILead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILeadDocument extends ILead, Document {
  _id: Types.ObjectId;
}

// ─── Request Types ───────────────────────────────────────
export interface AuthRequest extends Request {
  user?: UserPayload;
}

// ─── Query Types ─────────────────────────────────────────
export interface LeadQueryParams {
  page?: number;
  limit?: number;
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
}

// ─── Response Types ──────────────────────────────────────
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: PaginationMeta;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  lost: number;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}
