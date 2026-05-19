import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  pagination?: PaginationMeta
): void => {
  const response: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    ...(data !== undefined && { data }),
    ...(pagination && { pagination }),
  };

  res.status(statusCode).json(response);
};
